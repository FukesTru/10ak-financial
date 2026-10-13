import { describe, expect, it } from "vitest";
import { detail, firm, isSet, telHref } from "@/config/firm";
import { extraServices, isExtraConfirmed, type ExtraServiceId } from "@/config/extra-services";
import { services, serviceSlugs } from "@/config/services";
import { areas } from "@/config/areas";
import { resolveConditional } from "@/lib/rich-text";

describe("firm config", () => {
  it("matches the client's NAP exactly", () => {
    expect(firm.name).toBe("1Oak Financial Group");
    expect(firm.phone.display).toBe("818-245-2329");
    expect(telHref).toBe("tel:+18182452329");
    expect(firm.email).toBe("info@1oakfg.com");
    expect(firm.address).toMatchObject({ street: "635 W. Foothill Blvd", city: "Monrovia", region: "CA", postalCode: "91016" });
    expect(firm.siteUrl).toBe("https://www.1oak-financial.com");
  });

  it("treats [CONFIRM: …] placeholders and empty values as not set", () => {
    expect(isSet("[CONFIRM: anything]")).toBe(false);
    expect(isSet("")).toBe(false);
    expect(isSet(0)).toBe(false);
    expect(isSet([])).toBe(false);
    expect(isSet("Monday–Friday")).toBe(true);
    expect(detail("insuranceLicense")).toBeNull();
    expect(resolveConditional({ requires: "accountingSoftware", text: "We use {value}." })).toBeNull();
  });

  it("ships with no reviews, ratings or social links", () => {
    expect(firm.reviews).toHaveLength(0);
    expect(firm.googleBusinessProfile.verified).toBe(false);
    expect(Object.values(firm.social).filter(Boolean)).toHaveLength(0);
  });

  it("keeps every held-back service hidden until confirmed", () => {
    for (const id of Object.keys(extraServices) as ExtraServiceId[]) expect(isExtraConfirmed(id)).toBe(false);
  });

  it("lists all 14 services and 20 service areas", () => {
    expect(services).toHaveLength(14);
    expect(new Set(serviceSlugs).size).toBe(14);
    expect(areas).toHaveLength(20);
  });
});
