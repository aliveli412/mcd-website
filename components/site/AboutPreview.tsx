import { ArrowRight } from "@/components/icons/ArrowRight";
import { BtnPrimary, SectionEyebrow, SectionTitle, SiteSection } from "@/components/site/SectionParts";
import { SitePhoto } from "@/components/site/SitePhoto";
import { getLocale } from "@/lib/i18n/locale";
import { localizedPath } from "@/lib/i18n/locale-url";
import { getSiteContent } from "@/lib/i18n/site-content";
import { sitePhotos } from "@/lib/site-photos";

function PillarIcon({ type }: { type: string }) {
  const props = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    "aria-hidden": true as const,
  };

  switch (type) {
    case "chart":
      return (
        <svg {...props}>
          <path d="M3 21l3-5 4 3 4-7 4 5 3-3" />
        </svg>
      );
    case "nature":
      return (
        <svg {...props}>
          <circle cx="12" cy="8" r="3" />
          <path d="M12 11v10M9 14h6" />
        </svg>
      );
    case "people":
      return (
        <svg {...props}>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <path d="M9 11H3a2 2 0 00-2 2v6a2 2 0 002 2h6M15 13l4-4-4-4" />
        </svg>
      );
  }
}

export async function AboutPreview() {
  const locale = await getLocale();
  const { aboutPreview: about, aboutPage } = getSiteContent(locale);

  return (
    <SiteSection
      id="hakkimizda"
      className="relative overflow-hidden bg-forest-dark text-cream"
    >
      <div
        className="pointer-events-none absolute -top-50 -right-50 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(45,139,95,0.15)_0%,transparent_70%)]"
        aria-hidden
      />

      <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <SitePhoto
          {...sitePhotos.aboutPreview}
          className="aspect-[4/5] rounded-[20px]"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={false}
        />

        <div>
          <SectionEyebrow light>{about.eyebrow}</SectionEyebrow>
          <SectionTitle
            light
            className="max-w-none"
            title={about.title}
            accent={[...about.accent]}
          />
          <p className="mt-7 text-[17px] leading-relaxed text-cream/85">
            {aboutPage.lead}
            {about.leadExtra}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {about.pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-xl border border-cream/15 bg-cream/3 p-5"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-leaf-green/20 text-leaf-green">
                  <PillarIcon type={pillar.icon} />
                </div>
                <div className="font-display text-base tracking-wide uppercase">
                  {pillar.title}
                </div>
                <p className="mt-1.5 text-[13px] leading-snug text-cream/70">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          <BtnPrimary href={localizedPath("/hakkimizda", locale)} className="mt-6">
            {about.cta}
            <ArrowRight />
          </BtnPrimary>
        </div>
      </div>
    </SiteSection>
  );
}
