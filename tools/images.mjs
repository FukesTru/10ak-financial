#!/usr/bin/env node
// Downloads the images listed in tools/images.json and saves them as compressed WebP files in
// public/images at the listed size. Runs in GitHub Actions (.github/workflows/images.yml), which
// installs sharp just for this step; the website itself has no packages and no build step.
//   node tools/images.mjs          only images that are missing
//   node tools/images.mjs --all    redo every image
import { readFileSync, writeFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'public', 'images');
const MAX_BYTES = 300 * 1024;
const list = JSON.parse(readFileSync(join(ROOT, 'tools', 'images.json'), 'utf8')).images;
const all = process.argv.includes('--all');
mkdirSync(OUT, { recursive: true });

let made = 0;
const failed = [];
for (const img of list) {
  const dest = join(OUT, img.file);
  if (!all && existsSync(dest) && statSync(dest).size > 0) continue;
  if (!/^https:\/\//.test(img.url)) { failed.push(`${img.file} (no source url yet)`); continue; }
  try {
    const res = await fetch(img.url, { signal: AbortSignal.timeout(120000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const src = Buffer.from(await res.arrayBuffer());
    const base = sharp(src).rotate().resize(img.width, img.height, { fit: 'cover', position: sharp.strategy.attention });
    let quality = 74;
    let out = await base.clone().webp({ quality, effort: 6 }).toBuffer();
    while (out.length > MAX_BYTES && quality > 40) {
      quality -= 6;
      out = await base.clone().webp({ quality, effort: 6 }).toBuffer();
    }
    writeFileSync(dest, out);
    made++;
    console.log(`made ${img.file} ${img.width}x${img.height} ${Math.round(out.length / 1024)} KB (q${quality})`);
  } catch (e) {
    failed.push(`${img.file} (${e.message})`);
  }
}
console.log(`\n${made} image(s) written.${failed.length ? ` Not done: ${failed.join(', ')}` : ''}`);
if (failed.length && failed.length === list.length) process.exit(1);
