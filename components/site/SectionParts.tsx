import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { SectionTitle } from "@/components/site/SectionTitle";

export { SectionTitle } from "@/components/site/SectionTitle";
export type { SectionTitleProps } from "@/components/site/SectionTitle";

export function SiteSection({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`.trim()}>
      <SiteContainer>{children}</SiteContainer>
    </section>
  );
}

export function SectionEyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`mb-3.5 inline-flex items-center gap-2.5 font-body text-[13px] font-semibold tracking-[0.12em] uppercase before:h-px before:w-6 before:bg-leaf-green ${
        light ? "text-leaf-green" : "text-leaf-green"
      }`}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  accent,
  link,
  light = false,
  titleClassName = "",
}: {
  eyebrow: string;
  title: string;
  accent?: string | string[];
  link?: { href: string; label: string };
  light?: boolean;
  titleClassName?: string;
}) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
      <div>
        <SectionEyebrow light={light}>{eyebrow}</SectionEyebrow>
        <SectionTitle
          title={title}
          accent={accent}
          light={light}
          className={titleClassName}
        />
      </div>
      {link ? (
        <Link
          href={link.href}
          className={`inline-flex items-center gap-2 border-b-[1.5px] pb-0.5 text-[15px] font-semibold transition-colors ${
            light
              ? "border-cream text-cream hover:border-leaf-green hover:text-leaf-green"
              : "border-forest-dark text-forest-dark hover:border-leaf-green hover:text-leaf-green"
          }`}
        >
          {link.label}
          <ArrowRight />
        </Link>
      ) : null}
    </div>
  );
}

export function BtnPrimary({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 rounded-full bg-cream px-7 py-3.5 text-[15px] font-semibold text-forest-dark transition-all hover:bg-leaf-green hover:text-cream ${className}`}
    >
      {children}
    </Link>
  );
}

export function BtnGhost({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-cream/40 px-[26px] py-[13px] text-[15px] font-semibold text-cream transition-all hover:border-cream hover:bg-cream/8 ${className}`}
    >
      {children}
    </Link>
  );
}
