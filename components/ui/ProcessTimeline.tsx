import type { Step } from "@/content/types";
import { renderRich } from "@/lib/rich-text";

/** 3–4 step process: horizontal with a connecting rule on desktop, vertical on mobile. */
export function ProcessTimeline({ steps, dark }: { steps: Step[]; dark?: boolean }) {
  const cols = steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <ol className={`relative mt-12 grid gap-10 ${cols} lg:gap-8`}>
      <span
        aria-hidden="true"
        className={`absolute left-[1.375rem] top-2 bottom-2 w-px lg:left-0 lg:right-0 lg:top-[1.375rem] lg:bottom-auto lg:h-px lg:w-auto ${
          dark ? "bg-white/20" : "bg-champagne/60"
        }`}
      />
      {steps.map((step, i) => (
        <li key={step.title} className="relative pl-16 lg:pl-0">
          <span
            aria-hidden="true"
            className={`absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border font-display text-lg lg:relative lg:mb-6 ${
              dark ? "border-champagne bg-navy text-champagne" : "border-champagne bg-white text-burgundy"
            }`}
          >
            {i + 1}
          </span>
          <h3 className={`text-xl leading-snug ${dark ? "text-white" : "text-midnight"}`}>
            <span className="sr-only">Step {i + 1}: </span>
            {step.title}
          </h3>
          <p className={`mt-2 ${dark ? "text-white/80" : "text-slate"}`}>{renderRich(step.text)}</p>
        </li>
      ))}
    </ol>
  );
}
