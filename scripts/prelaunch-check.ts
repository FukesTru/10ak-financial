/**
 * Writes PRELAUNCH_CHECKLIST.md on every build (runs as `prebuild`).
 *   npx tsx scripts/prelaunch-check.ts
 *
 * Lists every open [CONFIRM: …] value in /config/firm.ts, unfilled optional slots,
 * held-back services, placeholder images and client photos, lead-delivery env vars,
 * and content statements the firm should verify. Fails the build only if a
 * [CONFIRM: …] string has leaked into a content file (those must never render).
 */
import fs from "node:fs";
import path from "node:path";
import { firm, isSet } from "@/config/firm";
import { extraServices, type ExtraServiceId } from "@/config/extra-services";
import { images, type ImageId } from "@/lib/images";
import { manifest, clientPhotos } from "@/lib/image-manifest";

const ROOT = path.resolve(__dirname, "..");

function walk(obj: unknown, prefix: string, out: { path: string; value: string }[]) {
  if (typeof obj === "string") {
    if (obj.trim().startsWith("[CONFIRM")) out.push({ path: prefix, value: obj });
    return;
  }
  if (obj && typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) walk(v, prefix ? `${prefix}.${k}` : k, out);
  }
}

function leakedPlaceholders(): string[] {
  const hits: string[] = [];
  const scan = (dir: string) => {
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, f.name);
      if (f.isDirectory()) scan(p);
      else if (/\.(ts|tsx)$/.test(f.name)) {
        // Ignore comments; only string content can render.
        const code = fs
          .readFileSync(p, "utf8")
          .split("\n")
          .filter((l) => !/^\s*(\*|\/\*|\/\/)/.test(l));
        if (code.some((l) => l.includes("[CONFIRM"))) hits.push(path.relative(ROOT, p));
      }
    }
  };
  for (const d of ["content", "app", "components"]) if (fs.existsSync(path.join(ROOT, d))) scan(path.join(ROOT, d));
  return hits;
}

/** Statements in the copy that depend on how the firm actually operates or on current law. */
const REVIEW_ITEMS: string[] = [
  "**Process statements** used across pages: Theo works directly with every client; clients receive a written plan; scope and cost are outlined in writing before work starts; the firm checks in during the year; meetings by video/phone; documents shared electronically.",
  "**Audience thresholds shown publicly** (ages 35–75, $200K+ household income, $250K+ invested) on the homepage FAQ and About page — confirm the firm is comfortable publishing them.",
  "**Mortgage Loans page** describes the service as helping clients “plan and compare” financing. The sentence “we can help arrange financing through …” appears only once `operations.lendingRelationships` is confirmed — arranging loans for compensation in California generally requires a DRE or NMLS license, so confirm `licenses.mortgageLicense` at the same time.",
  "**Annuities SEO title** uses “Guaranteed Income” (matches the brief's keyword). Titles can't carry the claims-paying-ability qualifier; switch to “Lifetime Income” if compliance prefers.",
  "**Annuities FAQ** mentions California's life and health insurance guaranty association (no dollar limits). California restricts using the guaranty association to promote sales — have compliance approve the wording.",
  "**Tax facts to confirm for the current year** (no figures are hard-coded): California's elective pass-through entity (PTE) tax availability and election timing; California's 30/40/0/30 estimated-tax schedule and the high-earner safe-harbor limit; California non-conformity on bonus depreciation, HSAs, §1202 QSBS and K-12 529 withdrawals; the extra California tax on non-qualified 529 withdrawals and early retirement distributions; FAFSA treatment of grandparent-owned 529s.",
  "**Tax Return Filing** lists forms 1040/540, 1120-S/100S, 1065/565/568 and 1040-X; says single-member LLCs generally file Form 568; and states the IRS/California six-month extension rules.",
  "**Accounting & Bookkeeping** says the firm coordinates with the client's payroll provider (doesn't run payroll) and that audited/reviewed statements are a separate engagement with a licensed CPA firm. Adjust if the firm runs payroll or is itself a CPA firm.",
  "**Cost Segregation** says the firm coordinates the engineering with outside specialists, prepares federal and California depreciation schedules, and handles Form 3115 paperwork. Confirm.",
  "**Pension & Cash Balance** says the firm works with a plan actuary and third-party administrator and reviews plan investments against the interest crediting rate. The page carries the securities-registration disclosure because it mentions plan investments — remove that if the firm won't advise on plan assets.",
  "**Strategic Risk Management** intro says wildfire risk has made coverage harder to find “in foothill communities like Monrovia.” Confirm the firm is comfortable with that line.",
  "**Privacy policy**: confirms the firm does not sell/share personal information (keep Google Analytics advertising features OFF and add no ad pixels); texting copy says “Reply STOP” — add “Reply HELP for help” if the SMS provider's carrier registration requires it; the policy refers to a separate client privacy notice and engagement agreement — make sure both exist; have counsel review the CCPA/CPRA section.",
  "**Services hub SEO title** is 68 characters (required verbatim by the brief); consider shortening, e.g. “Tax, Accounting & Planning Services | 1Oak Financial Group”.",
  "**“Financial Advisor” wording** in the Service Areas title (required by the brief) — confirm the term is appropriate for the firm's registrations.",
  "**Held-back services** (Deferred Sales Trust, charitable remainder trusts, captive insurance, IRS representation, premium financing) carry risk language; have them reviewed before flipping `confirmed: true`.",
  "**Service Areas place details** to spot-check: Sierra Madre described as a Monrovia neighbor; Glendale “Rossmoyne to Montrose”; Costa Mesa Westside “workshops and creative studios”; freeway routes (134/210, 57/210, 101/134).",
];

function main() {
  const confirms: { path: string; value: string }[] = [];
  walk(firm, "firm", confirms);

  const slots: string[] = [];
  if (!isSet(firm.googleBusinessProfile.url)) slots.push("`firm.googleBusinessProfile.url` — add once the Google Business Profile is verified (also set `verified: true`).");
  if (!firm.googleBusinessProfile.verified || !firm.reviews.length)
    slots.push("`firm.reviews` — reviews block stays hidden until GBP is verified and real reviews are entered (plus `reviewCount` / `rating`).");
  for (const [k, v] of Object.entries(firm.social)) if (!isSet(v)) slots.push(`\`firm.social.${k}\` — empty (no icon renders).`);
  if (!isSet(firm.calendarEmbedUrl)) slots.push("`firm.calendarEmbedUrl` — optional GoHighLevel/Calendly embed for the Contact page.");
  if (!firm.openingHours.length) slots.push("`firm.openingHours` — schema opening hours (fill together with `firm.hours`).");

  const env: string[] = [
    `NEXT_PUBLIC_GA4_ID — ${process.env.NEXT_PUBLIC_GA4_ID ? "set" : "**not set** (GA4 will not load)"}`,
    `EMAIL_PROVIDER_KEY + LEAD_EMAIL_FROM — ${process.env.EMAIL_PROVIDER_KEY ? "set" : "**not set**"} (Resend; lead emails to ${firm.email})`,
    `SMS_PROVIDER_KEY + SMS_ACCOUNT_SID + SMS_FROM_NUMBER — ${process.env.SMS_PROVIDER_KEY ? "set" : "**not set**"} (Twilio; lead texts to ${firm.phone.display})`,
    `CRM_WEBHOOK_URL — ${process.env.CRM_WEBHOOK_URL ? "set" : "not set (optional)"}`,
  ];

  const held = (Object.keys(extraServices) as ExtraServiceId[]).filter((id) => !extraServices[id].confirmed);
  const missingImages = (Object.keys(images) as ImageId[]).filter((id) => !manifest[id]);
  const neededPhotos = ["theo-minassian-headshot"].filter((n) => !clientPhotos[n]);
  const leaks = leakedPlaceholders();

  const lines: string[] = [
    "# Pre-launch checklist — 1Oak Financial Group",
    "",
    "_Generated by `scripts/prelaunch-check.ts` on every build. Edit `/config/firm.ts`, then rebuild._",
    "",
    `## 1. Open \`[CONFIRM: …]\` items (${confirms.length})`,
    "",
    "Each of these renders **nothing** on the site until replaced with the real, verified value.",
    "",
    ...confirms.map((c) => `- [ ] \`${c.path}\` — ${c.value.replace(/^\[CONFIRM:\s*/, "").replace(/\]$/, "")}`),
    "",
    "## 2. Empty optional slots",
    "",
    ...slots.map((s) => `- [ ] ${s}`),
    "",
    `## 3. Held-back services (${held.length} with \`confirmed: false\`)`,
    "",
    "Copy is written and waiting in each page. Flip `confirmed: true` in `/config/extra-services.ts` only for services the firm offers and is licensed for.",
    "",
    ...held.map((id) => `- [ ] ${extraServices[id].name} → /services/${extraServices[id].page}${"note" in extraServices[id] && extraServices[id].note ? ` _(${extraServices[id].note})_` : ""}`),
    "",
    `## 4. Images (${Object.keys(images).length - missingImages.length} of ${Object.keys(images).length} processed)`,
    "",
    missingImages.length
      ? `All 24 images were generated in Higgsfield (job IDs and URLs in \`scripts/higgsfield-jobs.json\`). Not yet processed, so rendering as navy placeholders with \`data-todo\`: ${missingImages.map((id) => `${id} (${images[id].file})`).join(", ")}. Run \`npm run images:fetch && npm run images\` from a machine that can reach the Higgsfield CDN (see README).`
      : "All Higgsfield images are processed.",
    "",
    ...(neededPhotos.length ? neededPhotos.map((n) => `- [ ] Client photo \`public/client-photos/${n}.jpg\` — placeholder renders until uploaded (then run \`npm run images\`).`) : ["- [x] Client headshot uploaded."]),
    "- [ ] Upload the remaining client photos (15–29 supplied) to `public/client-photos/` — see the README there.",
    "",
    "## 5. Environment variables",
    "",
    ...env.map((e) => `- [ ] ${e}`),
    "",
    "## 6. Content and compliance review",
    "",
    "Statements the copy makes that depend on how the firm operates or on current law. No figures, ratings or credentials were invented.",
    "",
    ...REVIEW_ITEMS.map((r) => `- [ ] ${r}`),
    "",
    "## 7. Launch tasks",
    "",
    "- [ ] Point DNS for www.1oak-financial.com at the host; 301 the bare domain to www (also handled in `next.config.ts`).",
    "- [ ] Verify the Google Business Profile, then add its URL and real reviews to config.",
    "- [ ] Submit `https://www.1oak-financial.com/sitemap.xml` in Google Search Console.",
    "- [ ] Send a test lead from the live site and confirm the email + text arrive.",
    "",
  ];

  if (leaks.length) {
    lines.push("## ⚠ Placeholder leak", "", ...leaks.map((l) => `- \`${l}\` contains a [CONFIRM: …] string — move it to /config/firm.ts.`), "");
  }

  fs.writeFileSync(path.join(ROOT, "PRELAUNCH_CHECKLIST.md"), lines.join("\n"));
  console.log(`PRELAUNCH_CHECKLIST.md: ${confirms.length} [CONFIRM] items, ${held.length} held-back services, ${missingImages.length} placeholder images.`);
  if (leaks.length) {
    console.error(`[CONFIRM: …] text found in: ${leaks.join(", ")}`);
    process.exit(1);
  }
}

main();
