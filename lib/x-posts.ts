export type XPostStatus = "draft" | "published";

export type DbXPost = {
  id: string;
  tweet_id: string;
  tweet_url: string;
  sort_order: number;
  status: XPostStatus;
  created_at: string;
};

export function parseTweetIdFromUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (/^\d{10,25}$/.test(trimmed)) return trimmed;

  const match = trimmed.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/i);
  return match?.[1] ?? null;
}

export function normalizeDbXPost(row: Record<string, unknown>): DbXPost {
  let status: XPostStatus = "published";
  if (row.status === "draft") {
    status = "draft";
  } else if (row.status === "published") {
    status = "published";
  }

  return {
    id: String(row.id ?? ""),
    tweet_id: String(row.tweet_id ?? ""),
    tweet_url: String(row.tweet_url ?? ""),
    sort_order: Number(row.sort_order ?? 0),
    status,
    created_at: String(row.created_at ?? ""),
  };
}
