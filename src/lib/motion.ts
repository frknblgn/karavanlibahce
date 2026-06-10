import type { Variants } from "framer-motion";

/**
 * Reusable, lightweight motion presets. Components pass these to <Reveal>
 * or Framer directly. Keep the vocabulary small on purpose.
 */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] } },
};

/** Parent that staggers its children's reveal. */
export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Shared viewport config so reveals fire once, slightly before fully in view. */
export const viewportOnce = { once: true, margin: "0px 0px -10% 0px" } as const;
