"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** delay in seconds for simple stagger */
  delay?: number;
  once?: boolean;
  y?: number;
};

/**
 * Scroll-reveal wrapper. Fades + lifts content into view once.
 * Honors prefers-reduced-motion: when reduced, content renders at rest.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  once = true,
  y = 28,
}: RevealProps) {
  const reduce = useReducedMotion();
  const variants: Variants =
    y === 28
      ? fadeUp
      : {
          hidden: { opacity: 0, y },
          show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
          },
        };

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      // Keep server-rendered content visible if client-side motion cannot hydrate.
      initial={false}
      whileInView="show"
      viewport={{ ...viewportOnce, once }}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
