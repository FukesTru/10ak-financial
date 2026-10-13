import type { ServiceSlug } from "@/config/services";
import type { ExtraServiceId } from "@/config/extra-services";
import type { DetailKey, LicenseKey } from "@/config/firm";

/**
 * Rich text: a plain string that may contain two kinds of inline markup and nothing else.
 *   [link text](/services/tax-planning)   internal link (must start with "/")
 *   **bold words**                         emphasis
 * Do not use HTML, other markdown, or [CONFIRM: …] strings in content.
 */
export type RichText = string;

/**
 * A sentence that only renders once a config value is real (see /config/firm.ts).
 * `{value}` inside `text` is replaced with the confirmed value.
 */
export type ConditionalText = {
  requires: DetailKey;
  text: RichText;
};

export type Faq = {
  q: string;
  /** 2–4 sentences. */
  a: RichText;
  /** Optional sentence appended to the answer only when the config value is confirmed. */
  append?: ConditionalText;
};

export type TableData = {
  columns: string[];
  rows: string[][];
};

export type ExtraBlock =
  | {
      type: "prose";
      heading: string;
      paragraphs: RichText[];
    }
  | {
      type: "list";
      heading: string;
      lead?: RichText;
      items: { title: string; text: RichText }[];
    }
  | {
      /** Illustrative or hypothetical example. `label` is shown prominently. */
      type: "example";
      heading: string;
      label: "Illustrative example only" | "Hypothetical example — illustrative only";
      paragraphs: RichText[];
      table?: TableData & { caption: string };
      footnote?: RichText;
    };

export type ServiceContent = {
  slug: ServiceSlug;
  seo: {
    /** "[Keyword] | 1Oak Financial Group" — aim for ≤ 60 characters. */
    title: string;
    /** 150–160 characters, includes the keyword and Monrovia or Los Angeles where natural. */
    description: string;
  };
  hero: {
    h1: string;
    /** One sentence. */
    subhead: string;
  };
  intro: {
    heading: string;
    /** ~200 words total across paragraphs. */
    paragraphs: RichText[];
  };
  included: {
    heading: string;
    lead?: RichText;
    /** 5–7 items. */
    items: { title: string; text: RichText }[];
  };
  bestFor: {
    heading: string;
    /** 3–4 profiles. */
    profiles: { title: string; text: RichText }[];
  };
  process: {
    heading: string;
    /** 3–4 steps. */
    steps: { title: string; text: RichText }[];
  };
  goodToKnow: {
    heading: string;
    text: RichText;
  };
  /** Page-specific sections. `after` controls placement. */
  extras?: (ExtraBlock & { after: "intro" | "included" | "bestFor" | "process" })[];
  /** Held-back sub-sections; each renders only when its flag in /config/extra-services.ts is true. */
  heldBack?: { id: ExtraServiceId; title: string; text: RichText }[];
  /** Sentences that render only when a config value is confirmed (e.g. portal name, software). */
  conditional?: (ConditionalText & { after: "intro" | "included" | "process" })[];
  /** License keys whose disclosure text must appear on this page (rendered from config). */
  licenses?: LicenseKey[];
  /** Exactly 6. The first three are the required questions from the brief, in order. */
  faqs: Faq[];
  /** Exactly 3 related service slugs. */
  related: [ServiceSlug, ServiceSlug, ServiceSlug];
  cta: {
    heading: string;
    text: RichText;
  };
  schema: {
    serviceType: string;
    /** 1–2 sentence plain description for the Service schema. */
    description: string;
  };
};

export type CityBlock = {
  /** Anchor id, e.g. "pasadena". */
  id: string;
  name: string;
  region: "San Gabriel Valley" | "Greater Los Angeles" | "Orange County" | "Statewide";
  /** 60–90 words, uniquely written, with real local flavor. May contain [links](/services/...). */
  body: RichText;
  /** 2–3 service slugs most relevant to this area (rendered as links). */
  services: ServiceSlug[];
};

/* ------------------------------------------------------------------ */
/* Core pages                                                          */
/* ------------------------------------------------------------------ */

export type Seo = {
  /** ≤ 60 characters where possible. */
  title: string;
  /** 150–160 characters. */
  description: string;
};

export type Step = { title: string; text: RichText };

export type HomeContent = {
  seo: Seo;
  hero: { h1: string; subhead: string };
  whoWeHelp: {
    heading: string;
    lead: RichText;
    /** Exactly 3, in order: Business Owners, Pre-Retirees & Retirees, Families. */
    cards: { title: string; text: RichText; links: { label: string; href: string }[] }[];
  };
  servicesOverview: { heading: string; lead: RichText };
  why: {
    heading: string;
    lead: RichText;
    /** Exactly 3: strong roots, steady growth, lasting shade. */
    pillars: { title: string; text: RichText }[];
  };
  howWeWork: {
    heading: string;
    lead?: RichText;
    /** Exactly 3, titles: Free Strategy Call / Review Your Full Picture / Your Written Plan and Ongoing Support. */
    steps: Step[];
  };
  meetTheo: { heading: string; bio: RichText[] };
  areas: { heading: string; lead: RichText };
  faqs: Faq[];
  cta: { heading: string; text: RichText };
};

export type AboutContent = {
  seo: Seo;
  hero: { h1: string; subhead: string };
  story: { heading: string; paragraphs: RichText[] };
  approach: { heading: string; lead?: RichText; principles: { title: string; text: RichText }[] };
  whyName: { heading: string; paragraphs: RichText[] };
  whoWeServe: { heading: string; lead: RichText; groups: { title: string; text: RichText }[] };
  credentials: { heading: string; lead: RichText };
  cta: { heading: string; text: RichText };
};

export type ServicesHubContent = {
  seo: Seo;
  hero: { h1: string; subhead: string };
  intro: { heading: string; paragraphs: RichText[] };
  /** One short intro per group id. */
  groupIntros: Record<"business" | "protect" | "home", RichText>;
  whereToStart: {
    heading: string;
    lead: RichText;
    /** Exactly 3 situations, each pointing to a recommended service. */
    situations: { situation: string; text: RichText; service: ServiceSlug }[];
  };
  process: { heading: string; lead?: RichText; steps: Step[] };
  cta: { heading: string; text: RichText };
};

export type ContactContent = {
  seo: Seo;
  hero: { h1: string; subhead: string };
  formIntro: { heading: string; text: RichText };
  callSteps: { heading: string; steps: Step[] };
  /** 3 reassurance FAQs: privacy, cost of the first call, what to prepare. */
  faqs: Faq[];
};

export type ServiceAreasContent = {
  seo: Seo;
  hero: { h1: string; subhead: string };
  intro: { heading: string; paragraphs: RichText[] };
  regionIntros: Record<CityBlock["region"], RichText>;
  notListed: { heading: string; text: RichText };
  cta: { heading: string; text: RichText };
};

export type PrivacySection = {
  id: string;
  heading: string;
  paragraphs?: RichText[];
  bullets?: RichText[];
};

export type PrivacyContent = {
  seo: Seo;
  hero: { h1: string; subhead: string };
  /** ISO date shown as "Last updated". */
  lastUpdated: string;
  privacy: { intro: RichText[]; sections: PrivacySection[] };
  disclosures: { intro: RichText[]; sections: PrivacySection[] };
};
