import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { getLocale } from "@/lib/i18n/locale";
import { localizedPath } from "@/lib/i18n/locale-url";
import { getSiteContent } from "@/lib/i18n/site-content";
import { sitePhotos } from "@/lib/site-photos";

export async function Hero() {
  const locale = await getLocale();
  const hero = getSiteContent(locale).hero;
  const heroImage = sitePhotos.heroBelowTitle;

  return (
    <section className="relative isolate overflow-hidden bg-forest-dark py-20 pb-[100px] text-cream">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/55 via-forest-dark/82 via-55% to-forest-deep/95" />
      </div>

      <SiteContainer className="relative z-10 flex flex-col">
        <p className="order-2 mb-6 max-w-[280px] -rotate-1 font-script text-base leading-snug text-cream/95 sm:text-lg md:order-1 md:mb-4 md:max-w-md md:text-xl lg:max-w-2xl lg:text-2xl xl:text-3xl">
          {hero.tag}
        </p>

        <h1 className="order-1 mb-0 flex flex-col gap-2 font-display text-[clamp(2.85rem,11vw,10.5rem)] leading-[1.05] tracking-wide uppercase sm:gap-1 sm:leading-[0.95] md:order-2 md:mb-9 lg:gap-0 lg:leading-[0.88]">
          <span className="block">{hero.title[0]}</span>
          <span className="block text-transparent [-webkit-text-stroke:1.5px_#F5F1E8] sm:[-webkit-text-stroke:2px_#F5F1E8]">
            {hero.title[1]}
          </span>
          <span className="block">{hero.title[2]}</span>
        </h1>

        <div className="order-3 mt-8 flex flex-wrap items-end gap-12 border-t border-cream/20 pt-9 md:mt-12">
          <p className="max-w-[520px] text-base leading-relaxed text-cream/85">
            {hero.blurb}
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link
              href={localizedPath("/etkinlikler", locale)}
              className="inline-flex items-center gap-2.5 rounded-full bg-cream px-7 py-3.5 text-[15px] font-semibold text-forest-dark transition-all hover:bg-leaf-green hover:text-cream"
            >
              {hero.ctaEvents}
              <ArrowRight />
            </Link>
            <Link
              href={localizedPath("/hakkimizda", locale)}
              className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-cream/40 px-[26px] py-[13px] text-[15px] font-semibold text-cream transition-all hover:border-cream hover:bg-cream/8"
            >
              {hero.ctaAbout}
              <ArrowRight />
            </Link>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
