import type { Metadata } from "next";
import Image from "next/image";
import { isSupabaseStorageUrl } from "@/lib/images";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { BtnGhost, BtnPrimary } from "@/components/site/SectionParts";
import {
  getEventBySlug,
  getPublishedEventSlugs,
  getPublishedEvents,
} from "@/lib/data/queries";
import { getLocale } from "@/lib/i18n/locale";
import { getSiteContent } from "@/lib/i18n/site-content";

type EtkinlikDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: EtkinlikDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const ev = getSiteContent(await getLocale()).events;
  const event = await getEventBySlug(slug);
  if (!event) return { title: ev.detailNotFound };
  return {
    title: event.titlePlain,
    description: event.description,
  };
}

function LocationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export default async function EtkinlikDetailPage({
  params,
}: EtkinlikDetailPageProps) {
  const { slug } = await params;
  const ev = getSiteContent(await getLocale()).events;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const allEvents = await getPublishedEvents();
  const otherEvents = allEvents.filter((e) => e.slug !== slug).slice(0, 2);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-forest-dark py-16 text-cream md:py-24">
        <div
          className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(45,139,95,0.2)_0%,transparent_70%)]"
          aria-hidden
        />
        <SiteContainer className="relative">
          <Link
            href="/etkinlikler"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-cream/70 transition-colors hover:text-leaf-green"
          >
            {ev.backToEvents}
          </Link>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-leaf-green to-river-blue">
              {event.posterUrl ? (
                <Image
                  src={event.posterUrl}
                  alt=""
                  fill
                  unoptimized={isSupabaseStorageUrl(event.posterUrl)}
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                />
              ) : event.poster ? (
                <div className="px-10 text-center text-white">
                  <div className="font-display text-6xl leading-[0.9] tracking-wide md:text-8xl">
                    {event.poster.headline}
                  </div>
                  <div className="font-display text-3xl tracking-wide opacity-90 md:text-5xl">
                    {event.poster.subline}
                  </div>
                  <div className="-rotate-2 mt-4 font-script text-4xl">
                    {event.poster.year}
                  </div>
                </div>
              ) : (
                <span className="font-display text-4xl uppercase text-white">
                  {event.titlePlain}
                </span>
              )}
            </div>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-3.5 py-1.5 text-xs font-semibold tracking-widest uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-leaf-green" aria-hidden />
                {event.category}
              </div>
              <p className="mt-6 font-display text-lg tracking-widest text-leaf-green uppercase">
                {event.date}
              </p>
              <h1 className="mt-4 font-display text-4xl leading-none uppercase whitespace-pre-line md:text-6xl">
                {event.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-cream/85">
                {event.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-6 text-sm text-cream/70">
                <span className="inline-flex items-center gap-2">
                  <LocationIcon />
                  {event.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <ClockIcon />
                  {event.duration}
                </span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <BtnPrimary href="/iletisim" className="mt-0">
                  {ev.joinRegister}
                  <ArrowRight />
                </BtnPrimary>
                <BtnGhost href="/iletisim">{ev.askQuestion}</BtnGhost>
              </div>
            </div>
          </div>
        </SiteContainer>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <SiteContainer>
          <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-display text-3xl tracking-wide text-forest-dark uppercase md:text-4xl">
                {ev.aboutEvent}
              </h2>
              {event.body.length > 0 ? (
                <div className="mt-8 space-y-5 text-base leading-relaxed text-ink/90">
                  {event.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <p className="mt-8 text-muted">{event.description}</p>
              )}
            </div>

            {event.schedule.length > 0 ? (
              <div className="rounded-2xl border border-black/6 bg-bone p-8">
                <h3 className="font-display text-xl tracking-wide text-forest-dark uppercase">
                  {ev.program}
                </h3>
                <ul className="mt-6 space-y-4">
                  {event.schedule.map((item) => (
                    <li
                      key={`${item.time}-${item.label}`}
                      className="flex gap-4 border-b border-black/6 pb-4 last:border-0 last:pb-0"
                    >
                      <span className="w-16 shrink-0 font-display text-sm tracking-wide text-leaf-green uppercase">
                        {item.time}
                      </span>
                      <span className="text-[15px] leading-snug text-forest-dark">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </SiteContainer>
      </section>

      {otherEvents.length > 0 ? (
        <section className="border-t border-black/6 bg-cream-deep py-16 md:py-20">
          <SiteContainer>
            <h2 className="mb-8 font-display text-2xl tracking-wide text-forest-dark uppercase">
              {ev.otherEvents}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {otherEvents.map((other) => (
                <Link
                  key={other.slug}
                  href={`/etkinlikler/${other.slug}`}
                  className="group rounded-2xl border border-black/6 bg-bone p-6 no-underline transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(61,74,45,0.1)]"
                >
                  <span className="text-xs font-semibold tracking-widest text-leaf-green uppercase">
                    {other.category}
                  </span>
                  <h3 className="mt-2 font-display text-2xl leading-tight text-forest-dark uppercase transition-colors group-hover:text-leaf-green">
                    {other.titlePlain}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">
                    {other.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf-green">
                    {ev.details}
                    <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </SiteContainer>
        </section>
      ) : null}
    </>
  );
}
