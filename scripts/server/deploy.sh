#!/usr/bin/env bash
set -Eeuo pipefail

BASE="/var/www/wellcar-deploy"
RELEASES="$BASE/releases"
CURRENT="$BASE/current"
REPO="git@github-wellcar:abvgzxn/auto-parts-web-project.git"
TARGET_SHA="${1:-}"
SERVICE="wellcar"

# Only the main tip observed by this clone is deployable (including shallow clones).
if [[ $# != 1 || ! "$TARGET_SHA" =~ ^[0-9a-f]{40}$ ]]; then
  echo "Ошибка: требуется один 40-символьный SHA"
  exit 1
fi

# Refuse symlinked deployment roots and unexpected current targets.
[[ -d "$BASE" && ! -L "$BASE" && -d "$RELEASES" && ! -L "$RELEASES" ]]
[[ "$(realpath -e "$BASE")" == "$BASE" ]]

exec 9>"$BASE/.deploy.lock"
flock -n 9 || {
  echo "Другой деплой уже выполняется"
  exit 1
}

OLD_RELEASE=""
valid_release() {
  local path="$1"
  [[ "${path%/*}" == "$RELEASES" &&
     "${path##*/}" =~ ^[0-9]{8}-[0-9]{6}-[0-9]+$ &&
     -d "$path" && ! -L "$path" &&
     "$(realpath -e "$path")" == "$path" ]]
}
if [[ -L "$CURRENT" ]]; then
  OLD_RELEASE="$(readlink -f "$CURRENT")"
  valid_release "$OLD_RELEASE" || { echo "Небезопасная цель current"; exit 1; }
elif [[ -e "$CURRENT" ]]; then
  echo "current должен быть символической ссылкой"
  exit 1
fi
RELEASE_ID="$(date -u +%Y%m%d-%H%M%S)-$$"
NEW_RELEASE="$RELEASES/$RELEASE_ID"

ACTIVATED=0
COMMITTED=0
TEST_PID=""

cleanup() {
  if [[ -n "$TEST_PID" ]]; then
    kill "$TEST_PID" 2>/dev/null || true
    wait "$TEST_PID" 2>/dev/null || true
  fi
}

fail() {
  local code="$1"
  trap - ERR EXIT
  trap '' INT TERM
  set +e
  cleanup
  if (( ACTIVATED == 1 && COMMITTED == 0 )); then
    if [[ -n "$OLD_RELEASE" ]] && valid_release "$OLD_RELEASE"; then
      echo "Ошибка. Возвращаем предыдущий релиз."
      if ln -s "$OLD_RELEASE" "$BASE/.current-rollback-$$" &&
         mv -Tf "$BASE/.current-rollback-$$" "$CURRENT"; then
        if ! sudo -n /usr/bin/systemctl restart "$SERVICE"; then
          echo "ОШИБКА: перезапуск при откате не удался" >&2
        elif ! check_http 3000; then
          echo "ОШИБКА: HTTP-проверка отката не удалась" >&2
        fi
      else
        echo "ОШИБКА: переключение ссылки при откате не удалось" >&2
      fi
    else
      echo "ОШИБКА: предыдущего релиза нет; требуется вмешательство администратора" >&2
    fi
  fi
  exit "$code"
}

trap 'fail "$?"' ERR
trap 'fail 130' INT
trap 'fail 143' TERM
trap cleanup EXIT

# Run in a subshell with independent traps: pruning must never trigger rollback.
prune_releases() (
  trap - ERR INT TERM EXIT
  set -e
  local active path name count=0
  local -a candidates=() keep=()
  active="$(readlink -f "$CURRENT")"
  valid_release "$active" || return 1
  [[ "$active" == "$NEW_RELEASE" ]] || return 1
  keep+=("$active")
  if [[ -n "$OLD_RELEASE" && "$OLD_RELEASE" != "$active" ]]; then
    valid_release "$OLD_RELEASE" || return 1
    keep+=("$OLD_RELEASE")
  fi
  # Glob order is chronological for the fixed-width timestamp names.
  for path in "$RELEASES"/*; do
    valid_release "$path" || continue
    [[ -d "$path/.git" && ! -L "$path/.git" && -f "$path/package.json" ]] || continue
    candidates+=("$path")
  done
  for (( count=${#candidates[@]}-1; count>=0; count-- )); do
    path="${candidates[count]}"
    for name in "${keep[@]}"; do
      [[ "$path" != "$name" ]] || continue 2
    done
    if (( ${#keep[@]} < 5 )); then
      keep+=("$path")
      continue
    fi
    # Recheck immediately before deletion; never follow a release symlink.
    valid_release "$path" || return 1
    [[ "$(readlink -f "$CURRENT")" == "$active" ]] || return 1
    rm -rf --one-file-system -- "$path" || return 1
  done
)

check_http() {
  local port="$1"

  for attempt in $(seq 1 20); do
    if curl --fail --silent \
      --output /dev/null \
      --max-time 3 \
      "http://127.0.0.1:$port/"; then
      return 0
    fi

    sleep 1
  done

  return 1
}

echo "Создаём релиз: $RELEASE_ID"

git clone --quiet --depth 1 --branch main \
  "$REPO" "$NEW_RELEASE"

cd "$NEW_RELEASE"

MAIN_SHA="$(git rev-parse --verify refs/remotes/origin/main^{commit})"
if [[ "$TARGET_SHA" != "$MAIN_SHA" ]]; then
  echo "Ошибка: разрешён только HEAD origin/main, полученный при clone"
  exit 1
fi
git checkout --quiet --detach "$TARGET_SHA"

echo "Разворачиваем коммит:"
git log -1 --format="%H %s"

npm ci
npm run lint
npm run build

echo "Проверяем новый релиз на порту 3001"

if ss -ltn | grep -q ':3001 '; then
  echo "Ошибка: порт 3001 уже занят"
  exit 1
fi

NODE_ENV=production \
  ./node_modules/.bin/next start \
  --hostname 127.0.0.1 \
  --port 3001 \
  > "$BASE/test-server.log" 2>&1 &

TEST_PID=$!

check_http 3001

cleanup
TEST_PID=""

echo "Переключаем production"

ln -s "$NEW_RELEASE" "$BASE/.current-next-$$"
# Arm rollback before mv: a signal can arrive immediately after atomic rename.
ACTIVATED=1
mv -Tf "$BASE/.current-next-$$" "$CURRENT"

sudo -n /usr/bin/systemctl restart "$SERVICE"

check_http 3000

COMMITTED=1

echo "Деплой завершён успешно"
echo "Активный релиз: $NEW_RELEASE"

if ! ( prune_releases ); then
  echo "ПРЕДУПРЕЖДЕНИЕ: очистка релизов не удалась" >&2
fi
