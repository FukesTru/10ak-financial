import Link from "next/link";
import type { LicenseKey } from "@/config/firm";
import { firm } from "@/config/firm";
import type { ServiceSlug } from "@/config/services";
import type { RichText } from "@/content/types";
import { renderRich } from "@/lib/rich-text";
import { LeadForm } from "@/components/forms/LeadForm";
import { Picture } from "./Picture";
import { PhoneLink } from "./PhoneLink";
import { Icon } from "./Icon";
import { Disclaimer } from "./Disclaimer";
import { LicenseDisclosure } from "./LicenseDisclosure";
import { Reveal } from "./Reveal";

type Props = {
  heading: string;
  text: RichText;
  /** Show the lead form beside the text ("full" on home, "compact" on service pages). */
  form?: "full" | "compact" | false;
  formSource: string;
  defaultService?: ServiceSlug;
  disclaimerTopic?: string;
  showDisclaimer?: boolean;
  licenses?: LicenseKey[];
  id?: string;
};

/** Full-width navy CTA band with burgundy button, phone number and optional lead form. */
export function CtaBand({
  heading,
  text,
  form = false,
  formSource,
  defaultService,
  disclaimerTopic,
  showDisclaimer = true,
  licenses,
  id = "get-started",
}: Props) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="on-dark relative isolate overflow-hidden bg-navy py-20 text-white lg:py-24">
      <Picture
        id="IMG-10"
        sizes="100vw"
        className="absolute inset-0 -z-20 block h-full w-full"
        imgClassName="h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy/80" />
      <div className={`container-site grid gap-12 ${form ? "lg:grid-cols-[1fr_1.05fr] lg:items-start" : ""}`}>
        <Reveal className={form ? "" : "mx-auto max-w-3xl text-center"}>
          <p className="eyebrow mb-3 text-champagne">Free strategy call</p>
          <h2 id={headingId} className="text-3xl leading-tight text-white sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-white/85">{renderRich(text)}</p>
          <div className={`mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap ${form ? "" : "sm:justify-center"}`}>
            <Link href="/contact" className="btn btn-primary">
              Book a Free Strategy Call
            </Link>
            <PhoneLink location="cta-band" className="btn btn-secondary-dark">
              <Icon name="phone" size={20} />
              {firm.phone.display}
            </PhoneLink>
          </div>
          {(showDisclaimer || licenses?.length) && (
            <div className={`mt-8 space-y-4 ${form ? "max-w-xl" : "mx-auto max-w-2xl"}`}>
              {showDisclaimer && <Disclaimer topic={disclaimerTopic} dark />}
              {licenses?.length ? <LicenseDisclosure keys={licenses} dark /> : null}
            </div>
          )}
        </Reveal>
        {form && (
          <Reveal delay={0.1}>
            <LeadForm
              variant={form}
              source={formSource}
              defaultService={defaultService}
              heading={form === "compact" ? "Request a call back" : "Tell us a little about you"}
              headingLevel="h3"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
