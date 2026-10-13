import { firm } from "@/config/firm";

export const SITE_URL = firm.siteUrl;

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

/** Core (non-service) routes, in navigation order. */
export const corePages = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-disclosures", label: "Privacy & Disclosures" },
] as const;

/** Where the lead form posts. A static export can point this at any serverless endpoint. */
export const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "/api/lead";
