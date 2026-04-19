import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "brand", title: "Brand & nav", default: true },
    { name: "hero", title: "Hero" },
    { name: "work", title: "Selected works & archive" },
    { name: "life", title: "Beyond code" },
    { name: "about", title: "The narrative" },
    { name: "footer", title: "Footer & contact CTA" },
  ],
  fields: [
    defineField({
      name: "brandMark",
      title: "Logo mark (text)",
      type: "string",
      initialValue: "OA.",
      group: "brand",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo image (optional)",
      description: "Shown in the nav next to the mark when set.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
      group: "brand",
    }),
    defineField({
      name: "navItems",
      title: "Navigation links",
      description: "Leave empty to use built-in defaults on the site.",
      type: "array",
      group: "brand",
      of: [
        defineArrayMember({
          type: "object",
          name: "navLink",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "href",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "openInNewTab",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        }),
      ],
    }),

    defineField({
      name: "heroTimezone",
      title: "Hero clock — IANA timezone",
      description:
        'Drives the live clock. Example: "Africa/Lagos", "America/New_York".',
      type: "string",
      initialValue: "Africa/Lagos",
      group: "hero",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroLocationPrefix",
      title: "Location line — prefix",
      type: "string",
      initialValue: "Based in",
      group: "hero",
    }),
    defineField({
      name: "heroLocationName",
      title: "Location line — place name",
      type: "string",
      initialValue: "Lagos, NG",
      group: "hero",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroAvailability",
      title: "Availability line",
      type: "string",
      initialValue: "Available for collaboration",
      group: "hero",
    }),
    defineField({
      name: "heroLine1",
      title: "Hero headline — line 1",
      type: "string",
      initialValue: "FRONTEND",
      group: "hero",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroLine2",
      title: "Hero headline — line 2 (accent)",
      type: "string",
      initialValue: "ENGINEER",
      group: "hero",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroBadgeLine1",
      title: "Circle badge — line 1",
      type: "string",
      initialValue: "Creative Builder",
      group: "hero",
    }),
    defineField({
      name: "heroBadgeLine2",
      title: "Circle badge — line 2",
      type: "string",
      initialValue: "& Curious Learner",
      group: "hero",
    }),
    defineField({
      name: "heroIntro",
      title: "Hero intro",
      description:
        "Rich text: bold your name; add a link to /blog (or external URL) where you want.",
      type: "array",
      of: [{ type: "block" }],
      group: "hero",
    }),
    defineField({
      name: "heroScrollLabel",
      title: "Scroll cue label",
      type: "string",
      initialValue: "Scroll",
      group: "hero",
    }),

    defineField({
      name: "workTitle",
      title: "Section title",
      type: "string",
      initialValue: "Selected Works",
      group: "work",
    }),
    defineField({
      name: "workFeaturedEmptyMessage",
      title: "Empty state (no featured projects)",
      type: "text",
      rows: 3,
      group: "work",
    }),
    defineField({
      name: "workLiveLabel",
      title: "“Live project” link label",
      type: "string",
      initialValue: "Live project",
      group: "work",
    }),
    defineField({
      name: "workCaseStudyLabel",
      title: "“Case study” link label",
      type: "string",
      initialValue: "Case study",
      group: "work",
    }),
    defineField({
      name: "archiveCtaLabel",
      title: "Archive button label",
      type: "string",
      initialValue: "Browse archive",
      group: "work",
    }),
    defineField({
      name: "archiveModalEyebrow",
      title: "Archive modal — eyebrow",
      type: "string",
      initialValue: "Project archive",
      group: "work",
    }),
    defineField({
      name: "archiveModalTitle",
      title: "Archive modal — title",
      type: "string",
      initialValue: "The vault",
      group: "work",
    }),
    defineField({
      name: "archiveModalDescription",
      title: "Archive modal — description",
      type: "text",
      rows: 3,
      group: "work",
    }),
    defineField({
      name: "archiveGridEmptyMessage",
      title: "Archive grid empty state",
      type: "text",
      rows: 2,
      group: "work",
    }),
    defineField({
      name: "archiveCaseStudyLinkLabel",
      title: "Archive card — case study link",
      type: "string",
      initialValue: "Case study →",
      group: "work",
    }),

    defineField({
      name: "lifeTitle",
      title: "Section title",
      type: "string",
      initialValue: "Beyond code",
      group: "life",
    }),
    defineField({
      name: "lifeDescription",
      title: "Section description",
      type: "text",
      rows: 3,
      group: "life",
    }),
    defineField({
      name: "lifeEmptyMessage",
      title: "Empty state (no gallery items)",
      type: "text",
      rows: 2,
      group: "life",
    }),
    defineField({
      name: "lifeGalleryCtaLabel",
      title: "Life section — link to full gallery",
      description:
        'Pill button under the preview grid (same style as “Browse archive”). Links to /gallery.',
      type: "string",
      initialValue: "See more",
      group: "life",
    }),
    defineField({
      name: "lifeGalleryItems",
      title: "Beyond code — photos to show",
      description:
        "Pick gallery items and drag to set order for the home and /life preview. Leave empty to show every gallery item (newest first). The /gallery page always lists all items.",
      type: "array",
      group: "life",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "galleryItem" }],
        }),
      ],
    }),

    defineField({
      name: "aboutEyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "The narrative",
      group: "about",
    }),
    defineField({
      name: "aboutBody",
      title: "Body",
      description:
        "Use “Lead” for the large opening line; “Body” for gray paragraphs. Italic for emphasis.",
      type: "array",
      group: "about",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Lead (large white)", value: "lead" },
            { title: "Body (muted)", value: "normal" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "aboutCoreStackTitle",
      title: "Core stack — title",
      type: "string",
      initialValue: "Core stack",
      group: "about",
    }),
    defineField({
      name: "aboutCoreStack",
      title: "Core stack — items",
      type: "array",
      of: [{ type: "string" }],
      group: "about",
    }),
    defineField({
      name: "aboutInterestsTitle",
      title: "Interests — title",
      type: "string",
      initialValue: "Interests",
      group: "about",
    }),
    defineField({
      name: "aboutInterests",
      title: "Interests — items",
      type: "array",
      of: [{ type: "string" }],
      group: "about",
    }),
    defineField({
      name: "aboutQuote",
      title: "Quote",
      type: "text",
      rows: 3,
      group: "about",
    }),
    defineField({
      name: "aboutQuoteAttribution",
      title: "Quote attribution",
      type: "string",
      initialValue: "— Totally real colleague",
      group: "about",
    }),

    defineField({
      name: "contactEmail",
      title: "CTA email (mailto + button label)",
      type: "string",
      initialValue: "hello@aaade.dev",
      group: "footer",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "footerCtaLine1",
      title: "Footer headline — line 1",
      type: "string",
      initialValue: "LET'S BUILD",
      group: "footer",
    }),
    defineField({
      name: "footerCtaLine2Prefix",
      title: "Footer headline — line 2 before accent",
      description: 'Usually ends with a space, e.g. "SOMETHING "',
      type: "string",
      initialValue: "SOMETHING ",
      group: "footer",
    }),
    defineField({
      name: "footerCtaLine2Accent",
      title: "Footer headline — accent word (olive)",
      type: "string",
      initialValue: "GREAT",
      group: "footer",
    }),
    defineField({
      name: "footerCopyrightName",
      title: "Copyright — name",
      type: "string",
      initialValue: "ADEMOLA OLATUNJI",
      group: "footer",
    }),
    defineField({
      name: "footerCopyrightYear",
      title: "Copyright year",
      type: "number",
      initialValue: 2026,
      group: "footer",
      validation: (r) => r.integer().min(1900).max(2100),
    }),
    defineField({
      name: "socialGithubUrl",
      title: "GitHub URL",
      type: "url",
      group: "footer",
    }),
    defineField({
      name: "socialLinkedinUrl",
      title: "LinkedIn URL",
      type: "url",
      group: "footer",
    }),
    defineField({
      name: "socialTwitterUrl",
      title: "Twitter / X URL",
      type: "url",
      group: "footer",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
