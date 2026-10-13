import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export type Tone = "ivory" | "white" | "midnight" | "navy";

const toneClass: Record<Tone, string> = {
  ivory: "bg-ivory text-ink on-light",
  white: "bg-white text-ink on-light",
  midnight: "bg-midnight text-white on-dark",
  navy: "bg-navy text-white on-dark",
};

type Props = {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
  /** Wrap the content in a scroll reveal (default true). */
  reveal?: boolean;
  labelledBy?: string;
  narrow?: boolean;
};

export function Section({ id, tone = "ivory", children, className = "", reveal = true, labelledBy, narrow }: Props) {
  const inner = <div className={`container-site ${narrow ? "max-w-[880px]" : ""}`}>{children}</div>;
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${toneClass[tone]} py-16 sm:py-20 lg:py-24 ${className}`}>
      {reveal ? <Reveal>{inner}</Reveal> : inner}
    </section>
  );
}

type HeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  as?: "h2" | "h3";
};

export function SectionHeading({ id, eyebrow, title, lead, align = "left", dark, as = "h2" }: HeadingProps) {
  const H = as;
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && <p className={`eyebrow mb-3 ${dark ? "text-champagne" : "text-burgundy"}`}>{eyebrow}</p>}
      <H id={id} className={`text-3xl leading-tight sm:text-4xl ${dark ? "text-white" : "text-midnight"}`}>
        {title}
      </H>
      {lead && <div className={`mt-4 text-lg ${dark ? "text-white/80" : "text-slate"}`}>{lead}</div>}
    </div>
  );
}
