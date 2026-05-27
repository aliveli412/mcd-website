"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { LogoMark } from "@/components/layout/LogoMark";
import { MainNav } from "@/components/layout/MainNav";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { LocaleSwitcher } from "@/components/site/LocaleSwitcher";
import { MobileNav } from "@/components/site/MobileNav";
import { SocialLinks } from "@/components/site/SocialLinks";
import { useLocale } from "@/components/site/LocaleProvider";
import { organization } from "@/lib/organization";

export function Header() {
  const { t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100]">
      <div className="hidden bg-forest-deep py-2 text-[13px] tracking-wide text-cream sm:block">
        <SiteContainer className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-leaf-green"
                aria-hidden
              />
              {t.headerTagline}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-cream-deep sm:gap-5">
            <SocialLinks variant="header" />
            <span className="hidden text-cream/40 sm:inline" aria-hidden>
              ·
            </span>
            <a
              href={`mailto:${organization.email}`}
              className="transition-colors hover:text-leaf-green"
            >
              {organization.email}
            </a>
            <span className="text-cream/40" aria-hidden>
              ·
            </span>
            <Suspense
              fallback={
                <span
                  className="inline-block h-9 w-[5.5rem] rounded-full bg-cream/10"
                  aria-hidden
                />
              }
            >
              <LocaleSwitcher />
            </Suspense>
          </div>
        </SiteContainer>
      </div>

      <div className="border-b border-black/6 bg-cream/92 backdrop-blur-md">
        <SiteContainer className="flex items-center justify-between gap-3 py-3.5 sm:gap-8 sm:py-4.5">
          <LogoMark />

          <MainNav />

          <div className="flex items-center gap-2 sm:gap-3">
            <SocialLinks
              variant="header"
              className="[&_a]:text-forest-dark/70 [&_a]:hover:bg-forest-dark/5 [&_a]:hover:text-leaf-green sm:hidden"
            />
            <Link
              href="/iletisim"
              className="hidden items-center gap-2 rounded-full bg-forest-dark px-[22px] py-[11px] text-sm font-semibold text-cream transition-colors hover:bg-leaf-green sm:inline-flex"
            >
              {t.supportCta}
              <ArrowRight />
            </Link>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-forest-dark/10 text-forest-dark transition-colors hover:border-leaf-green hover:bg-bone lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? t.menuClose : t.menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </SiteContainer>
      </div>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
