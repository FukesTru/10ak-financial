/**
 * Single source of truth for every editable firm fact.
 *
 * Rules:
 * - Every component reads from this file. Change a value here and it updates site-wide.
 * - A value that is an empty string, empty array, `0`, or still starts with "[CONFIRM"
 *   is treated as "not set": the UI that depends on it renders nothing.
 * - `[CONFIRM: …]` strings are listed in PRELAUNCH_CHECKLIST.md on every build
 *   (see scripts/prelaunch-check.ts) and never appear in visible UI.
 * - Never invent license numbers, designations, review counts or ratings.
 */

export type Review = {
  author: string;
  /** 1–5, exactly as shown on the verified Google Business Profile. */
  rating: number;
  text: string;
  /** ISO date, e.g. "2026-11-02". */
  date: string;
  source: "Google";
  url?: string;
};

export const firm = {
  name: "1Oak Financial Group",
  shortName: "1Oak",
  legalName: "1Oak Financial Group",
  description:
    "Tax strategy, accounting and financial planning for business owners and high-income households, from an office in Monrovia, California.",

  owner: {
    name: "Theo Minassian",
    jobTitle: "Founder",
    yearsExperience: "[CONFIRM: years of experience]",
    credentials: "[CONFIRM: professional credentials / designations]",
    education: "[CONFIRM: education]",
    /** Licenses are listed under `licenses` below. */
  },

  phone: {
    display: "818-245-2329",
    e164: "+18182452329",
  },
  email: "info@1oakfg.com",

  address: {
    street: "635 W. Foothill Blvd",
    city: "Monrovia",
    region: "CA",
    /** The intake form listed 91106; Monrovia's ZIP is 91016. Change here if needed. */
    postalCode: "91016",
    country: "US",
  },

  /** Shown in the footer, contact page and schema once confirmed. */
  hours: "[CONFIRM: Mon–Fri hours, e.g. Monday–Friday, 9:00 a.m.–5:00 p.m.]",
  /**
   * schema.org openingHoursSpecification. Leave empty until hours are confirmed.
   * Example: [{ days: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "17:00" }]
   */
  openingHours: [] as { days: string[]; opens: string; closes: string }[],

  /** Canonical origin. Non-www requests 301 to www at the host/DNS level (see README). */
  siteUrl: "https://www.1oak-financial.com",

  googleBusinessProfile: {
    /** Claimed, not yet verified. Add the public GBP URL once verified. */
    url: "",
    verified: false,
    reviewCount: 0,
    rating: 0,
  },

  /** Real, verified reviews only. The reviews block stays hidden while this is empty. */
  reviews: [] as Review[],

  /** No social profiles yet. Empty values render nothing (no empty icons). */
  social: {
    linkedin: "",
    facebook: "",
    instagram: "",
    youtube: "",
    x: "",
  },

  analytics: {
    /** Set NEXT_PUBLIC_GA4_ID in the hosting environment (format G-XXXXXXXXXX). */
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
  },

  /** Contact-page calendar embed (GoHighLevel, Calendly, etc.). Paste the embed URL. */
  calendarEmbedUrl: "",

  /**
   * Licensing and compliance. Each item renders in the disclosures block only once
   * it is filled in with the real, verified text.
   */
  licenses: {
    taxCredential: "[CONFIRM: tax credential, e.g., CPA / EA / CTEC registration]",
    insuranceLicense:
      "[CONFIRM: California Department of Insurance license # for life insurance and annuities]",
    mortgageLicense: "[CONFIRM: NMLS / DRE license for mortgage loans]",
    securitiesRegistration:
      "[CONFIRM: securities / investment adviser registration and broker-dealer statement, if applicable]",
  },

  /** Operational details referenced on individual service pages. */
  operations: {
    clientPortal: "[CONFIRM: secure client portal name]",
    accountingSoftware: "[CONFIRM: QuickBooks / Xero / other]",
    irsRepresentation:
      "[CONFIRM: credential-based IRS representation (CPA / EA / attorney) — describe scope]",
    lendingRelationships: "[CONFIRM: lending relationships / lender network description]",
    feeStructure: "[CONFIRM: fee structure language]",
  },

  /** Disclosure shown above reviews once reviews are displayed. */
  testimonialDisclosure:
    "[CONFIRM: testimonial / review disclosure language approved for the firm's licenses]",

  copyrightYear: 2026,
};

export type Firm = typeof firm;
export type LicenseKey = keyof typeof firm.licenses;
export type OperationKey = keyof typeof firm.operations;
export type DetailKey = LicenseKey | OperationKey;

/** True when a config value is real (not empty, not a [CONFIRM: …] placeholder). */
export function isSet(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") {
    const v = value.trim();
    return v.length > 0 && !v.startsWith("[CONFIRM");
  }
  if (typeof value === "number") return value > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/** Returns the value when it is set, otherwise null. */
export function confirmed(value: string | undefined | null): string | null {
  return isSet(value) ? (value as string).trim() : null;
}

/** Looks up a license or operational detail by key. */
export function detail(key: DetailKey): string | null {
  if (key in firm.licenses) return confirmed(firm.licenses[key as LicenseKey]);
  return confirmed(firm.operations[key as OperationKey]);
}

export const fullAddress = `${firm.address.street}, ${firm.address.city}, ${firm.address.region} ${firm.address.postalCode}`;
export const telHref = `tel:${firm.phone.e164}`;
export const mailHref = `mailto:${firm.email}`;
export const mapsQuery = encodeURIComponent(
  `${firm.address.street}, ${firm.address.city}, ${firm.address.region} ${firm.address.postalCode}`,
);
export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
export const mapsLinkUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
