/**
 * Turns source images into responsive WebP + JPEG files and writes lib/image-manifest.json.
 *   npm run images
 *
 * Sources
 *   .image-src/IMG-XX.(png|jpg|jpeg|webp)       Higgsfield generations (see scripts/fetch-images.ts)
 *   public/client-photos/<name>.(jpg|jpeg|png|webp)  client-supplied photos (4:5 crops)
 *
 * Output (public/images)
 *   <file>-<w>.(webp|jpg)        native aspect: 16:9 → 640/1280/1920/2560, 4:3 → 480/800/1200/1600
 *   <file>-card-<w>.(webp|jpg)   4:3 crop of 16:9 heroes for service cards
 *   og/<file>.jpg                1200×630 social image
 *   client/<name>-<w>.(webp|jpg) 4:5 client photos
 */
import fs from "node:fs";
import path from "node:path";
import sharp, { type Sharp } from "sharp";
import { images, WIDTHS, type ImageId } from "@/lib/images";
import type { ClientPhotoEntry, ManifestEntry } from "@/lib/image-manifest";

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, ".image-src");
const OUT = path.join(ROOT, "public/images");
const CLIENT_SRC = path.join(ROOT, "public/client-photos");
const EXTS = [".png", ".jpg", ".jpeg", ".webp"];
const CLIENT_WIDTHS = [480, 800, 1200, 1600];

const hex = (n: number) => Math.round(n).toString(16).padStart(2, "0");

async function averageColor(input: Sharp): Promise<string> {
  const { dominant } = await input.clone().stats();
  return `#${hex(dominant.r)}${hex(dominant.g)}${hex(dominant.b)}`;
}

function findSource(dir: string, base: string): string | null {
  for (const ext of EXTS) {
    const p = path.join(dir, `${base}${ext}`);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function writePair(img: Sharp, w: number, h: number, outBase: string) {
  const resized = img.clone().resize(w, h, { fit: "cover", position: sharp.strategy.attention });
  await resized.clone().webp({ quality: 72, effort: 5 }).toFile(`${outBase}.webp`);
  await resized.clone().jpeg({ quality: 78, progressive: true, mozjpeg: true }).toFile(`${outBase}.jpg`);
}

async function processGenerated(): Promise<Record<string, ManifestEntry>> {
  const out: Record<string, ManifestEntry> = {};
  fs.mkdirSync(path.join(OUT, "og"), { recursive: true });
  for (const id of Object.keys(images) as ImageId[]) {
    const meta = images[id];
    const src = findSource(SRC, id);
    if (!src) continue;
    const img = sharp(src).rotate();
    const { width = 0, height = 0 } = await img.metadata();
    const wide = meta.aspect === "16:9";
    const ratio = wide ? 9 / 16 : 3 / 4;
    const widths = (wide ? WIDTHS.wide : WIDTHS.card).filter((w) => w <= width);
    for (const w of widths) await writePair(img, w, Math.round(w * ratio), path.join(OUT, `${meta.file}-${w}`));
    let cardWidths: number[] | undefined;
    if (wide) {
      cardWidths = WIDTHS.card.filter((w) => w <= Math.round((height * 4) / 3));
      for (const w of cardWidths) await writePair(img, w, Math.round((w * 3) / 4), path.join(OUT, `${meta.file}-card-${w}`));
    }
    await img
      .clone()
      .resize(1200, 630, { fit: "cover", position: sharp.strategy.attention })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(OUT, "og", `${meta.file}.jpg`));
    out[id] = {
      file: meta.file,
      widths,
      width: widths[widths.length - 1],
      height: Math.round(widths[widths.length - 1] * ratio),
      cardWidths,
      og: true,
      color: await averageColor(img),
    };
    console.log(`✓ ${id} ${meta.file} (${width}×${height})`);
  }
  return out;
}

async function processClientPhotos(): Promise<Record<string, ClientPhotoEntry>> {
  const out: Record<string, ClientPhotoEntry> = {};
  if (!fs.existsSync(CLIENT_SRC)) return out;
  const dest = path.join(OUT, "client");
  fs.mkdirSync(dest, { recursive: true });
  for (const f of fs.readdirSync(CLIENT_SRC)) {
    const ext = path.extname(f).toLowerCase();
    if (!EXTS.includes(ext)) continue;
    const name = path.basename(f, path.extname(f)).toLowerCase().replace(/[^a-z0-9-]+/g, "-");
    const img = sharp(path.join(CLIENT_SRC, f)).rotate();
    const { width = 0, height = 0 } = await img.metadata();
    const maxW = Math.min(width, Math.round((height * 4) / 5));
    const widths = CLIENT_WIDTHS.filter((w) => w <= maxW);
    if (!widths.length) widths.push(maxW);
    for (const w of widths) await writePair(img, w, Math.round((w * 5) / 4), path.join(dest, `${name}-${w}`));
    out[name] = { widths, color: await averageColor(img) };
    console.log(`✓ client photo ${name}`);
  }
  return out;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const manifest = { images: await processGenerated(), clientPhotos: await processClientPhotos() };
  fs.writeFileSync(path.join(ROOT, "lib/image-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  const missing = (Object.keys(images) as ImageId[]).filter((id) => !manifest.images[id]);
  console.log(`\n${Object.keys(manifest.images).length} generated images processed; ${missing.length} still placeholders${missing.length ? `: ${missing.join(", ")}` : ""}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
