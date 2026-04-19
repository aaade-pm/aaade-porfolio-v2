import { CodeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const articleCodeType = defineType({
  name: "articleCode",
  title: "Code block",
  type: "object",
  icon: CodeIcon,
  fields: [
    defineField({
      name: "language",
      title: "Language label",
      type: "string",
      description: "Optional (e.g. ts, bash)",
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "text",
      rows: 12,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { language: "language", code: "code" },
    prepare({ language, code }) {
      const line = (code ?? "").split("\n")[0]?.slice(0, 48) ?? "";
      return {
        title: language ? `[${language}]` : "Code block",
        subtitle: line,
      };
    },
  },
});
