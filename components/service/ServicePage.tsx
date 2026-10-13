import Link from "next/link";
import { firm } from "@/config/firm";
import { serviceBySlug, serviceGroups, type Service } from "@/config/services";
import { isExtraConfirmed } from "@/config/extra-services";
import type { ExtraBlock, ServiceContent } from "@/content/types";
import { renderRich, resolveConditional } from "@/lib/rich-text";
import { breadcrumbs, faqPage, graph, serviceEntity } from "@/lib/schema";
import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { Faqs } from "@/components/ui/Faqs";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { PhoneLink } from "@/components/ui/PhoneLink";

type Slot = "intro" | "included" | "bestFor" | "process";

export function ServicePage({ content }: { content: ServiceContent }) {
  const service = serviceBySlug[content.slug];
  const group = serviceGroups.find((g) => g.id === service.group)!;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];
  const extrasAfter = (slot: Slot) => (content.extras ?? []).filter((x) => x.after === slot);
  const conditionalAfter = (slot: Slot) =>
    (content.conditional ?? [])
      .filter((c) => c.after === slot)
      .map((c) => resolveConditional(c))
      .filter((t): t is string => Boolean(t));
  const heldBack = (content.heldBack ?? []).filter((h) => isExtraConfirmed(h.id));
  const related = content.related.map((s) => serviceBySlug[s]);

  const schema = graph(
    serviceEntity(service, content.schema.description, content.schema.serviceType),
    faqPage(content.faqs),
    breadcrumbs(crumbs),
  );

  const slotExtras = (slot: Slot, dark = false) => {
    const extras = extrasAfter(slot);
    const notes = conditionalAfter(slot);
    if (!extras.length && !notes.length) return null;
    return (
      <div className="mt-14 space-y-12">
        {notes.map((n) => (
          <p key={n} className={`max-w-3xl ${dark ? "text-white/85" : "text-ink"}`}>
            {renderRich(n)}
          </p>
        ))}
        {extras.map((x) => (
          <ExtraSection key={x.heading} block={x} dark={dark} />
        ))}
      </div>
    );
  };

  return (
    <>
      <JsonLd data={schema} />
      <Hero
        imageId={service.imageId}
        eyebrow={group.label}
        h1={content.hero.h1}
        subhead={content.hero.subhead}
        breadcrumbs={crumbs}
        primary={{ label: "Free Strategy Call", href: "/contact" }}
        secondary="call"
      />

      {/* 2. Intro */}
      <Section tone="white" labelledBy="intro-heading">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div>
            <SectionHeading id="intro-heading" eyebrow={service.name} title={content.intro.heading} />
            <div className="prose-site mt-6 text-[1.06rem] text-ink">
              {content.intro.paragraphs.map((p, i) => (
                <p key={i}>{renderRich(p)}</p>
              ))}
            </div>
          </div>
          <aside aria-label="Talk to us" className="self-start rounded-2xl border border-mist bg-ivory p-7 lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <p className="font-display text-2xl text-midnight">See if this fits your situation</p>
            <p className="mt-3 text-slate">
              A free, no-obligation strategy call is the easiest way to find out whether {service.name.toLowerCase()} makes
              sense for you now.
            </p>
            <Link href="/contact" className="btn btn-primary mt-6 w-full">
              Book a Free Strategy Call
            </Link>
            <PhoneLink location="service-sidebar" className="mt-4 flex items-center justify-center gap-2 font-semibold text-burgundy hover:underline">
              <Icon name="phone" size={18} /> {firm.phone.display}
            </PhoneLink>
          </aside>
        </div>
        {slotExtras("intro")}
      </Section>

      {/* 3. What's included */}
      <Section tone="ivory" labelledBy="included-heading">
        <SectionHeading
          id="included-heading"
          eyebrow="What's included"
          title={content.included.heading}
          lead={content.included.lead ? renderRich(content.included.lead) : undefined}
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {content.included.items.map((item) => (
            <li key={item.title} className="flex gap-4 rounded-2xl border border-mist bg-white p-6 shadow-card">
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-burgundy text-white">
                <Icon name="check" size={18} strokeWidth={2.2} />
              </span>
              <div>
                <h3 className="text-xl leading-snug text-midnight">{item.title}</h3>
                <p className="mt-1.5 text-slate">{renderRich(item.text)}</p>
              </div>
            </li>
          ))}
        </ul>
        {heldBack.length > 0 && (
          <div className="mt-14">
            <h3 className="text-2xl text-midnight">Specialized planning</h3>
            <ul className="mt-6 grid gap-5 md:grid-cols-2">
              {heldBack.map((h) => (
                <li key={h.id} className="rounded-2xl border border-champagne/60 bg-white p-6">
                  <h4 className="font-display text-lg text-midnight">{h.title}</h4>
                  <p className="mt-1.5 text-slate">{renderRich(h.text)}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {slotExtras("included")}
      </Section>

      {/* 4. Who it's best for */}
      <Section tone="white" labelledBy="bestfor-heading">
        <SectionHeading id="bestfor-heading" eyebrow="Who it's best for" title={content.bestFor.heading} />
        <ul className={`mt-10 grid gap-6 sm:grid-cols-2 ${content.bestFor.profiles.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
          {content.bestFor.profiles.map((p) => (
            <li key={p.title} className="rounded-2xl border-t-4 border-champagne bg-ivory p-6">
              <h3 className="text-xl leading-snug text-midnight">{p.title}</h3>
              <p className="mt-2 text-slate">{renderRich(p.text)}</p>
            </li>
          ))}
        </ul>
        {slotExtras("bestFor")}
      </Section>

      {/* 5. How it works */}
      <Section tone="navy" labelledBy="process-heading">
        <SectionHeading id="process-heading" eyebrow="How it works" title={content.process.heading} dark />
        <ProcessTimeline steps={content.process.steps} dark />
        {slotExtras("process", true)}
      </Section>

      {/* 6. Good to know */}
      <Section tone="ivory" labelledBy="goodtoknow-heading" narrow>
        <div className="flex gap-5 rounded-2xl border border-mist border-l-4 border-l-champagne bg-white p-7 shadow-card sm:p-9">
          <Icon name="info" size={28} className="mt-1 hidden shrink-0 text-burgundy sm:block" />
          <div>
            <p className="eyebrow text-burgundy">Good to know</p>
            <h2 id="goodtoknow-heading" className="mt-2 text-2xl text-midnight sm:text-3xl">
              {content.goodToKnow.heading}
            </h2>
            <p className="mt-4 text-ink">{renderRich(content.goodToKnow.text)}</p>
          </div>
        </div>
      </Section>

      {/* 7. FAQ */}
      <Section tone="white" labelledBy="faq-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.8fr] lg:gap-16">
          <SectionHeading
            id="faq-heading"
            eyebrow="FAQ"
            title={`${service.name}: common questions`}
            lead={
              <>
                Don&apos;t see your question?{" "}
                <Link href="/contact" className="link-body">
                  Ask us directly
                </Link>
                .
              </>
            }
          />
          <Faqs faqs={content.faqs} />
        </div>
      </Section>

      {/* 8. Related services */}
      <Section tone="ivory" labelledBy="related-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading id="related-heading" eyebrow="Related services" title="Often planned alongside" />
          <Link href="/services" className="inline-flex items-center gap-1.5 font-semibold text-burgundy hover:underline">
            View all services <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {related.map((s: Service) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </Section>

      {/* 9. CTA */}
      <CtaBand
        heading={content.cta.heading}
        text={content.cta.text}
        form="compact"
        formSource={`service:${service.slug}`}
        defaultService={service.slug}
        disclaimerTopic={service.name.toLowerCase()}
        licenses={content.licenses}
      />
    </>
  );
}

function ExtraSection({ block, dark }: { block: ExtraBlock; dark?: boolean }) {
  const h = dark ? "text-white" : "text-midnight";
  const body = dark ? "text-white/80" : "text-slate";
  if (block.type === "prose") {
    return (
      <div className="max-w-3xl">
        <h3 className={`text-2xl ${h}`}>{block.heading}</h3>
        <div className={`prose-site mt-4 ${dark ? "text-white/85" : "text-ink"}`}>
          {block.paragraphs.map((p, i) => (
            <p key={i}>{renderRich(p)}</p>
          ))}
        </div>
      </div>
    );
  }
  if (block.type === "list") {
    return (
      <div>
        <h3 className={`text-2xl ${h}`}>{block.heading}</h3>
        {block.lead && <p className={`mt-3 max-w-3xl ${body}`}>{renderRich(block.lead)}</p>}
        <ul className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2">
          {block.items.map((it) => (
            <li key={it.title} className={`border-l-2 pl-5 ${dark ? "border-champagne/70" : "border-champagne"}`}>
              <p className={`font-semibold ${h}`}>{it.title}</p>
              <p className={`mt-1 ${body}`}>{renderRich(it.text)}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  // Illustrative / hypothetical example
  return (
    <figure className={`rounded-2xl border-2 border-dashed p-6 sm:p-8 ${dark ? "border-champagne/60" : "border-champagne bg-white"}`}>
      <p className="inline-flex items-center gap-2 rounded-full bg-burgundy px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
        <Icon name="info" size={14} /> {block.label}
      </p>
      <h3 className={`mt-4 text-2xl ${h}`}>{block.heading}</h3>
      <div className={`prose-site mt-3 max-w-3xl ${dark ? "text-white/85" : "text-ink"}`}>
        {block.paragraphs.map((p, i) => (
          <p key={i}>{renderRich(p)}</p>
        ))}
      </div>
      {block.table && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-mist" tabIndex={0} role="region" aria-label={`${block.table.caption} (scrollable table)`}>
          <table className="w-full min-w-[640px] border-collapse bg-white text-left text-[0.95rem] text-ink">
            <caption className="caption-top bg-ivory px-4 py-3 text-left text-sm font-semibold text-midnight">
              {block.table.caption} <span className="font-normal text-slate">({block.label})</span>
            </caption>
            <thead>
              <tr className="bg-midnight text-white">
                {block.table.columns.map((c) => (
                  <th key={c} scope="col" className="px-4 py-3 font-semibold">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table.rows.map((row, i) => (
                <tr key={i} className="border-t border-mist even:bg-ivory/60">
                  {row.map((cell, j) =>
                    j === 0 ? (
                      <th key={j} scope="row" className="px-4 py-3 font-semibold text-midnight">
                        {cell}
                      </th>
                    ) : (
                      <td key={j} className="px-4 py-3">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {block.footnote && <figcaption className={`mt-4 text-sm ${body}`}>{renderRich(block.footnote)}</figcaption>}
    </figure>
  );
}
