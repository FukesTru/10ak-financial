import Link from "next/link";
import type { Metadata } from "next";
import { confirmed, firm, fullAddress, mailHref } from "@/config/firm";
import { regions } from "@/config/areas";
import { serviceBySlug, servicePath } from "@/config/services";
import { cityBlocks, serviceAreasContent as c } from "@/content/service-areas";
import { pageMetadata } from "@/lib/seo";
import { renderRich } from "@/lib/rich-text";
import { areaServed, breadcrumbs, graph, organization } from "@/lib/schema";
import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { PhoneLink } from "@/components/ui/PhoneLink";

export const metadata: Metadata = pageMetadata({
  title: c.seo.title,
  description: c.seo.description,
  path: "/service-areas",
  imageId: "IMG-08",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Service Areas", path: "/service-areas" },
];

export default function ServiceAreasPage() {
  const hours = confirmed(firm.hours);
  const org = { ...organization(), areaServed: areaServed() };
  return (
    <>
      <JsonLd data={graph(org, breadcrumbs(crumbs))} />
      <Hero
        imageId="IMG-08"
        eyebrow="Service areas"
        h1={c.hero.h1}
        subhead={c.hero.subhead}
        breadcrumbs={crumbs}
        primary={{ label: "Book a Free Strategy Call", href: "/contact" }}
        secondary="call"
      />

      <Section tone="white" labelledBy="areas-intro-heading">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading id="areas-intro-heading" eyebrow="Headquartered in Monrovia" title={c.intro.heading} />
            <div className="prose-site mt-6 text-[1.06rem] text-ink">
              {c.intro.paragraphs.map((p, i) => (
                <p key={i}>{renderRich(p)}</p>
              ))}
            </div>
            <dl className="mt-8 grid gap-4 rounded-2xl border border-mist bg-ivory p-6 text-ink sm:grid-cols-2">
              <div>
                <dt className="eyebrow text-burgundy">Office</dt>
                <dd className="mt-1">{fullAddress}</dd>
              </div>
              <div>
                <dt className="eyebrow text-burgundy">Phone</dt>
                <dd className="mt-1">
                  <PhoneLink location="service-areas" className="link-body" />
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-burgundy">Email</dt>
                <dd className="mt-1">
                  <a href={mailHref} className="link-body">
                    {firm.email}
                  </a>
                </dd>
              </div>
              {hours && (
                <div>
                  <dt className="eyebrow text-burgundy">Hours</dt>
                  <dd className="mt-1">{hours}</dd>
                </div>
              )}
            </dl>
          </div>
          <MapEmbed />
        </div>
      </Section>

      {/* Jump menu */}
      <section aria-labelledby="jump-heading" className="on-light border-y border-mist bg-ivory py-10">
        <div className="container-site">
          <h2 id="jump-heading" className="text-2xl text-midnight">
            Jump to your area
          </h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {regions.map((r) => (
              <nav key={r} aria-label={`${r} communities`}>
                <p className="eyebrow mb-3 text-burgundy">{r}</p>
                <ul className="space-y-1.5">
                  {cityBlocks
                    .filter((b) => b.region === r)
                    .map((b) => (
                      <li key={b.id}>
                        <a href={`#${b.id}`} className="text-midnight underline-offset-4 hover:text-burgundy hover:underline">
                          {b.name}
                        </a>
                      </li>
                    ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </section>

      {regions.map((r, i) => {
        const blocks = cityBlocks.filter((b) => b.region === r);
        const regionId = r.toLowerCase().replace(/\s+/g, "-");
        return (
          <Section key={r} tone={i % 2 === 0 ? "white" : "ivory"} labelledBy={`${regionId}-heading`}>
            <SectionHeading id={`${regionId}-heading`} eyebrow="Region" title={r} lead={renderRich(c.regionIntros[r])} />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {blocks.map((b) => (
                <article
                  key={b.id}
                  id={b.id}
                  aria-labelledby={`${b.id}-name`}
                  className={`scroll-mt-[calc(var(--header-h)+24px)] rounded-2xl border border-mist p-7 ${i % 2 === 0 ? "bg-ivory" : "bg-white"}`}
                >
                  <h3 id={`${b.id}-name`} className="flex items-center gap-2 text-2xl text-midnight">
                    <Icon name="pin" size={20} className="text-burgundy" />
                    {b.name}
                  </h3>
                  <p className="mt-3 text-ink">{renderRich(b.body)}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Popular services in ${b.name}`}>
                    {b.services.map((s) => (
                      <li key={s}>
                        <Link
                          href={servicePath(s)}
                          className="inline-flex rounded-full border border-burgundy/30 bg-white px-3 py-1 text-sm font-semibold text-burgundy hover:border-burgundy"
                        >
                          {serviceBySlug[s].navLabel}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Section>
        );
      })}

      <Section tone="navy" labelledBy="notlisted-heading" narrow>
        <div className="text-center">
          <h2 id="notlisted-heading" className="text-3xl text-white">
            {c.notListed.heading}
          </h2>
          <p className="mt-4 text-lg text-white/85">{renderRich(c.notListed.text)}</p>
        </div>
      </Section>

      <CtaBand heading={c.cta.heading} text={c.cta.text} formSource="service-areas" />
    </>
  );
}
