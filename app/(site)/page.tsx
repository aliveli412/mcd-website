import { Homepage } from "@/components/site/Homepage";
import { getHomepageData } from "@/lib/data/queries";
import { getLocale } from "@/lib/i18n/locale";
import { getSiteContent } from "@/lib/i18n/site-content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const locale = await getLocale();
  const { featured, spotlightUsesPast, news, fieldGallery, xPosts } =
    await getHomepageData();

  return (
    <Homepage
      featured={featured}
      spotlightUsesPast={spotlightUsesPast}
      news={news}
      fieldGallery={fieldGallery}
      xPosts={xPosts}
      twitterLabels={getSiteContent(locale).twitter}
    />
  );
}
