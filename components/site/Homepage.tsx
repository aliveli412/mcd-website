import { AboutPreview } from "@/components/site/AboutPreview";
import { EventSlideshow } from "@/components/site/EventSlideshow";
import { JoinCtaBand } from "@/components/site/JoinCtaBand";
import { Hero } from "@/components/site/Hero";
import { NewsGrid } from "@/components/site/NewsGrid";
import { FieldGallery } from "@/components/site/FieldGallery";
import { StatsBand } from "@/components/site/StatsBand";
import { TwitterFeedView } from "@/components/site/TwitterFeedView";
import type { PublicEvent, PublicNews } from "@/lib/data/types";
import type { SiteContent } from "@/lib/i18n/site-content";
import type { DbXPost } from "@/lib/x-posts";

import type { SitePhoto } from "@/lib/site-photos";

type HomepageProps = {
  featured: PublicEvent[];
  spotlightUsesPast?: boolean;
  news: PublicNews[];
  fieldGallery: SitePhoto[];
  xPosts: DbXPost[];
  twitterLabels: SiteContent["twitter"];
};

export function Homepage({
  featured,
  spotlightUsesPast = false,
  news,
  fieldGallery,
  xPosts,
  twitterLabels,
}: HomepageProps) {
  return (
    <>
      <Hero />
      <StatsBand />
      <EventSlideshow events={featured} showRecent={spotlightUsesPast} />
      <NewsGrid news={news} />
      <TwitterFeedView posts={xPosts} labels={twitterLabels} />
      <AboutPreview />
      <FieldGallery photos={fieldGallery} />
      <JoinCtaBand />
    </>
  );
}
