import type { ReactNode } from "react";
import { socialLinks } from "@/lib/social-links";

type SocialLinksProps = {
  variant?: "header" | "footer";
  className?: string;
};

function SocialIconLink({
  href,
  label,
  children,
  className,
}: {
  href: string;
  label: string;
  children: ReactNode;
  className: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={className}
    >
      {children}
    </a>
  );
}

const iconClass = "h-[14px] w-[14px]";

export function SocialLinks({ variant = "footer", className = "" }: SocialLinksProps) {
  const linkClass =
    variant === "header"
      ? "flex h-8 w-8 items-center justify-center rounded-full text-cream/75 transition-colors hover:bg-cream/10 hover:text-leaf-green"
      : "flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 bg-cream/8 text-cream transition-colors hover:border-leaf-green hover:bg-leaf-green";

  return (
    <div className={`flex items-center gap-1.5 ${className}`.trim()} role="list">
      <SocialIconLink
        href={socialLinks.x}
        label="X (Twitter)"
        className={linkClass}
      >
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </SocialIconLink>
      <SocialIconLink
        href={socialLinks.instagram}
        label="Instagram"
        className={linkClass}
      >
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.645.07-4.85.07-3.204 0-3.584-.012-4.85-.07-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.747 2.163 15.368 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.141 0-3.51.013-4.748.069-1.124.052-1.733.241-2.139.401-.538.21-.921.46-1.324.863-.403.403-.653.786-.862 1.324-.16.406-.349 1.015-.401 2.139-.056 1.238-.069 1.607-.069 4.748s.013 3.51.069 4.748c.052 1.124.241 1.733.401 2.139.21.538.46.921.862 1.324.403.403.786.653 1.324.862.406.16 1.015.349 2.139.401 1.238.056 1.607.069 4.748.069s3.51-.013 4.748-.069c1.124-.052 1.733-.241 2.139-.401.538-.21.921-.46 1.324-.862.403-.403.653-.786.862-1.324.16-.406.349-1.015.401-2.139.056-1.238.069-1.607.069-4.748s-.013-3.51-.069-4.748c-.052-1.124-.241-1.733-.401-2.139-.21-.538-.46-.921-.862-1.324-.403-.403-.786-.653-1.324-.862-.406-.16-1.015-.349-2.139-.401-1.238-.056-1.607-.069-4.748-.069zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" />
        </svg>
      </SocialIconLink>
      <SocialIconLink
        href={socialLinks.facebook}
        label="Facebook"
        className={linkClass}
      >
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
        </svg>
      </SocialIconLink>
    </div>
  );
}
