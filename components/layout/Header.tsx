"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { firm, telHref } from "@/config/firm";
import { serviceGroups, servicesInGroup, servicePath } from "@/config/services";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaId = useId();
  const mobileId = useId();
  const megaBtn = useRef<HTMLButtonElement>(null);
  const megaWrap = useRef<HTMLLIElement>(null);
  const mobileBtn = useRef<HTMLButtonElement>(null);
  const mobilePanel = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation (reset during render when the path changes).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  const closeMega = useCallback((focusButton = false) => {
    setMegaOpen(false);
    if (focusButton) megaBtn.current?.focus();
  }, []);

  // Escape + outside click for the mega menu.
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMega(true);
    };
    const onClick = (e: MouseEvent) => {
      if (megaWrap.current && !megaWrap.current.contains(e.target as Node)) closeMega();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen, closeMega]);

  // Mobile menu: lock scroll, Escape to close, keep focus inside.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = mobilePanel.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        mobileBtn.current?.focus();
      }
      if (e.key === "Tab" && panel) {
        const els = Array.from(panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")).filter(
          (el) => el.offsetParent !== null,
        );
        const toggle = mobileBtn.current;
        const all = toggle ? [toggle, ...els] : els;
        const first = all[0];
        const last = all[all.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const hoverOpen = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setMegaOpen(true), 80);
  };
  const hoverClose = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setMegaOpen(false), 180);
  };

  const solid = scrolled || megaOpen || mobileOpen;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 motion-reduce:transition-none ${
        solid ? "bg-midnight/95 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.5)] backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" className="shrink-0 rounded" aria-label={`${firm.name} — home`}>
          <Logo tone="dark" className="h-11 w-auto sm:h-12" title={firm.name} />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 xl:gap-2">
            <li ref={megaWrap} onMouseEnter={hoverOpen} onMouseLeave={hoverClose} className="static">
              <button
                ref={megaBtn}
                type="button"
                aria-expanded={megaOpen}
                aria-controls={megaId}
                onClick={() => setMegaOpen((o) => !o)}
                className={`flex items-center gap-1 rounded-md px-3 py-2 font-medium text-white/90 hover:text-white ${
                  isActive("/services") ? "text-white" : ""
                }`}
              >
                Services
                <Icon
                  name="chevron"
                  size={18}
                  className={`transition-transform motion-reduce:transition-none ${megaOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                id={megaId}
                hidden={!megaOpen}
                className="absolute inset-x-0 top-full border-t border-white/10 bg-midnight text-white shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)]"
              >
                <div className="container-site grid grid-cols-[1fr_1fr_1fr_0.9fr] gap-10 py-10">
                  {serviceGroups.map((g) => (
                    <div key={g.id}>
                      <p className="eyebrow mb-1 text-champagne">{g.label}</p>
                      <p className="mb-4 text-sm text-white/60">{g.blurb}</p>
                      <ul className="space-y-1">
                        {servicesInGroup(g.id).map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={servicePath(s.slug)}
                              onClick={() => closeMega()}
                              aria-current={pathname === servicePath(s.slug) ? "page" : undefined}
                              className="group flex items-center gap-3 rounded-lg px-2 py-2 text-[0.97rem] text-white/90 hover:bg-white/5 hover:text-white"
                            >
                              <Icon name={s.icon} size={20} className="shrink-0 text-champagne" />
                              {s.navLabel}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="rounded-2xl border border-champagne/40 bg-navy p-6">
                    <p className="font-display text-xl">Not sure where to start?</p>
                    <p className="mt-2 text-sm text-white/75">
                      A free strategy call is the simplest first step. We&apos;ll point you to what matters most.
                    </p>
                    <Link href="/contact" onClick={() => closeMega()} className="btn btn-primary mt-5 w-full text-[0.95rem]">
                      Free Strategy Call
                    </Link>
                    <Link
                      href="/services"
                      onClick={() => closeMega()}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-champagne hover:underline"
                    >
                      View all services <Icon name="arrow" size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </li>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-md px-3 py-2 font-medium hover:text-white ${
                    isActive(item.href) ? "text-white underline decoration-champagne decoration-2 underline-offset-8" : "text-white/90"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={telHref}
            data-call-location="header"
            className="flex items-center gap-2 font-semibold text-white hover:text-champagne"
            aria-label={`Call ${firm.phone.display}`}
          >
            <Icon name="phone" size={20} className="text-champagne" />
            <span className="hidden xl:inline">{firm.phone.display}</span>
          </a>
          <Link href="/contact" className="btn btn-primary min-h-[44px] px-5 text-[0.95rem]">
            Free Strategy Call
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          ref={mobileBtn}
          type="button"
          className="relative z-[60] -mr-2 flex h-12 w-12 items-center justify-center rounded-lg text-white lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls={mobileId}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <Icon name={mobileOpen ? "close" : "menu"} size={28} />
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <div
        id={mobileId}
        ref={mobilePanel}
        hidden={!mobileOpen}
        className="fixed inset-0 z-[55] overflow-y-auto bg-midnight pt-[var(--header-h)] text-white lg:hidden"
      >
        <nav aria-label="Mobile" className="container-site pb-28">
          <MobileServices onNavigate={() => setMobileOpen(false)} />
          <ul className="border-b border-white/10">
            {[{ href: "/services", label: "All Services" }, ...NAV].map((item) => (
              <li key={item.href} className="border-t border-white/10">
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="block py-4 font-display text-2xl"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn btn-primary w-full">
              Free Strategy Call
            </Link>
            <a href={telHref} data-call-location="mobile-menu" className="btn btn-secondary-dark w-full">
              <Icon name="phone" size={20} /> Call {firm.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

function MobileServices({ onNavigate }: { onNavigate: () => void }) {
  const base = useId();
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="pt-4">
      <p className="eyebrow mb-2 text-champagne">Services</p>
      <ul>
        {serviceGroups.map((g) => {
          const expanded = open === g.id;
          const panel = `${base}-${g.id}`;
          return (
            <li key={g.id} className="border-t border-white/10">
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={panel}
                onClick={() => setOpen(expanded ? null : g.id)}
                className="flex w-full items-center justify-between py-4 text-left font-display text-2xl"
              >
                {g.label}
                <Icon name="chevron" size={22} className={`text-champagne transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>
              <ul id={panel} hidden={!expanded} className="pb-4">
                {servicesInGroup(g.id).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={servicePath(s.slug)}
                      onClick={onNavigate}
                      className="flex items-center gap-3 py-2.5 pl-1 text-lg text-white/90"
                    >
                      <Icon name={s.icon} size={20} className="text-champagne" />
                      {s.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
