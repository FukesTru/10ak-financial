import Link from "next/link";
import type { Metadata } from "next";
import { firm } from "@/config/firm";
import { services, servicePath } from "@/config/services";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: { absolute: `Page not found | ${firm.name}` },
  description: "The page you were looking for has moved or no longer exists.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Hero
        size="compact"
        eyebrow="404"
        h1="We couldn't find that page"
        subhead="The link may be out of date, or the page may have moved. These are good places to pick up from."
        primary={{ label: "Go to the homepage", href: "/" }}
        secondary="call"
      />
      <Section tone="white" labelledBy="nf-heading">
        <h2 id="nf-heading" className="text-3xl text-midnight">
          Popular pages
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/services", label: "All services" },
            { href: "/contact", label: "Book a free strategy call" },
            { href: "/about", label: "About Theo Minassian" },
            ...services.slice(0, 6).map((s) => ({ href: servicePath(s.slug), label: s.name })),
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="block rounded-xl border border-mist bg-ivory px-5 py-4 font-semibold text-midnight hover:border-burgundy hover:text-burgundy">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
