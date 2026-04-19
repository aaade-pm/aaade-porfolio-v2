"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

import { defaultViewport, slideUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SlideUpProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
};

export function SlideUp({ className, children, ...rest }: SlideUpProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={slideUp}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
