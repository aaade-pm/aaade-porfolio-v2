import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";

import { cn } from "@/lib/utils";

type Tone = "default" | "hero" | "about" | "article" | "caseStudy";

const portableObjectTypes: NonNullable<PortableTextComponents["types"]> = {
  articleCode: ({ value }) => {
    const v = value as { language?: string | null; code?: string | null };
    return (
      <div className="my-10 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        {v.language ? (
          <p className="mb-3 text-xs font-medium tracking-widest text-primary uppercase">
            {v.language}
          </p>
        ) : null}
        <pre className="overflow-x-auto font-mono text-sm leading-relaxed whitespace-pre-wrap text-zinc-300">
          <code>{v.code}</code>
        </pre>
      </div>
    );
  },
  articleCalloutGrid: ({ value }) => {
    const v = value as {
      leftTitle?: string | null;
      leftBody?: string | null;
      rightTitle?: string | null;
      rightBody?: string | null;
    };
    return (
      <div className="my-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          {v.leftTitle ? (
            <h4 className="mb-4 text-xs font-bold tracking-widest text-primary uppercase">
              {v.leftTitle}
            </h4>
          ) : null}
          {v.leftBody ? (
            <p className="mb-0 text-sm leading-relaxed text-zinc-300">
              {v.leftBody}
            </p>
          ) : null}
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          {v.rightTitle ? (
            <h4 className="mb-4 text-xs font-bold tracking-widest text-primary uppercase">
              {v.rightTitle}
            </h4>
          ) : null}
          {v.rightBody ? (
            <p className="mb-0 text-sm leading-relaxed text-zinc-300">
              {v.rightBody}
            </p>
          ) : null}
        </div>
      </div>
    );
  },
};

function makeComponents(tone: Tone): PortableTextComponents {
  const normalClass =
    tone === "hero"
      ? "mb-0 text-lg font-light leading-relaxed text-zinc-400 md:text-xl"
      : tone === "about"
        ? "mb-6 text-base leading-relaxed text-zinc-400 md:text-lg lg:text-xl [&_strong]:text-white"
        : tone === "article"
          ? "mb-8 text-lg leading-[1.8] text-zinc-400 md:text-lg"
          : tone === "caseStudy"
            ? "mb-6 text-base leading-relaxed text-zinc-400 md:text-lg md:text-xl"
            : "mb-4 leading-relaxed text-foreground/90";

  const linkClass =
    tone === "hero"
      ? "font-medium text-primary no-underline hover:underline"
      : tone === "about"
        ? "font-medium text-white underline-offset-4 hover:text-olive-300"
        : tone === "article" || tone === "caseStudy"
          ? "font-medium text-primary underline-offset-4 hover:text-primary/80"
          : "font-medium text-olive-400 underline-offset-4 hover:text-olive-300";

  const leadClass =
    tone === "about"
      ? "mb-8 text-2xl font-medium leading-tight text-white md:text-3xl lg:text-4xl [&_strong]:text-white"
      : tone === "article"
        ? "mb-12 text-xl font-light text-white md:text-2xl"
        : "mb-6 text-xl font-medium text-white md:text-2xl";

  const h2Class =
    tone === "article"
      ? "mt-16 mb-6 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl"
      : tone === "caseStudy"
        ? "mt-12 mb-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        : undefined;

  const h3Class =
    tone === "caseStudy"
      ? "mt-10 mb-3 font-display text-2xl font-semibold text-foreground"
      : undefined;

  const blockquoteClass =
    tone === "article" || tone === "caseStudy"
      ? "my-12 border-l-4 border-primary py-1 pl-8 text-xl font-medium italic text-foreground md:text-2xl"
      : undefined;

  return {
    block: {
      h2: ({ children }) => (
        <h2
          className={
            h2Class ??
            "mt-10 mb-4 text-2xl font-semibold text-foreground md:text-3xl"
          }
        >
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3
          className={
            h3Class ?? "mt-8 mb-3 text-xl font-semibold text-foreground"
          }
        >
          {children}
        </h3>
      ),
      blockquote: ({ children }) =>
        blockquoteClass ? (
          <blockquote className={blockquoteClass}>{children}</blockquote>
        ) : (
          <blockquote className="border-primary text-muted-foreground my-6 border-l-2 pl-4 italic">
            {children}
          </blockquote>
        ),
      lead: ({ children }) => <p className={leadClass}>{children}</p>,
      normal: ({ children }) => <p className={normalClass}>{children}</p>,
    },
    list: {
      bullet: ({ children }) => (
        <ul
          className={cn(
            "mb-4 list-disc space-y-2 pl-6",
            tone === "article" || tone === "caseStudy"
              ? "text-zinc-400"
              : "text-foreground/90",
          )}
        >
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol
          className={cn(
            "mb-4 list-decimal space-y-2 pl-6",
            tone === "article" || tone === "caseStudy"
              ? "text-zinc-400"
              : "text-foreground/90",
          )}
        >
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
      code: ({ children }) => (
        <code
          className={cn(
            "rounded-md px-1.5 py-0.5 font-mono text-[0.9em]",
            tone === "article" || tone === "caseStudy"
              ? "bg-zinc-900 text-primary"
              : "bg-zinc-900/80 text-foreground",
          )}
        >
          {children}
        </code>
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
    types: portableObjectTypes,
  };
}

type PortableTextProps = {
  value: PortableTextBlock[] | null | undefined;
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
