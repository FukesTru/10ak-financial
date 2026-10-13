import type { CityBlock, ServiceAreasContent } from "@/content/types";

export const serviceAreasContent: ServiceAreasContent = {
  seo: {
    title: "Financial Advisor Serving Pasadena, Glendale, Irvine & San Diego | 1Oak",
    description:
      "1Oak Financial Group serves business owners and families in Pasadena, Glendale, Irvine, San Diego and beyond from our Monrovia office, with virtual meetings.",
  },
  hero: {
    h1: "Serving Business Owners and Families Across Southern California and Beyond",
    subhead:
      "Tax, accounting and financial planning from one office in Monrovia, with virtual meetings for clients anywhere in California.",
  },
  intro: {
    heading: "One Office in Monrovia, Clients Across the State",
    paragraphs: [
      "1Oak Financial Group has a single office, on West Foothill Boulevard in Monrovia at the foot of the San Gabriel Mountains. If you live nearby, or simply prefer to talk across a table, you are welcome to meet us there.",
      "Everywhere else, we work by video call and phone. Planning meetings, document review and follow-up all happen online, so the full range of [our services](/services) is available whether you are in Pasadena or San Francisco. The first step is the same for everyone: a [free strategy call](/contact).",
    ],
  },
  regionIntros: {
    "San Gabriel Valley":
      "This is our home base. Monrovia, Pasadena, Arcadia and La Cañada Flintridge are close enough to the office that an in-person meeting is easy to arrange.",
    "Greater Los Angeles":
      "From Downtown to the Conejo Valley, we serve business owners, entertainment professionals and families across Los Angeles and eastern Ventura County, mostly through video meetings.",
    "Orange County":
      "Orange County clients meet with us virtually, and the Monrovia office is available whenever a face-to-face conversation makes more sense.",
    Statewide:
      "California income tax follows you wherever you live in the state. We serve clients in San Diego, the Bay Area and everywhere in between through virtual meetings.",
  },
  notListed: {
    heading: "Not in the List?",
    text: "These cities are examples, not boundaries. If you live anywhere in California, from Long Beach to Sacramento, [get in touch](/contact) and we will set up a virtual meeting at a time that suits you.",
  },
  cta: {
    heading: "Talk It Through With Us",
    text: "Wherever you are in California, a free strategy call is a low-pressure way to see if we are a fit. [Book a Free Strategy Call](/contact) and choose video, phone or a visit to Monrovia.",
  },
};

export const cityBlocks: CityBlock[] = [
  /* ---------------- San Gabriel Valley ---------------- */
  {
    id: "monrovia",
    name: "Monrovia",
    region: "San Gabriel Valley",
    body: "Our only office is on West Foothill Boulevard, minutes from the shops and restaurants of Old Town on Myrtle Avenue. Neighbors from Monrovia, Duarte, Bradbury and Sierra Madre can meet across the table instead of on a screen. If you run a shop, a contracting business or a home-based practice, the first priorities are usually current [accounting and bookkeeping](/services/accounting-bookkeeping) and accurate [tax return filing](/services/tax-return-filing). Homeowners from the foothills near Monrovia Canyon Park to the blocks south of the 210 can also discuss [mortgage loans](/services/mortgage-loans) for a purchase or refinance.",
    services: ["accounting-bookkeeping", "tax-return-filing", "mortgage-loans"],
  },
  {
    id: "pasadena",
    name: "Pasadena",
    region: "San Gabriel Valley",
    body: "Between the historic storefronts of Old Pasadena and the office buildings along South Lake Avenue, Pasadena has no shortage of doctors, dentists, attorneys and consultants who own their practices. When profits are steady, a [cash balance plan](/services/pension-cash-balance-plans) can sit alongside a 401(k) and raise how much you set aside each year. Owners of older commercial buildings may ask whether a [cost segregation study](/services/cost-segregation-study) applies, and parents in Bungalow Heaven often want [college planning](/services/college-planning) that still protects retirement. Our Monrovia office is a short drive east on the 210.",
    services: ["pension-cash-balance-plans", "cost-segregation-study", "college-planning"],
  },
  {
    id: "arcadia",
    name: "Arcadia",
    region: "San Gabriel Valley",
    body: "Right next door to Monrovia, Arcadia is close enough that meeting at our office takes only a few minutes. Around Santa Anita Park, the Los Angeles County Arboretum and the shops along Baldwin Avenue and First Avenue, long-established ranch homes sit beside newer custom builds. When a household includes a family business and more than one generation, [life insurance](/services/life-insurance) can help fund a buyout or even out an inheritance. Owners of a newly built home may also weigh an [accelerated mortgage payoff](/services/accelerated-mortgage-payoff) against keeping cash available for the business.",
    services: ["life-insurance", "accelerated-mortgage-payoff"],
  },
  {
    id: "la-canada-flintridge",
    name: "La Cañada Flintridge",
    region: "San Gabriel Valley",
    body: "Homes in La Cañada Flintridge back up to the San Gabriel Mountains, where Angeles Crest Highway climbs into the national forest and wildfire season is part of the calendar. [Strategic risk management](/services/strategic-risk-management) goes beyond renewing a homeowners policy: it reviews rebuild limits, liability coverage and how you would pay for living elsewhere during repairs. Parents near Descanso Gardens can use [college planning](/services/college-planning) to set a realistic budget before applications begin. We meet by video or at our Monrovia office, an easy drive east on the 210.",
    services: ["strategic-risk-management", "college-planning"],
  },

  /* ---------------- Greater Los Angeles ---------------- */
  {
    id: "los-angeles",
    name: "Los Angeles",
    region: "Greater Los Angeles",
    body: "From wholesalers in the Fashion District to agencies in the Arts District and startups around Playa Vista, Los Angeles businesses often outgrow their back office before anyone notices. Reliable [accounting and bookkeeping](/services/accounting-bookkeeping) is the foundation. [CFO advisory](/services/cfo-advisory) follows for owners who need cash forecasts, pricing analysis or a second opinion on a big hire, and year-round [tax planning](/services/tax-planning) ties it together. Video meetings mean no one loses an afternoon on the 10 or the 405, and our Monrovia office is open for in-person sessions.",
    services: ["accounting-bookkeeping", "cfo-advisory", "tax-planning"],
  },
  {
    id: "glendale",
    name: "Glendale",
    region: "Greater Los Angeles",
    body: "Family-owned businesses fill Brand Boulevard and the blocks around downtown Glendale, and sooner or later most owners face a succession question. Before a lender or buyer studies your numbers, [financial ratio analysis](/services/financial-ratio-analysis) shows how margins, debt and cash flow actually read. [Life insurance](/services/life-insurance) can help fund a buy-sell agreement or a handoff to the next generation. Homeowners from Rossmoyne to Montrose who are weighing a refinance or a move can review [mortgage loans](/services/mortgage-loans) too. Meetings are virtual or in Monrovia, a straight run east on the 134 and 210.",
    services: ["financial-ratio-analysis", "life-insurance", "mortgage-loans"],
  },
  {
    id: "burbank",
    name: "Burbank",
    region: "Greater Los Angeles",
    body: "Editors, animators, writers and crew working around the Burbank Media District rarely have a tidy tax year. One return might combine several production W-2s, residuals, freelance 1099 income and a loan-out corporation, with long gaps between jobs. Careful [tax return filing](/services/tax-return-filing) keeps the pieces straight, and [tax planning](/services/tax-planning) helps you set aside the right amount when a big project pays out. Whether you live near Magnolia Park or fly out of Hollywood Burbank Airport for location work, we can meet by video or at our Monrovia office.",
    services: ["tax-return-filing", "tax-planning"],
  },
  {
    id: "beverly-hills",
    name: "Beverly Hills",
    region: "Greater Los Angeles",
    body: "Behind the storefronts of Rodeo Drive, the side streets of the Golden Triangle hold law offices, medical suites and other professional practices, and for many Beverly Hills households real estate is a large share of net worth. Owners of commercial or rental buildings may benefit from a [cost segregation study](/services/cost-segregation-study). For larger estates, [life insurance](/services/life-insurance) can provide liquidity for heirs, while [tax-free investment](/services/tax-free-investment) strategies such as Roth conversions can shape what the next generation inherits. We serve Beverly Hills by video, with in-person meetings in Monrovia.",
    services: ["cost-segregation-study", "life-insurance", "tax-free-investment"],
  },
  {
    id: "west-hollywood",
    name: "West Hollywood",
    region: "Greater Los Angeles",
    body: "Restaurants and venues on the Sunset Strip, salons and fitness studios along Santa Monica Boulevard, design showrooms near Melrose Avenue: West Hollywood runs on hands-on businesses with plenty of moving parts. Payroll, tips, sales tax and inventory all have to land in the right place, which makes dependable [accounting and bookkeeping](/services/accounting-bookkeeping) essential. A public-facing business also carries liability, lease and key-person exposure worth reviewing through [strategic risk management](/services/strategic-risk-management). We meet West Hollywood owners by video or at our Monrovia office, whichever fits the week.",
    services: ["accounting-bookkeeping", "strategic-risk-management"],
  },
  {
    id: "encino",
    name: "Encino",
    region: "Greater Los Angeles",
    body: "Encino's stretch of Ventura Boulevard is lined with medical buildings, dental offices and professional suites. If you own a practice with high, steady profits, a [cash balance plan](/services/pension-cash-balance-plans) may allow larger tax-deferred contributions than a 401(k) alone, especially in your fifties and sixties. Households nearing retirement in the hillside neighborhoods south of the boulevard can explore how [annuities](/services/annuities) might turn part of a rollover into predictable income. Meetings happen virtually or at our Monrovia office, depending on what suits your schedule.",
    services: ["pension-cash-balance-plans", "annuities"],
  },
  {
    id: "sherman-oaks",
    name: "Sherman Oaks",
    region: "Greater Los Angeles",
    body: "Where the 101 meets the 405, Sherman Oaks offers everything from condos near Van Nuys Boulevard to hillside homes above Ventura Boulevard, and the financial questions vary just as widely. First-time and move-up buyers can compare [mortgage loans](/services/mortgage-loans), while long-time owners may wonder whether an [accelerated mortgage payoff](/services/accelerated-mortgage-payoff) beats investing the difference. If you freelance in entertainment or consult from home, [tax return filing](/services/tax-return-filing) that handles self-employment income properly matters. Video meetings spare you the 134 at rush hour; in-person meetings take place in Monrovia.",
    services: ["mortgage-loans", "accelerated-mortgage-payoff", "tax-return-filing"],
  },
  {
    id: "woodland-hills",
    name: "Woodland Hills",
    region: "Greater Los Angeles",
    body: "Office towers in Warner Center house professional firms, healthcare groups and regional headquarters, and owners of growing companies nearby often want more than a year-end report. [CFO advisory](/services/cfo-advisory) adds budgeting, forecasting and a sounding board for big decisions without a full-time hire. [Financial ratio analysis](/services/financial-ratio-analysis) tracks margins, liquidity and leverage over time, which helps when you apply for a credit line or plan a sale. Business owners from Topanga Canyon Boulevard to the west end of Ventura Boulevard can meet with us by video or in Monrovia.",
    services: ["cfo-advisory", "financial-ratio-analysis"],
  },
  {
    id: "malibu",
    name: "Malibu",
    region: "Greater Los Angeles",
    body: "Living along Pacific Coast Highway means planning for risks many places never face: wildfire in the Santa Monica Mountains, landslides and bluff erosion, and stretches of PCH that can close with little warning. [Strategic risk management](/services/strategic-risk-management) checks whether your coverage, cash reserves and liability limits match that reality, from Point Dume to the canyons. For households with substantial savings, [tax-free investment](/services/tax-free-investment) approaches such as Roth conversions may let more growth compound without future income tax. Meetings are by video, so the drive to Monrovia is optional.",
    services: ["strategic-risk-management", "tax-free-investment"],
  },
  {
    id: "thousand-oaks",
    name: "Thousand Oaks",
    region: "Greater Los Angeles",
    body: "If you live in the Conejo Valley, from Newbury Park to Westlake Village, and retirement is a decade or so away, your plan may be juggling a long-career 401(k), a home that is mostly paid down and children nearing college. Each piece deserves attention: [annuities](/services/annuities) for turning part of a rollover into steady income, an [accelerated mortgage payoff](/services/accelerated-mortgage-payoff) timed to your retirement date, and [college planning](/services/college-planning) that protects both. Monrovia is a long drive via the 101 and 134, so most meetings are virtual.",
    services: ["annuities", "accelerated-mortgage-payoff", "college-planning"],
  },

  /* ---------------- Orange County ---------------- */
  {
    id: "orange-county",
    name: "Orange County",
    region: "Orange County",
    body: "Stretching from Fullerton and Anaheim in the north to San Clemente in the south, Orange County mixes established business owners, real estate investors and busy professional households. Most Orange County meetings take place by video, so no one has to fight the 5 or the 405; if you would rather sit down in person, our Monrovia office is a drive up the 57 and 210. Common starting points are year-round [tax planning](/services/tax-planning) and, for owners of commercial or rental buildings, a [cost segregation study](/services/cost-segregation-study).",
    services: ["tax-planning", "cost-segregation-study"],
  },
  {
    id: "costa-mesa",
    name: "Costa Mesa",
    region: "Orange County",
    body: "Costa Mesa's business community runs from the office buildings of South Coast Metro to the workshops and creative studios on the Westside, with restaurants and shops along 17th Street and Harbor Boulevard in between. If you are scaling a consumer brand or a design firm, [CFO advisory](/services/cfo-advisory) can help plan inventory, hiring and cash. Monthly [accounting and bookkeeping](/services/accounting-bookkeeping) keeps the numbers current, and [financial ratio analysis](/services/financial-ratio-analysis) shows whether growth is actually improving margins. We work with Costa Mesa owners virtually or at our Monrovia office.",
    services: ["cfo-advisory", "accounting-bookkeeping", "financial-ratio-analysis"],
  },
  {
    id: "irvine",
    name: "Irvine",
    region: "Orange County",
    body: "Stock is part of the paycheck at many tech, medical device and life sciences companies around the Irvine Spectrum and John Wayne Airport. Restricted stock units, incentive stock options and employee stock purchase plans each follow different tax rules, so [tax planning](/services/tax-planning) around vesting and sale dates matters. Diversifying a concentrated position is a good time to weigh [tax-free investment](/services/tax-free-investment) strategies. Families in Woodbridge or Turtle Rock can add [college planning](/services/college-planning), whether the goal is UC Irvine or farther afield. Meetings are by video or in Monrovia.",
    services: ["tax-planning", "tax-free-investment", "college-planning"],
  },
  {
    id: "newport-beach",
    name: "Newport Beach",
    region: "Orange County",
    body: "A primary home in Corona del Mar, a rental on the Balboa Peninsula, an office near Newport Center held through the business: when property dominates your balance sheet, a [cost segregation study](/services/cost-segregation-study) can show whether depreciation on income-producing buildings is being claimed as quickly as the rules allow. If you have sold a company or are winding one down, [annuities](/services/annuities) may convert part of a rollover into predictable income, subject to the issuing insurer's claims-paying ability. Meetings are virtual, or in person at our Monrovia office.",
    services: ["cost-segregation-study", "annuities"],
  },

  /* ---------------- Statewide ---------------- */
  {
    id: "san-diego",
    name: "San Diego",
    region: "Statewide",
    body: "More than a hundred miles separate Monrovia from San Diego, so meetings here happen by video. Life sciences professionals in Sorrento Valley and on the Torrey Pines Mesa often hold stock options or restricted stock that call for careful [tax planning](/services/tax-planning) before each vest or sale. Physicians and dentists running practices from Hillcrest to Carlsbad may be strong candidates for a [cash balance plan](/services/pension-cash-balance-plans), which can accelerate retirement savings during peak earning years. If you are ever up north, our Monrovia office is open for a visit.",
    services: ["tax-planning", "pension-cash-balance-plans"],
  },
  {
    id: "san-francisco",
    name: "San Francisco",
    region: "Statewide",
    body: "Equity compensation drives many financial decisions in San Francisco, whether you joined a SoMa startup early or hold restricted stock at a Financial District employer. Incentive stock options can trigger the alternative minimum tax and restricted stock units are taxed as income when they vest, so [tax planning](/services/tax-planning) comes first. After a liquidity event, [tax-free investment](/services/tax-free-investment) strategies may help. Founders around Mission Bay can add [CFO advisory](/services/cfo-advisory) for fundraising models and runway planning. Meetings are fully virtual, though you are welcome in Monrovia whenever you visit Southern California.",
    services: ["tax-planning", "tax-free-investment", "cfo-advisory"],
  },
];
