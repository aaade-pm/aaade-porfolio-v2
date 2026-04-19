import type { PortableTextBlock } from "@portabletext/types";

import type { SanityImage } from "@/types/sanity";

export type NavLink = {
  label: string;
  href: string;
  openInNewTab?: boolean;
};

/** Resolved site copy + optional logo image ref; `logoUrl` is for Next/Image. */
export type SiteSettingsResolved = {
  brandMark: string;
  logo: SanityImage | null;
  logoUrl: string | null;
  navItems: NavLink[];

  heroTimezone: string;
  heroLocationPrefix: string;
  heroLocationName: string;
  heroAvailability: string;
  heroLine1: string;
  heroLine2: string;
  heroBadgeLine1: string;
  heroBadgeLine2: string;
  heroIntro: PortableTextBlock[] | null;
  heroScrollLabel: string;

  workTitle: string;
  workFeaturedEmptyMessage: string;
  workLiveLabel: string;
  workCaseStudyLabel: string;

  archiveCtaLabel: string;
  archiveModalEyebrow: string;
  archiveModalTitle: string;
  archiveModalDescription: string;
  archiveGridEmptyMessage: string;
  archiveCaseStudyLinkLabel: string;

  lifeTitle: string;
  lifeDescription: string;
  lifeEmptyMessage: string;

  aboutEyebrow: string;
  aboutBody: PortableTextBlock[] | null;
  aboutCoreStackTitle: string;
  aboutCoreStack: string[];
  aboutInterestsTitle: string;
  aboutInterests: string[];
  aboutQuote: string;
  aboutQuoteAttribution: string;

  contactEmail: string;
  footerCtaLine1: string;
  footerCtaLine2Prefix: string;
  footerCtaLine2Accent: string;
  footerCopyrightName: string;
  footerCopyrightYear: number;
  socialGithubUrl: string;
  socialLinkedinUrl: string;
  socialTwitterUrl: string;
};
