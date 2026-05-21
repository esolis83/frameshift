import type { Variants } from 'framer-motion';

/** Spread onto any motion page element for consistent page fade transitions */
export const pageTransition = {
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  exit:       { opacity: 0 },
  transition: { duration: 0.3 },
} as const;

/** Stagger container — children animate in sequence */
export function makeStaggerContainer(stagger: number, delay = 0): Variants {
  return {
    hidden: {},
    show:   { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
}

/** Fade up — used by Search results and GenreRow label entrance */
export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

/** Slide in from left — used by cards within a GenreRow */
export const fadeSlideVariant: Variants = {
  hidden: { opacity: 0, x: -18 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

/** Row entrance — slides up when Browse stagger fires */
export const rowVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};
