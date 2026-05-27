import Link from "next/link";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { PageBanner } from "@/components/site/PageBanner";
import { SectionEyebrow, SectionTitle } from "@/components/site/SectionParts";
import { organization } from "@/lib/organization";
import { localizedPath } from "@/lib/i18n/locale-url";
import type { Locale } from "@/lib/i18n/locale";
import { sitePhotos } from "@/lib/site-photos";

export type LegalPageContent = {
  metaTitle: string;
  eyebrow: string;
  title: string;
  updated: string;
  paragraphs: readonly string[];
  contactLabel: string;
  contactCta: string;
};

export function LegalDocument({
  content,
  locale,
}: {
  content: LegalPageContent;
  locale: Locale;
}) {
  return (
    <>
      <PageBanner photo={sitePhotos.aboutBanner}>
        <SectionEyebrow light>{content.eyebrow}</SectionEyebrow>
        <SectionTitle light title={content.title} />
        <p className="mt-4 text-sm text-cream/70">{content.updated}</p>
      </PageBanner>

      <SiteContainer className="prose prose-forest max-w-3xl py-16 md:py-20">
        <div className="space-y-5 text-base leading-relaxed text-ink/90">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted">
          {content.contactLabel}{" "}
          <a
            href={`mailto:${organization.email}`}
            className="font-semibold text-leaf-green hover:underline"
          >
            {organization.email}
          </a>
          {" · "}
          <Link
            href={localizedPath("/iletisim", locale)}
            className="font-semibold text-leaf-green hover:underline"
          >
            {content.contactCta}
          </Link>
        </p>
      </SiteContainer>
    </>
  );
}
