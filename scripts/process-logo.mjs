/**
 * Logo: kenardan flood-fill ile beyaz arka planı şeffaflaştırır (içteki beyaz konturlara dokunmaz).
 * Kullanım: node scripts/process-logo.mjs [kaynak.png]
 */
import { existsSync } from "node:fs";
import sharp from "sharp";

const SOURCE = process.argv[2] ?? "public/logo/source.png";

const output = "public/logo/mcd-logo-transparent.png";

function isBackgroundPixel(r, g, b, a) {
  if (a < 8) return true;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  if (max - min > 30) return false;
  return min >= 232;
}

function floodRemoveBackground(data, width, height) {
  const visited = new Uint8Array(width * height);
  const queue = [];

  const pixelIndex = (x, y) => y * width + x;
  const offset = (x, y) => pixelIndex(x, y) * 4;

  const enqueue = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = pixelIndex(x, y);
    if (visited[p]) return;
    const i = offset(x, y);
    if (!isBackgroundPixel(data[i], data[i + 1], data[i + 2], data[i + 3])) return;
    visited[p] = 1;
    queue.push(p);
  };

  for (let x = 0; x < width; x++) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  while (queue.length > 0) {
    const p = queue.shift();
    const x = p % width;
    const y = (p - x) / width;
    const i = offset(x, y);
    data[i + 3] = 0;

    enqueue(x + 1, y);
    enqueue(x - 1, y);
    enqueue(x, y + 1);
    enqueue(x, y - 1);
  }
}

if (!existsSync(SOURCE)) {
  console.error("Kaynak logo bulunamadı:", SOURCE);
  process.exit(1);
}

const { data, info } = await sharp(SOURCE)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

floodRemoveBackground(data, info.width, info.height);

const transparent = await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toBuffer();

const trimmed = await sharp(transparent).trim({ threshold: 1 }).png().toBuffer();
const meta = await sharp(trimmed).metadata();

await sharp(trimmed).toFile(output);

console.log(`Logo: ${meta.width}×${meta.height}, alpha=${meta.hasAlpha} → ${output}`);
