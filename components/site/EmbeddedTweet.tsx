"use client";

import { Tweet } from "react-tweet";
import "react-tweet/theme.css";

export function EmbeddedTweet({ tweetId }: { tweetId: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/6 bg-cream [&_.react-tweet-theme]:!my-0">
      <Tweet id={tweetId} />
    </div>
  );
}
