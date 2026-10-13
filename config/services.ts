/**
 * Service registry: names, slugs, groups and card copy for all 14 services.
 * Full page copy lives in /content/services/<slug>.ts.
 */
import type { ImageId } from "@/lib/images";

export type ServiceGroupId = "business" | "protect" | "home";

export const serviceGroups: { id: ServiceGroupId; label: string; blurb: string }[] = [
  {
    id: "business",
    label: "For Business Owners",
    blurb: "Tax, books and financial leadership for companies and the people who own them.",
  },
  {
    id: "protect",
    label: "Protect & Grow",
    blurb: "Income, protection and tax-aware growth for the long run.",
  },
  {
    id: "home",
    label: "Home & Family",
    blurb: "Your home, your mortgage and your children's education, planned together.",
  },
];

export type IconName =
  | "compass"
  | "document"
  | "ledger"
  | "gauge"
  | "building"
  | "pillar"
  | "ratio"
  | "shield"
  | "income"
  | "umbrella"
  | "sprout"
  | "home"
  | "keys"
  | "cap";

export type Service = {
  slug: ServiceSlug;
  /** Full service name, used in headings and schema. */
  name: string;
  /** Short label for menus and footer. */
  navLabel: string;
  group: ServiceGroupId;
  icon: IconName;
  /** One-line benefit for service cards. */
  benefit: string;
  imageId: ImageId;
  /** Primary SEO target from the site plan. */
  keyword: string;
};

export const serviceSlugs = [
  "tax-planning",
  "tax-return-filing",
  "accounting-bookkeeping",
  "cfo-advisory",
  "cost-segregation-study",
  "pension-cash-balance-plans",
  "financial-ratio-analysis",
  "strategic-risk-management",
  "annuities",
  "life-insurance",
  "tax-free-investment",
  "mortgage-loans",
  "accelerated-mortgage-payoff",
  "college-planning",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const services: Service[] = [
  {
    slug: "tax-planning",
    name: "Tax Planning",
    navLabel: "Tax Planning",
    group: "business",
    icon: "compass",
    benefit: "Year-round strategy so fewer tax decisions are made in April.",
    imageId: "IMG-11",
    keyword: "tax planning for business owners Los Angeles",
  },
  {
    slug: "tax-return-filing",
    name: "Tax Return Filing",
    navLabel: "Tax Return Filing",
    group: "business",
    icon: "document",
    benefit: "Accurate individual and business returns, prepared on schedule.",
    imageId: "IMG-12",
    keyword: "tax return filing Monrovia CA",
  },
  {
    slug: "accounting-bookkeeping",
    name: "Accounting & Bookkeeping",
    navLabel: "Accounting & Bookkeeping",
    group: "business",
    icon: "ledger",
    benefit: "Clean, current books you can actually make decisions from.",
    imageId: "IMG-17",
    keyword: "accounting and bookkeeping Los Angeles",
  },
  {
    slug: "cfo-advisory",
    name: "CFO Advisory Services",
    navLabel: "CFO Advisory",
    group: "business",
    icon: "gauge",
    benefit: "Senior financial guidance for growing companies, without a full-time hire.",
    imageId: "IMG-18",
    keyword: "outsourced CFO services Los Angeles",
  },
  {
    slug: "cost-segregation-study",
    name: "Cost Segregation Study",
    navLabel: "Cost Segregation Study",
    group: "business",
    icon: "building",
    benefit: "A closer look at property depreciation for building owners.",
    imageId: "IMG-19",
    keyword: "cost segregation study California",
  },
  {
    slug: "pension-cash-balance-plans",
    name: "Pension & Cash Balance Plans",
    navLabel: "Pension & Cash Balance Plans",
    group: "business",
    icon: "pillar",
    benefit: "Retirement plans built for owners with steady, high profits.",
    imageId: "IMG-20",
    keyword: "cash balance plan Los Angeles",
  },
  {
    slug: "financial-ratio-analysis",
    name: "Advanced Financial Ratio Analysis",
    navLabel: "Financial Ratio Analysis",
    group: "business",
    icon: "ratio",
    benefit: "See how your business and balance sheet really measure up.",
    imageId: "IMG-21",
    keyword: "financial ratio analysis for business owners",
  },
  {
    slug: "strategic-risk-management",
    name: "Strategic Risk Management",
    navLabel: "Strategic Risk Management",
    group: "business",
    icon: "shield",
    benefit: "Find the gaps in your protection before they find you.",
    imageId: "IMG-22",
    keyword: "risk management planning business owners",
  },
  {
    slug: "annuities",
    name: "Annuities",
    navLabel: "Annuities",
    group: "protect",
    icon: "income",
    benefit: "Rollovers and guaranteed-income options, explained plainly.",
    imageId: "IMG-13",
    keyword: "annuity rollover guaranteed income California",
  },
  {
    slug: "life-insurance",
    name: "Life Insurance",
    navLabel: "Life Insurance",
    group: "protect",
    icon: "umbrella",
    benefit: "Coverage sized to your family, your business and your estate.",
    imageId: "IMG-14",
    keyword: "life insurance advisor Los Angeles",
  },
  {
    slug: "tax-free-investment",
    name: "Tax-Free Investment",
    navLabel: "Tax-Free Investment",
    group: "protect",
    icon: "sprout",
    benefit: "Ways to let more of your growth stay yours over time.",
    imageId: "IMG-16",
    keyword: "tax-free investment strategies California",
  },
  {
    slug: "mortgage-loans",
    name: "Mortgage Loans",
    navLabel: "Mortgage Loans",
    group: "home",
    icon: "home",
    benefit: "Purchase and refinance financing that fits your tax picture.",
    imageId: "IMG-15",
    keyword: "mortgage loans Monrovia CA",
  },
  {
    slug: "accelerated-mortgage-payoff",
    name: "Accelerated Mortgage Payoff",
    navLabel: "Accelerated Mortgage Payoff",
    group: "home",
    icon: "keys",
    benefit: "Weigh paying your home off sooner against your other goals.",
    imageId: "IMG-23",
    keyword: "pay off mortgage faster strategy California",
  },
  {
    slug: "college-planning",
    name: "College Planning",
    navLabel: "College Planning",
    group: "home",
    icon: "cap",
    benefit: "A realistic plan for tuition that still protects retirement.",
    imageId: "IMG-24",
    keyword: "college funding planning Los Angeles",
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s])) as Record<
  ServiceSlug,
  Service
>;

export function servicesInGroup(group: ServiceGroupId): Service[] {
  return services.filter((s) => s.group === group);
}

export function servicePath(slug: ServiceSlug): string {
  return `/services/${slug}`;
}
