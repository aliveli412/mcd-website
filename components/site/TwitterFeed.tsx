import { TwitterFeedView } from "@/components/site/TwitterFeedView";
import { getPublishedXPosts } from "@/lib/data/x-posts";
import { getLocale } from "@/lib/i18n/locale";
import { getSiteContent } from "@/lib/i18n/site-content";

export async function TwitterFeed() {
  const locale = await getLocale();
  const [posts, labels] = await Promise.all([
    getPublishedXPosts(),
    Promise.resolve(getSiteContent(locale).twitter),
  ]);

  return <TwitterFeedView posts={posts} labels={labels} />;
}
