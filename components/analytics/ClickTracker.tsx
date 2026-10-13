"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Tracks every click-to-call and email link site-wide (event: click_to_call / click_email). */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='tel:'], a[href^='mailto:']") as HTMLAnchorElement | null;
      if (!a) return;
      const isTel = a.getAttribute("href")!.startsWith("tel:");
      track(isTel ? "click_to_call" : "click_email", {
        link_location: a.dataset.callLocation ?? "body",
        page_path: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
