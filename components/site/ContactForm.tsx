"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/(site)/iletisim/actions";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { LocalizedLink } from "@/components/site/LocalizedLink";
import type { SiteContent } from "@/lib/i18n/site-content";

type ContactLabels = SiteContent["contact"];

export function ContactForm({ labels }: { labels: ContactLabels }) {
  const [state, formAction, pending] = useActionState(submitContactForm, null);

  return (
    <form
      action={formAction}
      className="relative flex min-h-full flex-col overflow-hidden rounded-3xl bg-forest-dark text-cream shadow-[0_12px_40px_rgba(42,53,32,0.2)]"
    >
      <div
        className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(45,139,95,0.22)_0%,transparent_70%)]"
        aria-hidden
      />
      <div className="relative flex flex-1 flex-col p-6 lg:p-8">
        <div className="mb-6 border-b border-cream/10 pb-6">
          <h3 className="font-display text-2xl tracking-wide uppercase md:text-3xl">
            {labels.writeTitle}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/70">
            {labels.writeBlurb}
          </p>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="grid gap-3.5 sm:grid-cols-2">
            <FormField
              label={labels.name}
              name="name"
              placeholder={labels.namePlaceholder}
              required
              disabled={pending}
            />
            <FormField
              label={labels.email}
              name="email"
              type="email"
              placeholder={labels.emailPlaceholder}
              required
              disabled={pending}
            />
          </div>
          <FormField
            label={labels.subject}
            name="subject"
            placeholder={labels.subjectPlaceholder}
            required
            disabled={pending}
          />
          <FormField
            label={labels.message}
            name="message"
            placeholder={labels.messagePlaceholder}
            multiline
            grow
            required
            disabled={pending}
          />

          {state?.ok === false ? (
            <p className="mb-3 text-sm text-terracotta" role="alert">
              {state.error}
            </p>
          ) : null}
          {state?.ok === true ? (
            <p className="mb-3 text-sm text-leaf-green" role="status">
              {labels.formSuccess}
            </p>
          ) : null}

          <p className="mb-4 text-xs leading-relaxed text-cream/50">
            {labels.formKvkkNoticePrefix}
            <LocalizedLink
              href="/kvkk"
              className="font-medium text-cream/75 underline decoration-cream/30 underline-offset-2 hover:text-leaf-green"
            >
              {labels.formKvkkNoticeLink}
            </LocalizedLink>
            {labels.formKvkkNoticeSuffix}
          </p>

          <button
            type="submit"
            disabled={pending}
            className="mt-auto inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-cream px-7 py-3.5 text-sm font-bold tracking-wide text-forest-dark uppercase transition-all hover:bg-leaf-green hover:text-cream disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {pending ? labels.formSending : labels.submit}
            <ArrowRight />
          </button>
        </div>
      </div>
    </form>
  );
}

function FormField({
  label,
  name,
  placeholder,
  type = "text",
  multiline = false,
  grow = false,
  required,
  disabled,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  multiline?: boolean;
  grow?: boolean;
  required?: boolean;
  disabled?: boolean;
}) {
  const inputClass =
    "w-full rounded-xl border border-cream/15 bg-cream/6 px-3.5 py-3 font-body text-sm text-cream placeholder:text-cream/35 transition-colors focus:border-leaf-green focus:outline-none disabled:opacity-60";

  return (
    <div
      className={`mb-3.5 flex flex-col gap-1.5 ${grow ? "min-h-0 flex-1" : ""}`}
    >
      <label
        htmlFor={name}
        className="text-xs font-semibold tracking-widest text-cream/70 uppercase"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`${inputClass} ${grow ? "min-h-[140px] flex-1 resize-y" : "min-h-[120px] resize-y"}`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={inputClass}
        />
      )}
    </div>
  );
}
