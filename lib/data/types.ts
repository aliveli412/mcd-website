export type PublicEvent = {
  id: string;
  slug: string;
  category: string;
  date: string;
  title: string;
  titlePlain: string;
  description: string;
  body: string[];
  location: string;
  duration: string;
  posterUrl: string | null;
  poster?: { headline: string; subline: string; year: string };
  schedule: { time: string; label: string }[];
  eventDate: string | null;
  eventTime: string | null;
  featured: boolean;
};

export type PublicNews = {
  id: string;
  slug: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  body: string[];
  gradient: string;
  imageUrl: string | null;
  publishedAt: string | null;
  sourceUrl: string | null;
  sourceName: string | null;
};
