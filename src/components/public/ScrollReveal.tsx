"use client";

import { motion, type Variants } from "motion/react";

type Preset = "fade" | "fade-up" | "slide-left" | "slide-right";

const presets: Record<Preset, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "fade-up": {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
};

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  preset?: Preset;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
}

export function ScrollReveal({
  preset = "fade-up",
  delay = 0,
  duration = 0.7,
  amount = 0.15,
  once = true,
  className,
  children,
  ...props
}: ScrollRevealProps) {
  return (
    <motion.div
      variants={presets[preset]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className={className}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}

interface ScrollRevealGroupProps {
  preset?: Preset;
  staggerMs?: number;
  amount?: number;
  className?: string;
  children: React.ReactNode;
}

export function ScrollRevealGroup({
  preset = "fade-up",
  staggerMs = 50,
  amount = 0.15,
  className,
  children,
}: ScrollRevealGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        visible: { transition: { staggerChildren: staggerMs / 1000 } },
      }}
      className={className}
    >
      {Array.isArray(children) &&
        children.map((child, i) => (
          <motion.div
            key={i}
            variants={presets[preset]}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {child}
          </motion.div>
        ))}
    </motion.div>
  );
}
