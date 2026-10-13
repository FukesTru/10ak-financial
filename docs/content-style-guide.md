# 1Oak Financial Group — Content Style Guide

Use this guide for every word on the site, including future pages.

## Who we are writing for

- Ages 35–75, household income $200K+, $250K+ in investable assets. Many own a business.
- They are busy, financially literate but not specialists, and wary of sales pitches.
- Many are 55+: short paragraphs, plain words, and generous spacing matter.

## Voice

- Confident, calm, educational, plain English. A senior advisor explaining something across a table.
- First-person plural for the firm ("we", "our"). Speak to the reader as "you".
- Explain any jargon the first time it appears, in the same sentence or the next one.
- Vary sentence length and openings. Do not start consecutive paragraphs the same way.
- Low-pressure calls to action: "Book a Free Strategy Call", "See if this fits your situation", "Talk it through with us".

## Hard rules (never break these)

1. **No fabricated facts.** No client counts, years in business, awards, ratings, reviews, testimonials,
   savings percentages or dollar results. Do not describe the size of the team ("our team of CPAs").
   Do not claim any credential, designation or license — those come only from `/config/firm.ts`.
2. **No guarantees or promises** about returns, tax outcomes, refunds, approvals or rates.
   Use "may", "can", "typically", "in some cases". "Guaranteed income" may be used only to describe an
   annuity contract feature, and must be tied to the issuing insurer's financial strength and claims-paying ability.
3. **Never name, link to or imitate any other firm** (advisors, CPA firms, banks, insurers, lenders, software vendors,
   fund companies, local businesses). Government programs and public places are fine (IRS, Franchise Tax Board,
   FAFSA, Old Pasadena, Irvine Spectrum, etc.).
4. **No `[CONFIRM: …]` text in content files.** Anything unconfirmed is handled by config-driven conditional text.
5. **No hype**: no "save up to", "risk-free", "best", "#1", "secret", "loophole", scare tactics or urgency tricks.
6. **Hypothetical examples must be labeled** "Hypothetical example — illustrative only" (or "Illustrative example only"
   for sample tables) and the math must be correct.
7. **Tax law changes.** Avoid hard-coding limits, phase-outs, rates or percentages that change year to year.
   Describe the concept and say limits are set annually / to confirm current law. Stable facts (e.g. a 10% early
   withdrawal penalty before age 59½) are fine when they are accurate.
8. **One office.** The only office is in Monrovia. Other areas are "serving clients in…" with virtual meetings available.

## Phrases to avoid (overused or empty)

"navigate the complexities", "peace of mind", "one-size-fits-all", "tailored solutions", "holistic",
"comprehensive suite", "unlock", "empower", "seamless", "in today's ___ landscape", "journey", "game-changer",
"cutting-edge", "world-class", "look no further", "rest assured", "we pride ourselves".

## Markup inside content strings

Only two kinds of inline markup are supported:

- `[link text](/services/tax-planning)` — internal links (must start with `/`)
- `**bold**` — sparing emphasis

## Internal links

Each service page needs **3+ distinct internal links inside the body copy** (intro, included items, profiles,
steps, good-to-know, extras, FAQ answers), not just the related-service cards. Link naturally, using descriptive
anchor text ("a [cash balance plan](/services/pension-cash-balance-plans)"), never "click here".

Valid targets: `/`, `/about`, `/services`, `/service-areas`, `/contact`, `/privacy-disclosures`, and
`/services/<slug>` for the 14 service slugs in `/config/services.ts`.

## SEO fields

- `seo.title`: `[Keyword phrase] | 1Oak Financial Group`, ≤ 60 characters where possible (hard max 65).
- `seo.description`: 150–160 characters, includes the keyword and "Monrovia" or "Los Angeles" where natural.
- Exactly one H1 per page (provided in the brief — use it verbatim).

## QA

Run `npx tsx scripts/content-audit.ts [slug]` — it checks counts, lengths, links, banned claims,
placeholders and duplicate sentences across pages. Fix every ERROR; read every warning.
