/**
 * Scans the rendered HTML after `next build` for text that must never reach visitors:
 * [CONFIRM: …] placeholders, "undefined", "NaN" or lorem ipsum. Fails the build if found.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const dirs = [path.join(root, ".next/server/app"), path.join(root, "out")].filter((d) => fs.existsSync(d));
const BAD = [/\[CONFIRM/i, />[^<]*\bundefined\b[^<]*</, />[^<]*\bNaN\b[^<]*</, /lorem ipsum/i];

const problems = [];
let pages = 0;
const walk = (dir) => {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name.endsWith(".html")) {
      pages++;
      // Strip scripts (JSON-LD and RSC payloads are checked through their rendered text instead).
      const html = fs.readFileSync(p, "utf8").replace(/<script[\s\S]*?<\/script>/g, "");
      for (const re of BAD) {
        const m = html.match(re);
        if (m) problems.push(`${path.relative(root, p)}: ${m[0].slice(0, 80)}`);
      }
    }
  }
};
dirs.forEach(walk);
if (problems.length) {
  console.error(`Rendered HTML problems:\n${problems.join("\n")}`);
  process.exit(1);
}
console.log(`postbuild-check: ${pages} HTML files clean (no placeholders, undefined, NaN or lorem ipsum).`);
