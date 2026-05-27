/**
 * event-posters bucket oluşturur ve test yükler.
 * node scripts/setup-storage.mjs
 */
import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "event-posters";

function cleanEnv(value) {
  if (!value) return "";
  let v = String(value).trim();
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

function loadEnv() {
  const raw = readFileSync(".env.local", "utf8");
  const env = {};
  for (const line of raw.split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (!m) continue;
    env[m[1].trim()] = m[2];
  }
  return env;
}

const file = loadEnv();
const url = cleanEnv(file.NEXT_PUBLIC_SUPABASE_URL);
const service = extractSupabaseKey(file.SUPABASE_SERVICE_ROLE_KEY);

if (!url || !service) {
  console.error("NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY gerekli.");
  process.exit(1);
}

console.log("Proje:", url);

const sb = createClient(url, service, { auth: { persistSession: false } });

const { data: buckets, error: listErr } = await sb.storage.listBuckets();
if (listErr) {
  console.error("Bucket listesi alınamadı:", listErr.message);
  process.exit(1);
}

console.log(
  "Mevcut bucket'lar:",
  buckets?.map((b) => `${b.id} (public=${b.public})`).join(", ") || "(boş)",
);

const existing = buckets?.find((b) => b.id === BUCKET || b.name === BUCKET);
if (!existing) {
  console.log(`"${BUCKET}" oluşturuluyor…`);
  const { data, error } = await sb.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: 2097152,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  });
  if (error) {
    console.error("createBucket hatası:", error.message);
    process.exit(1);
  }
  console.log("Bucket oluşturuldu:", data);
} else if (!existing.public) {
  console.log(`"${BUCKET}" private — public yapılıyor…`);
  const { error } = await sb.storage.updateBucket(BUCKET, {
    public: true,
    fileSizeLimit: 2097152,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  });
  if (error) {
    console.error("updateBucket hatası:", error.message);
    process.exit(1);
  }
  console.log("Bucket artık public.");
} else {
  console.log(`"${BUCKET}" zaten public.`);
}

const testName = `setup-test-${Date.now()}.txt`;
const body = Buffer.from("mcd-storage-test");
const { error: upErr } = await sb.storage.from(BUCKET).upload(testName, body, {
  contentType: "text/plain",
  upsert: true,
});
if (upErr) {
  console.error("Test yükleme hatası:", upErr.message);
  process.exit(1);
}

const { data: pub } = sb.storage.from(BUCKET).getPublicUrl(testName);
console.log("Test URL:", pub.publicUrl);

const res = await fetch(pub.publicUrl, { method: "GET" });
console.log("HTTP:", res.status, res.ok ? "OK" : res.statusText);
if (!res.ok) {
  console.error("Public erişim başarısız — bucket Public değil olabilir.");
  process.exit(1);
}

await sb.storage.from(BUCKET).remove([testName]);
console.log("\nTamam. Haber görsellerini admin'den yeniden yükleyin.");
