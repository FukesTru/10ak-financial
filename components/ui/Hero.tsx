import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageId } from "@/lib/images";
import { firm } from "@/config/firm";
import { Picture } from "./Picture";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { PhoneLink } from "./PhoneLink";
import { Icon } from "./Icon";

type Action = { label: string; href: string };

type Props = {
  imageId?: ImageId;
  h1: string;
  subhead: string;
  eyebrow?: string;
  breadcrumbs?: Crumb[];
  primary?: Action;
  /** A second link, or "call" for a click-to-call button. */
  secondary?: Action | "call";
  size?: "home" | "page" | "compact";
  children?: ReactNode;
};

/** Dark hero: background image, ~70% navy overlay, H1 with champagne underline, primary + secondary action. */
export function Hero({ imageId, h1, subhead, eyebrow, breadcrumbs, primary, secondary, size = "page", children }: Props) {
  const pad =
    size === "home"
      ? "min-h-[86svh] pt-[calc(var(--header-h)+56px)] pb-20 lg:pb-28"
      : size === "compact"
        ? "pt-[calc(var(--header-h)+40px)] pb-14"
        : "min-h-[540px] pt-[calc(var(--header-h)+40px)] pb-16 lg:pb-24";
  return (
    <section className="on-dark relative isolate flex items-end overflow-hidden bg-midnight text-white">
      {imageId ? (
        <Picture
          id={imageId}
          sizes="100vw"
          priority
          className="absolute inset-0 -z-20 block h-full w-full"
          imgClassName="h-full w-full object-cover"
        />
      ) : (
        <div aria-hidden="true" className="img-placeholder absolute inset-0 -z-20" />
      )}
      {/* Navy overlay (~70%) with a stronger left edge so text stays readable on any crop. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-midnight/70" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-midnight/70 via-midnight/25 to-transparent"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-midnight/60 to-transparent" />

      <div className={`container-site w-full ${pad} flex flex-col justify-end`}>
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow mb-4 text-champagne">{eyebrow}</p>}
          <h1
            className={`h1-accent text-white ${
              size === "home" ? "text-4xl leading-[1.1] sm:text-5xl lg:text-6xl" : "text-[2.1rem] leading-[1.15] sm:text-5xl"
            }`}
          >
            {h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85 sm:text-xl">{subhead}</p>
          {(primary || secondary) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {primary && (
                <Link href={primary.href} className="btn btn-primary">
                  {primary.label}
                </Link>
              )}
              {secondary === "call" ? (
                <PhoneLink location="hero" className="btn btn-secondary-dark">
                  <Icon name="phone" size={20} />
                  <span>
                    Call <span className="whitespace-nowrap">{firm.phone.display}</span>
                  </span>
                </PhoneLink>
              ) : secondary ? (
                <Link href={secondary.href} className="btn btn-secondary-dark">
                  {secondary.label}
                </Link>
              ) : null}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
