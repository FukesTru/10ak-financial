/**
 * Content QA for service pages and service-area blocks.
 *   npx tsx scripts/content-audit.ts            audit everything that exists
 *   npx tsx scripts/content-audit.ts annuities  audit one service (cross-page duplicate check still runs)
 *
 * Errors exit with code 1. Warnings are printed for review.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { serviceSlugs, type ServiceSlug } from "@/config/services";
import { extraServices } from "@/config/extra-services";
import type { CityBlock, ServiceContent } from "@/content/types";

const ROOT = path.resolve(__dirname, "..");

export const REQUIRED: Record<ServiceSlug, { h1: string; faqs: [string, string, string] }> = {
  "tax-planning": {
    h1: "Proactive Tax Planning for Business Owners and High Earners in Los Angeles",
    faqs: [
      "When should I start planning for next year?",
      "How is tax planning different from tax preparation?",
      "Do I need to be a business owner to benefit?",
    ],
  },
  "tax-return-filing": {
    h1: "Tax Return Filing for Individuals, Business Owners and Investors in Monrovia",
    faqs: [
      "What documents do I need?",
      "Can you file late or prior-year returns?",
      "What if I receive an IRS notice?",
    ],
  },
  annuities: {
    h1: "Annuity Rollovers and Guaranteed Retirement Income Planning in California",
    faqs: [
      "Is an annuity right for me?",
      "How does an IRA or 401(k) rollover into an annuity work?",
      "What are surrender charges?",
    ],
  },
  "life-insurance": {
    h1: "Life Insurance Planning for Families and Business Owners in Los Angeles",
    faqs: [
      "How much coverage do I need?",
      "Term or permanent—what's the difference?",
      "Can I review a policy I already own?",
    ],
  },
  "mortgage-loans": {
    h1: "Mortgage Loans for Homebuyers, Refinancers and Investors in Monrovia",
    faqs: [
      "What credit and income do I need?",
      "When does a refinance make sense?",
      "Can self-employed borrowers qualify?",
    ],
  },
  "tax-free-investment": {
    h1: "Tax-Free and Tax-Efficient Investment Strategies in California",
    faqs: [
      'What does "tax-free" actually mean?',
      "Are Roth conversions worth it for me?",
      "What are the risks?",
    ],
  },
  "accounting-bookkeeping": {
    h1: "Accounting and Bookkeeping Services for Los Angeles Business Owners",
    faqs: [
      "Can you fix books that are behind?",
      "What software do you use?",
      "How often will I get financial statements?",
    ],
  },
  "cfo-advisory": {
    h1: "Outsourced CFO Advisory Services for Growing Businesses",
    faqs: [
      "What does a fractional CFO do?",
      "How is this different from my bookkeeper?",
      "What size business is this for?",
    ],
  },
  "cost-segregation-study": {
    h1: "Cost Segregation Studies for Commercial and Rental Property Owners",
    faqs: [
      "Which properties qualify?",
      "Can I do a study on a property I've owned for years?",
      "What is depreciation recapture?",
    ],
  },
  "pension-cash-balance-plans": {
    h1: "Pension and Cash Balance Plans for Business Owners and Professionals",
    faqs: [
      "Who is a good fit for a cash balance plan?",
      "How much can I contribute?",
      "What are the ongoing requirements?",
    ],
  },
  "financial-ratio-analysis": {
    h1: "Advanced Financial Ratio Analysis to Strengthen Your Business and Personal Balance Sheet",
    faqs: [
      "Which ratios matter most for my business?",
      "How often should ratios be reviewed?",
      "Will this help me qualify for financing?",
    ],
  },
  "strategic-risk-management": {
    h1: "Strategic Risk Management for Business Owners and Families",
    faqs: [
      "What risks do business owners overlook?",
      "How is risk management different from buying insurance?",
      "How often should coverage be reviewed?",
    ],
  },
  "accelerated-mortgage-payoff": {
    h1: "Accelerated Mortgage Payoff Strategies for California Homeowners",
    faqs: [
      "Is paying off my mortgage early a good idea?",
      "How much interest could I save?",
      "What if my rate is already low?",
    ],
  },
  "college-planning": {
    h1: "College Planning and Education Funding for Families in Los Angeles",
    faqs: [
      "How early should I start saving?",
      "How does my income affect financial aid?",
      "What if my child doesn't go to college?",
    ],
  },
};

export const ROUTES = new Set<string>([
  "/",
  "/about",
  "/services",
  "/service-areas",
  "/contact",
  "/privacy-disclosures",
  ...serviceSlugs.map((s) => `/services/${s}`),
]);

type Issue = { level: "error" | "warn"; where: string; msg: string };
const issues: Issue[] = [];
const err = (where: string, msg: string) => issues.push({ level: "error", where, msg });
const warn = (where: string, msg: string) => issues.push({ level: "warn", where, msg });

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
const words = (s: string) => stripMarkup(s).split(/\s+/).filter(Boolean).length;
export function stripMarkup(s: string): string {
  return s.replace(LINK_RE, "$1").replace(/\*\*/g, "");
}
const norm = (s: string) =>
  stripMarkup(s)
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function checkMarkup(where: string, text: string) {
  if (/\[CONFIRM/i.test(text)) err(where, "contains a [CONFIRM: …] placeholder");
  if (/<[a-z/]/i.test(text)) err(where, "contains HTML");
  if ((text.match(/\*\*/g) ?? []).length % 2 !== 0) err(where, "unbalanced ** bold markup");
  for (const m of text.matchAll(LINK_RE)) {
    const href = m[2].split("#")[0];
    if (!href.startsWith("/")) err(where, `link must be internal: ${m[2]}`);
    else if (!ROUTES.has(href)) err(where, `link target does not exist: ${m[2]}`);
  }
  const stripped = stripMarkup(text);
  if (/[\[\]]/.test(stripped)) err(where, "stray [ ] brackets (broken link markup?)");
  if (/\bguarantee/i.test(stripped))
    warn(where, `mentions "guarantee" — make sure nothing is promised: "${excerpt(stripped, /guarantee/i)}"`);
  if (/save up to|up to \d+%|risk[- ]free|no[- ]risk|best in|#1|number one|award/i.test(stripped))
    err(where, `hype / prohibited claim: "${excerpt(stripped, /save up to|up to \d+%|risk[- ]free|no[- ]risk|best in|#1|number one|award/i)}"`);
  if (/\b(we|our team) (will|can) (save|reduce|lower|eliminate)/i.test(stripped))
    warn(where, `outcome language — prefer "may/can typically": "${excerpt(stripped, /\b(we|our team) (will|can) (save|reduce|lower|eliminate)/i)}"`);
  if (/\b(I|Theo) (worked|was) at\b/.test(stripped)) err(where, "possible prior-employer mention");
}

function excerpt(s: string, re: RegExp) {
  const i = s.search(re);
  return s.slice(Math.max(0, i - 40), i + 60).trim();
}

function sentences(text: string): string[] {
  return stripMarkup(text)
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 7);
}

/** Collect every rich-text string with a location label. */
function collect(c: ServiceContent): { where: string; text: string; body: boolean }[] {
  const out: { where: string; text: string; body: boolean }[] = [];
  const add = (where: string, text: string, body = true) => out.push({ where, text, body });
  add("hero.subhead", c.hero.subhead, false);
  c.intro.paragraphs.forEach((p, i) => add(`intro.p${i}`, p));
  if (c.included.lead) add("included.lead", c.included.lead);
  c.included.items.forEach((it, i) => add(`included.${i}`, `${it.title}. ${it.text}`));
  c.bestFor.profiles.forEach((it, i) => add(`bestFor.${i}`, `${it.title}. ${it.text}`));
  c.process.steps.forEach((it, i) => add(`process.${i}`, `${it.title}. ${it.text}`));
  add("goodToKnow", c.goodToKnow.text);
  c.extras?.forEach((x, i) => {
    if (x.type === "prose" || x.type === "example") x.paragraphs.forEach((p, j) => add(`extras.${i}.p${j}`, p));
    if (x.type === "list") {
      if (x.lead) add(`extras.${i}.lead`, x.lead);
      x.items.forEach((it, j) => add(`extras.${i}.${j}`, `${it.title}. ${it.text}`));
    }
    if (x.type === "example" && x.footnote) add(`extras.${i}.footnote`, x.footnote);
  });
  c.heldBack?.forEach((h, i) => add(`heldBack.${i}`, h.text, false));
  c.conditional?.forEach((h, i) => add(`conditional.${i}`, h.text, false));
  c.faqs.forEach((f, i) => {
    add(`faq.${i}`, f.a);
    if (f.append) add(`faq.${i}.append`, f.append.text, false);
  });
  add("cta.text", c.cta.text, false);
  return out;
}

function auditService(c: ServiceContent, file: string) {
  const w = (s: string) => `${c.slug}:${s}`;
  const req = REQUIRED[c.slug];
  if (path.basename(file, ".ts") !== c.slug) err(w("slug"), `slug does not match file name ${file}`);
  if (!c.seo.title.endsWith("| 1Oak Financial Group")) err(w("seo.title"), "must end with '| 1Oak Financial Group'");
  if (c.seo.title.length > 65) warn(w("seo.title"), `${c.seo.title.length} chars (aim ≤ 60)`);
  const dl = c.seo.description.length;
  if (dl < 150 || dl > 160) err(w("seo.description"), `${dl} chars (must be 150–160)`);
  if (!/Monrovia|Los Angeles|California/.test(c.seo.description))
    warn(w("seo.description"), "no Monrovia / Los Angeles / California mention");
  if (c.hero.h1 !== req.h1) err(w("hero.h1"), `must be exactly "${req.h1}"`);
  if (c.hero.subhead.split(/(?<=[.!?])\s+/).length > 1) warn(w("hero.subhead"), "should be one sentence");
  const introWords = c.intro.paragraphs.reduce((n, p) => n + words(p), 0);
  if (introWords < 170 || introWords > 260) err(w("intro"), `${introWords} words (target ~200, allowed 170–260)`);
  if (c.included.items.length < 5 || c.included.items.length > 7) err(w("included"), `${c.included.items.length} items (5–7)`);
  if (c.bestFor.profiles.length < 3 || c.bestFor.profiles.length > 4) err(w("bestFor"), `${c.bestFor.profiles.length} profiles (3–4)`);
  if (c.process.steps.length < 3 || c.process.steps.length > 4) err(w("process"), `${c.process.steps.length} steps (3–4)`);
  if (c.faqs.length !== 6) err(w("faqs"), `${c.faqs.length} FAQs (must be 6)`);
  req.faqs.forEach((q, i) => {
    if (norm(c.faqs[i]?.q ?? "") !== norm(q)) err(w(`faq.${i}`), `required question #${i + 1} must be "${q}"`);
  });
  c.faqs.forEach((f, i) => {
    const n = sentences(f.a).length || 1;
    const all = stripMarkup(f.a).split(/(?<=[.!?])\s+/).filter(Boolean).length;
    if (all < 2 || all > 4) warn(w(`faq.${i}`), `${all} sentences (2–4)`);
    void n;
  });
  const qs = new Set(c.faqs.map((f) => norm(f.q)));
  if (qs.size !== c.faqs.length) err(w("faqs"), "duplicate questions");
  if (new Set(c.related).size !== 3 || c.related.includes(c.slug)) err(w("related"), "need 3 distinct related services, not self");
  c.heldBack?.forEach((h) => {
    if (!(h.id in extraServices)) err(w("heldBack"), `unknown extra service id ${h.id}`);
    else if (extraServices[h.id].page !== c.slug) err(w("heldBack"), `${h.id} belongs on ${extraServices[h.id].page}`);
  });

  const texts = collect(c);
  const bodyLinks = new Set<string>();
  for (const t of texts) {
    checkMarkup(w(t.where), t.text);
    if (t.body) for (const m of t.text.matchAll(LINK_RE)) if (m[2] !== `/services/${c.slug}`) bodyLinks.add(m[2]);
  }
  if (bodyLinks.size < 3) err(w("links"), `only ${bodyLinks.size} distinct internal links in body copy (need 3+)`);
  for (const t of texts) {
    for (const m of t.text.matchAll(LINK_RE)) if (m[2] === `/services/${c.slug}`) warn(w(t.where), "links to itself");
  }
  const total = texts.reduce((n, t) => n + words(t.text), 0);
  return { total, texts };
}

function auditCities(blocks: CityBlock[]) {
  if (blocks.length !== 20) err("service-areas", `${blocks.length} city blocks (need 20)`);
  const ids = new Set<string>();
  for (const b of blocks) {
    const w = `service-areas:${b.id}`;
    if (ids.has(b.id)) err(w, "duplicate id");
    ids.add(b.id);
    if (!/^[a-z0-9-]+$/.test(b.id)) err(w, "id must be kebab-case");
    const n = words(b.body);
    if (n < 60 || n > 90) err(w, `${n} words (60–90)`);
    if (b.services.length < 2 || b.services.length > 3) err(w, `${b.services.length} services (2–3)`);
    checkMarkup(w, b.body);
    if (/^(In|At|For) [A-Z]/.test(b.body)) warn(w, "opens with a templated 'In <city>' pattern");
  }
}

async function main() {
  const only = process.argv[2];
  const dir = path.join(ROOT, "content/services");
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".ts") && f !== "index.ts") : [];
  const all: { slug: string; texts: { where: string; text: string }[] }[] = [];
  const totals: Record<string, number> = {};
  for (const f of files) {
    const mod = await import(pathToFileURL(path.join(dir, f)).href);
    const c: ServiceContent = mod.default ?? mod.content;
    if (!c) {
      err(f, "must `export default` a ServiceContent object");
      continue;
    }
    const { total, texts } = auditService(c, f);
    totals[c.slug] = total;
    all.push({ slug: c.slug, texts });
  }

  const areas = path.join(ROOT, "content/service-areas.ts");
  if (fs.existsSync(areas) && (!only || only === "service-areas")) {
    const mod = await import(pathToFileURL(areas).href);
    const blocks: CityBlock[] = mod.cityBlocks;
    auditCities(blocks);
    all.push({ slug: "service-areas", texts: blocks.map((b) => ({ where: b.id, text: b.body })) });
  }

  // Core pages join the cross-page duplicate check.
  const pagesFile = path.join(ROOT, "content/pages.ts");
  if (fs.existsSync(pagesFile) && !only) {
    const mod = await import(pathToFileURL(pagesFile).href);
    const flatten = (v: unknown, at: string, out: { where: string; text: string }[]) => {
      if (typeof v === "string") {
        if (!at.includes("seo") && !at.endsWith(".href")) {
          checkMarkup(at, v);
          out.push({ where: at, text: v });
        }
      } else if (Array.isArray(v)) v.forEach((x, i) => flatten(x, `${at}.${i}`, out));
      else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) flatten(x, `${at}.${k}`, out);
    };
    for (const key of ["homeContent", "aboutContent", "servicesHubContent", "contactContent"]) {
      const texts: { where: string; text: string }[] = [];
      flatten(mod[key], key, texts);
      all.push({ slug: key, texts });
    }
  }

  // Cross-page duplicate sentences and repeated 8-word phrases.
  const seen = new Map<string, string>();
  const grams = new Map<string, Set<string>>();
  for (const page of all) {
    for (const t of page.texts) {
      for (const s of sentences(t.text)) {
        const k = norm(s);
        const prev = seen.get(k);
        if (prev && prev.split(":")[0] !== page.slug) err(`${page.slug}:${t.where}`, `duplicate sentence also in ${prev}: "${s}"`);
        else if (prev && prev !== `${page.slug}:${t.where}`) warn(`${page.slug}:${t.where}`, `sentence repeated within page (${prev})`);
        seen.set(k, `${page.slug}:${t.where}`);
      }
      const toks = norm(t.text).split(" ");
      for (let i = 0; i + 8 <= toks.length; i++) {
        const g = toks.slice(i, i + 8).join(" ");
        if (!grams.has(g)) grams.set(g, new Set());
        grams.get(g)!.add(page.slug);
      }
    }
  }
  for (const [g, pages] of grams) {
    if (pages.size > 1) warn(`cross-page`, `8-word phrase on ${[...pages].join(", ")}: "${g}"`);
  }

  const shown = only ? issues.filter((i) => i.where.startsWith(only) || i.where === "cross-page") : issues;
  for (const i of shown) console.log(`${i.level === "error" ? "ERROR" : "warn "}  ${i.where}  ${i.msg}`);
  console.log("\nWords per service page:", totals);
  const missing = serviceSlugs.filter((s) => !files.includes(`${s}.ts`));
  if (missing.length) console.log("Service content files not yet written:", missing.join(", "));
  const errors = shown.filter((i) => i.level === "error").length;
  console.log(`\n${errors} error(s), ${shown.length - errors} warning(s).`);
  process.exit(errors ? 1 : 0);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  main();
}
