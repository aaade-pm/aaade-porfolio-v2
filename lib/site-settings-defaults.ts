import type { SiteSettingsResolved } from "@/types/site-settings";

export const DEFAULT_SITE_SETTINGS: SiteSettingsResolved = {
  brandMark: "OA.",
  logo: null,
  logoUrl: null,
  navItems: [
    { label: "Work", href: "/work" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Reach-me", href: "/reach-me" },
  ],

  heroTimezone: "Africa/Lagos",
  heroLocationPrefix: "Based in",
  heroLocationName: "Lagos, NG",
  heroAvailability: "Available for collaboration",
  heroLine1: "FRONTEND",
  heroLine2: "ENGINEER",
  heroBadgeLine1: "Creative Builder",
  heroBadgeLine2: "& Curious Learner",
  heroIntro: null,
  heroScrollLabel: "Scroll",

  workTitle: "Selected Works",
  workFeaturedEmptyMessage:
    'No featured projects yet. In Sanity Studio, mark projects as "Featured on homepage".',
  workLiveLabel: "Live project",
  workCaseStudyLabel: "Case study",

  archiveCtaLabel: "Browse archive",
  archiveModalEyebrow: "Project archive",
  archiveModalTitle: "The vault",
  archiveModalDescription:
    "Experiments, legacy products, and creative systems worth revisiting.",
  archiveGridEmptyMessage:
    'No archive projects yet. Enable "Show in archive modal" on projects in Sanity.',
  archiveCaseStudyLinkLabel: "Case study →",

  lifeTitle: "Beyond code",
  lifeDescription:
    "A glimpse into life away from the screen — photography, travel, and what keeps the work human.",
  lifeEmptyMessage:
    "Gallery items will appear here from Sanity (galleryItem documents).",
  lifeGalleryCtaLabel: "See more",

  aboutEyebrow: "The narrative",
  aboutBody: null,
  aboutCoreStackTitle: "Core stack",
  aboutCoreStack: [
    "React / Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Three.js / Canvas",
    "Framer Motion / GSAP",
  ],
  aboutInterestsTitle: "Interests",
  aboutInterests: [
    "Generative Art",
    "UI Interactions",
    "System Design",
    "Analog Photography",
    "Coffee Theory",
  ],
  aboutQuote:
    "He's not just a developer; he's like a designer who accidentally learned how to use a terminal. And we're okay with that.",
  aboutQuoteAttribution: "— Totally real colleague",

  contactEmail: "hello@aaade.dev",
  footerCtaLine1: "LET'S BUILD",
  footerCtaLine2Prefix: "SOMETHING ",
  footerCtaLine2Accent: "GREAT",
  footerCopyrightName: "ADEMOLA OLATUNJI",
  footerCopyrightYear: new Date().getFullYear(),
  socialGithubUrl: "",
  socialLinkedinUrl: "",
  socialTwitterUrl: "",
};

type RawSiteSettings = Record<string, unknown> | null;

/** Map legacy hash nav links from older CMS content to path routes. */
function normalizeNavHref(href: string): string {
  const legacy: Record<string, string> = {
    "/#work": "/work",
    "/#life": "/life",
    "/#about": "/about",
    "/#contact": "/reach-me",
    "#work": "/work",
    "#life": "/life",
    "#about": "/about",
    "#contact": "/reach-me",
    "/contact": "/reach-me",
  };
  return legacy[href.trim()] ?? href;
}

function pickNavItems(raw: unknown, fallback: SiteSettingsResolved["navItems"]) {
  if (!Array.isArray(raw) || raw.length === 0) return fallback;
  return raw.map((item) => {
    const o = item as Record<string, unknown>;
    return {
      label: String(o.label ?? ""),
      href: normalizeNavHref(String(o.href ?? "#")),
      openInNewTab: Boolean(o.openInNewTab),
    };
  });
}

function pickStringArray(raw: unknown, fallback: string[]) {
  if (!Array.isArray(raw) || raw.length === 0) return fallback;
  return raw.map((x) => String(x));
}

function pickOptionalUrl(raw: unknown, fallback: string) {
  if (raw == null || raw === "") return fallback;
  return String(raw);
}

function pickCopyrightYear(raw: unknown, fallback: number) {
  const n = Number(raw);
  if (!Number.isFinite(n)) return fallback;
  return Math.trunc(n);
}

export function mergeSiteSettings(
  raw: RawSiteSettings,
  defaults: SiteSettingsResolved,
): Omit<SiteSettingsResolved, "logoUrl"> {
  if (!raw) {
    const { logoUrl, ...rest } = defaults;
    void logoUrl;
    return rest;
  }

  const logo = (raw.logo as SiteSettingsResolved["logo"]) ?? null;

  return {
    brandMark: (raw.brandMark as string) ?? defaults.brandMark,
    logo,
    navItems: pickNavItems(raw.navItems, defaults.navItems),

    heroTimezone: (raw.heroTimezone as string) ?? defaults.heroTimezone,
    heroLocationPrefix:
      (raw.heroLocationPrefix as string) ?? defaults.heroLocationPrefix,
    heroLocationName:
      (raw.heroLocationName as string) ?? defaults.heroLocationName,
    heroAvailability:
      (raw.heroAvailability as string) ?? defaults.heroAvailability,
    heroLine1: (raw.heroLine1 as string) ?? defaults.heroLine1,
    heroLine2: (raw.heroLine2 as string) ?? defaults.heroLine2,
    heroBadgeLine1: (raw.heroBadgeLine1 as string) ?? defaults.heroBadgeLine1,
    heroBadgeLine2: (raw.heroBadgeLine2 as string) ?? defaults.heroBadgeLine2,
    heroIntro:
      Array.isArray(raw.heroIntro) && raw.heroIntro.length > 0
        ? (raw.heroIntro as SiteSettingsResolved["heroIntro"])
        : defaults.heroIntro,
    heroScrollLabel:
      (raw.heroScrollLabel as string) ?? defaults.heroScrollLabel,

    workTitle: (raw.workTitle as string) ?? defaults.workTitle,
    workFeaturedEmptyMessage:
      (raw.workFeaturedEmptyMessage as string) ??
      defaults.workFeaturedEmptyMessage,
    workLiveLabel: (raw.workLiveLabel as string) ?? defaults.workLiveLabel,
    workCaseStudyLabel:
      (raw.workCaseStudyLabel as string) ?? defaults.workCaseStudyLabel,

    archiveCtaLabel: (raw.archiveCtaLabel as string) ?? defaults.archiveCtaLabel,
    archiveModalEyebrow:
      (raw.archiveModalEyebrow as string) ?? defaults.archiveModalEyebrow,
    archiveModalTitle:
      (raw.archiveModalTitle as string) ?? defaults.archiveModalTitle,
    archiveModalDescription:
      (raw.archiveModalDescription as string) ??
      defaults.archiveModalDescription,
    archiveGridEmptyMessage:
      (raw.archiveGridEmptyMessage as string) ??
      defaults.archiveGridEmptyMessage,
    archiveCaseStudyLinkLabel:
      (raw.archiveCaseStudyLinkLabel as string) ??
      defaults.archiveCaseStudyLinkLabel,

    lifeTitle: (raw.lifeTitle as string) ?? defaults.lifeTitle,
    lifeDescription:
      (raw.lifeDescription as string) ?? defaults.lifeDescription,
    lifeEmptyMessage:
      (raw.lifeEmptyMessage as string) ?? defaults.lifeEmptyMessage,
    lifeGalleryCtaLabel:
      (raw.lifeGalleryCtaLabel as string) ?? defaults.lifeGalleryCtaLabel,

    aboutEyebrow: (raw.aboutEyebrow as string) ?? defaults.aboutEyebrow,
    aboutBody:
      Array.isArray(raw.aboutBody) && raw.aboutBody.length > 0
        ? (raw.aboutBody as SiteSettingsResolved["aboutBody"])
        : defaults.aboutBody,
    aboutCoreStackTitle:
      (raw.aboutCoreStackTitle as string) ?? defaults.aboutCoreStackTitle,
    aboutCoreStack: pickStringArray(raw.aboutCoreStack, defaults.aboutCoreStack),
    aboutInterestsTitle:
      (raw.aboutInterestsTitle as string) ?? defaults.aboutInterestsTitle,
    aboutInterests: pickStringArray(
      raw.aboutInterests,
      defaults.aboutInterests,
    ),
    aboutQuote: (raw.aboutQuote as string) ?? defaults.aboutQuote,
    aboutQuoteAttribution:
      (raw.aboutQuoteAttribution as string) ?? defaults.aboutQuoteAttribution,

    contactEmail: (raw.contactEmail as string) ?? defaults.contactEmail,
    footerCtaLine1: (raw.footerCtaLine1 as string) ?? defaults.footerCtaLine1,
    footerCtaLine2Prefix:
      (raw.footerCtaLine2Prefix as string) ?? defaults.footerCtaLine2Prefix,
    footerCtaLine2Accent:
      (raw.footerCtaLine2Accent as string) ?? defaults.footerCtaLine2Accent,
    footerCopyrightName:
      (raw.footerCopyrightName as string) ?? defaults.footerCopyrightName,
    footerCopyrightYear: pickCopyrightYear(
      raw.footerCopyrightYear,
      defaults.footerCopyrightYear,
    ),
    socialGithubUrl: pickOptionalUrl(raw.socialGithubUrl, defaults.socialGithubUrl),
    socialLinkedinUrl: pickOptionalUrl(
      raw.socialLinkedinUrl,
      defaults.socialLinkedinUrl,
    ),
    socialTwitterUrl: pickOptionalUrl(
      raw.socialTwitterUrl,
      defaults.socialTwitterUrl,
    ),
  };
}
