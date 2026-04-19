# Shared UI primitives (blog listing uses today)

## `components/ui/container.tsx`

See repository — `max-w-6xl` default; draft uses `max-w-7xl` → pass `className="max-w-7xl"` for journal page.

## `components/ui/section.tsx`

```tsx
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div";
  size?: "md" | "lg";
};

export function Section({
  as: Comp = "section",
  size = "lg",
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <Comp
      className={cn(size === "lg" ? "py-section" : "py-section-sm", className)}
      {...rest}
    >
      {children}
    </Comp>
  );
}
```

## `components/ui/heading.tsx`

```tsx
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Level = 1 | 2 | 3;

const levelClass: Record<Level, string> = {
  1: "text-[length:var(--text-display)] font-semibold tracking-tight",
  2: "text-3xl font-semibold tracking-tight md:text-4xl",
  3: "text-xl font-semibold md:text-2xl",
};

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3";
  level?: Level;
  muted?: boolean;
};

export function Heading({
  as,
  level = 1,
  muted,
  className,
  children,
  ...rest
}: HeadingProps) {
  const Comp = as ?? (`h${level}` as const);
  return (
    <Comp
      className={cn(
        levelClass[level],
        muted ? "text-muted" : "text-foreground",
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}
```

## `components/ui/text.tsx`

```tsx
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  as?: "p" | "span" | "div";
  size?: "sm" | "md" | "lg";
  muted?: boolean;
};

const sizeClass = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
} as const;

export function Text({
  as: Comp = "p",
  size = "md",
  muted,
  className,
  children,
  ...rest
}: TextProps) {
  return (
    <Comp
      className={cn(
        sizeClass[size],
        "leading-relaxed",
        muted ? "text-muted" : "text-foreground/90",
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}
```

Journal redesign will likely use **custom markup** (mega headline) instead of `Heading` defaults; keep primitives for smaller copy.
