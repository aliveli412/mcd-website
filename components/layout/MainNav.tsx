"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/site/LocaleProvider";
import { getMainNav } from "@/lib/i18n/navigation";
import { isNavActive } from "@/lib/navigation";

export function MainNav() {
  const pathname = usePathname();
  const { locale, t } = useLocale();
  const mainNav = getMainNav(locale);

  return (
    <nav aria-label={t.mainNavAria} className="hidden lg:block">
      <ul className="flex list-none items-center gap-9">
        {mainNav.map(({ href, label }) => {
          const active = isNavActive(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`relative py-1.5 text-[15px] font-medium transition-colors ${
                  active
                    ? "text-leaf-green after:absolute after:bottom-[-2px] after:left-0 after:h-0.5 after:w-full after:bg-leaf-green"
                    : "text-ink hover:text-leaf-green"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
