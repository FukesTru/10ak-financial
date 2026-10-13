import type { Metadata } from "next";
import { confirmed, firm } from "@/config/firm";
import { aboutContent as c } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";
import { renderRich } from "@/lib/rich-text";
import { breadcrumbs, graph, person } from "@/lib/schema";
import { clientPhotos } from "@/lib/image-manifest";
import { Hero } from "@/components/ui/Hero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ClientPhoto } from "@/components/ui/ClientPhoto";
import { CredentialsList, credentialItems } from "@/components/ui/CredentialsBlock";
import { CtaBand } from "@/components/ui/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { LeafMark } from "@/components/brand/Logo";

export const metadata: Metadata = pageMetadata({
  title: c.seo.title,
  description: c.seo.description,
  path: "/about",
  imageId: "IMG-07",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

/** Factual sentences that appear only once the owner confirms them in /config/firm.ts. */
function confirmedBio(): string[] {
  const out: string[] = [];
  const years = confirmed(firm.owner.yearsExperience);
  const creds = confirmed(firm.owner.credentials);
  const edu = confirmed(firm.owner.education);
  if (years) out.push(`Theo brings ${years} of experience in tax, accounting and financial planning.`);
  if (creds) out.push(`His professional credentials include ${creds}.`);
  if (edu) out.push(`Education: ${edu}.`);
  return out;
}

export default function AboutPage() {
  const headshot = clientPhotos["theo-minassian-headshot"];
  const photoUrl = headshot ? `/images/client/theo-minassian-headshot-${headshot.widths[headshot.widths.length - 1]}.jpg` : null;
  const facts = confirmedBio();
  const hasCredentials = credentialItems().length > 0;

  return (
    <>
      <JsonLd data={graph(person(photoUrl), breadcrumbs(crumbs))} />
      <Hero
        imageId="IMG-07"
        eyebrow="About 1Oak"
        h1={c.hero.h1}
        subhead={c.hero.subhead}
        breadcrumbs={crumbs}
        primary={{ label: "Book a Free Strategy Call", href: "/contact" }}
        secondary="call"
      />

      <Section tone="white" labelledBy="story-heading">
        <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <ClientPhoto
              name="theo-minassian-headshot"
              alt={`${firm.owner.name}, founder of ${firm.name}`}
              caption={`${firm.owner.name}, Founder`}
              sizes="(min-width: 768px) 440px, 90vw"
              className="mx-auto w-full max-w-md md:sticky md:top-[calc(var(--header-h)+24px)]"
            />
          </div>
          <div>
            <SectionHeading id="story-heading" eyebrow={`${firm.owner.name} · ${firm.owner.jobTitle}`} title={c.story.heading} />
            <div className="prose-site mt-6 text-[1.06rem] text-ink">
              {c.story.paragraphs.map((p, i) => (
                <p key={i}>{renderRich(p)}</p>
              ))}
              {facts.length > 0 && <p>{facts.join(" ")}</p>}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="ivory" labelledBy="approach-heading">
        <SectionHeading
          id="approach-heading"
          eyebrow="Our approach"
          title={c.approach.heading}
          lead={c.approach.lead ? renderRich(c.approach.lead) : undefined}
        />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2">
          {c.approach.principles.map((p, i) => (
            <li key={p.title} className="rounded-2xl border border-mist bg-white p-7 shadow-card">
              <span className="font-display text-3xl text-champagne" aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className="mt-2 text-xl text-midnight">{p.title}</h3>
              <p className="mt-2 text-slate">{renderRich(p.text)}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="navy" labelledBy="name-heading">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <LeafMark className="mx-auto h-32 w-32 text-champagne lg:h-44 lg:w-44" strokeWidth={1.1} />
          <div>
            <SectionHeading id="name-heading" eyebrow="The name" title={c.whyName.heading} dark />
            <div className="prose-site mt-6 text-lg text-white/85">
              {c.whyName.paragraphs.map((p, i) => (
                <p key={i}>{renderRich(p)}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="serve-heading">
        <SectionHeading id="serve-heading" eyebrow="Who we serve" title={c.whoWeServe.heading} lead={renderRich(c.whoWeServe.lead)} />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {c.whoWeServe.groups.map((g) => (
            <li key={g.title} className="rounded-2xl border-t-4 border-champagne bg-ivory p-7">
              <h3 className="text-xl text-midnight">{g.title}</h3>
              <p className="mt-2 text-slate">{renderRich(g.text)}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Credentials & licenses — config-driven; hidden entirely until something is confirmed. */}
      {hasCredentials && (
        <Section tone="ivory" labelledBy="credentials-heading">
          <SectionHeading id="credentials-heading" eyebrow="Credentials" title={c.credentials.heading} lead={renderRich(c.credentials.lead)} />
          <CredentialsList />
        </Section>
      )}

      <CtaBand heading={c.cta.heading} text={c.cta.text} formSource="about" />
    </>
  );
}
