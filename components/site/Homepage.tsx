import { AboutPreview } from "@/components/site/AboutPreview";
import { EventSlideshow } from "@/components/site/EventSlideshow";
import { JoinCtaBand } from "@/components/site/JoinCtaBand";
import { Hero } from "@/components/site/Hero";
import { NewsGrid } from "@/components/site/NewsGrid";
import { FieldGallery } from "@/components/site/FieldGallery";
import { StatsBand } from "@/components/site/StatsBand";
import type { PublicEvent, PublicNews } from "@/lib/data/types";

import type { SitePhoto } from "@/lib/site-photos";

type HomepageProps = {
  featured: PublicEvent[];
  spotlightUsesPast?: boolean;
  news: PublicNews[];
  fieldGallery: SitePhoto[];
};

export function Homepage({
  featured,
  spotlightUsesPast = false,
  news,
  fieldGallery,
}: HomepageProps) {
  return (
    <>
      <Hero />
      <StatsBand />
      <EventSlideshow events={featured} showRecent={spotlightUsesPast} />
      <NewsGrid news={news} />
      <AboutPreview />
      <FieldGallery photos={fieldGallery} />
      <JoinCtaBand />
    </>
  );
}
