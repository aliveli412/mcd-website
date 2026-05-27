import { cleanEnv } from "@/lib/env";
import { organization } from "@/lib/organization";

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** İletişim formu bildirimleri bu adrese gider. */
export function getContactRecipientEmail(): string {
  return organization.email;
}

function getResendFrom(): string {
  return (
    cleanEnv(process.env.RESEND_FROM) ||
    `${organization.name} <onboarding@resend.dev>`
  );
}

export async function sendContactEmail(payload: ContactMessage): Promise<void> {
  const apiKey = cleanEnv(process.env.RESEND_API_KEY);
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const to = getContactRecipientEmail();
  const from = getResendFrom();
  const { name, email, subject, message } = payload;

  const html = `
    <p><strong>İsim:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-posta:</strong> ${escapeHtml(email)}</p>
    <p><strong>Konu:</strong> ${escapeHtml(subject)}</p>
    <p><strong>Mesaj:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
  `.trim();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `[İletişim] ${subject}`,
      html,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(detail || `Resend error ${response.status}`);
  }
}
