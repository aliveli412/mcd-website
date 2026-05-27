export function isSupabaseStorageUrl(src: string): boolean {
  try {
    return new URL(src).hostname.endsWith(".supabase.co");
  } catch {
    return false;
  }
}
