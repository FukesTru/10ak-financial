import type { Metadata } from "next";
import { confirmed, firm, fullAddress, isSet, mailHref, mapsLinkUrl } from "@/config/firm";
import { contactContent as c } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";
import { renderRich } from "@/lib/rich-text";
import { breadcrumbs, faqPage, graph, organization } from "@/lib/schema";
import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Faqs } from "@/components/ui/Faqs";
import { ClientPhoto } from "@/components/ui/ClientPhoto";
import { JsonLd } from "@/components/ui/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = pageMetadata({
  title: c.seo.title,
  description: c.seo.description,
  path: "/contact",
  imageId: "IMG-09",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  const hours = confirmed(firm.hours);
  return (
    <>
      <JsonLd data={graph(organization({ contact: true }), faqPage(c.faqs), breadcrumbs(crumbs))} />
      <Hero imageId="IMG-09" eyebrow="Contact" h1={c.hero.h1} subhead={c.hero.subhead} breadcrumbs={crumbs} size="compact" />

      <section aria-labelledby="form-heading" className="on-light bg-ivory py-16 sm:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <Reveal>
            <h2 id="form-heading" className="text-3xl text-midnight sm:text-4xl">
              {c.formIntro.heading}
            </h2>
            <p className="mb-8 mt-3 max-w-2xl text-lg text-slate">{renderRich(c.formIntro.text)}</p>
            <LeadForm source="contact" />
            {/* Calendar embed slot: paste a GoHighLevel / Calendly embed URL into firm.calendarEmbedUrl. */}
            {isSet(firm.calendarEmbedUrl) && (
              <div className="mt-10">
                <h2 className="text-2xl text-midnight">Prefer to pick a time yourself?</h2>
                <iframe
                  title="Schedule a free strategy call"
                  src={firm.calendarEmbedUrl}
                  loading="lazy"
                  className="mt-4 h-[720px] w-full rounded-2xl border border-mist bg-white"
                />
              </div>
            )}
          </Reveal>
          <Reveal delay={0.1} className="space-y-6">
            <div className="on-dark rounded-2xl bg-midnight p-7 text-white shadow-card sm:p-8">
              <h2 className="text-2xl text-white">Contact details</h2>
              <ul className="mt-6 space-y-5">
                <li className="flex gap-4">
                  <Icon name="phone" size={22} className="mt-1 shrink-0 text-champagne" />
                  <div>
                    <p className="text-sm text-white/65">Phone</p>
                    <PhoneLink location="contact-card" className="text-xl font-semibold hover:text-champagne" />
                  </div>
                </li>
                <li className="flex gap-4">
                  <Icon name="mail" size={22} className="mt-1 shrink-0 text-champagne" />
                  <div>
                    <p className="text-sm text-white/65">Email</p>
                    <a href={mailHref} className="text-lg font-semibold hover:text-champagne">
                      {firm.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Icon name="pin" size={22} className="mt-1 shrink-0 text-champagne" />
                  <div>
                    <p className="text-sm text-white/65">Office</p>
                    <address className="not-italic">
                      <a href={mapsLinkUrl} target="_blank" rel="noopener noreferrer" className="hover:text-champagne">
                        {firm.address.street}
                        <br />
                        {firm.address.city}, {firm.address.region} {firm.address.postalCode}
                        <span className="sr-only"> (opens Google Maps in a new tab)</span>
                      </a>
                    </address>
                  </div>
                </li>
                {hours && (
                  <li className="flex gap-4">
                    <Icon name="clock" size={22} className="mt-1 shrink-0 text-champagne" />
                    <div>
                      <p className="text-sm text-white/65">Hours</p>
                      <p>{hours}</p>
                    </div>
                  </li>
                )}
                <li className="flex gap-4">
                  <Icon name="video" size={22} className="mt-1 shrink-0 text-champagne" />
                  <div>
                    <p className="text-sm text-white/65">Not near Monrovia?</p>
                    <p>We meet with clients across California by video and phone.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="hidden lg:block">
              <ClientPhoto
                name="theo-minassian-headshot"
                alt={`${firm.owner.name}, founder of ${firm.name}`}
                caption={`You'll speak with ${firm.owner.name}`}
                sizes="420px"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Section tone="navy" labelledBy="call-steps-heading">
        <SectionHeading id="call-steps-heading" eyebrow="Your free strategy call" title={c.callSteps.heading} dark />
        <ProcessTimeline steps={c.callSteps.steps} dark />
      </Section>

      <Section tone="white" labelledBy="map-heading">
        <SectionHeading id="map-heading" eyebrow="Visit us" title="Our Monrovia office" lead={<>{fullAddress}</>} />
        <MapEmbed className="mt-8" />
      </Section>

      <Section tone="ivory" labelledBy="contact-faq-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.8fr] lg:gap-16">
          <SectionHeading id="contact-faq-heading" eyebrow="Before you reach out" title="Common questions" />
          <Faqs faqs={c.faqs} />
        </div>
      </Section>
    </>
  );
}
