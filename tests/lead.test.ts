import { beforeEach, describe, expect, it, vi } from "vitest";
import { handleLead, resetRateLimit, MIN_FILL_MS, normalizeLead } from "@/lib/lead";
import { validateLead } from "@/lib/lead-validation";

const NOW = 1_800_000_000_000;
const valid = {
  name: "Jordan Lee",
  email: "jordan@example.com",
  phone: "(626) 555-0142",
  service: "Tax Planning",
  bestTime: "Morning",
  message: "Looking at an S corp election.",
  consent: true,
  website: "",
  startedAt: NOW - 30_000,
  page: "/services/tax-planning",
  source: "service:tax-planning",
};
const allChannels = {
  NODE_ENV: "production",
  EMAIL_PROVIDER_KEY: "re_test",
  LEAD_EMAIL_FROM: "1Oak Website <leads@example.com>",
  SMS_PROVIDER_KEY: "twilio-token",
  SMS_ACCOUNT_SID: "AC123",
  SMS_FROM_NUMBER: "+15555550100",
  CRM_WEBHOOK_URL: "https://crm.example.com/hook",
};
const ok = () => Promise.resolve(new Response("{}", { status: 200 }));
const quiet = () => {};

beforeEach(() => resetRateLimit());

describe("validateLead", () => {
  it("accepts a complete lead", () => {
    expect(validateLead(valid)).toEqual({});
  });
  it("flags missing fields and unchecked consent", () => {
    const errors = validateLead({ name: "", email: "nope", phone: "123", service: "", consent: false });
    expect(Object.keys(errors).sort()).toEqual(["consent", "email", "name", "phone", "service"]);
  });
  it("accepts 11-digit numbers with a leading 1", () => {
    expect(validateLead({ ...valid, phone: "+1 818 245 2329" }).phone).toBeUndefined();
  });
});

describe("handleLead", () => {
  it("silently accepts but drops honeypot submissions", async () => {
    const fetchImpl = vi.fn<typeof fetch>(ok);
    const r = await handleLead({ ...valid, website: "spam.example" }, { ip: "1.1.1.1", env: allChannels, fetchImpl, now: NOW, log: quiet });
    expect(r.status).toBe(200);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("silently drops submissions faster than a person could type", async () => {
    const fetchImpl = vi.fn<typeof fetch>(ok);
    const r = await handleLead({ ...valid, startedAt: NOW - (MIN_FILL_MS - 500) }, { ip: "1.1.1.2", env: allChannels, fetchImpl, now: NOW, log: quiet });
    expect(r.status).toBe(200);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("rejects invalid input with field errors", async () => {
    const r = await handleLead({ ...valid, consent: false }, { ip: "1.1.1.3", env: allChannels, fetchImpl: ok, now: NOW, log: quiet });
    expect(r.status).toBe(400);
  });

  it("sends email, SMS and CRM notifications to the configured destinations", async () => {
    const fetchImpl = vi.fn<typeof fetch>(ok);
    const r = await handleLead(valid, { ip: "1.1.1.4", env: allChannels, fetchImpl, now: NOW, log: quiet });
    expect(r.status).toBe(200);
    const urls = fetchImpl.mock.calls.map((c) => String(c[0]));
    expect(urls).toEqual([
      "https://api.resend.com/emails",
      "https://api.twilio.com/2010-04-01/Accounts/AC123/Messages.json",
      "https://crm.example.com/hook",
    ]);
    const email = JSON.parse(String(fetchImpl.mock.calls[0][1]!.body));
    expect(email.to).toEqual(["info@1oakfg.com"]);
    expect(email.reply_to).toBe("jordan@example.com");
    const sms = fetchImpl.mock.calls[1][1]!.body as URLSearchParams;
    expect(sms.get("To")).toBe("+18182452329");
  });

  it("succeeds when at least one channel delivers", async () => {
    let n = 0;
    const fetchImpl = vi.fn<typeof fetch>(() => (n++ === 0 ? Promise.resolve(new Response("", { status: 500 })) : ok()));
    const r = await handleLead(valid, { ip: "1.1.1.5", env: allChannels, fetchImpl, now: NOW, log: quiet });
    expect(r.status).toBe(200);
  });

  it("returns 502 when every channel fails", async () => {
    const fetchImpl = vi.fn<typeof fetch>(() => Promise.resolve(new Response("", { status: 500 })));
    const r = await handleLead(valid, { ip: "1.1.1.6", env: allChannels, fetchImpl, now: NOW, log: quiet });
    expect(r.status).toBe(502);
  });

  it("refuses to drop leads silently in production when nothing is configured", async () => {
    const r = await handleLead(valid, { ip: "1.1.1.7", env: { NODE_ENV: "production" }, fetchImpl: ok, now: NOW, log: quiet });
    expect(r.status).toBe(503);
  });

  it("rate-limits bursts from one client", async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 7; i++) {
      const r = await handleLead(valid, { ip: "9.9.9.9", env: allChannels, fetchImpl: ok, now: NOW + i, log: quiet });
      statuses.push(r.status);
    }
    expect(statuses.slice(0, 5).every((s) => s === 200)).toBe(true);
    expect(statuses.slice(5)).toEqual([429, 429]);
  });
});

describe("normalizeLead", () => {
  it("formats phone numbers and strips control characters", () => {
    const lead = normalizeLead({ ...valid, phone: "6265550142", name: "Jordan\u0007 Lee", bestTime: "<script>" });
    expect(lead.phone).toBe("626-555-0142");
    expect(lead.name).toBe("Jordan Lee");
    expect(lead.bestTime).toBe("Any time");
  });
});
