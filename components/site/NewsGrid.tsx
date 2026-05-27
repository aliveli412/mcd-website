import { NewsCarousel } from "@/components/site/NewsCarousel";
import { NewsShowcase } from "@/components/site/NewsShowcase";
import { SectionHeader, SiteSection } from "@/components/site/SectionParts";
import type { PublicNews } from "@/lib/data/types";
import { getLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";

export async function NewsGrid({ news }: { news: PublicNews[] }) {
  const t = getMessages(await getLocale());

  if (news.length === 0) {
    return (
      <SiteSection id="haberler" className="bg-cream">
        <SectionHeader
          eyebrow={t.newsEyebrow}
          title={t.newsTitle}
          accent={t.newsAccent}
          link={{ href: "/haberler", label: t.newsAllLink }}
        />
        <p className="text-muted">{t.newsEmpty}</p>
      </SiteSection>
    );
  }

  return (
    <SiteSection id="haberler" className="bg-cream">
      <SectionHeader
        eyebrow={t.newsEyebrow}
        title={t.newsTitle}
        accent={t.newsAccent}
        link={{ href: "/haberler", label: t.newsAllLink }}
      />

      <NewsCarousel news={news} />
      <NewsShowcase news={news} />
    </SiteSection>
  );
}
