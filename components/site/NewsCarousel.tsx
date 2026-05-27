"use client";

import { useLocale } from "@/components/site/LocaleProvider";
import { NewsCard } from "@/components/site/NewsCard";
import { useSwipeCarousel } from "@/components/site/useSwipeCarousel";
import type { PublicNews } from "@/lib/data/types";

function CarouselArrow({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-forest-dark/15 bg-cream text-forest-dark shadow-sm transition-colors hover:border-leaf-green hover:bg-leaf-green hover:text-cream"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        {direction === "prev" ? (
          <path d="M19 12H5M12 19l-7-7 7-7" />
        ) : (
          <path d="M5 12h14M12 5l7 7-7 7" />
        )}
      </svg>
    </button>
  );
}

export function NewsCarousel({
  news,
  className = "md:hidden",
}: {
  news: PublicNews[];
  className?: string;
}) {
  const { site, t } = useLocale();
  const { index, go, goBy, dragOffset, isDragging, dragHandlers } =
    useSwipeCarousel(news.length);

  if (news.length === 0) return null;

  return (
    <div className={className}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted">
          <span className="font-semibold text-forest-dark">
            {String(index + 1).padStart(2, "0")}
          </span>
          {" / "}
          {String(news.length).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
          <CarouselArrow
            direction="prev"
            label={site.carousel.prevNews}
            onClick={() => goBy(-1)}
          />
          <CarouselArrow
            direction="next"
            label={site.carousel.nextNews}
            onClick={() => goBy(1)}
          />
        </div>
      </div>

      <div
        className={`cursor-grab overflow-hidden select-none ${
          isDragging ? "cursor-grabbing" : ""
        }`}
        aria-roledescription="carousel"
        aria-label="Haberler"
        style={{ touchAction: "none" }}
        {...dragHandlers}
      >
        <div className="rounded-2xl">
          <div
            className={`flex ${
              isDragging
                ? ""
                : "transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
            }`}
            style={{
              transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))`,
            }}
          >
            {news.map((item) => (
              <div key={item.slug} className="w-full shrink-0 px-0.5">
                <NewsCard item={item} className="hover:translate-y-0" draggable={false} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-muted">
        {t.newsCarouselDrag}
      </p>

      <div className="mt-4 flex justify-center gap-2">
        {news.map((item, i) => (
          <button
            key={item.slug}
            type="button"
            aria-label={`Haber ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full border-0 transition-all ${
              i === index ? "w-8 bg-leaf-green" : "w-2 bg-forest-dark/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
