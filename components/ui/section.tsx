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
