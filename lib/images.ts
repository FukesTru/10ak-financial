/**
 * Image registry. Every photographic image on the site is listed here with its
 * Higgsfield brief ID, output name, aspect ratio and alt text.
 *
 * Processed files live in /public/images/<file>-<width>.(webp|jpg) and are described
 * by lib/image-manifest.json (written by `npm run images`). If an image is missing
 * from the manifest, <Picture> renders a navy-gradient placeholder with
 * data-todo="IMG-XX" instead.
 */

export type Aspect = "16:9" | "4:3";

export type ImageEntry = {
  /** Base file name inside /public/images. */
  file: string;
  aspect: Aspect;
  alt: string;
  /** Where it is used (documentation only). */
  usedOn: string;
};

export const images = {
  "IMG-01": {
    file: "home-hero",
    aspect: "16:9",
    alt: "San Gabriel Mountain foothills at blue hour seen through floor-to-ceiling office windows, with a warm desk lamp and an empty leather chair",
    usedOn: "Home hero",
  },
  "IMG-02": {
    file: "why-oak-tree",
    aspect: "4:3",
    alt: "A single mature oak tree on a golden California hillside at sunset",
    usedOn: "Home — Why 1Oak",
  },
  "IMG-03": {
    file: "who-business-owners",
    aspect: "4:3",
    alt: "Business owner in their fifties reviewing a tablet in a bright, modern workspace",
    usedOn: "Home — Who we help: business owners",
  },
  "IMG-04": {
    file: "who-pre-retirees",
    aspect: "4:3",
    alt: "Couple in their sixties planning together over coffee at a sunlit kitchen table",
    usedOn: "Home — Who we help: pre-retirees and retirees",
  },
  "IMG-05": {
    file: "who-families",
    aspect: "4:3",
    alt: "Parent and teenager looking at a laptop together at home",
    usedOn: "Home — Who we help: families",
  },
  "IMG-06": {
    file: "services-hero",
    aspect: "16:9",
    alt: "Boutique advisory office with navy walls, a walnut table and soft window light",
    usedOn: "Services hub hero",
  },
  "IMG-07": {
    file: "about-hero",
    aspect: "16:9",
    alt: "Quiet private meeting room with a leather notebook and pen resting on the table in soft evening light",
    usedOn: "About hero",
  },
  "IMG-08": {
    file: "service-areas-hero",
    aspect: "16:9",
    alt: "Los Angeles basin at dusk with city lights and the San Gabriel foothills in the distance",
    usedOn: "Service Areas hero",
  },
  "IMG-09": {
    file: "contact-hero",
    aspect: "16:9",
    alt: "Warm, welcoming reception area with a clean desk and green plants",
    usedOn: "Contact hero",
  },
  "IMG-10": {
    file: "cta-background",
    aspect: "16:9",
    alt: "",
    usedOn: "Final CTA band background (decorative)",
  },
  "IMG-11": {
    file: "tax-planning",
    aspect: "16:9",
    alt: "Business owner and advisor reviewing tax planning documents together at a bright desk",
    usedOn: "Tax Planning hero",
  },
  "IMG-12": {
    file: "tax-return-filing",
    aspect: "16:9",
    alt: "Organized desk with a laptop, calculator and folders ready for tax return preparation",
    usedOn: "Tax Return Filing hero",
  },
  "IMG-13": {
    file: "annuities",
    aspect: "16:9",
    alt: "Retired couple walking along a quiet California beach at golden hour",
    usedOn: "Annuities hero",
  },
  "IMG-14": {
    file: "life-insurance",
    aspect: "16:9",
    alt: "Multigenerational family laughing together in a backyard on a warm evening",
    usedOn: "Life Insurance hero",
  },
  "IMG-15": {
    file: "mortgage-loans",
    aspect: "16:9",
    alt: "Modern Southern California home with a welcoming entry at golden hour",
    usedOn: "Mortgage Loans hero",
  },
  "IMG-16": {
    file: "tax-free-investment",
    aspect: "16:9",
    alt: "Young oak sapling growing from rich soil in soft sunlight, a symbol of tax-efficient growth",
    usedOn: "Tax-Free Investment hero",
  },
  "IMG-17": {
    file: "accounting-bookkeeping",
    aspect: "16:9",
    alt: "Small-business owner working at a tidy desk with a laptop for bookkeeping",
    usedOn: "Accounting & Bookkeeping hero",
  },
  "IMG-18": {
    file: "cfo-advisory",
    aspect: "16:9",
    alt: "Boardroom table overlooking the city at dusk, with two people in discussion in the background",
    usedOn: "CFO Advisory hero",
  },
  "IMG-19": {
    file: "cost-segregation-study",
    aspect: "16:9",
    alt: "Modern commercial office building facade at sunrise with strong architectural lines",
    usedOn: "Cost Segregation hero",
  },
  "IMG-20": {
    file: "pension-cash-balance-plans",
    aspect: "16:9",
    alt: "Two business partners in their fifties smiling over coffee in a bright office",
    usedOn: "Pension & Cash Balance hero",
  },
  "IMG-21": {
    file: "financial-ratio-analysis",
    aspect: "16:9",
    alt: "Abstract layers of glass and light on deep navy, suggesting precision and analysis",
    usedOn: "Financial Ratio Analysis hero",
  },
  "IMG-22": {
    file: "strategic-risk-management",
    aspect: "16:9",
    alt: "Lighthouse on the California coast at dusk above calm water",
    usedOn: "Strategic Risk Management hero",
  },
  "IMG-23": {
    file: "accelerated-mortgage-payoff",
    aspect: "16:9",
    alt: "Homeowner couple holding house keys on the porch of their California home at sunset",
    usedOn: "Accelerated Mortgage Payoff hero",
  },
  "IMG-24": {
    file: "college-planning",
    aspect: "16:9",
    alt: "Sunlit university campus walkway in autumn with students in soft focus",
    usedOn: "College Planning hero",
  },
} satisfies Record<string, ImageEntry>;

export type ImageId = keyof typeof images;

export const imageIds = Object.keys(images) as ImageId[];

/** Responsive widths produced by scripts/process-images.mjs. */
export const WIDTHS: Record<"wide" | "card", number[]> = {
  wide: [640, 1280, 1920, 2560],
  card: [480, 800, 1200, 1600],
};
