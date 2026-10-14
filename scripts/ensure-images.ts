/**
 * Runs before every build (see `prebuild`). On Vercel (VERCEL=1) or when FETCH_IMAGES=1 it makes
 * sure the Higgsfield images are downloaded and processed into public/images, so deployments
 * show the real photography even though the processed files are not committed.
 *
 * - Processed output is cached in .next/cache/1oak-images (Vercel keeps .next/cache between builds),
 *   keyed by the job list, the processing script and the client photos, so later builds just copy it.
 * - It never fails the build: if the CDN can't be reached, the pages keep their labeled placeholders
 *   and PRELAUNCH_CHECKLIST.md lists what is missing.
 * - Locally (no VERCEL / FETCH_IMAGES) it does nothing; use `npm run images:fetch && npm run images`.
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fetchImages, readJobs } from "./fetch-images";
import { processImages } from "./process-images";

const ROOT = path.resolve(__dirname, "..");
const CACHE_ROOT = path.join(ROOT, ".next/cache/1oak-images");
const PUBLIC_IMAGES = path.join(ROOT, "public/images");
const MANIFEST = path.join(ROOT, "lib/image-manifest.json");
const CLIENT_PHOTOS = path.join(ROOT, "public/client-photos");

function cacheKey(): string {
  const h = crypto.createHash("sha256");
  for (const f of ["scripts/higgsfield-jobs.json", "scripts/process-images.ts", "lib/images.ts"]) {
    h.update(fs.readFileSync(path.join(ROOT, f)));
  }
  if (fs.existsSync(CLIENT_PHOTOS)) {
    for (const f of fs.readdirSync(CLIENT_PHOTOS).sort()) h.update(`${f}:${fs.statSync(path.join(CLIENT_PHOTOS, f)).size}`);
  }
  return h.digest("hex").slice(0, 16);
}

function processedCount(): number {
  try {
    return Object.keys(JSON.parse(fs.readFileSync(MANIFEST, "utf8")).images ?? {}).length;
  } catch {
    return 0;
  }
}

async function main() {
  if (process.env.VERCEL !== "1" && process.env.FETCH_IMAGES !== "1") {
    console.log("ensure-images: skipped (set FETCH_IMAGES=1 to download Higgsfield images during the build).");
    return;
  }
  const total = Object.keys(readJobs()).length;
  if (processedCount() >= total) {
    console.log("ensure-images: all images already processed.");
    return;
  }

  const cacheDir = path.join(CACHE_ROOT, cacheKey());
  if (fs.existsSync(path.join(cacheDir, "image-manifest.json"))) {
    fs.cpSync(path.join(cacheDir, "images"), PUBLIC_IMAGES, { recursive: true });
    fs.copyFileSync(path.join(cacheDir, "image-manifest.json"), MANIFEST);
    console.log(`ensure-images: restored ${processedCount()} processed images from the build cache.`);
    return;
  }

  // Keep downloaded originals in the build cache too, so a partial failure doesn't re-download everything.
  const sourceCache = path.join(CACHE_ROOT, "src");
  const failed = await fetchImages(sourceCache);
  fs.mkdirSync(path.join(ROOT, ".image-src"), { recursive: true });
  for (const f of fs.readdirSync(sourceCache)) {
    if (f.endsWith(".png")) fs.copyFileSync(path.join(sourceCache, f), path.join(ROOT, ".image-src", f));
  }
  const missing = await processImages();
  if (!failed.length && !missing.length) {
    fs.rmSync(CACHE_ROOT, { recursive: true, force: true, maxRetries: 2 });
    fs.mkdirSync(cacheDir, { recursive: true });
    fs.cpSync(PUBLIC_IMAGES, path.join(cacheDir, "images"), { recursive: true });
    fs.copyFileSync(MANIFEST, path.join(cacheDir, "image-manifest.json"));
    // Originals are no longer needed once the processed set is cached.
    console.log(`ensure-images: processed and cached all ${total} images.`);
  } else {
    console.warn(`ensure-images: ${missing.length} image(s) still placeholders; the build continues.`);
  }
}

main().catch((e) => {
  console.warn("ensure-images: skipped after an error; pages keep their placeholders.", e);
});
