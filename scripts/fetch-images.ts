/**
 * Downloads the Higgsfield generations listed in scripts/higgsfield-jobs.json into .image-src/.
 *   npm run images:fetch && npm run images
 *
 * Needs network access to the Higgsfield CDN (d8j0ntlcm91z4.cloudfront.net).
 * If a URL has expired, re-open the job in Higgsfield and download it manually to
 * .image-src/IMG-XX.png instead.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(__dirname, "..");
const jobs: Record<string, { job: string; url: string } | string> = JSON.parse(
  fs.readFileSync(path.join(ROOT, "scripts/higgsfield-jobs.json"), "utf8"),
);
const DEST = path.join(ROOT, ".image-src");

async function main() {
  fs.mkdirSync(DEST, { recursive: true });
  const failed: string[] = [];
  for (const [id, entry] of Object.entries(jobs)) {
    if (!id.startsWith("IMG-") || typeof entry === "string") continue;
    const file = path.join(DEST, `${id}.png`);
    if (fs.existsSync(file)) {
      console.log(`- ${id} already downloaded`);
      continue;
    }
    if (!entry.url) {
      failed.push(`${id} (no URL recorded)`);
      continue;
    }
    try {
      const res = await fetch(entry.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
      console.log(`✓ ${id}`);
    } catch (e) {
      failed.push(`${id} (${(e as Error).message})`);
    }
  }
  if (failed.length) {
    console.error(`\nCould not download: ${failed.join(", ")}`);
    process.exit(1);
  }
}

main();
