/**
 * Server-side lead handling: spam checks, rate limiting and delivery.
 *
 * Environment variables (all optional; configure at least one delivery channel in production):
 *   EMAIL_PROVIDER_KEY   Resend API key (https://resend.com) — sends the lead email
 *   LEAD_EMAIL_FROM      Verified sender, e.g. "1Oak Website <leads@1oak-financial.com>"
 *   LEAD_EMAIL_TO        Defaults to firm.email (info@1oakfg.com)
 *   SMS_PROVIDER_KEY     Twilio auth token — sends the lead text
 *   SMS_ACCOUNT_SID      Twilio account SID
 *   SMS_FROM_NUMBER      Twilio sending number, E.164
 *   LEAD_SMS_TO          Defaults to firm.phone.e164 (+18182452329)
 *   CRM_WEBHOOK_URL      Receives the lead as JSON (GoHighLevel, Zapier, etc.)
 */
import { firm } from "@/config/firm";
import { BEST_TIMES, phoneDigits, validateLead, type LeadInput } from "@/lib/lead-validation";

export type Lead = Required<Pick<LeadInput, "name" | "email" | "phone" | "service">> & {
  bestTime: string;
  message: string;
  page: string;
  source: string;
  receivedAt: string;
};

export type LeadResult =
  | { status: 200; body: { ok: true } }
  | { status: 400; body: { ok: false; errors: Record<string, string> } }
  | { status: 429 | 502 | 503; body: { ok: false; error: string } };

/** Minimum time between rendering the form and submitting it; faster is almost always a bot. */
export const MIN_FILL_MS = 2500;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

/**
 * In-memory sliding-window limiter. Serverless instances don't share memory, so this
 * stops bursts from one client; add a shared store (e.g. Upstash Redis) for stricter limits.
 */
export function rateLimited(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

export function resetRateLimit() {
  hits.clear();
}

const clean = (s: unknown, max: number) =>
  String(s ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);

export function normalizeLead(raw: Partial<LeadInput>): Lead {
  const digits = phoneDigits(String(raw.phone ?? ""));
  return {
    name: clean(raw.name, 120),
    email: clean(raw.email, 200),
    phone: digits.length === 10 ? `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}` : clean(raw.phone, 40),
    service: clean(raw.service, 80),
    bestTime: (BEST_TIMES as readonly string[]).includes(String(raw.bestTime)) ? String(raw.bestTime) : "Any time",
    message: clean(raw.message, 2000),
    page: clean(raw.page, 200),
    source: clean(raw.source, 60),
    receivedAt: new Date().toISOString(),
  };
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function leadText(lead: Lead): string {
  return [
    `New strategy-call request — ${firm.shortName} website`,
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Interested in: ${lead.service}`,
    `Best time: ${lead.bestTime}`,
    lead.message ? `Message: ${lead.message}` : null,
    `Page: ${lead.page || "—"} (${lead.source || "form"})`,
    `Received: ${lead.receivedAt}`,
  ]
    .filter(Boolean)
    .join("\n");
}

type Env = Record<string, string | undefined>;
type Fetch = typeof fetch;

async function sendEmail(lead: Lead, env: Env, f: Fetch) {
  const res = await f("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.EMAIL_PROVIDER_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.LEAD_EMAIL_FROM || `1Oak Website <no-reply@1oak-financial.com>`,
      to: [env.LEAD_EMAIL_TO || firm.email],
      reply_to: lead.email,
      subject: `New strategy call request: ${lead.name} (${lead.service})`,
      text: leadText(lead),
      html: `<pre style="font:15px/1.6 system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(leadText(lead))}</pre>`,
    }),
  });
  if (!res.ok) throw new Error(`email ${res.status}`);
}

async function sendSms(lead: Lead, env: Env, f: Fetch) {
  const sid = env.SMS_ACCOUNT_SID!;
  const body = new URLSearchParams({
    To: env.LEAD_SMS_TO || firm.phone.e164,
    From: env.SMS_FROM_NUMBER!,
    Body: `New 1Oak lead: ${lead.name}, ${lead.phone}, ${lead.service}. Best time: ${lead.bestTime}. Details sent to ${env.LEAD_EMAIL_TO || firm.email}.`,
  });
  const res = await f(`https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(sid)}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${env.SMS_PROVIDER_KEY}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  if (!res.ok) throw new Error(`sms ${res.status}`);
}

async function sendCrm(lead: Lead, env: Env, f: Fetch) {
  const res = await f(env.CRM_WEBHOOK_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, consent: true, consentText: "Phone, text and email about this inquiry" }),
  });
  if (!res.ok) throw new Error(`crm ${res.status}`);
}

export function configuredChannels(env: Env): ("email" | "sms" | "crm")[] {
  const out: ("email" | "sms" | "crm")[] = [];
  if (env.EMAIL_PROVIDER_KEY) out.push("email");
  if (env.SMS_PROVIDER_KEY && env.SMS_ACCOUNT_SID && env.SMS_FROM_NUMBER) out.push("sms");
  if (env.CRM_WEBHOOK_URL) out.push("crm");
  return out;
}

export async function handleLead(
  raw: Partial<LeadInput>,
  opts: { ip: string; env?: Env; fetchImpl?: Fetch; now?: number; log?: (msg: string, data?: unknown) => void },
): Promise<LeadResult> {
  const env = opts.env ?? process.env;
  const f = opts.fetchImpl ?? fetch;
  const now = opts.now ?? Date.now();
  const log = opts.log ?? ((m, d) => console.warn(m, d ?? ""));

  // Spam: honeypot filled or submitted implausibly fast. Answer "ok" so bots learn nothing.
  if (raw.website || (typeof raw.startedAt === "number" && raw.startedAt > 0 && now - raw.startedAt < MIN_FILL_MS)) {
    return { status: 200, body: { ok: true } };
  }
  if (rateLimited(opts.ip, now)) {
    return { status: 429, body: { ok: false, error: "Too many requests. Please call us instead." } };
  }
  const errors = validateLead(raw);
  if (Object.keys(errors).length) return { status: 400, body: { ok: false, errors } };

  const lead = normalizeLead(raw);
  const channels = configuredChannels(env);
  if (!channels.length) {
    log("[lead] No delivery channel configured (EMAIL_PROVIDER_KEY / SMS_PROVIDER_KEY / CRM_WEBHOOK_URL).", leadText(lead));
    return env.NODE_ENV === "production"
      ? { status: 503, body: { ok: false, error: "Lead delivery is not configured." } }
      : { status: 200, body: { ok: true } };
  }
  const jobs = channels.map((c) => (c === "email" ? sendEmail(lead, env, f) : c === "sms" ? sendSms(lead, env, f) : sendCrm(lead, env, f)));
  const results = await Promise.allSettled(jobs);
  const failed = results.flatMap((r, i) => (r.status === "rejected" ? [`${channels[i]}: ${String(r.reason)}`] : []));
  if (failed.length) log("[lead] Delivery problem", failed);
  if (failed.length === channels.length) {
    return { status: 502, body: { ok: false, error: "We couldn't deliver your request." } };
  }
  return { status: 200, body: { ok: true } };
}
