import Link from "next/link";
import type { Metadata } from "next";
import { serviceBySlug, serviceGroups, servicesInGroup, servicePath } from "@/config/services";
import { servicesHubContent as c } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";
import { renderRich } from "@/lib/rich-text";
import { breadcrumbs, graph, serviceItemList } from "@/lib/schema";
import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = pageMetadata({
  title: c.seo.title,
  description: c.seo.description,
  path: "/services",
  imageId: "IMG-06",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesHubPage() {
  return (
    <>
      <JsonLd data={graph(serviceItemList(), breadcrumbs(crumbs))} />
      <Hero
        imageId="IMG-06"
        eyebrow="Services"
        h1={c.hero.h1}
        subhead={c.hero.subhead}
        breadcrumbs={crumbs}
        primary={{ label: "Book a Free Strategy Call", href: "/contact" }}
        secondary="call"
      />

      <Section tone="white" labelledBy="hub-intro-heading">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <SectionHeading id="hub-intro-heading" eyebrow="How it fits together" title={c.intro.heading} />
            <div className="prose-site mt-6 text-[1.06rem] text-ink">
              {c.intro.paragraphs.map((p, i) => (
                <p key={i}>{renderRich(p)}</p>
              ))}
            </div>
          </div>
          <nav aria-label="Service groups" className="self-start rounded-2xl border border-mist bg-ivory p-7">
            <p className="eyebrow text-burgundy">Jump to</p>
            <ul className="mt-4 space-y-3">
              {serviceGroups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="group flex items-start gap-3">
                    <Icon name="arrow" size={18} className="mt-1 shrink-0 text-burgundy transition-transform group-hover:translate-x-1" />
                    <span>
                      <span className="block font-semibold text-midnight group-hover:text-burgundy">{g.label}</span>
                      <span className="block text-sm text-slate">{servicesInGroup(g.id).length} services</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Section>

      {serviceGroups.map((g, i) => (
        <Section key={g.id} id={g.id} tone={i % 2 === 0 ? "ivory" : "white"} labelledBy={`${g.id}-heading`}>
          <SectionHeading id={`${g.id}-heading`} eyebrow={`${servicesInGroup(g.id).length} services`} title={g.label} lead={renderRich(c.groupIntros[g.id])} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {servicesInGroup(g.id).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Section>
      ))}

      <Section tone="navy" labelledBy="start-heading">
        <SectionHeading id="start-heading" eyebrow="Where to start" title={c.whereToStart.heading} lead={renderRich(c.whereToStart.lead)} dark />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {c.whereToStart.situations.map((s) => {
            const svc = serviceBySlug[s.service];
            return (
              <li key={s.situation} className="flex flex-col rounded-2xl border border-white/15 bg-white/5 p-7">
                <h3 className="text-xl text-white">{s.situation}</h3>
                <p className="mt-3 flex-1 text-white/80">{renderRich(s.text)}</p>
                <Link href={servicePath(svc.slug)} className="mt-6 inline-flex items-center gap-1.5 font-semibold text-champagne hover:underline">
                  Start with {svc.name} <Icon name="arrow" size={18} />
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="ivory" labelledBy="hub-process-heading">
        <SectionHeading
          id="hub-process-heading"
          eyebrow="Our process"
          title={c.process.heading}
          lead={c.process.lead ? renderRich(c.process.lead) : undefined}
        />
        <ProcessTimeline steps={c.process.steps} />
      </Section>

      <CtaBand heading={c.cta.heading} text={c.cta.text} formSource="services-hub" />
    </>
  );
}
