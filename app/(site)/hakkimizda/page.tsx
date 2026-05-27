import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { BtnPrimary, SectionEyebrow, SectionTitle } from "@/components/site/SectionParts";
import { HeritageBand } from "@/components/site/HeritageBand";
import { PageBanner } from "@/components/site/PageBanner";
import { SitePhoto } from "@/components/site/SitePhoto";
import { getLocale } from "@/lib/i18n/locale";
import { getSiteContent } from "@/lib/i18n/site-content";
import { sitePhotos } from "@/lib/site-photos";

export async function generateMetadata(): Promise<Metadata> {
  const about = getSiteContent(await getLocale()).aboutPage;
  return {
    title: about.metaTitle,
    description: about.metaDesc,
  };
}

export default async function HakkimizdaPage() {
  const site = getSiteContent(await getLocale());
  const about = site.aboutPage;
  const aboutPreview = site.aboutPreview;

  return (
    <>
      <PageBanner photo={sitePhotos.hakkimizdaHero}>
        <SectionEyebrow light>{aboutPreview.eyebrow}</SectionEyebrow>
        <SectionTitle
          light
          className="max-w-4xl"
          title={aboutPreview.title}
          accent={[...aboutPreview.accent]}
        />
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/85">
          {about.lead}
        </p>
      </PageBanner>

      <HeritageBand />

      <section className="bg-bone py-16 md:py-24">
        <SiteContainer>
          <h2 className="font-display text-3xl tracking-wide text-forest-dark uppercase md:text-4xl">
            {about.whoTitle}
          </h2>
          <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-ink/90 md:text-lg">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <SitePhoto
            {...sitePhotos.aboutBanner}
            className="mt-12 aspect-[21/9] rounded-2xl"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </SiteContainer>
      </section>

      <section className="relative overflow-hidden bg-forest-dark py-16 text-cream md:py-24">
        <div
          className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(42,107,173,0.15)_0%,transparent_70%)]"
          aria-hidden
        />
        <SiteContainer className="relative">
          <SectionEyebrow light>{about.activitiesEyebrow}</SectionEyebrow>
          <SectionTitle
            light
            className="max-w-3xl"
            title={about.activitiesTitle}
            accent={about.activitiesAccent}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {about.activityAreas.map((area) => (
              <div
                key={area.title}
                className="rounded-2xl border border-cream/15 bg-cream/5 p-8"
              >
                <h3 className="font-display text-xl tracking-wide text-leaf-green uppercase">
                  {area.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-cream/80">
                  {area.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {area.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-cream/70 before:mt-1.5 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-leaf-green before:content-['']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SiteContainer>
      </section>

      <section className="bg-forest-deep py-16 text-cream md:py-20">
        <SiteContainer className="flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl tracking-wide uppercase md:text-4xl">
              {about.joinTitle}
            </h2>
            <p className="mt-4 text-cream/75">{about.joinBlurb}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <BtnPrimary href="/iletisim">{about.joinContact}</BtnPrimary>
            <Link
              href="/etkinlikler"
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-cream/40 px-[26px] py-[13px] text-[15px] font-semibold text-cream transition-all hover:border-cream hover:bg-cream/8"
            >
              {about.joinEvents}
              <ArrowRight />
            </Link>
          </div>
        </SiteContainer>
      </section>
    </>
  );
}
