import { SiteContainer } from "@/components/layout/SiteContainer";
import { getLocale } from "@/lib/i18n/locale";
import { getSiteContent } from "@/lib/i18n/site-content";

export async function HeritageBand() {
  const heritage = getSiteContent(await getLocale()).heritage;

  return (
    <section
      className="relative overflow-hidden border-b border-black/6 bg-cream-deep"
      aria-label={heritage.ariaLabel}
    >
      <div
        className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(45,139,95,0.12)_0%,transparent_70%)]"
        aria-hidden
      />

      <SiteContainer className="relative py-12 md:py-14">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-12 lg:gap-16">
          <div className="flex shrink-0 flex-col items-center text-center md:items-start md:text-left">
            <div className="font-display text-[72px] leading-[0.9] tracking-wide text-forest-dark md:text-[88px]">
              {heritage.value}
              <span className="ml-1 text-[28px] text-leaf-green md:text-4xl">
                {heritage.suffix}
              </span>
            </div>
            <p className="mt-2 text-xs font-semibold tracking-[0.2em] text-muted uppercase">
              {heritage.label}
            </p>
          </div>

          <div
            className="hidden h-16 w-px shrink-0 bg-forest-dark/15 md:block"
            aria-hidden
          />

          <p className="max-w-2xl text-center font-serif text-lg leading-relaxed text-forest-dark/90 md:text-left md:text-xl md:leading-relaxed">
            {heritage.sentence}
          </p>
        </div>
      </SiteContainer>
    </section>
  );
}
