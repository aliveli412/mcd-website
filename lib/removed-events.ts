import type { PublicEvent } from "@/lib/data/types";

/** Siteden kaldırılan etkinlikler (Supabase’de silinene kadar filtrelenir). */
const REMOVED_SLUGS = new Set([
  "ekoloji-bulusmasi",
  "munzur-ekoloji-bulusmasi",
  "ekoloji-bulusma",
]);

const REMOVED_TITLE = /ekoloji\s+buluşması/i;

export function isRemovedPublicEvent(event: Pick<PublicEvent, "slug" | "titlePlain" | "title">): boolean {
  if (REMOVED_SLUGS.has(event.slug)) return true;
  if (REMOVED_TITLE.test(event.titlePlain)) return true;
  if (REMOVED_TITLE.test(event.title.replace(/\s+/g, " "))) return true;
  return false;
}

export function filterPublicEvents(events: PublicEvent[]): PublicEvent[] {
  return events.filter((e) => !isRemovedPublicEvent(e));
}
