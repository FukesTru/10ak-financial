/**
 * Builds the 1Oak logo system from code so it stays crisp and editable.
 *   node scripts/build-brand.mjs
 *
 * Outputs
 *   public/brand/1oak-logo-{horizontal,stacked,icon}[-white].svg  (text converted to outlines)
 *   public/brand/*.png                                             (PNG exports of the above)
 *   app/icon.svg, app/apple-icon.png, public/favicon.ico           (favicons)
 *   public/og/default.jpg                                          (fallback social image)
 *   components/brand/logo-data.ts                                  (path data for the inline <Logo />)
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const opentype = require("opentype.js");
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

const C = {
  midnight: "#0A1633",
  navy: "#12244F",
  burgundy: "#7B1E2F",
  champagne: "#C9A96E",
  white: "#FFFFFF",
};

const loadFont = (p) => {
  const buf = fs.readFileSync(path.join(ROOT, "node_modules", p));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};
const serif = loadFont("@fontsource/playfair-display/files/playfair-display-latin-600-normal.woff");
const sans = loadFont("@fontsource/inter/files/inter-latin-600-normal.woff");

const r = (n) => Math.round(n * 100) / 100;

const LINING_ONE = (() => {
  for (let i = 0; i < serif.glyphs.length; i++) if (serif.glyphs.get(i).name === "one.lf") return serif.glyphs.get(i);
  return null;
})();

/* ---------------------------------------------------------------- */
/* Oak-leaf mark (32 × 32 grid). Right half is drawn, left mirrored. */
/* ---------------------------------------------------------------- */
const TIP = [16, 2.2];
// Cubic segments [c1, c2, end] for the right edge, tip → base.
// Four lobes per side, widest in the upper-middle like a valley oak leaf.
const RIGHT = [
  [[17.9, 2.4], [19.9, 3.9], [19.7, 6.2]],
  [[19.6, 7.2], [18.9, 7.6], [18.4, 8.0]],
  [[20.8, 7.7], [23.1, 8.8], [22.7, 11.0]],
  [[22.5, 12.2], [20.9, 12.6], [19.9, 12.9]],
  [[22.6, 12.9], [24.9, 14.4], [24.2, 16.7]],
  [[23.8, 18.0], [21.8, 18.3], [20.4, 18.6]],
  [[22.3, 19.3], [23.0, 21.0], [21.7, 22.4]],
  [[20.4, 23.8], [18.2, 24.4], [16, 24.6]],
];
const mx = ([x, y]) => [32 - x, y];

function leafOutline() {
  let d = `M${TIP[0]} ${TIP[1]}`;
  for (const [c1, c2, e] of RIGHT) d += `C${c1.join(" ")} ${c2.join(" ")} ${e.join(" ")}`;
  // Walk the mirrored left edge from base back to the tip.
  const pts = [TIP, ...RIGHT.map((s) => s[2])];
  for (let i = RIGHT.length - 1; i >= 0; i--) {
    const [c1, c2] = RIGHT[i];
    const start = pts[i];
    d += `C${mx(c2).join(" ")} ${mx(c1).join(" ")} ${mx(start).join(" ")}`;
  }
  return d + "Z";
}
const LEAF = leafOutline();
const MIDRIB = "M16 5.4V29.6";
const VEINS = "M16 12.4L20.4 10.6M16 12.4L11.6 10.6M16 18.2L21.6 16.4M16 18.2L10.4 16.4";

function markSvg({ x = 0, y = 0, size = 32, stroke, strokeWidth = 1.7 }) {
  const s = size / 32;
  return `<g transform="translate(${r(x)} ${r(y)}) scale(${r(s * 1000) / 1000})" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="${LEAF}"/><path d="${MIDRIB}"/><path d="${VEINS}" stroke-width="${r(strokeWidth * 0.75)}"/></g>`;
}

/* ---------------------------------------------------------------- */
/* Text to outlines                                                  */
/* ---------------------------------------------------------------- */
const f2 = (n) => (Math.round(n * 100) / 100).toString();
/** Serialize opentype path commands ourselves (library output can contain NaN). */
function toD(commands) {
  return commands
    .map((c) => {
      if (c.type === "M" || c.type === "L") return `${c.type}${f2(c.x)} ${f2(c.y)}`;
      if (c.type === "Q") return `Q${f2(c.x1)} ${f2(c.y1)} ${f2(c.x)} ${f2(c.y)}`;
      if (c.type === "C") return `C${f2(c.x1)} ${f2(c.y1)} ${f2(c.x2)} ${f2(c.y2)} ${f2(c.x)} ${f2(c.y)}`;
      return "Z";
    })
    .join("");
}
function textPath(font, text, x, y, size, tracking = 0) {
  const scale = size / font.unitsPerEm;
  // Use Playfair's lining "1" (one.lf) so the numeral sits at full cap height.
  const glyphs = [...text].map((ch) => (font === serif && ch === "1" && LINING_ONE ? LINING_ONE : font.charToGlyph(ch)));
  let cursor = x;
  const parts = [];
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  glyphs.forEach((g, i) => {
    const p = g.getPath(cursor, y, size);
    const bb = p.getBoundingBox();
    if (bb.x1 < minX) minX = bb.x1;
    if (bb.y1 < minY) minY = bb.y1;
    if (bb.x2 > maxX) maxX = bb.x2;
    if (bb.y2 > maxY) maxY = bb.y2;
    parts.push(toD(p.commands));
    let adv = g.advanceWidth * scale;
    if (i < glyphs.length - 1) adv += font.getKerningValue(g, glyphs[i + 1]) * scale;
    cursor += adv + tracking;
  });
  return { d: parts.join(""), width: cursor - tracking - x, bbox: { minX, minY, maxX, maxY } };
}

const WORD = "1Oak";
const TAG = "FINANCIAL GROUP";

/* Horizontal lockup ------------------------------------------------ */
function horizontal(theme) {
  const word = textPath(serif, WORD, 0, 0, 44);
  const tagSize = 9.6;
  const tag = textPath(sans, TAG, 0, 0, tagSize, tagSize * 0.3);
  const wordH = -word.bbox.minY; // cap height above baseline
  const gapY = 9;
  const tagH = -tag.bbox.minY;
  const blockH = wordH + gapY + tagH;
  const markSize = blockH + 8;
  const textX = markSize + 12;
  const pad = 2;
  const width = textX + Math.max(word.bbox.maxX, tag.width) + pad;
  const height = markSize + pad * 2;
  const top = (height - blockH) / 2;
  const wordY = top + wordH;
  const tagY = wordY + gapY + tagH;
  const W = textPath(serif, WORD, textX, wordY, 44);
  const T = textPath(sans, TAG, textX + 1, tagY, tagSize, tagSize * 0.3);
  const col = theme === "white" ? { mark: C.champagne, word: C.white, tag: C.champagne } : { mark: C.burgundy, word: C.midnight, tag: C.burgundy };
  return {
    width: r(width),
    height: r(height),
    mark: { x: 0, y: pad, size: markSize },
    word: W.d,
    tag: T.d,
    svg: wrap(width, height, `${markSvg({ x: 0, y: pad, size: markSize, stroke: col.mark })}<path fill="${col.word}" d="${W.d}"/><path fill="${col.tag}" d="${T.d}"/>`),
  };
}

/* Stacked lockup --------------------------------------------------- */
function stacked(theme) {
  const word0 = textPath(serif, WORD, 0, 0, 52);
  const tagSize = 10.4;
  const tag0 = textPath(sans, TAG, 0, 0, tagSize, tagSize * 0.32);
  const width = Math.max(word0.bbox.maxX - word0.bbox.minX, tag0.width) + 8;
  const markSize = 64;
  const markY = 2;
  const wordH = -word0.bbox.minY;
  const wordY = markY + markSize + 6 + wordH;
  const tagY = wordY + 12 + -tag0.bbox.minY;
  const height = tagY + 4;
  const W = textPath(serif, WORD, (width - (word0.bbox.maxX - word0.bbox.minX)) / 2 - word0.bbox.minX, wordY, 52);
  const T = textPath(sans, TAG, (width - tag0.width) / 2, tagY, tagSize, tagSize * 0.32);
  const col = theme === "white" ? { mark: C.champagne, word: C.white, tag: C.champagne } : { mark: C.burgundy, word: C.midnight, tag: C.burgundy };
  return wrap(width, height, `${markSvg({ x: (width - markSize) / 2, y: markY, size: markSize, stroke: col.mark, strokeWidth: 1.5 })}<path fill="${col.word}" d="${W.d}"/><path fill="${col.tag}" d="${T.d}"/>`);
}

function icon(theme) {
  return wrap(32, 32, markSvg({ size: 32, stroke: theme === "white" ? C.champagne : C.burgundy }));
}

/** Favicon: champagne leaf on a midnight rounded square (reads on light and dark tabs). */
function favicon() {
  return wrap(32, 32, `<rect width="32" height="32" rx="7" fill="${C.midnight}"/>${markSvg({ x: 3, y: 3, size: 26, stroke: C.champagne, strokeWidth: 2.1 })}`);
}

function wrap(w, h, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(w)} ${r(h)}" width="${r(w)}" height="${r(h)}" role="img" aria-label="1Oak Financial Group">${inner}</svg>\n`;
}

/** Minimal ICO container holding PNG payloads (supported by all modern browsers). */
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, buf } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += buf.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]);
}

async function main() {
  const out = path.join(ROOT, "public/brand");
  fs.mkdirSync(out, { recursive: true });
  fs.mkdirSync(path.join(ROOT, "public/og"), { recursive: true });
  fs.mkdirSync(path.join(ROOT, "components/brand"), { recursive: true });

  const hColor = horizontal("color");
  const hWhite = horizontal("white");
  const files = {
    "1oak-logo-horizontal.svg": hColor.svg,
    "1oak-logo-horizontal-white.svg": hWhite.svg,
    "1oak-logo-stacked.svg": stacked("color"),
    "1oak-logo-stacked-white.svg": stacked("white"),
    "1oak-logo-icon.svg": icon("color"),
    "1oak-logo-icon-white.svg": icon("white"),
  };
  for (const [name, svg] of Object.entries(files)) {
    fs.writeFileSync(path.join(out, name), svg);
    const isWhite = name.includes("white");
    const png = await sharp(Buffer.from(svg), { density: 600 })
      .resize({ width: name.includes("icon") ? 512 : 1200 })
      .png()
      .toBuffer();
    fs.writeFileSync(path.join(out, name.replace(".svg", ".png")), png);
    // Preview of white versions on midnight, for review only.
    if (isWhite) {
      const meta = await sharp(png).metadata();
      await sharp({ create: { width: meta.width + 80, height: meta.height + 80, channels: 4, background: C.midnight } })
        .composite([{ input: png, top: 40, left: 40 }])
        .png()
        .toFile(path.join(out, name.replace(".svg", "-preview-on-dark.png")));
    }
  }

  const fav = favicon();
  fs.writeFileSync(path.join(ROOT, "app/icon.svg"), fav);
  const png16 = await sharp(Buffer.from(fav), { density: 300 }).resize(16, 16).png().toBuffer();
  const png32 = await sharp(Buffer.from(fav), { density: 300 }).resize(32, 32).png().toBuffer();
  const png48 = await sharp(Buffer.from(fav), { density: 300 }).resize(48, 48).png().toBuffer();
  fs.writeFileSync(path.join(ROOT, "public/favicon.ico"), ico([{ size: 16, buf: png16 }, { size: 32, buf: png32 }, { size: 48, buf: png48 }]));
  const apple = wrap(180, 180, `<rect width="180" height="180" fill="${C.midnight}"/>${markSvg({ x: 30, y: 28, size: 120, stroke: C.champagne, strokeWidth: 1.6 })}`);
  await sharp(Buffer.from(apple), { density: 300 }).resize(180, 180).png().toFile(path.join(ROOT, "app/apple-icon.png"));

  // Default social image: white stacked logo centered on midnight with a champagne rule.
  const stackedWhite = stacked("white");
  const logoPng = await sharp(Buffer.from(stackedWhite), { density: 600 }).resize({ height: 300 }).png().toBuffer();
  const lm = await sharp(logoPng).metadata();
  const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><radialGradient id="g" cx="70%" cy="20%" r="90%"><stop offset="0" stop-color="${C.navy}"/><stop offset="1" stop-color="${C.midnight}"/></radialGradient></defs><rect width="1200" height="630" fill="url(#g)"/><rect x="560" y="520" width="80" height="2" fill="${C.champagne}"/></svg>`;
  await sharp(Buffer.from(bg))
    .composite([{ input: logoPng, top: Math.round((560 - lm.height) / 2), left: Math.round((1200 - lm.width) / 2) }])
    .jpeg({ quality: 88 })
    .toFile(path.join(ROOT, "public/og/default.jpg"));

  // Path data for the inline React logo (keeps the header free of font loading).
  const data = `// Generated by scripts/build-brand.mjs — do not edit by hand.
export const LOGO_HORIZONTAL = {
  width: ${hColor.width},
  height: ${hColor.height},
  mark: ${JSON.stringify(hColor.mark)},
  word: ${JSON.stringify(hColor.word)},
  tag: ${JSON.stringify(hColor.tag)},
};

export const LEAF_PATHS = {
  outline: ${JSON.stringify(LEAF)},
  midrib: ${JSON.stringify(MIDRIB)},
  veins: ${JSON.stringify(VEINS)},
};
`;
  fs.writeFileSync(path.join(ROOT, "components/brand/logo-data.ts"), data);
  console.log("Brand assets written.");
}

main();
