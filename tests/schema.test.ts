/* eslint-disable @typescript-eslint/no-explicit-any -- inspecting loosely typed JSON-LD */
import { describe, expect, it } from "vitest";
import { breadcrumbs, faqPage, organization, person, serviceEntity, serviceItemList } from "@/lib/schema";
import { serviceBySlug } from "@/config/services";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

describe("structured data", () => {
  it("describes the firm as FinancialService + AccountingService with full NAP", () => {
    const org = organization({ catalog: true }) as Record<string, any>;
    expect(org["@type"]).toEqual(["FinancialService", "AccountingService"]);
    expect(org.telephone).toBe("+1-818-245-2329");
    expect(org.address.postalCode).toBe("91016");
    expect(org.areaServed).toHaveLength(20);
    expect(org.hasOfferCatalog.itemListElement).toHaveLength(14);
    expect(org.sameAs).toEqual([]);
    expect(org.aggregateRating).toBeUndefined();
  });

  it("builds FAQ, breadcrumb, service, person and item-list nodes", () => {
    expect((faqPage([{ q: "Q?", a: "See [this](/contact)." }]) as any).mainEntity[0].acceptedAnswer.text).toBe("See this.");
    expect((breadcrumbs([{ name: "Home", path: "/" }]) as any).itemListElement[0].item).toBe("https://www.1oak-financial.com");
    expect((serviceEntity(serviceBySlug.annuities, "d", "t") as any).provider["@type"]).toContain("FinancialService");
    expect((person() as any).jobTitle).toBe("Founder");
    expect((serviceItemList() as any).numberOfItems).toBe(14);
  });
});

describe("sitemap and robots", () => {
  it("lists all 20 pages on the canonical www host", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toHaveLength(20);
    expect(urls.every((u) => u.startsWith("https://www.1oak-financial.com"))).toBe(true);
  });
  it("allows crawling and references the sitemap", () => {
    const r = robots();
    expect(r.sitemap).toBe("https://www.1oak-financial.com/sitemap.xml");
  });
});
