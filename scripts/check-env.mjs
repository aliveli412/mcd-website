/**
 * Supabase .env kontrolü: node scripts/check-env.mjs
 */
import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

function cleanEnv(value) {
  if (!value) return "";
  let v = value.trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  const hash = v.indexOf("#");
  if (hash > 0) v = v.slice(0, hash).trim();
  return v;
}

function extractSupabaseKey(value) {
  const cleaned = cleanEnv(value);
  const match = cleaned.match(
    /eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/,
  );
  return match?.[0] ?? cleaned;
}

function loadFromFile() {
  const env = {};
  const raw = readFileSync(".env.local", "utf8");
  for (const line of raw.split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (!m) continue;
    env[m[1].trim()] = m[2];
  }
  return env;
}

const file = loadFromFile();
const url = cleanEnv(file.NEXT_PUBLIC_SUPABASE_URL);
const service = extractSupabaseKey(file.SUPABASE_SERVICE_ROLE_KEY);
const anon = extractSupabaseKey(file.NEXT_PUBLIC_SUPABASE_ANON_KEY);

console.log("URL:", url ? "OK" : "EKSIK");
console.log("anon key len:", anon.length);
console.log("service key len:", service.length);

if (url && service) {
  const sb = createClient(url, service);
  const { error } = await sb.from("events").select("id").limit(1);
  console.log("DB test:", error ? `HATA: ${error.message}` : "OK");
}
