"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

import { defaultViewport, staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

type StaggerProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
};

export function Stagger({ className, children, ...rest }: StaggerProps) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={staggerContainer}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
};

export function StaggerItem({
  className,
  children,
  ...rest
}: StaggerItemProps) {
  return (
    <motion.div className={cn(className)} variants={staggerItem} {...rest}>
      {children}
    </motion.div>
  );
}
