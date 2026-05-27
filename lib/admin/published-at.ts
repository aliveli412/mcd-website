/** Haber yayın tarihi — Türkiye takvim günü, öğlen (saat kayması riski düşük). */
export function publishedAtToday(): string {
  const day = new Date().toLocaleDateString("en-CA", {
    timeZone: "Europe/Istanbul",
  });
  return new Date(`${day}T12:00:00+03:00`).toISOString();
}
