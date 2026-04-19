import { ProjectsIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleAccent",
      title: "Title accent",
      description:
        "Substring of the title shown muted italic in the hero (e.g. last word).",
      type: "string",
    }),
    defineField({
      name: "caseStudyEyebrow",
      title: "Case study eyebrow",
      description: 'Overrides “Case Study / {year}” left part if set.',
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category label",
      description: 'e.g. "FINTECH" — shown as "01 / FINTECH" on featured rows',
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "archived",
      title: "Show in archive modal",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "techStack",
      title: "Tech stack",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt text",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
    }),
    defineField({
      name: "role",
      title: "Role (meta strip)",
      type: "string",
    }),
    defineField({
      name: "context",
      title: "Context (meta strip)",
      type: "string",
    }),
    defineField({
      name: "timeline",
      title: "Timeline (meta strip)",
      type: "string",
    }),
    defineField({
      name: "stackSummary",
      title: "Stack summary (meta strip)",
      description: "Falls back to tech stack list if empty.",
      type: "string",
    }),
    defineField({
      name: "challengeTitle",
      title: "Challenge heading",
      type: "string",
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "problem",
      title: "The problem",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "approachSteps",
      title: "Approach steps",
      type: "array",
      validation: (Rule) => Rule.max(3),
      of: [
        defineArrayMember({
          type: "object",
          name: "approachStep",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "text",
              rows: 4,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "outcomes",
      title: "Outcome stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "outcomeStat",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "lessons",
      title: "Lessons learned",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "lessonsAttribution",
      title: "Lessons attribution name",
      type: "string",
    }),
    defineField({
      name: "lessonsAttributionRole",
      title: "Lessons attribution role",
      type: "string",
    }),
    defineField({
      name: "caseStudy",
      title: "Additional case study (portable text)",
      description: "Long-form content below structured sections.",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title ?? "Untitled" };
    },
  },
});
