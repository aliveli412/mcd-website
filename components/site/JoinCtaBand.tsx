import Link from "next/link";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { SectionTitle } from "@/components/site/SectionTitle";
import { getLocale } from "@/lib/i18n/locale";
import { localizedPath } from "@/lib/i18n/locale-url";
import { getSiteContent } from "@/lib/i18n/site-content";
import { organization } from "@/lib/organization";

export async function JoinCtaBand() {
  const locale = await getLocale();
  const join = getSiteContent(locale).joinCta;

  return (
    <section className="border-t border-cream/10 bg-forest-dark py-14 text-cream md:py-16">
      <SiteContainer className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <p className="font-body text-xs font-bold tracking-[0.12em] text-leaf-green uppercase">
            {join.eyebrow}
          </p>
          <SectionTitle
            light
            className="mt-2 max-w-none text-[clamp(1.75rem,4vw,2.5rem)] leading-tight"
            title={join.title}
            accent={join.accent}
          />
          <p className="mt-3 text-sm leading-relaxed text-cream/75">{join.blurb}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href={localizedPath("/iletisim", locale)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-forest-dark transition-colors hover:bg-leaf-green hover:text-cream"
          >
            {join.contactPage}
            <ArrowRight />
          </Link>
          <a
            href={`mailto:${organization.email}`}
            className="inline-flex items-center justify-center rounded-full border border-cream/35 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-cream hover:bg-cream/10"
          >
            {organization.email}
          </a>
        </div>
      </SiteContainer>
    </section>
  );
}
