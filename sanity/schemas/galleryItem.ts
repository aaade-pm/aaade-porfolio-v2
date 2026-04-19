import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const galleryItemType = defineType({
  name: "galleryItem",
  title: "Gallery item",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
        }),
      ],
    }),
    defineField({
      name: "captionTitle",
      title: "Caption title",
      description: "Short label shown in olive above the description.",
      type: "string",
    }),
    defineField({
      name: "captionDescription",
      title: "Caption description",
      description: "Longer line shown in muted text below the title.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "caption",
      title: "Caption (legacy)",
      description: "Deprecated — use caption title + description. Still shown if new fields are empty.",
      type: "string",
    }),
  ],
  preview: {
    select: {
      capTitle: "captionTitle",
      cap: "caption",
      media: "image",
    },
    prepare({ capTitle, cap, media }) {
      return { title: capTitle || cap || "Gallery item", media };
    },
  },
});
