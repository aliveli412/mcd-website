import type { Metadata } from "next";
import { LegalDocument } from "@/components/site/LegalDocument";
import { getLocale } from "@/lib/i18n/locale";
import { getSiteContent } from "@/lib/i18n/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const page = getSiteContent(await getLocale()).legalPages.privacy;
  return { title: page.metaTitle, description: page.paragraphs[0] };
}

export default async function GizlilikPage() {
  const locale = await getLocale();
  return (
    <LegalDocument
      locale={locale}
      content={getSiteContent(locale).legalPages.privacy}
    />
  );
}
