import type { Metadata } from "next";
import { ContactSection } from "@/components/site/ContactSection";
import { getLocale } from "@/lib/i18n/locale";
import { getSiteContent } from "@/lib/i18n/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const contact = getSiteContent(await getLocale()).contact;
  return {
    title: contact.pageTitle,
    description: contact.pageDesc,
  };
}

export default function IletisimPage() {
  return <ContactSection />;
}
