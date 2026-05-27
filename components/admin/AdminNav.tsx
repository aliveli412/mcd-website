"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS: { href: string; label: string; exact?: boolean }[] = [
  { href: "/admin", label: "Özet", exact: true },
  { href: "/admin/etkinlikler", label: "Etkinlikler" },
  { href: "/admin/haberler", label: "Haberler" },
  { href: "/admin/saha", label: "Mücadele sokakta" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-1 rounded-xl border border-cream/10 bg-cream/5 p-1">
      {LINKS.map(({ href, label, exact }) => {
        const active = exact
          ? pathname === href
          : pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={href}
            href={href}
            className={`rounded-lg px-4 py-2 text-sm font-semibold no-underline transition-colors ${
              active
                ? "bg-leaf-green text-cream"
                : "text-cream/70 hover:bg-cream/10 hover:text-cream"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
