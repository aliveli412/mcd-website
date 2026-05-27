import { Homepage } from "@/components/site/Homepage";
import { getHomepageData } from "@/lib/data/queries";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { featured, spotlightUsesPast, news, fieldGallery } =
    await getHomepageData();

  return (
    <Homepage
      featured={featured}
      spotlightUsesPast={spotlightUsesPast}
      news={news}
      fieldGallery={fieldGallery}
    />
  );
}
