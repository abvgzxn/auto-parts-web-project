"""Local-only harness: copied script has a literal temporary BASE; commands are mocked."""
import os
from pathlib import Path
import subprocess
import tempfile
import unittest

SOURCE = Path(__file__).with_name('deploy.sh').read_text()
SHA = 'a' * 40
MOCK = r'''#!/usr/bin/env python3
import os, sys, pathlib, signal, shutil
cmd = pathlib.Path(sys.argv[0]).name
args = sys.argv[1:]
base = pathlib.Path(os.environ['TEST_BASE'])
mode = os.environ['MODE']
with (base / 'calls').open('a') as f: f.write(cmd + ' ' + ' '.join(args) + '\n')
if cmd == 'git':
    if args[0] == 'clone':
        p = pathlib.Path(args[-1]); p.mkdir(); (p / '.git').mkdir(); (p / 'package.json').touch()
        n = p / 'node_modules/.bin/next'; n.parent.mkdir(parents=True)
        n.write_text('#!/bin/sh\nexit 0\n'); n.chmod(0o755)
    if args[0] == 'rev-parse': print('a' * 40)
elif cmd == 'npm' and mode == 'build' and args == ['run', 'build']: sys.exit(1)
elif cmd == 'curl':
    if ':3000' in args[-1] and mode == 'http': sys.exit(1)
    if ':3001' in args[-1] and mode == 'preflight': sys.exit(1)
elif cmd == 'sudo':
    p = base / 'restarts'; count = int(p.read_text()) + 1 if p.exists() else 1; p.write_text(str(count))
    if count == 1 and mode in ('INT', 'TERM'):
        os.kill(os.getppid(), getattr(signal, 'SIG' + mode))
    if mode in ('restart', 'rollback_restart'): sys.exit(1 if count == 1 or mode == 'rollback_restart' else 0)
elif cmd == 'mv':
    if mode == 'rollback_link' and 'rollback' in args[-2]: sys.exit(1)
    os.replace(args[-2], args[-1])
elif cmd == 'rm':
    p = pathlib.Path(args[-1])
    assert p.parent == base / 'releases' and not p.is_symlink()
    if mode == 'prune': sys.exit(1)
    shutil.rmtree(p)
elif cmd == 'flock' and mode == 'lock': sys.exit(1)
'''


class DeployTests(unittest.TestCase):
    def run_case(self, mode='', sha=SHA, old=True):
        temp = tempfile.TemporaryDirectory(prefix='wellcar-test-')
        self.addCleanup(temp.cleanup)
        base = Path(temp.name)
        releases = base / 'releases'
        releases.mkdir()
        previous = None
        for i in range(8):
            p = releases / f'20260101-00000{i}-123'
            p.mkdir(); (p / '.git').mkdir(); (p / 'package.json').touch()
            if i == 0:
                previous = p
        if old:
            (base / 'current').symlink_to(previous)
        foreign = releases / 'foreign'; foreign.mkdir()
        unrelated = releases / '20250101-000000-123'; unrelated.mkdir()
        link = releases / '20240101-000000-123'; link.symlink_to(foreign)
        bin_dir = base / 'bin'; bin_dir.mkdir()
        mock = bin_dir / 'mock'; mock.write_text(MOCK); mock.chmod(0o755)
        for cmd in ('git', 'npm', 'curl', 'sudo', 'ss', 'sleep', 'mv', 'rm', 'flock'):
            (bin_dir / cmd).symlink_to(mock)
        if mode == 'unsafe_current':
            (base / 'current').unlink()
            (base / 'current').symlink_to(bin_dir)
        script = base / 'deploy.sh'
        self.assertEqual(SOURCE.count('BASE="/var/www/wellcar-deploy"'), 1)
        script.write_text(SOURCE.replace('BASE="/var/www/wellcar-deploy"', f'BASE="{base}"'))
        env = dict(os.environ, PATH=f'{bin_dir}:' + os.environ['PATH'], TEST_BASE=str(base), MODE=mode)
        result = subprocess.run(['bash', str(script), sha], env=env, capture_output=True, text=True, timeout=15)
        self.assertTrue(foreign.is_dir() and unrelated.is_dir() and link.is_symlink())
        return base, previous, result

    def test_success_retention(self):
        base, previous, result = self.run_case()
        self.assertEqual(result.returncode, 0, result.stderr)
        managed = [p for p in (base / 'releases').iterdir() if (p / '.git').is_dir()]
        self.assertEqual(len(managed), 5)
        self.assertIn(previous, managed)
        self.assertIn((base / 'current').resolve(), managed)

    def test_failures_before_switch(self):
        for mode, sha in [('build', SHA), ('preflight', SHA), ('lock', SHA), ('', 'b'*40), ('', 'invalid')]:
            with self.subTest(mode=mode, sha=sha):
                base, previous, result = self.run_case(mode, sha)
                self.assertNotEqual(result.returncode, 0)
                self.assertEqual((base / 'current').resolve(), previous)
                self.assertFalse((base / 'restarts').exists())

    def test_rollback(self):
        for mode, code in [('restart', 1), ('http', 1), ('INT', 130), ('TERM', 143), ('rollback_restart', 1)]:
            with self.subTest(mode=mode):
                base, previous, result = self.run_case(mode)
                self.assertEqual(result.returncode, code, result.stderr)
                self.assertEqual((base / 'current').resolve(), previous)
                self.assertEqual((base / 'restarts').read_text(), '2')

    def test_rollback_link_failure(self):
        # Production HTTP fails; force rollback rename failure too.
        source = globals()['MOCK']
        try:
            globals()['MOCK'] = source.replace("mode == 'http'", "mode == 'rollback_link'")
            base, previous, result = self.run_case('rollback_link')
        finally:
            globals()['MOCK'] = source
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('переключение ссылки', result.stderr)
        self.assertEqual((base / 'restarts').read_text(), '1')

    def test_first_deploy_failure(self):
        base, _, result = self.run_case('restart', old=False)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('предыдущего релиза нет', result.stderr)
        self.assertEqual((base / 'restarts').read_text(), '1')

    def test_unsafe_current_rejected(self):
        base, _, result = self.run_case('unsafe_current')
        self.assertNotEqual(result.returncode, 0)
        self.assertFalse((base / 'calls').exists() and 'git clone' in (base / 'calls').read_text())

    def test_first_deploy_success(self):
        base, _, result = self.run_case(old=False)
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertTrue((base / 'current').resolve().is_dir())

    def test_cleanup_failure_is_success(self):
        base, previous, result = self.run_case('prune')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn('очистка релизов', result.stderr)
        self.assertNotEqual((base / 'current').resolve(), previous)
        self.assertEqual((base / 'restarts').read_text(), '1')


if __name__ == '__main__':
    unittest.main(verbosity=2)
