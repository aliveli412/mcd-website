import type { Metadata } from "next";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { NewsCarousel } from "@/components/site/NewsCarousel";
import { NewsCard } from "@/components/site/NewsCard";
import { PageBanner } from "@/components/site/PageBanner";
import { SectionEyebrow, SectionTitle } from "@/components/site/SectionParts";
import { getAllPublishedNews } from "@/lib/data/queries";
import { getLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";
import { sitePhotos } from "@/lib/site-photos";

export async function generateMetadata(): Promise<Metadata> {
  const t = getMessages(await getLocale());
  return {
    title: t.newsPageTitle,
    description: t.newsPageDesc,
  };
}

export default async function HaberlerPage() {
  const [news, t] = await Promise.all([
    getAllPublishedNews(),
    getLocale().then((locale) => getMessages(locale)),
  ]);

  return (
    <>
      <PageBanner photo={sitePhotos.haberlerBanner}>
        <SectionEyebrow light>{t.newsEyebrow}</SectionEyebrow>
        <SectionTitle light title={t.newsPageTitle} accent={t.newsAccent} />
      </PageBanner>

      <SiteContainer className="py-16 md:py-24">
        {news.length === 0 ? (
          <p className="text-muted">{t.newsEmpty}</p>
        ) : (
          <>
            <NewsCarousel news={news} />
            <div className="hidden gap-8 md:grid md:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <NewsCard key={item.slug} item={item} />
              ))}
            </div>
          </>
        )}
      </SiteContainer>
    </>
  );
}
