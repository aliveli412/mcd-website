/**
 * Etkinlik siler (slug veya başlık).
 *   node scripts/delete-event.mjs ekoloji-bulusmasi
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const arg = process.argv[2];
if (!arg) {
  console.error("Kullanım: node scripts/delete-event.mjs <slug veya başlık parçası>");
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
try {
  const raw = readFileSync(join(root, ".env.local"), "utf8");
  for (const line of raw.split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (!m) continue;
    let val = m[2].trim().replace(/^["']|["']$/g, "");
    const hash = val.indexOf("#");
    if (hash > 0) val = val.slice(0, hash).trim();
    process.env[m[1].trim()] = val;
  }
} catch {
  console.error(".env.local bulunamadı");
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Supabase URL veya SERVICE_ROLE_KEY eksik");
  process.exit(1);
}

const sb = createClient(url, key);

const { data: found } = await sb
  .from("events")
  .select("id, slug, title_plain")
  .or(`slug.eq.${arg},title_plain.ilike.%${arg}%,title.ilike.%${arg}%`);

if (!found?.length) {
  console.log("Eşleşen etkinlik yok:", arg);
  process.exit(0);
}

const ids = found.map((r) => r.id);
const { error } = await sb.from("events").delete().in("id", ids);
if (error) {
  console.error(error.message);
  process.exit(1);
}

console.log(
  "Silindi:",
  found.map((r) => `${r.slug} (${r.title_plain})`),
);
