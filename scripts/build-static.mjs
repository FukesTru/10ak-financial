/**
 * Pure static export to /out (for hosts without serverless functions).
 *   NEXT_PUBLIC_LEAD_ENDPOINT=https://your-function-url npm run build:static
 *
 * The /api/lead route can't be exported, so it is set aside for the build and restored after.
 * Point NEXT_PUBLIC_LEAD_ENDPOINT at any endpoint that runs lib/lead.ts (or a form service).
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const api = path.join(root, "app/api");
const parked = path.join(root, ".api-parked");

if (!process.env.NEXT_PUBLIC_LEAD_ENDPOINT) {
  console.warn("⚠ NEXT_PUBLIC_LEAD_ENDPOINT is not set — the exported form will post to /api/lead, which a static host won't serve.");
}

fs.renameSync(api, parked);
let status = 1;
try {
  const r = spawnSync("npx", ["next", "build"], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, STATIC_EXPORT: "true" },
  });
  status = r.status ?? 1;
} finally {
  fs.renameSync(parked, api);
}
process.exit(status);
