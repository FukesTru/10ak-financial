import Link from "next/link";
import { confirmed, firm, fullAddress, isSet, mailHref, mapsLinkUrl, telHref } from "@/config/firm";
import { serviceGroups, servicesInGroup, servicePath } from "@/config/services";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { CookieSettingsButton } from "@/components/analytics/CookieNotice";

const SOCIAL_LABELS: Record<keyof typeof firm.social, string> = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
  x: "X",
};

export function Footer() {
  const hours = confirmed(firm.hours);
  const socials = (Object.keys(firm.social) as (keyof typeof firm.social)[]).filter((k) => isSet(firm.social[k]));
  return (
    <footer className="on-dark bg-midnight text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <div className="container-site grid gap-12 py-16 lg:grid-cols-[1.1fr_2fr] lg:gap-16 lg:py-20">
        <div>
          <Link href="/" aria-label={`${firm.name} — home`} className="inline-block rounded">
            <Logo tone="dark" className="h-12 w-auto" />
          </Link>
          <p className="mt-5 max-w-sm text-white/75">
            Tax strategy, accounting and financial planning for business owners and high earners, from Monrovia to the rest of
            California.
          </p>
          <address className="mt-8 space-y-3 not-italic text-white/85">
            <p className="flex gap-3">
              <Icon name="pin" size={20} className="mt-1 shrink-0 text-champagne" />
              <a href={mapsLinkUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
                {firm.address.street}
                <br />
                {firm.address.city}, {firm.address.region} {firm.address.postalCode}
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
            </p>
            <p className="flex gap-3">
              <Icon name="phone" size={20} className="mt-1 shrink-0 text-champagne" />
              <a href={telHref} data-call-location="footer" className="hover:text-white hover:underline">
                {firm.phone.display}
              </a>
            </p>
            <p className="flex gap-3">
              <Icon name="mail" size={20} className="mt-1 shrink-0 text-champagne" />
              <a href={mailHref} className="hover:text-white hover:underline">
                {firm.email}
              </a>
            </p>
            {hours && (
              <p className="flex gap-3">
                <Icon name="clock" size={20} className="mt-1 shrink-0 text-champagne" />
                <span>{hours}</span>
              </p>
            )}
          </address>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-4">
              {socials.map((k) => (
                <li key={k}>
                  <a href={firm.social[k]} target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white hover:underline">
                    {SOCIAL_LABELS[k]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
          {serviceGroups.map((g) => (
            <nav key={g.id} aria-label={`${g.label} services`}>
              <h3 className="eyebrow mb-4 font-sans text-champagne">{g.label}</h3>
              <ul className="space-y-2.5 text-[0.95rem]">
                {servicesInGroup(g.id).map((s) => (
                  <li key={s.slug}>
                    <Link href={servicePath(s.slug)} className="text-white/80 hover:text-white hover:underline">
                      {s.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <nav aria-label="Site map">
            <h3 className="eyebrow mb-4 font-sans text-champagne">Site map</h3>
            <ul className="space-y-2.5 text-[0.95rem]">
              {[
                ["/", "Home"],
                ["/services", "All Services"],
                ["/about", "About Theo Minassian"],
                ["/service-areas", "Service Areas"],
                ["/contact", "Contact / Free Strategy Call"],
                ["/privacy-disclosures", "Privacy & Disclosures"],
                ["/sitemap.xml", "XML Sitemap"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-white/80 hover:text-white hover:underline" prefetch={href === "/sitemap.xml" ? false : undefined}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site space-y-4 py-8 text-sm text-white/60">
          <p className="max-w-4xl">
            The information on this website is general and educational. It is not tax, legal, accounting, insurance or investment
            advice, and it does not create a client relationship. Strategies discussed involve trade-offs and risks, results are
            never promised, and tax rules change. Insurance, mortgage and investment services are offered only where properly
            licensed. See{" "}
            <Link href="/privacy-disclosures#disclosures" className="underline hover:text-white">
              Important Disclosures
            </Link>
            .
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {firm.copyrightYear} {firm.name}. All rights reserved. {fullAddress}.
            </p>
            <div className="flex gap-5">
              <Link href="/privacy-disclosures" className="underline hover:text-white">
                Privacy Policy
              </Link>
              <CookieSettingsButton className="underline hover:text-white" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
