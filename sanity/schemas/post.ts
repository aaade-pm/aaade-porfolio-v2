import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleAccent",
      title: "Title accent phrase",
      description:
        "Optional exact substring of the title to show in italic primary (e.g. “High-Performance”).",
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
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
        }),
      ],
    }),
    defineField({
      name: "coverCaption",
      title: "Cover caption",
      description: "Optional line below the hero image.",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "Short summary for the journal listing cards.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Author name",
      type: "string",
    }),
    defineField({
      name: "authorRole",
      title: "Author role / title",
      type: "string",
    }),
    defineField({
      name: "authorImage",
      title: "Author image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        { type: "articleCode" },
        { type: "articleCalloutGrid" },
      ],
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage" },
    prepare({ title, media }) {
      return { title: title ?? "Untitled", media };
    },
  },
});
