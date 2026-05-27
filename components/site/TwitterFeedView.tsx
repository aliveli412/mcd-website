"use client";

import Link from "next/link";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { EmbeddedTweet } from "@/components/site/EmbeddedTweet";
import { SectionHeader, SiteSection } from "@/components/site/SectionParts";
import type { SiteContent } from "@/lib/i18n/site-content";
import { socialLinks, TWITTER_HANDLE } from "@/lib/social-links";
import type { DbXPost } from "@/lib/x-posts";

type TwitterLabels = SiteContent["twitter"];

export function TwitterFeedView({
  posts,
  labels,
}: {
  posts: DbXPost[];
  labels: TwitterLabels;
}) {
  return (
    <SiteSection id="x-akisi" className="bg-bone">
      <SectionHeader
        eyebrow={labels.eyebrow}
        title={labels.title}
        accent={labels.accent}
        link={{ href: socialLinks.x, label: labels.viewOnX }}
      />

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-10">
        <aside className="rounded-2xl border border-black/6 bg-cream p-6 md:p-8 lg:sticky lg:top-24">
          <p className="text-sm leading-relaxed text-muted">{labels.blurb}</p>
          <p className="mt-4 font-display text-2xl tracking-wide text-forest-dark uppercase">
            @{TWITTER_HANDLE}
          </p>
          <Link
            href={socialLinks.x}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest-dark px-6 py-3 text-sm font-bold tracking-wide text-cream uppercase transition-colors hover:bg-leaf-green"
          >
            {labels.follow}
            <ArrowRight size={14} />
          </Link>
        </aside>

        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <EmbeddedTweet key={post.id} tweetId={post.tweet_id} />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-black/12 bg-cream px-6 py-12 text-center">
              <p className="text-sm text-muted">{labels.emptyPosts}</p>
              <Link
                href={socialLinks.x}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-leaf-green hover:underline"
              >
                {labels.viewOnX}
                <ArrowRight size={12} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </SiteSection>
  );
}
