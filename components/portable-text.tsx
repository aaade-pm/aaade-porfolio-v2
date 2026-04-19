import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { cn } from "@/lib/utils";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-2xl font-semibold text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-semibold text-foreground">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-2 pl-6 text-foreground/90">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-6 text-foreground/90">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      return (
        <a
          href={href}
          className="font-medium text-olive-400 underline-offset-4 hover:text-olive-300"
          rel="noopener noreferrer"
          target="_blank"
        >
          {children}
        </a>
      );
    },
  },
};

type PortableTextProps = {
  value: PortableTextBlock[];
  className?: string;
};

export function RichText({ value, className }: PortableTextProps) {
  if (!value?.length) return null;
  return (
    <div className={cn("prose-olive max-w-none", className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}
