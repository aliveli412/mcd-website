import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { LocaleProvider } from "@/components/site/LocaleProvider";
import { getLocale } from "@/lib/i18n/locale";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <LocaleProvider locale={locale}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </LocaleProvider>
  );
}
