"use server";

import type { ActionResult } from "@/lib/admin/action-result";
import { sendContactEmail } from "@/lib/email/contact";
import { LOCALE_COOKIE, parseLocale } from "@/lib/i18n/locale";
import { getSiteContent } from "@/lib/i18n/site-content";
import { cookies } from "next/headers";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitContactForm(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const locale = parseLocale((await cookies()).get(LOCALE_COOKIE)?.value);
  const contact = getSiteContent(locale).contact;

  const name = (formData.get("name") as string)?.trim() ?? "";
  const email = (formData.get("email") as string)?.trim() ?? "";
  const subject = (formData.get("subject") as string)?.trim() ?? "";
  const message = (formData.get("message") as string)?.trim() ?? "";

  if (!name || !email || !subject || !message) {
    return { ok: false, error: contact.formErrorRequired };
  }

  if (!isValidEmail(email)) {
    return { ok: false, error: contact.formErrorEmail };
  }

  if (name.length > 120 || subject.length > 200 || message.length > 8000) {
    return { ok: false, error: contact.formErrorTooLong };
  }

  try {
    await sendContactEmail({ name, email, subject, message });
    return { ok: true, data: undefined };
  } catch (e) {
    console.error("submitContactForm:", e);
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes("RESEND_API_KEY")) {
      return { ok: false, error: contact.formErrorConfig };
    }
    return { ok: false, error: contact.formErrorSend };
  }
}
