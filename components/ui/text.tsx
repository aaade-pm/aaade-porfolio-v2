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
