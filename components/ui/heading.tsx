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
