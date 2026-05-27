"use client";

import Link from "next/link";
import { useLocale } from "@/components/site/LocaleProvider";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { NewsCoverImage } from "@/components/site/NewsCoverImage";
import type { PublicNews } from "@/lib/data/types";
import { localizedPath } from "@/lib/i18n/locale-url";

function CalendarIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export function NewsCard({
  item,
  className = "",
  draggable = true,
}: {
  item: PublicNews;
  className?: string;
  draggable?: boolean;
}) {
  const { t, locale } = useLocale();

  return (
    <Link
      href={localizedPath(`/haberler/${item.slug}`, locale)}
      draggable={draggable}
      onDragStart={draggable ? undefined : (e) => e.preventDefault()}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-black/4 bg-bone text-ink no-underline transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(61,74,45,0.12)] ${draggable ? "" : "select-none"} ${className}`.trim()}
    >
      <div
        className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${item.gradient}`}
      >
        {item.imageUrl ? (
          <NewsCoverImage src={item.imageUrl} alt={item.title} />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-display text-7xl text-cream/30">
            MCD
          </span>
        )}
        <span className="absolute top-4 left-4 z-2 rounded-full bg-cream px-3 py-1 text-[11px] font-bold tracking-widest text-forest-dark uppercase">
          {item.tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-6 pt-6 pb-7">
        <div className="mb-2.5 flex items-center gap-2 text-[13px] font-medium text-muted">
          <CalendarIcon />
          {item.date}
        </div>
        <h3 className="font-serif text-[22px] leading-snug font-semibold text-forest-dark">
          {item.title}
        </h3>
        <p className="mt-3 mb-4.5 line-clamp-3 text-sm leading-relaxed text-muted">
          {item.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-leaf-green">
          {t.readMore}
          <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
}
