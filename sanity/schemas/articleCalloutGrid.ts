import { ThListIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const articleCalloutGridType = defineType({
  name: "articleCalloutGrid",
  title: "Two-column callouts",
  type: "object",
  icon: ThListIcon,
  fields: [
    defineField({
      name: "leftTitle",
      title: "Left title",
      type: "string",
    }),
    defineField({
      name: "leftBody",
      title: "Left body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "rightTitle",
      title: "Right title",
      type: "string",
    }),
    defineField({
      name: "rightBody",
      title: "Right body",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { leftTitle: "leftTitle", rightTitle: "rightTitle" },
    prepare({ leftTitle, rightTitle }) {
      return {
        title: "Callout grid",
        subtitle: [leftTitle, rightTitle].filter(Boolean).join(" · ") || "Two columns",
      };
    },
  },
});
