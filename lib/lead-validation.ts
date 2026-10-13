/** Shared by the lead form (client) and the API route (server). */
export const NOT_SURE = "Not sure yet";
export const BEST_TIMES = ["Any time", "Morning", "Midday", "Afternoon", "Evening"] as const;

export type LeadInput = {
  name: string;
  email: string;
  phone: string;
  service: string;
  bestTime?: string;
  message?: string;
  consent: boolean;
  /** Honeypot — must be empty. */
  website?: string;
  /** Epoch ms when the form was rendered. */
  startedAt?: number;
  page?: string;
  source?: string;
};

export type LeadErrors = Partial<Record<"name" | "email" | "phone" | "service" | "consent", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function phoneDigits(phone: string): string {
  const d = phone.replace(/\D/g, "");
  return d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
}

export function validateLead(input: Partial<LeadInput>): LeadErrors {
  const errors: LeadErrors = {};
  const name = (input.name ?? "").trim();
  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 120) errors.name = "Please shorten your name.";
  if (!EMAIL_RE.test((input.email ?? "").trim())) errors.email = "Please enter a valid email address.";
  if (phoneDigits(input.phone ?? "").length !== 10) errors.phone = "Please enter a 10-digit phone number.";
  if (!(input.service ?? "").trim()) errors.service = "Please choose a topic, or “Not sure yet”.";
  if (input.consent !== true) errors.consent = "Please confirm we may contact you about your request.";
  return errors;
}
