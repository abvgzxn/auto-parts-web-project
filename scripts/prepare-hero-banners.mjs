// Run from the repository root. Customer PNG files are read only.
import sharp from 'sharp';
import fs from 'node:fs/promises';
const sourceDir = '/home/abvgzxn/wellcar-photo-sources';
const reviewDir = '/tmp/wellcar-banner-review';
const banners = [
  { id: 'batteries', file: '51d81afe-289d-4078-8eb4-94751a605825.png', crop: { left: 615, top: 430, width: 772, height: 600 } },
  { id: 'wiper-blades', file: 'ce5c47ea-0e23-4592-b467-982a07e18f6e.png', crop: { left: 850, top: 40, width: 537, height: 1094 } },
  { id: 'bulk-motor-oil', file: 'bd29fb4c-92f6-4a84-bedb-996cf8aabf7f.png', crop: { left: 850, top: 270, width: 537, height: 790 } },
  { id: 'winter-fluid', file: '476cbeca-efd5-4f4d-9c6d-80dc1bc72120.png', crop: { left: 755, top: 70, width: 515, height: 1000 } },
];
await fs.mkdir(reviewDir, { recursive: true });
const report = [];
for (const banner of banners) {
  const source = `${sourceDir}/${banner.file}`;
  const desktop = `public/images/hero/${banner.id}-banner.webp`;
  const mobile = `public/images/hero/${banner.id}-mobile.webp`;
  // Preserve every pixel of the finished desktop design. Never upscale crops.
  await sharp(source).webp({ quality: 90, effort: 6 }).toFile(desktop);
  await sharp(source).extract(banner.crop).resize({ width: 850, withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 }).toFile(mobile);
  const sizes = {};
  for (const [kind, file] of Object.entries({ source, desktop, mobile })) {
    const { width, height } = await sharp(file).metadata();
    sizes[kind] = { file, width, height, bytes: (await fs.stat(file)).size };
  }
  report.push({ id: banner.id, crop: banner.crop, ...sizes });
}
await fs.writeFile(`${reviewDir}/image-sizes.json`, JSON.stringify(report, null, 2) + '\n');
