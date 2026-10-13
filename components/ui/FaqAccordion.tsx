"use client";

import { useId, useState, type ReactNode } from "react";
import { Icon } from "./Icon";

export type FaqItem = { q: string; a: ReactNode };

/**
 * Accessible accordion (WAI-ARIA pattern): each question is a button in a heading,
 * with aria-expanded / aria-controls; answers are regions labelled by their button.
 */
export function FaqAccordion({ items, dark, headingLevel = 3 }: { items: FaqItem[]; dark?: boolean; headingLevel?: 2 | 3 }) {
  const base = useId();
  const [open, setOpen] = useState<number | null>(0);
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className={`divide-y rounded-2xl border ${dark ? "divide-white/15 border-white/15" : "divide-mist border-mist bg-white"}`}>
      {items.map((item, i) => {
        const expanded = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <div key={item.q}>
            <H className="m-0 font-sans text-base font-normal tracking-normal">
              <button
                id={btnId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className={`flex w-full items-start justify-between gap-6 px-5 py-5 text-left text-[1.06rem] font-semibold sm:px-7 ${
                  dark ? "text-white hover:text-champagne" : "text-midnight hover:text-burgundy"
                }`}
              >
                <span>{item.q}</span>
                <Icon
                  name="plus"
                  size={22}
                  className={`mt-0.5 shrink-0 transition-transform duration-200 motion-reduce:transition-none ${
                    expanded ? "rotate-45" : ""
                  } ${dark ? "text-champagne" : "text-burgundy"}`}
                />
              </button>
            </H>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!expanded}
              className={`px-5 pb-6 sm:px-7 ${dark ? "text-white/80" : "text-slate"}`}
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
