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
export const SOURCE_DIR = path.join(ROOT, ".image-src");

type Job = { job: string; url: string };

export function readJobs(): Record<string, Job> {
  const raw: Record<string, Job | string> = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts/higgsfield-jobs.json"), "utf8"));
  return Object.fromEntries(Object.entries(raw).filter((e): e is [string, Job] => e[0].startsWith("IMG-") && typeof e[1] !== "string"));
}

async function download(url: string, file: string) {
  const res = await fetch(url, { signal: AbortSignal.timeout(90_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const tmp = `${file}.part`;
  fs.writeFileSync(tmp, Buffer.from(await res.arrayBuffer()));
  fs.renameSync(tmp, file);
}

/** Downloads every missing source image (4 at a time). Returns the IDs that failed. */
export async function fetchImages(dest = SOURCE_DIR): Promise<string[]> {
  fs.mkdirSync(dest, { recursive: true });
  const queue = Object.entries(readJobs()).filter(([id]) => !fs.existsSync(path.join(dest, `${id}.png`)));
  const failed: string[] = [];
  const worker = async () => {
    for (let item = queue.shift(); item; item = queue.shift()) {
      const [id, { url }] = item;
      if (!url) {
        failed.push(`${id} (no URL recorded)`);
        continue;
      }
      try {
        await download(url, path.join(dest, `${id}.png`));
        console.log(`✓ ${id}`);
      } catch (e) {
        failed.push(`${id} (${(e as Error & { cause?: { code?: string } }).cause?.code ?? (e as Error).message})`);
      }
    }
  };
  await Promise.all([worker(), worker(), worker(), worker()]);
  if (failed.length) console.error(`Could not download: ${failed.join(", ")}`);
  return failed;
}

if (require.main === module) {
  fetchImages().then((failed) => process.exit(failed.length ? 1 : 0));
}
