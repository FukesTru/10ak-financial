# 1Oak Financial Group — website

Production site for **1Oak Financial Group** (Monrovia, CA): 20 pages covering 14 services, built with
Next.js 16 (App Router), Tailwind CSS 4 and Framer Motion. Every page is statically prerendered;
the only server code is the lead-form endpoint at `/api/lead`.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # prelaunch checklist → production build → rendered-HTML check
npm start
```

Quality checks:

```bash
npm run typecheck
npm run lint
npm test             # lead handling, config placeholders, schema, sitemap, content rules
npm run check:content  # content audit: counts, links, banned claims, duplicate sentences
```

## Pages

| Route | Page |
| --- | --- |
| `/` | Homepage |
| `/about` | About Theo Minassian |
| `/services` | Services hub |
| `/services/<slug>` | 14 service pages (see `config/services.ts`) |
| `/service-areas` | 20 city blocks with `#anchor` ids |
| `/contact` | Free strategy call + lead form + map |
| `/privacy-disclosures` | Privacy policy (`#privacy-policy`) and disclosures (`#disclosures`) |

Also generated: `/sitemap.xml`, `/robots.txt`, a custom 404, favicons, and a cookie notice.

## Where things live

```
config/firm.ts            All firm facts: NAP, hours, licenses, GBP, reviews, socials, calendar embed
config/services.ts        Service names, slugs, groups, card copy, image IDs
config/extra-services.ts  Held-back services (confirmed: false until the owner confirms)
config/areas.ts           Cities served (schema areaServed + homepage snapshot)
content/services/*.ts     Full copy for each service page
content/pages.ts          Home, About, Services hub, Contact copy
content/service-areas.ts  Service-area page + 20 city blocks
content/privacy.ts        Privacy policy and disclosures
lib/images.ts             Image registry (IMG-01 … IMG-24) with alt text
lib/schema.ts             JSON-LD builders
lib/lead.ts               Lead spam checks, rate limiting, email/SMS/CRM delivery
docs/content-style-guide.md  Voice and compliance rules for all copy
```

### Editing firm details

Change values in `config/firm.ts`. Anything that is empty or still starts with `[CONFIRM` renders
**nothing** — no "undefined", no placeholder text. Each build regenerates **`PRELAUNCH_CHECKLIST.md`**
listing every open item. To publish a license, credential, hours or a review, replace the placeholder
with the real, verified value and rebuild.

Never add sample reviews, ratings, client counts or credentials. The reviews block stays hidden until
`googleBusinessProfile.verified` is `true` **and** real reviews are in `firm.reviews`.

### Held-back services

Copy for entity structuring, R&D credits, Deferred Sales Trusts, crypto, charitable remainder trusts,
foreign national planning, IRS representation, 401(k)/profit-sharing design, key-person, split dollar,
premium financing, disability, estate planning, captive insurance, overhead expense coverage,
forecasting, growth strategy and succession planning is already written inside the matching service
pages. Flip `confirmed: true` in `config/extra-services.ts` to publish each one.

## Images

All photography was generated with **Higgsfield** (GPT Image 2.5, 4K) from the prompts in the brief.
Job IDs and result URLs are recorded in `scripts/higgsfield-jobs.json`.

```bash
npm run images:fetch   # downloads the 24 originals into .image-src/ (git-ignored)
npm run images         # writes responsive WebP + JPEG to public/images and lib/image-manifest.json
```

**On Vercel this happens automatically.** `prebuild` runs `scripts/ensure-images.ts`, which (when
`VERCEL=1` or `FETCH_IMAGES=1`) downloads the originals, processes them and caches the result in
`.next/cache`, so later deploys reuse it. If the CDN can't be reached the build still succeeds and
the pages keep their placeholders; the build log says which images are missing. The processed files
are not committed, so the site depends on these URLs staying available until they are: run the two
commands above on any machine with normal internet access and commit `public/images/` and
`lib/image-manifest.json` to make them permanent.

Until an image is processed, `<Picture>` renders a navy-gradient placeholder with `data-todo="IMG-XX"`.
Heroes load eagerly with high fetch priority; everything else lazy-loads. Card images reuse a 4:3 crop
of the matching hero, and each hero also gets a 1200×630 Open Graph image.

**Client photos:** upload Theo's headshot as `public/client-photos/theo-minassian-headshot.jpg`
(see `public/client-photos/README.md`) and run `npm run images`. A branded placeholder is shown until then.

**Logo:** `npm run brand` rebuilds the logo set in `public/brand/` (horizontal, stacked, icon; color and
white-on-dark, as SVG with outlined text plus PNG), the favicons and the default social image.

## Lead form

One reusable form (`components/forms/LeadForm.tsx`) appears on the homepage, the Contact page and,
in a compact version, in every service-page CTA band. Submissions go to `/api/lead`, which:

- silently drops honeypot hits and submissions made faster than a person could type,
- rate-limits bursts per IP (in-memory; add a shared store such as Upstash for strict limits),
- validates the fields (consent checkbox is required and unchecked by default),
- sends an email (Resend), a text (Twilio) and/or a CRM webhook — see `.env.example`.

In production, if no channel is configured the endpoint returns an error so leads are never silently
lost; the form then shows the phone number and email instead. The client pushes a `generate_lead`
GA4 event on success; every `tel:` link fires `click_to_call` (with its location) and every `mailto:`
fires `click_email`.

To use a booking calendar on the Contact page, paste the embed URL into `firm.calendarEmbedUrl`.

## Analytics and privacy

GA4 loads only when `NEXT_PUBLIC_GA4_ID` is set **and** the visitor accepts analytics cookies
(Consent Mode; a Global Privacy Control signal counts as a decline). The "Cookie settings" link in
the footer reopens the notice. Keep Google Analytics advertising features off — the privacy policy
says the firm does not sell or share personal information.

## Deployment

**Recommended: Vercel (or any Next.js host).** Pages are served as static files from the CDN and
`/api/lead` runs as a serverless function. Set the environment variables from `.env.example`.
`vercel.json` pins the framework to Next.js, so the project builds correctly even if it was imported
before any code existed (when Vercel falls back to the "Other" preset and serves only `public/`, every
page returns Vercel's `404: NOT_FOUND`). In Vercel → Settings → Git, make sure the **Production Branch**
is the branch that holds this code.
`next.config.ts` 301-redirects `1oak-financial.com` to `www.1oak-financial.com` (also set this at the
DNS/host level) and adds security headers.

**Pure static hosting:** `NEXT_PUBLIC_LEAD_ENDPOINT=https://… npm run build:static` exports to `out/`.
Point the endpoint at any function running `lib/lead.ts`, or at a form service.

## SEO

Each page has a unique title and 150–160 character description, a canonical URL on
`https://www.1oak-financial.com`, Open Graph and Twitter tags, one H1, breadcrumbs (visual and
`BreadcrumbList`), and page-specific JSON-LD: `FinancialService` + `AccountingService` with an offer
catalog on the homepage, `Person` on About, `Service` + `FAQPage` on each service page, `ItemList`
on the services hub, and `ContactPoint` on Contact.
