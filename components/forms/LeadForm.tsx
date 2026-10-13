"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { firm, mailHref, telHref } from "@/config/firm";
import { services, type ServiceSlug } from "@/config/services";
import { LEAD_ENDPOINT } from "@/lib/site";
import { track } from "@/lib/analytics";
import { validateLead, BEST_TIMES, NOT_SURE, type LeadErrors } from "@/lib/lead-validation";
import { Icon } from "@/components/ui/Icon";

type Props = {
  variant?: "full" | "compact";
  /** Where the form sits, sent with the lead and the analytics event. */
  source: string;
  defaultService?: ServiceSlug;
  /** Visible heading for the form (rendered as h2/h3 by the caller's context). */
  heading?: string;
  headingLevel?: "h2" | "h3";
};

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER = ["name", "email", "phone", "service", "consent"] as const;

export function LeadForm({ variant = "full", source, defaultService, heading, headingLevel = "h2" }: Props) {
  const uid = useId();
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<LeadErrors>({});
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const thanksRef = useRef<HTMLHeadingElement>(null);
  const compact = variant === "compact";
  const H = headingLevel;

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  useEffect(() => {
    if (status === "success") thanksRef.current?.focus();
  }, [status]);

  const id = (name: string) => `${uid}-${name}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      service: String(fd.get("service") ?? ""),
      bestTime: String(fd.get("bestTime") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "yes",
      website: String(fd.get("website") ?? ""),
      startedAt: startedAt.current,
      page: pathname,
      source,
    };
    const found = validateLead(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = FIELD_ORDER.find((k) => found[k]);
      if (first) (formRef.current?.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Lead submit failed: ${res.status}`);
      setStatus("success");
      track("generate_lead", { form_location: source, service: data.service || NOT_SURE, page_path: pathname });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-champagne/60 bg-white p-8 text-ink shadow-card">
        <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-ivory text-burgundy ring-1 ring-champagne">
          <Icon name="check" size={26} />
        </span>
        <H ref={thanksRef} tabIndex={-1} className="text-2xl text-midnight outline-none">
          Thank you — your request is in.
        </H>
        <p className="mt-3 text-slate">
          We&apos;ll be in touch to schedule your free strategy call, usually within one business day. If it&apos;s
          time-sensitive, call us at{" "}
          <a href={telHref} data-call-location="form-thanks" className="link-body whitespace-nowrap">
            {firm.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  const err = (k: keyof LeadErrors) =>
    errors[k] ? (
      <p id={id(`${k}-error`)} className="mt-1.5 text-sm font-medium text-[#b42318]">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof LeadErrors) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? id(`${k}-error`) : undefined,
  });
  const label = "mb-1.5 block text-[0.95rem] font-semibold text-midnight";
  const req = (
    <span className="text-burgundy" aria-hidden="true">
      {" "}
      *
    </span>
  );
  const errorCount = Object.keys(errors).length;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={heading ? id("heading") : undefined}
      aria-label={heading ? undefined : "Request a free strategy call"}
      className={`rounded-2xl bg-white text-ink shadow-card ${compact ? "p-6 sm:p-7" : "p-6 sm:p-9"}`}
    >
      {heading && (
        <H id={id("heading")} className={`${compact ? "text-2xl" : "text-[1.75rem]"} mb-1 text-midnight`}>
          {heading}
        </H>
      )}
      <p className="mb-6 text-sm text-slate">
        Fields marked <span className="text-burgundy">*</span> are required. Please don&apos;t include Social Security or
        account numbers.
      </p>

      {errorCount > 0 && (
        <div role="alert" className="mb-6 rounded-lg border border-[#b42318]/40 bg-[#fef3f2] px-4 py-3 text-sm text-[#7a271a]">
          Please fix {errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`} and try again.
        </div>
      )}

      <div className={`grid gap-5 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor={id("name")} className={label}>
            Name{req}
          </label>
          <input id={id("name")} name="name" type="text" autoComplete="name" required className="field" {...a11y("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor={id("email")} className={label}>
            Email{req}
          </label>
          <input id={id("email")} name="email" type="email" autoComplete="email" inputMode="email" required className="field" {...a11y("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor={id("phone")} className={label}>
            Phone{req}
          </label>
          <input id={id("phone")} name="phone" type="tel" autoComplete="tel" inputMode="tel" required className="field" {...a11y("phone")} />
          {err("phone")}
        </div>
        <div>
          <label htmlFor={id("bestTime")} className={label}>
            Best time to reach you
          </label>
          <select id={id("bestTime")} name="bestTime" defaultValue="Any time" className="field">
            {BEST_TIMES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id("service")} className={label}>
            What are you looking for help with?{req}
          </label>
          <select
            id={id("service")}
            name="service"
            required
            defaultValue={defaultService ? services.find((s) => s.slug === defaultService)?.name : ""}
            className="field"
            {...a11y("service")}
          >
            <option value="" disabled>
              Choose a service…
            </option>
            {services.map((s) => (
              <option key={s.slug}>{s.name}</option>
            ))}
            <option>{NOT_SURE}</option>
          </select>
          {err("service")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className={label}>
            Message <span className="font-normal text-slate">(optional)</span>
          </label>
          <textarea id={id("message")} name="message" rows={compact ? 2 : 4} maxLength={2000} className="field" />
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6">
        <div className="flex items-start gap-3">
          <input
            id={id("consent")}
            name="consent"
            type="checkbox"
            value="yes"
            required
            className="mt-1 h-5 w-5 shrink-0 accent-[var(--burgundy)]"
            {...a11y("consent")}
          />
          <label htmlFor={id("consent")} className="text-sm leading-relaxed text-slate">
            I agree to be contacted by {firm.name} by phone, text message or email about my inquiry. Consent is not a
            condition of any purchase. Message and data rates may apply; reply STOP to opt out of texts. See our{" "}
            <Link href="/privacy-disclosures" className="link-body">
              Privacy Policy
            </Link>
            .{req}
          </label>
        </div>
        {err("consent")}
      </div>

      {status === "error" && (
        <div role="alert" className="mt-6 rounded-lg border border-[#b42318]/40 bg-[#fef3f2] px-4 py-3 text-sm text-[#7a271a]">
          We couldn&apos;t send your request just now. Please call{" "}
          <a href={telHref} data-call-location="form-error" className="font-semibold underline">
            {firm.phone.display}
          </a>{" "}
          or email{" "}
          <a href={mailHref} className="font-semibold underline">
            {firm.email}
          </a>
          .
        </div>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn btn-primary mt-7 w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Request My Free Strategy Call"}
      </button>
    </form>
  );
}
