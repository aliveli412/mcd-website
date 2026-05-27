"use client";

import { useEffect, useState } from "react";
import { NewsCarousel } from "@/components/site/NewsCarousel";
import { NewsShowcase } from "@/components/site/NewsShowcase";
import type { PublicNews } from "@/lib/data/types";

const DESKTOP_MQ = "(min-width: 768px)";

/** Ana sayfada yalnızca bir haber carousel’i (mobil veya masaüstü). */
export function NewsHomeDisplay({ news }: { news: PublicNews[] }) {
  const [desktop, setDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (desktop === null) {
    return <NewsCarousel news={news} className="md:hidden" />;
  }

  return desktop ? (
    <NewsShowcase news={news} />
  ) : (
    <NewsCarousel news={news} className="" />
  );
}
