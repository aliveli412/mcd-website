"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { useLocale } from "@/components/site/LocaleProvider";
import { SectionHeader, SiteSection } from "@/components/site/SectionParts";
import { socialLinks, TWITTER_HANDLE, twitterTimelineUrl } from "@/lib/social-links";

const WIDGET_SCRIPT = "https://platform.twitter.com/widgets.js";

export function TwitterFeed() {
  const { locale, site } = useLocale();
  const t = site.twitter;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (window.twttr?.widgets) setScriptReady(true);
  }, []);

  useEffect(() => {
    if (!scriptReady || !containerRef.current) return;
    window.twttr?.widgets.load(containerRef.current);
  }, [scriptReady, locale]);

  return (
    <SiteSection id="x-akisi" className="bg-bone">
      <SectionHeader
        eyebrow={t.eyebrow}
        title={t.title}
        accent={t.accent}
        link={{ href: socialLinks.x, label: t.viewOnX }}
      />

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] lg:gap-10">
        <aside className="rounded-2xl border border-black/6 bg-cream p-6 md:p-8">
          <p className="text-sm leading-relaxed text-muted">{t.blurb}</p>
          <p className="mt-4 font-display text-2xl tracking-wide text-forest-dark uppercase">
            @{TWITTER_HANDLE}
          </p>
          <Link
            href={socialLinks.x}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest-dark px-6 py-3 text-sm font-bold tracking-wide text-cream uppercase transition-colors hover:bg-leaf-green"
          >
            {t.follow}
            <ArrowRight size={14} />
          </Link>
          <p className="mt-4 text-xs leading-relaxed text-muted">{t.note}</p>
        </aside>

        <div
          ref={containerRef}
          className="min-h-[420px] overflow-hidden rounded-2xl border border-black/6 bg-cream shadow-[0_8px_32px_rgba(61,74,45,0.06)]"
        >
          <a
            key={locale}
            className="twitter-timeline"
            data-theme="light"
            data-height="520"
            data-chrome="noheader nofooter transparent"
            data-lang={locale === "en" ? "en" : "tr"}
            href={twitterTimelineUrl}
          >
            {t.timelineFallback}
          </a>
        </div>
      </div>

      <Script
        id="twitter-widgets"
        src={WIDGET_SCRIPT}
        strategy="lazyOnload"
        onReady={() => setScriptReady(true)}
      />
    </SiteSection>
  );
}
