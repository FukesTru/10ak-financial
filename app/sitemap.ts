import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/config/services";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const LAST_MODIFIED = new Date("2026-10-13");

export default function sitemap(): MetadataRoute.Sitemap {
  const core: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "monthly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "yearly" },
    { path: "/service-areas", priority: 0.8, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "yearly" },
    { path: "/privacy-disclosures", priority: 0.3, freq: "yearly" },
  ];
  return [
    ...core.map((p) => ({ url: absoluteUrl(p.path), lastModified: LAST_MODIFIED, changeFrequency: p.freq, priority: p.priority })),
    ...serviceSlugs.map((s) => ({
      url: absoluteUrl(`/services/${s}`),
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
