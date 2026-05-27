import type { ReactNode } from "react";
import { ContactForm } from "@/components/site/ContactForm";
import { SitePhoto } from "@/components/site/SitePhoto";
import { SectionHeader, SiteSection } from "@/components/site/SectionParts";
import { getLocale } from "@/lib/i18n/locale";
import { getSiteContent, type SiteContent } from "@/lib/i18n/site-content";
import { organization } from "@/lib/organization";
import { sitePhotos } from "@/lib/site-photos";

export async function ContactSection() {
  const locale = await getLocale();
  const contact = getSiteContent(locale).contact;
  const org = getSiteContent(locale).org;

  return (
    <SiteSection id="iletisim" className="bg-cream">
      <SectionHeader
        eyebrow={contact.eyebrow}
        title={contact.title}
        accent={contact.accent}
      />

      <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
        <aside className="flex flex-col overflow-hidden rounded-3xl border border-black/6 bg-bone shadow-[0_8px_32px_rgba(61,74,45,0.06)]">
          <SitePhoto
            {...sitePhotos.iletisim}
            className="aspect-[2/1] shrink-0 sm:aspect-[16/9]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          <div className="flex flex-1 flex-col gap-6 p-6 lg:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {org.offices.map((office) => (
                <OfficeCard key={office.id} office={office} />
              ))}
            </div>

            <div className="mt-auto grid gap-4 border-t border-black/6 pt-6 sm:grid-cols-2">
              <ContactBlock
                icon="email"
                label={contact.email}
                value={
                  <a
                    href={`mailto:${organization.email}`}
                    className="break-all hover:text-leaf-green"
                  >
                    {organization.email}
                  </a>
                }
                sub={contact.emailSub}
                iconClass="bg-leaf-green"
                compact
              />
              <ContactBlock
                icon="phone"
                label={contact.phone}
                value={
                  <a
                    href={`tel:${organization.phone.replace(/\D/g, "")}`}
                    className="hover:text-leaf-green"
                  >
                    {organization.phone}
                  </a>
                }
                sub={org.phoneNote}
                iconClass="bg-river-blue"
                compact
              />
            </div>
          </div>
        </aside>

        <ContactForm labels={contact} />
      </div>
    </SiteSection>
  );
}

function OfficeCard({
  office,
}: {
  office: SiteContent["org"]["offices"][number];
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-cream p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-dark text-cream">
          <ContactIcon type="location" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-bold tracking-widest text-leaf-green uppercase">
            {office.label}
          </p>
          <div className="mt-2 space-y-0.5 text-sm font-semibold leading-snug text-forest-dark">
            {office.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">{office.region}</p>
        </div>
      </div>
    </div>
  );
}

function ContactBlock({
  icon,
  label,
  value,
  sub,
  iconClass = "bg-forest-dark",
  compact = false,
}: {
  icon: "location" | "email" | "phone";
  label: string;
  value: ReactNode;
  sub: string;
  iconClass?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex h-full gap-3 rounded-2xl border border-black/5 bg-cream ${
        compact ? "p-4" : "gap-4 p-6"
      }`}
    >
      <div
        className={`flex shrink-0 items-center justify-center rounded-lg text-cream ${
          compact ? "h-9 w-9" : "h-11 w-11 rounded-[10px]"
        } ${iconClass}`}
      >
        <ContactIcon type={icon} />
      </div>
      <div className="min-w-0">
        <div
          className={`font-bold tracking-widest text-muted uppercase ${
            compact ? "text-[10px]" : "text-xs"
          }`}
        >
          {label}
        </div>
        <div
          className={`mt-1 font-semibold leading-snug text-forest-dark ${
            compact ? "text-sm" : "text-base"
          }`}
        >
          {value}
        </div>
        <div className={`mt-1 text-muted ${compact ? "text-xs" : "text-[13px]"}`}>
          {sub}
        </div>
      </div>
    </div>
  );
}

function ContactIcon({ type }: { type: "location" | "email" | "phone" }) {
  const props = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    "aria-hidden": true as const,
  };

  if (type === "email") {
    return (
      <svg {...props}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg {...props}>
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

