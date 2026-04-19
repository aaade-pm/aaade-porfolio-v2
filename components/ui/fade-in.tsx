"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

import { defaultViewport, fadeIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FadeInProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
};

export function FadeIn({ className, children, ...rest }: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={fadeIn}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
