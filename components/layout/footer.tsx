import type { ReactNode } from "react";

import type { SiteSettingsResolved } from "@/types/site-settings";

import { FooterBackToTop } from "@/components/layout/footer-back-to-top";

type Props = {
  settings: SiteSettingsResolved;
};

function IconGithub({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconTwitter({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function SocialRow({
  href,
  label,
  id,
  icon,
}: {
  href: string;
  label: string;
  id: string;
  icon: ReactNode;
}) {
  const className =
    "flex items-center gap-2 text-sm uppercase tracking-widest text-zinc-500 transition-colors hover:text-white";

  if (!href) {
    return (
      <span
        className={`${className} cursor-default opacity-40`}
        aria-disabled="true"
      >
        {icon}
        {label}
      </span>
    );
  }

  return (
    <a
      href={href}
      id={id}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {icon}
      {label}
    </a>
  );
}

export function Footer({ settings }: Props) {
  const mailto = settings.contactEmail.includes("@")
    ? `mailto:${settings.contactEmail.replace(/^mailto:/i, "")}`
    : `mailto:${settings.contactEmail}`;

  return (
    <footer
      id="contact"
      className="bg-black px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-24 text-center md:mb-32">
          <h2 className="font-display mb-10 text-5xl font-bold leading-none tracking-tighter text-white md:mb-12 md:text-[8vw]">
            {settings.footerCtaLine1}
            <br />
            {settings.footerCtaLine2Prefix}
            <span className="text-primary">{settings.footerCtaLine2Accent}</span>
          </h2>

          <a
            href={mailto}
            id="footer-cta"
            className="font-display shadow-cta inline-block transform rounded-full bg-primary px-10 py-5 text-xl text-white transition-all duration-300 hover:scale-105 hover:bg-primary-hover md:px-12 md:py-6 md:text-2xl"
          >
            {settings.contactEmail.replace(/^mailto:/i, "")}
          </a>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 border-t border-zinc-900 pt-10 md:flex-row md:pt-12">
          <div className="flex flex-wrap justify-center gap-8 md:gap-10">
            <SocialRow
              id="social-gh"
              href={settings.socialGithubUrl}
              label="GitHub"
              icon={<IconGithub className="h-4 w-4 shrink-0" />}
            />
            <SocialRow
              id="social-li"
              href={settings.socialLinkedinUrl}
              label="LinkedIn"
              icon={<IconLinkedIn className="h-4 w-4 shrink-0" />}
            />
            <SocialRow
              id="social-tw"
              href={settings.socialTwitterUrl}
              label="Twitter"
              icon={<IconTwitter className="h-4 w-4 shrink-0" />}
            />
          </div>

          <p className="text-center text-[10px] tracking-[0.4em] text-zinc-700 uppercase">
            © {settings.footerCopyrightYear} {settings.footerCopyrightName} • All
            Rights Reserved
          </p>

          <FooterBackToTop />
        </div>
      </div>
    </footer>
  );
}
