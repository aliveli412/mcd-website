"use client";

import Image from "next/image";
import { isSupabaseStorageUrl } from "@/lib/images";
import Link from "next/link";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { useLocale } from "@/components/site/LocaleProvider";
import { BtnGhost, BtnPrimary, SectionHeader, SiteSection } from "@/components/site/SectionParts";
import { useSwipeCarousel } from "@/components/site/useSwipeCarousel";
import type { PublicEvent } from "@/lib/data/types";
import { localizedPath } from "@/lib/i18n/locale-url";

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function SlideDots({
  events,
  index,
  onSelect,
}: {
  events: PublicEvent[];
  index: number;
  onSelect: (i: number) => void;
}) {
  return (
    <>
      {events.map((slide, i) => (
        <button
          key={slide.id}
          type="button"
          aria-label={`Slayt ${i + 1}`}
          aria-current={i === index ? "true" : undefined}
          onClick={() => onSelect(i)}
          className={`h-0.5 cursor-pointer rounded-sm border-0 transition-colors ${
            i === index ? "w-8 bg-cream" : "w-6 bg-cream/25"
          }`}
        />
      ))}
    </>
  );
}

function SlideArrows({
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
  compact = false,
}: {
  onPrev: () => void;
  onNext: () => void;
  prevLabel: string;
  nextLabel: string;
  compact?: boolean;
}) {
  const size = compact ? "h-10 w-10" : "h-12 w-12";
  const btnClass = `flex ${size} cursor-pointer items-center justify-center rounded-full border-[1.5px] border-cream/30 bg-cream/5 text-cream backdrop-blur-md transition-all hover:border-cream hover:bg-cream hover:text-forest-dark`;

  return (
    <div className="flex shrink-0 gap-2">
      <button type="button" aria-label={prevLabel} onClick={onPrev} className={btnClass}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>
      <button type="button" aria-label={nextLabel} onClick={onNext} className={btnClass}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export function EventSlideshow({
  events,
  showRecent = false,
}: {
  events: PublicEvent[];
  showRecent?: boolean;
}) {
  const { site, locale } = useLocale();
  const ev = site.events;
  const eventsListHref = localizedPath("/etkinlikler", locale);
  const total = events.length;
  const eyebrow = showRecent ? ev.recentEyebrow : ev.upcomingEyebrow;
  const { index, go, goBy, dragHandlers } = useSwipeCarousel(total);

  if (total === 0) {
    return (
      <SiteSection id="etkinlikler">
        <SectionHeader
          eyebrow={eyebrow}
          title={ev.title}
          accent={ev.accent}
          link={{ href: eventsListHref, label: ev.allLink }}
        />
        <p className="text-muted">{ev.empty}</p>
      </SiteSection>
    );
  }

  return (
    <SiteSection id="etkinlikler">
      <SectionHeader
        eyebrow={eyebrow}
        title={ev.title}
        accent={ev.accent}
        link={{ href: eventsListHref, label: ev.allLink }}
      />
      {showRecent ? (
        <p className="-mt-6 mb-8 text-sm text-muted">{ev.recentNote}</p>
      ) : null}

      <div className="relative isolate overflow-hidden rounded-3xl bg-forest-dark">
        <div className="absolute top-4 right-4 z-5 font-display text-sm tracking-widest text-cream/70 sm:top-8 sm:right-8">
          <span className="text-lg text-cream">
            {String(index + 1).padStart(2, "0")}
          </span>{" "}
          / {String(total).padStart(2, "0")}
        </div>

        <div
          className="cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
          aria-roledescription="carousel"
          aria-label={ev.ariaLabel}
          {...dragHandlers}
        >
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {events.map((slide) => {
              const detailHref = localizedPath(
                `/etkinlikler/${slide.slug}`,
                locale,
              );
              return (
              <article
                key={slide.id}
                className="grid w-full shrink-0 grid-cols-1 lg:min-h-[540px] lg:grid-cols-[1.1fr_1fr]"
              >
                <Link
                  href={detailHref}
                  className="group/poster relative min-h-[280px] overflow-hidden bg-forest-deep transition-opacity hover:opacity-95 lg:min-h-0"
                  aria-label={`${slide.titlePlain} — ${ev.viewDetails}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-leaf-green to-river-blue text-white">
                    {slide.posterUrl ? (
                      <Image
                        src={slide.posterUrl}
                        alt=""
                        fill
                        unoptimized={isSupabaseStorageUrl(slide.posterUrl)}
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : slide.poster ? (
                      <div className="flex h-full items-center justify-center px-10 text-center">
                        <div>
                          <div className="font-display text-5xl leading-[0.9] tracking-wide md:text-7xl">
                            {slide.poster.headline}
                          </div>
                          <div className="font-display text-2xl tracking-wide opacity-90 md:text-4xl">
                            {slide.poster.subline}
                          </div>
                          <div className="-rotate-2 mt-4 font-script text-3xl">
                            {slide.poster.year}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center font-display text-3xl uppercase">
                        {slide.titlePlain}
                      </div>
                    )}
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-forest-dark/40"
                    aria-hidden
                  />
                  <span className="absolute bottom-4 left-4 rounded-full bg-cream/10 px-3 py-1 text-xs font-semibold tracking-wide text-cream opacity-0 backdrop-blur-sm transition-opacity group-hover/poster:opacity-100">
                    {ev.viewDetails}
                  </span>
                </Link>

                <div className="relative flex flex-col justify-between bg-gradient-to-br from-forest-dark to-forest-deep p-6 text-cream sm:p-10 md:p-14">
                  <div
                    className="pointer-events-none absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(45,139,95,0.2)_0%,transparent_70%)]"
                    aria-hidden
                  />
                  <div className="relative">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-3.5 py-1.5 text-xs font-semibold tracking-widest uppercase">
                      <span className="h-1.5 w-1.5 rounded-full bg-leaf-green" aria-hidden />
                      {slide.category}
                    </div>
                    <p className="mt-6 font-display text-lg tracking-widest text-leaf-green uppercase">
                      {slide.date}
                    </p>
                    <h3 className="mt-4 font-display text-4xl leading-none uppercase md:text-5xl">
                      <Link
                        href={detailHref}
                        className="whitespace-pre-line transition-colors hover:text-leaf-green"
                      >
                        {slide.title}
                      </Link>
                    </h3>
                    <p className="mt-5 max-w-[480px] text-base leading-relaxed text-cream/85">
                      {slide.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-6 text-sm text-cream/70">
                      <span className="inline-flex items-center gap-2">
                        <LocationIcon />
                        {slide.location}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <ClockIcon />
                        {slide.duration}
                      </span>
                    </div>
                  </div>
                  <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <BtnPrimary href={detailHref}>
                      {ev.details}
                      <ArrowRight />
                    </BtnPrimary>
                    <BtnGhost href="/iletisim">{ev.join}</BtnGhost>
                  </div>
                </div>
              </article>
            );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-cream/15 bg-forest-deep px-4 py-3 lg:hidden">
          <div className="flex items-center gap-2">
            <SlideDots events={events} index={index} onSelect={go} />
          </div>
          <SlideArrows
            compact
            prevLabel={site.carousel.prev}
            nextLabel={site.carousel.next}
            onPrev={() => goBy(-1)}
            onNext={() => goBy(1)}
          />
        </div>

        <div className="pointer-events-none absolute bottom-10 left-14 z-5 hidden gap-2 lg:flex">
          <div className="pointer-events-auto flex gap-2">
            <SlideDots events={events} index={index} onSelect={go} />
          </div>
        </div>

        <div className="absolute right-7 bottom-7 z-5 hidden gap-2.5 lg:flex">
          <SlideArrows
            prevLabel={site.carousel.prev}
            nextLabel={site.carousel.next}
            onPrev={() => goBy(-1)}
            onNext={() => goBy(1)}
          />
        </div>
      </div>
    </SiteSection>
  );
}
