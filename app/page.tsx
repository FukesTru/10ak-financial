import Link from "next/link";
import type { Metadata } from "next";
import { firm } from "@/config/firm";
import { serviceGroups, servicesInGroup } from "@/config/services";
import { areas, featuredAreaIds } from "@/config/areas";
import { homeContent as c } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";
import { renderRich } from "@/lib/rich-text";
import { faqPage, graph, organization } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";
import type { ImageId } from "@/lib/images";
import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { Faqs } from "@/components/ui/Faqs";
import { CtaBand } from "@/components/ui/CtaBand";
import { Picture } from "@/components/ui/Picture";
import { ClientPhoto } from "@/components/ui/ClientPhoto";
import { ReviewsBlock } from "@/components/ui/ReviewsBlock";
import { JsonLd } from "@/components/ui/JsonLd";
import { Icon, type UiIconName } from "@/components/ui/Icon";
import { LeafMark } from "@/components/brand/Logo";

export const metadata: Metadata = pageMetadata({
  title: c.seo.title,
  description: c.seo.description,
  path: "/",
  imageId: "IMG-01",
});

const TRUST: { icon: UiIconName; label: string }[] = [
  { icon: "calendar", label: "Free initial strategy call" },
  { icon: "pin", label: "Office in Monrovia, CA" },
  { icon: "video", label: "Serving clients across California" },
  { icon: "check", label: "Plain-English planning" },
];

const WHO_IMAGES: ImageId[] = ["IMG-03", "IMG-04", "IMG-05"];

export default function HomePage() {
  const featured = featuredAreaIds.map((id) => areas.find((a) => a.id === id)!);
  const schema = graph(
    organization({ catalog: true }),
    {
      "@type": "WebSite",
      "@id": `${absoluteUrl("/")}#website`,
      url: absoluteUrl("/"),
      name: firm.name,
      publisher: { "@id": `${absoluteUrl("/")}#organization` },
      inLanguage: "en-US",
    },
    faqPage(c.faqs),
  );

  return (
    <>
      <JsonLd data={schema} />
      <Hero
        size="home"
        imageId="IMG-01"
        eyebrow="Tax · Accounting · Financial Planning"
        h1={c.hero.h1}
        subhead={c.hero.subhead}
        primary={{ label: "Book a Free Strategy Call", href: "/contact" }}
        secondary={{ label: "Explore Services", href: "/services" }}
      />

      {/* 2. Trust strip — verifiable facts only, nothing numeric */}
      <section aria-label="Why clients reach out" className="on-light border-b border-mist bg-white">
        <ul className="container-site grid grid-cols-2 gap-x-6 gap-y-6 py-8 lg:grid-cols-4">
          {TRUST.map((t) => (
            <li key={t.label} className="flex items-center gap-3 font-semibold text-midnight">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory text-burgundy ring-1 ring-champagne/60">
                <Icon name={t.icon} size={22} />
              </span>
              <span className="text-[0.98rem] leading-snug">{t.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Who we help */}
      <Section tone="ivory" labelledBy="who-heading">
        <SectionHeading id="who-heading" eyebrow="Who we help" title={c.whoWeHelp.heading} lead={renderRich(c.whoWeHelp.lead)} />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {c.whoWeHelp.cards.map((card, i) => (
            <article key={card.title} className="flex flex-col overflow-hidden rounded-2xl border border-mist bg-white shadow-card">
              <Picture
                id={WHO_IMAGES[i]}
                sizes="(min-width: 768px) 380px, 100vw"
                className="block aspect-[4/3] w-full overflow-hidden"
                imgClassName="h-full w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-2xl text-midnight">{card.title}</h3>
                <p className="mt-3 flex-1 text-slate">{renderRich(card.text)}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Services for ${card.title.toLowerCase()}`}>
                  {card.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-flex rounded-full border border-burgundy/30 px-3 py-1.5 text-sm font-semibold text-burgundy hover:border-burgundy hover:bg-burgundy hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 4. Services overview — all 14, in the mega-menu groups */}
      <Section tone="white" labelledBy="services-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading id="services-heading" eyebrow="Services" title={c.servicesOverview.heading} lead={renderRich(c.servicesOverview.lead)} />
          <Link href="/services" className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-burgundy hover:underline">
            All services <Icon name="arrow" size={18} />
          </Link>
        </div>
        {serviceGroups.map((g) => (
          <div key={g.id} className="mt-14">
            <div className="flex items-baseline gap-4 border-b border-mist pb-3">
              <h3 className="text-2xl text-midnight">{g.label}</h3>
              <p className="hidden text-slate md:block">{g.blurb}</p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {servicesInGroup(g.id).map((s) => (
                <ServiceCard key={s.slug} service={s} headingLevel="h4" />
              ))}
            </div>
          </div>
        ))}
      </Section>

      {/* 5. Why 1Oak */}
      <Section tone="navy" labelledBy="why-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <Picture
              id="IMG-02"
              sizes="(min-width: 1024px) 560px, 100vw"
              className="block aspect-[4/3] overflow-hidden rounded-2xl"
              imgClassName="h-full w-full object-cover"
            />
            <span aria-hidden="true" className="absolute -bottom-4 -right-4 hidden h-24 w-24 rounded-2xl border border-champagne/60 lg:block" />
          </div>
          <div>
            <SectionHeading id="why-heading" eyebrow="Our philosophy" title={c.why.heading} lead={renderRich(c.why.lead)} dark />
            <ol className="mt-10 space-y-8">
              {c.why.pillars.map((p) => (
                <li key={p.title} className="flex gap-5">
                  <LeafMark className="mt-1 h-9 w-9 shrink-0 text-champagne" />
                  <div>
                    <h3 className="text-xl text-white">{p.title}</h3>
                    <p className="mt-2 text-white/80">{renderRich(p.text)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* 6. How we work */}
      <Section tone="ivory" labelledBy="how-heading">
        <SectionHeading
          id="how-heading"
          eyebrow="How we work"
          title={c.howWeWork.heading}
          lead={c.howWeWork.lead ? renderRich(c.howWeWork.lead) : undefined}
        />
        <ProcessTimeline steps={c.howWeWork.steps} />
        <div className="mt-12">
          <Link href="/contact" className="btn btn-primary">
            Book a Free Strategy Call
          </Link>
        </div>
      </Section>

      {/* 7. Meet Theo */}
      <Section tone="white" labelledBy="theo-heading">
        <div className="grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <ClientPhoto
            name="theo-minassian-headshot"
            alt={`${firm.owner.name}, founder of ${firm.name}`}
            caption={`${firm.owner.name}, Founder`}
            sizes="(min-width: 768px) 400px, 90vw"
            className="mx-auto w-full max-w-sm"
          />
          <div>
            <SectionHeading id="theo-heading" eyebrow="Meet your advisor" title={c.meetTheo.heading} />
            <div className="prose-site mt-6 text-lg text-ink">
              {c.meetTheo.bio.map((p, i) => (
                <p key={i}>{renderRich(p)}</p>
              ))}
            </div>
            <Link href="/about" className="mt-8 inline-flex items-center gap-1.5 font-semibold text-burgundy hover:underline">
              More about Theo and 1Oak <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </Section>

      {/* 8. Service area snapshot */}
      <Section tone="midnight" labelledBy="areas-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <SectionHeading id="areas-heading" eyebrow="Service areas" title={c.areas.heading} lead={renderRich(c.areas.lead)} dark />
          <div>
            <ul className="flex flex-wrap gap-3">
              {featured.map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/service-areas#${a.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-white/90 hover:border-champagne hover:text-white"
                  >
                    <Icon name="pin" size={16} className="text-champagne" />
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/service-areas" className="mt-8 inline-flex items-center gap-1.5 font-semibold text-champagne hover:underline">
              See all 20 communities we serve <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </Section>

      {/* 9. Reviews — renders only once real, verified reviews are in config */}
      <ReviewsBlock />

      {/* 10. FAQ */}
      <Section tone="ivory" labelledBy="home-faq-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.8fr] lg:gap-16">
          <SectionHeading id="home-faq-heading" eyebrow="FAQ" title="Questions people ask before the first call" />
          <Faqs faqs={c.faqs} />
        </div>
      </Section>

      {/* 11. CTA band with lead form */}
      <CtaBand heading={c.cta.heading} text={c.cta.text} form="full" formSource="home" showDisclaimer={false} />
    </>
  );
}
