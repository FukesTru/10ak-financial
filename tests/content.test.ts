import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { serviceSlugs, serviceBySlug } from "@/config/services";
import { serviceContent } from "@/content/services";
import { cityBlocks } from "@/content/service-areas";
import { homeContent, aboutContent, servicesHubContent, contactContent } from "@/content/pages";
import { privacyContent } from "@/content/privacy";

describe("service content", () => {
  it("has a unique page for every service", () => {
    for (const slug of serviceSlugs) {
      const c = serviceContent[slug];
      expect(c.slug).toBe(slug);
      expect(c.faqs).toHaveLength(6);
      expect(c.related).toHaveLength(3);
      expect(c.related).not.toContain(slug);
      for (const r of c.related) expect(serviceBySlug[r]).toBeDefined();
    }
    const h1s = new Set(serviceSlugs.map((s) => serviceContent[s].hero.h1));
    const titles = new Set(serviceSlugs.map((s) => serviceContent[s].seo.title));
    const descriptions = new Set(serviceSlugs.map((s) => serviceContent[s].seo.description));
    expect(h1s.size).toBe(14);
    expect(titles.size).toBe(14);
    expect(descriptions.size).toBe(14);
  });

  it("passes the content audit (counts, links, banned claims, duplicates)", () => {
    const root = path.resolve(__dirname, "..");
    expect(() =>
      execFileSync("npx", ["tsx", "scripts/content-audit.ts"], { cwd: root, stdio: "pipe" }),
    ).not.toThrow();
  }, 60_000);

  it("uses the exact titles and H1s from the brief on core pages", () => {
    expect(homeContent.seo.title).toBe("Tax & Financial Planning in Los Angeles | 1Oak Financial Group");
    expect(homeContent.hero.h1).toBe("Smarter Tax Strategy and Financial Planning for Business Owners and High Earners");
    expect(aboutContent.hero.h1).toBe("Meet Theo Minassian, Founder of 1Oak Financial Group");
    expect(servicesHubContent.hero.h1).toBe("Tax, Accounting and Financial Planning Services in Los Angeles");
    expect(contactContent.hero.h1).toBe("Book Your Free Strategy Call");
    expect(privacyContent.hero.h1).toBe("Privacy Policy & Important Disclosures");
    expect(homeContent.faqs).toHaveLength(5);
    expect(homeContent.howWeWork.steps.map((s) => s.title)).toEqual([
      "Free Strategy Call",
      "Review Your Full Picture",
      "Your Written Plan and Ongoing Support",
    ]);
  });

  it("has 20 anchor-linked city blocks", () => {
    expect(cityBlocks).toHaveLength(20);
    expect(new Set(cityBlocks.map((b) => b.id)).size).toBe(20);
  });

  it("keeps meta descriptions between 150 and 160 characters", () => {
    const all = [homeContent, aboutContent, servicesHubContent, contactContent, privacyContent, ...serviceSlugs.map((s) => serviceContent[s])];
    for (const c of all) {
      expect(c.seo.description.length, c.seo.title).toBeGreaterThanOrEqual(150);
      expect(c.seo.description.length, c.seo.title).toBeLessThanOrEqual(160);
    }
  });
});
