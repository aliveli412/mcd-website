import type { Metadata } from "next";
import Image from "next/image";
import { isSupabaseStorageUrl } from "@/lib/images";
import Link from "next/link";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { PageBanner } from "@/components/site/PageBanner";
import { SectionEyebrow, SectionTitle } from "@/components/site/SectionParts";
import { getPublishedEvents } from "@/lib/data/queries";
import { getLocale } from "@/lib/i18n/locale";
import { getSiteContent } from "@/lib/i18n/site-content";
import { sitePhotos } from "@/lib/site-photos";

export async function generateMetadata(): Promise<Metadata> {
  const ev = getSiteContent(await getLocale()).events;
  return {
    title: ev.pageTitle,
    description: ev.pageDesc,
  };
}

export default async function EtkinliklerPage() {
  const [events, ev] = await Promise.all([
    getPublishedEvents(),
    getLocale().then((locale) => getSiteContent(locale).events),
  ]);

  return (
    <>
      <PageBanner photo={sitePhotos.etkinliklerBanner}>
        <SectionEyebrow light>{ev.upcomingEyebrow}</SectionEyebrow>
        <SectionTitle light title={ev.title} accent={ev.accent} />
        <p className="mt-6 max-w-xl text-cream/85">{ev.pageDesc}</p>
      </PageBanner>

      <SiteContainer className="py-16 md:py-24">
        {events.length === 0 ? (
          <p className="text-muted">{ev.listEmpty}</p>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <li key={event.id}>
                <Link
                  href={`/etkinlikler/${event.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/4 bg-bone no-underline transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(61,74,45,0.12)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-leaf-green to-river-blue">
                    {event.posterUrl ? (
                      <Image
                        src={event.posterUrl}
                        alt=""
                        fill
                        unoptimized={isSupabaseStorageUrl(event.posterUrl)}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center p-6 text-center font-display text-2xl tracking-wide text-cream uppercase">
                        {event.titlePlain}
                      </div>
                    )}
                    <span className="absolute top-4 left-4 rounded-full bg-cream px-3 py-1 text-[11px] font-bold tracking-widest text-forest-dark uppercase">
                      {event.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm font-medium text-leaf-green">{event.date}</p>
                    <h2 className="mt-2 font-serif text-xl font-semibold text-forest-dark">
                      {event.titlePlain}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm text-muted">
                      {event.description}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-leaf-green">
                      {ev.details}
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </SiteContainer>
    </>
  );
}
