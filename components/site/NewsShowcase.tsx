"use client";

import { useEffect, useRef, useState } from "react";
import { NewsCard } from "@/components/site/NewsCard";
import { useLocale } from "@/components/site/LocaleProvider";
import { useSwipeCarousel } from "@/components/site/useSwipeCarousel";
import type { PublicNews } from "@/lib/data/types";

const VISIBLE = 3;
const AUTO_MS = 5200;
const SWIPE_RATIO = 0.18;
const SWIPE_THRESHOLD_PX = 40;

function ShowcaseArrow({
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
      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-forest-dark/12 bg-bone text-forest-dark transition-colors hover:border-leaf-green hover:bg-leaf-green hover:text-cream"
    >
      <svg
        width="16"
        height="16"
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

export function NewsShowcase({ news }: { news: PublicNews[] }) {
  const { t, site } = useLocale();
  const maxIndex = Math.max(0, news.length - VISIBLE);
  const slideCount = maxIndex + 1;
  const isCarousel = news.length > VISIBLE;

  const { index, go, goBy, dragOffset, isDragging, dragHandlers, endDrag } =
    useSwipeCarousel(isCarousel ? slideCount : 1);
  const [paused, setPaused] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isCarousel || paused || slideCount <= 1) return;
    const id = setInterval(() => goBy(1), AUTO_MS);
    return () => clearInterval(id);
  }, [isCarousel, paused, slideCount, goBy]);

  if (news.length === 0) return null;

  if (!isCarousel) {
    return (
      <div className="hidden gap-8 md:grid md:grid-cols-3">
        {news.map((item) => (
          <NewsCard key={item.slug} item={item} />
        ))}
      </div>
    );
  }

  const trackWidthPct = (news.length / VISIBLE) * 100;
  const stepPct = 100 / news.length;

  const viewportHandlers = {
    ...dragHandlers,
    onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => {
      const width = viewportRef.current?.clientWidth ?? 0;
      const threshold = Math.max(
        SWIPE_THRESHOLD_PX,
        (width / VISIBLE) * SWIPE_RATIO,
      );
      endDrag(e, threshold);
    },
  };

  return (
    <div
      className="hidden md:block"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted">
          <span className="font-semibold text-forest-dark">
            {String(index + 1).padStart(2, "0")}
          </span>
          {" / "}
          {String(slideCount).padStart(2, "0")}
        </p>
        <div className="flex gap-2">
          <ShowcaseArrow
            direction="prev"
            label={site.carousel.prevNews}
            onClick={() => goBy(-1)}
          />
          <ShowcaseArrow
            direction="next"
            label={site.carousel.nextNews}
            onClick={() => goBy(1)}
          />
        </div>
      </div>

      <div
        ref={viewportRef}
        className={`cursor-grab overflow-hidden select-none ${
          isDragging ? "cursor-grabbing" : ""
        }`}
        aria-roledescription="carousel"
        aria-label={t.newsTitle}
        style={{ touchAction: "none" }}
        {...viewportHandlers}
      >
        <div
          className={`flex ${
            isDragging
              ? ""
              : "transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
          }`}
          style={{
            width: `${trackWidthPct}%`,
            transform: `translateX(calc(-${index * stepPct}% + ${dragOffset}px))`,
          }}
        >
          {news.map((item) => (
            <div
              key={item.slug}
              className="box-border shrink-0 px-4"
              style={{ width: `${stepPct}%` }}
            >
              <NewsCard
                item={item}
                className="hover:translate-y-0"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-muted">{t.showcaseDrag}</p>

      {slideCount > 1 ? (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: slideCount }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Konum ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full border-0 transition-all ${
                i === index ? "w-8 bg-leaf-green" : "w-2 bg-forest-dark/20"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
