/** Supabase jsonb → string[] (bazen dizi dışı tipte gelebilir). */
export function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  if (typeof value === "string") {
    try {
      const parsed: unknown = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === "string");
      }
    } catch {
      return value.trim() ? [value.trim()] : [];
    }
  }
  return [];
}
