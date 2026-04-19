import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";

import { cn } from "@/lib/utils";

type Tone = "default" | "hero" | "about";

function makeComponents(tone: Tone): PortableTextComponents {
  const normalClass =
    tone === "hero"
      ? "mb-0 text-lg font-light leading-relaxed text-zinc-400 md:text-xl"
      : tone === "about"
        ? "mb-6 text-base leading-relaxed text-zinc-400 md:text-lg lg:text-xl [&_strong]:text-white"
        : "mb-4 leading-relaxed text-foreground/90";

  const linkClass =
    tone === "hero"
      ? "font-medium text-primary no-underline hover:underline"
      : tone === "about"
        ? "font-medium text-white underline-offset-4 hover:text-olive-300"
        : "font-medium text-olive-400 underline-offset-4 hover:text-olive-300";

  const leadClass =
    tone === "about"
      ? "mb-8 text-2xl font-medium leading-tight text-white md:text-3xl lg:text-4xl [&_strong]:text-white"
      : "mb-6 text-xl font-medium text-white md:text-2xl";

  return {
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
      lead: ({ children }) => <p className={leadClass}>{children}</p>,
      normal: ({ children }) => <p className={normalClass}>{children}</p>,
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
      strong: ({ children }) => (
        <strong
          className={
            tone === "about" ? "font-medium text-white" : "font-semibold"
          }
        >
          {children}
        </strong>
      ),
      em: ({ children }) => (
        <em className={tone === "about" ? "italic text-zinc-300" : "italic"}>
          {children}
        </em>
      ),
      link: ({ children, value }) => {
        const href = typeof value?.href === "string" ? value.href : "#";
        if (href.startsWith("mailto:") || href.startsWith("tel:")) {
          return (
            <a href={href} className={linkClass}>
              {children}
            </a>
          );
        }
        const internal =
          (href.startsWith("/") && !href.startsWith("//")) ||
          href.startsWith("#");
        if (internal) {
          return (
            <Link href={href} className={linkClass}>
              {children}
            </Link>
          );
        }
        return (
          <a
            href={href}
            className={linkClass}
            rel="noopener noreferrer"
            target="_blank"
          >
            {children}
          </a>
        );
      },
    },
  };
}

type PortableTextProps = {
  value: PortableTextBlock[];
  className?: string;
  tone?: Tone;
};

export function RichText({ value, className, tone = "default" }: PortableTextProps) {
  if (!value?.length) return null;
  const components = makeComponents(tone);
  return (
    <div className={cn("prose-olive max-w-none", className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}
