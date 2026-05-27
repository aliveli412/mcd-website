"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { LocaleSwitcher } from "@/components/site/LocaleSwitcher";
import { useLocale } from "@/components/site/LocaleProvider";
import { getMainNav } from "@/lib/i18n/navigation";
import { organization } from "@/lib/organization";
import { isNavActive } from "@/lib/navigation";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const { locale, t, site } = useLocale();
  const mainNav = getMainNav(locale);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] lg:hidden" role="dialog" aria-modal="true" aria-label={site.mobileMenu}>
      <button
        type="button"
        className="absolute inset-0 bg-forest-deep/60 backdrop-blur-sm"
        aria-label={t.menuClose}
        onClick={onClose}
      />
      <nav
        id="mobile-nav"
        className="absolute top-0 right-0 flex h-full w-[min(100%,320px)] flex-col bg-cream shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-black/6 px-5 py-4">
          <span className="font-display text-sm tracking-widest text-forest-dark uppercase">
            {site.mobileMenu}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={site.closeMenu}
            className="flex h-10 w-10 items-center justify-center rounded-full text-forest-dark hover:bg-bone"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="flex-1 list-none overflow-y-auto px-4 py-6">
          {mainNav.map(({ href, label }) => {
            const active = isNavActive(pathname, href);
            return (
              <li key={href} className="border-b border-black/5 last:border-0">
                <Link
                  href={href}
                  onClick={onClose}
                  className={`block py-4 text-base font-semibold tracking-wide transition-colors ${
                    active ? "text-leaf-green" : "text-ink hover:text-leaf-green"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="space-y-3 border-t border-black/6 p-5">
          <Link
            href="/iletisim"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-forest-dark px-5 py-3.5 text-sm font-semibold text-cream no-underline hover:bg-leaf-green"
          >
            {t.supportCta}
            <ArrowRight />
          </Link>
          <Suspense fallback={null}>
            <LocaleSwitcher variant="mobile" className="mx-auto w-full justify-center" />
          </Suspense>
          <a
            href={`mailto:${organization.email}`}
            className="block text-center text-sm text-muted hover:text-leaf-green"
          >
            {organization.email}
          </a>
        </div>
      </nav>
    </div>
  );
}
