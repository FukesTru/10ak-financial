import type { Metadata } from "next";
import { privacyContent as c } from "@/content/privacy";
import type { PrivacySection } from "@/content/types";
import { pageMetadata } from "@/lib/seo";
import { renderRich } from "@/lib/rich-text";
import { breadcrumbs, graph } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";
import { Hero } from "@/components/ui/Hero";
import { JsonLd } from "@/components/ui/JsonLd";
import { LicenseDisclosure } from "@/components/ui/LicenseDisclosure";
import { Reveal } from "@/components/ui/Reveal";
import { confirmed, detail, firm, type LicenseKey } from "@/config/firm";

export const metadata: Metadata = pageMetadata({
  title: c.seo.title,
  description: c.seo.description,
  path: "/privacy-disclosures",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy & Disclosures", path: "/privacy-disclosures" },
];

const LICENSE_KEYS = Object.keys(firm.licenses) as LicenseKey[];

function sectionVisible(s: PrivacySection): boolean {
  // The licensing block renders only once at least one license/registration is confirmed.
  if (s.id === "licensing") return LICENSE_KEYS.some((k) => detail(k));
  return true;
}

function SectionBody({ s }: { s: PrivacySection }) {
  return (
    <section id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-[calc(var(--header-h)+24px)] border-t border-mist pt-8">
      <h3 id={`${s.id}-h`} className="text-2xl text-midnight">
        {s.heading}
      </h3>
      <div className="prose-site mt-4 text-ink">
        {s.paragraphs?.map((p, i) => (
          <p key={i}>{renderRich(p)}</p>
        ))}
        {s.bullets && (
          <ul className="list-disc space-y-2 pl-6 marker:text-burgundy">
            {s.bullets.map((b, i) => (
              <li key={i}>{renderRich(b)}</li>
            ))}
          </ul>
        )}
        {s.id === "testimonials" && confirmed(firm.testimonialDisclosure) && <p>{confirmed(firm.testimonialDisclosure)}</p>}
        {s.id === "licensing" && <LicenseDisclosure keys={LICENSE_KEYS} />}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  const privacy = c.privacy.sections.filter(sectionVisible);
  const disclosures = c.disclosures.sections.filter(sectionVisible);
  const updated = new Date(`${c.lastUpdated}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "WebPage",
            "@id": `${absoluteUrl("/privacy-disclosures")}#webpage`,
            name: c.hero.h1,
            url: absoluteUrl("/privacy-disclosures"),
            dateModified: c.lastUpdated,
          },
          breadcrumbs(crumbs),
        )}
      />
      <Hero h1={c.hero.h1} subhead={c.hero.subhead} breadcrumbs={crumbs} size="compact" eyebrow={`Last updated ${updated}`} />

      <div className="on-light bg-white">
        <div className="container-site grid gap-12 py-16 lg:grid-cols-[260px_1fr] lg:gap-16 lg:py-20">
          <nav aria-label="On this page" className="self-start lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <p className="eyebrow text-burgundy">On this page</p>
            <ol className="mt-4 space-y-4 text-[0.95rem]">
              <li>
                <a href="#privacy-policy" className="font-semibold text-midnight hover:text-burgundy">
                  Part 1 · Privacy Policy
                </a>
                <ul className="mt-2 hidden space-y-1.5 border-l border-mist pl-4 lg:block">
                  {privacy.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="text-slate hover:text-burgundy">
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <a href="#disclosures" className="font-semibold text-midnight hover:text-burgundy">
                  Part 2 · Important Disclosures
                </a>
                <ul className="mt-2 hidden space-y-1.5 border-l border-mist pl-4 lg:block">
                  {disclosures.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="text-slate hover:text-burgundy">
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ol>
          </nav>

          <div className="min-w-0 max-w-3xl">
            <Reveal>
              <section id="privacy-policy" aria-labelledby="pp-heading" className="scroll-mt-[calc(var(--header-h)+24px)]">
                <p className="eyebrow text-burgundy">Part 1</p>
                <h2 id="pp-heading" className="mt-2 text-3xl text-midnight sm:text-4xl">
                  Privacy Policy
                </h2>
                <div className="prose-site mt-6 text-lg text-ink">
                  {c.privacy.intro.map((p, i) => (
                    <p key={i}>{renderRich(p)}</p>
                  ))}
                </div>
                <div className="mt-10 space-y-10">
                  {privacy.map((s) => (
                    <SectionBody key={s.id} s={s} />
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section
                id="disclosures"
                aria-labelledby="disc-heading"
                className="mt-20 scroll-mt-[calc(var(--header-h)+24px)] rounded-3xl bg-ivory p-6 sm:p-10"
              >
                <p className="eyebrow text-burgundy">Part 2</p>
                <h2 id="disc-heading" className="mt-2 text-3xl text-midnight sm:text-4xl">
                  Important Disclosures
                </h2>
                <div className="prose-site mt-6 text-lg text-ink">
                  {c.disclosures.intro.map((p, i) => (
                    <p key={i}>{renderRich(p)}</p>
                  ))}
                </div>
                <div className="mt-10 space-y-10">
                  {disclosures.map((s) => (
                    <SectionBody key={s.id} s={s} />
                  ))}
                </div>
              </section>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}
