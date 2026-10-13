"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { CONSENT_KEY } from "@/lib/analytics";

type Choice = "accepted" | "declined";
const OPEN_EVENT = "oak:cookie-settings";

declare global {
  interface Window {
    __oakLoadGa?: () => void;
  }
  interface Navigator {
    globalPrivacyControl?: boolean;
  }
}

function read(): Choice | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

function save(choice: Choice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    /* storage unavailable: the choice applies to this page view only */
  }
}

/* Tiny external store: visible when no choice is stored (and no GPC), or when reopened from the footer. */
let reopened = false;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onOpen = () => {
    reopened = true;
    notify();
  };
  window.addEventListener(OPEN_EVENT, onOpen);
  return () => {
    listeners.delete(listener);
    window.removeEventListener(OPEN_EVENT, onOpen);
  };
}
const getSnapshot = () => reopened || (!read() && navigator.globalPrivacyControl !== true);
const getServerSnapshot = () => false;

/** Lightweight cookie notice: accept or decline analytics cookies. Honors Global Privacy Control. */
export function CookieNotice() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const choose = (choice: Choice) => {
    save(choice);
    reopened = false;
    notify();
    window.gtag?.("consent", "update", { analytics_storage: choice === "accepted" ? "granted" : "denied" });
    if (choice === "accepted") window.__oakLoadGa?.();
  };

  if (!visible) return null;
  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-3 bottom-[4.75rem] z-40 rounded-2xl border border-champagne/50 bg-midnight p-4 text-[0.85rem] text-white sm:p-5 sm:text-sm shadow-[0_20px_50px_-15px_rgb(0_0_0/0.6)] sm:left-auto sm:right-4 sm:max-w-md lg:bottom-6 lg:left-6 lg:right-auto"
    >
      <p className="text-white/85">
        We use a small number of cookies for basic, aggregated site analytics. You can accept or decline analytics cookies;
        the site works the same either way.{" "}
        <Link href="/privacy-disclosures#cookies" className="text-champagne underline">
          Read our cookie policy
        </Link>
        .
      </p>
      <div className="mt-3 flex gap-3">
        <button type="button" onClick={() => choose("accepted")} className="btn btn-primary min-h-[42px] px-5 text-sm">
          Accept
        </button>
        <button type="button" onClick={() => choose("declined")} className="btn btn-secondary-dark min-h-[42px] px-5 text-sm">
          Decline
        </button>
      </div>
    </div>
  );
}

/** Footer link that reopens the cookie notice so visitors can change their choice. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie settings
    </button>
  );
}
