/** Geçici yedek: admin_users boş / tablo yokken tek ADMIN_EMAIL. */
export function isAdminEmailLegacy(email: string | undefined): boolean {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!adminEmail || !email) return false;
  return email.toLowerCase() === adminEmail;
}
