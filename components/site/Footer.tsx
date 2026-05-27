import Link from "next/link";
import { SocialLinks } from "@/components/site/SocialLinks";
import { LogoMark } from "@/components/layout/LogoMark";
import { SiteContainer } from "@/components/layout/SiteContainer";
import { organization } from "@/lib/organization";
import { getFooterNav } from "@/lib/i18n/navigation";
import { getLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/lib/i18n/messages";
import { getSiteContent } from "@/lib/i18n/site-content";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div className="border-t border-cream/10 pt-8 first:border-t-0 first:pt-0 sm:border-t-0 sm:border-l-2 sm:border-leaf-green/35 sm:pt-0 sm:pl-5 md:pl-6">
      <h4 className="mb-5 font-display text-base tracking-widest text-cream uppercase md:text-[15px]">
        {title}
      </h4>
      <ul className="flex list-none flex-col gap-3">
        {links.map(({ href, label }) => (
          <li key={`${title}-${label}`}>
            <Link
              href={href}
              className="text-sm font-medium text-cream/75 transition-colors hover:text-leaf-green"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterOffice({
  office,
}: {
  office: (typeof organization.offices)[number];
}) {
  return (
    <div className="rounded-xl border border-cream/12 bg-cream/5 p-4">
      <p className="text-[10px] font-bold tracking-[0.14em] text-leaf-green uppercase">
        {office.label}
      </p>
      <address className="mt-2 not-italic">
        {office.lines.map((line) => (
          <span key={line} className="block text-sm leading-relaxed text-cream/80">
            {line}
          </span>
        ))}
      </address>
    </div>
  );
}

export async function Footer() {
  const locale = await getLocale();
  const t = getMessages(locale);
  const site = getSiteContent(locale);
  const footerNav = getFooterNav(locale);

  return (
    <footer className="border-t-4 border-leaf-green bg-forest-deep text-cream">
      <SiteContainer className="py-14 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
          <div className="lg:pr-4">
            <LogoMark variant="footer" />
            <p className="mt-5 max-w-md text-base leading-relaxed text-cream/80">
              {t.footer.blurb}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {organization.offices.map((office) => (
                <FooterOffice key={office.id} office={office} />
              ))}
            </div>

            <p className="mt-6">
              <a
                href={`mailto:${organization.email}`}
                className="text-sm font-semibold text-cream transition-colors hover:text-leaf-green"
              >
                {organization.email}
              </a>
            </p>

            <SocialLinks variant="footer" className="mt-5" />
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:contents">
            <FooterColumn title={t.footer.links} links={footerNav} />
            <FooterColumn title={t.footer.activities} links={site.footerActivities} />
            <FooterColumn title={t.footer.support} links={site.footerSupport} />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-cream/15 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-cream/60">
            © {new Date().getFullYear()} {organization.name} — {t.footer.rights}
          </p>
          <nav
            aria-label="Yasal"
            className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-cream/60"
          >
            <Link href="#" className="transition-colors hover:text-leaf-green">
              {site.legal.privacy}
            </Link>
            <Link href="#" className="transition-colors hover:text-leaf-green">
              {site.legal.kvkk}
            </Link>
            <Link href="#" className="transition-colors hover:text-leaf-green">
              {site.legal.cookies}
            </Link>
          </nav>
        </div>
      </SiteContainer>
    </footer>
  );
}
