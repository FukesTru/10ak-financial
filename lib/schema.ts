/**
 * JSON-LD builders. Every value comes from /config, so NAP stays identical in
 * the footer, the contact page and structured data.
 */
import { firm, isSet, fullAddress } from "@/config/firm";
import { areas } from "@/config/areas";
import { services, servicePath, type Service } from "@/config/services";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import { plain, resolveConditional } from "@/lib/rich-text";
import type { Faq } from "@/content/types";

export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/about#theo-minassian`;

type Json = Record<string, unknown>;

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: firm.address.street,
  addressLocality: firm.address.city,
  addressRegion: firm.address.region,
  postalCode: firm.address.postalCode,
  addressCountry: firm.address.country,
};

const telephone = `+1-${firm.phone.display}`;

export function areaServed(): Json[] {
  return areas.map((a) => ({
    "@type": a.schemaType,
    name: a.name,
    containedInPlace: { "@type": "State", name: "California" },
  }));
}

function sameAs(): string[] {
  return Object.values(firm.social).filter((v) => isSet(v));
}

function openingHours(): Json[] | undefined {
  if (!firm.openingHours.length) return undefined;
  return firm.openingHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  }));
}

/** Compact reference used as `provider` on other entities. */
export function orgRef(): Json {
  return {
    "@type": ["FinancialService", "AccountingService"],
    "@id": ORG_ID,
    name: firm.name,
    url: SITE_URL,
    telephone,
    address: postalAddress,
  };
}

export function contactPoint(): Json {
  return {
    "@type": "ContactPoint",
    telephone,
    email: firm.email,
    contactType: "customer service",
    areaServed: "US-CA",
    availableLanguage: ["English"],
  };
}

/** Full organization entity (FinancialService + AccountingService). */
export function organization(opts: { catalog?: boolean; contact?: boolean } = {}): Json {
  const org: Json = {
    "@type": ["FinancialService", "AccountingService"],
    "@id": ORG_ID,
    name: firm.name,
    alternateName: firm.shortName,
    description: firm.description,
    url: SITE_URL,
    logo: absoluteUrl("/brand/1oak-logo-stacked.png"),
    image: absoluteUrl("/og/default.jpg"),
    telephone,
    email: firm.email,
    address: postalAddress,
    areaServed: areaServed(),
    founder: { "@type": "Person", "@id": PERSON_ID, name: firm.owner.name },
    sameAs: sameAs(),
  };
  const hours = openingHours();
  if (hours) org.openingHoursSpecification = hours;
  if (opts.contact) org.contactPoint = contactPoint();
  if (opts.catalog) {
    org.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: "Tax, accounting and financial planning services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: absoluteUrl(servicePath(s.slug)) },
      })),
    };
  }
  if (firm.googleBusinessProfile.verified && firm.googleBusinessProfile.reviewCount > 0 && firm.googleBusinessProfile.rating > 0) {
    org.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: firm.googleBusinessProfile.rating,
      reviewCount: firm.googleBusinessProfile.reviewCount,
    };
  }
  return org;
}

export function breadcrumbs(items: { name: string; path: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPage(faqs: Faq[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => {
      const extra = resolveConditional(f.append);
      return {
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: plain(extra ? `${f.a} ${extra}` : f.a) },
      };
    }),
  };
}

export function serviceEntity(service: Service, description: string, serviceType: string): Json {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(servicePath(service.slug))}#service`,
    name: service.name,
    serviceType,
    description,
    url: absoluteUrl(servicePath(service.slug)),
    provider: orgRef(),
    areaServed: { "@type": "State", name: "California" },
    audience: { "@type": "Audience", audienceType: "Business owners and high-income households" },
  };
}

export function person(imageUrl?: string | null): Json {
  const p: Json = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: firm.owner.name,
    jobTitle: firm.owner.jobTitle,
    worksFor: orgRef(),
    url: absoluteUrl("/about"),
    workLocation: { "@type": "Place", name: `${firm.name} office`, address: postalAddress },
  };
  if (imageUrl) p.image = absoluteUrl(imageUrl);
  return p;
}

export function serviceItemList(): Json {
  return {
    "@type": "ItemList",
    name: "Services offered by 1Oak Financial Group",
    numberOfItems: services.length,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: absoluteUrl(servicePath(s.slug)),
    })),
  };
}

export function graph(...nodes: Json[]): Json {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export { fullAddress };
