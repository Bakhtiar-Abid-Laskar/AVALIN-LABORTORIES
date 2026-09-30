/**
 * Motion design tokens — Avalin Laboratories
 *
 * Single source of truth for all animation values.
 * No literal durations, easings, or distances anywhere in components.
 *
 * All components must import from here.
 */

// ─── Durations ─────────────────────────────────────────────────────────────
export const duration = {
  /** 150 ms — hover states, focus rings, colour transitions */
  fast:   0.15,
  /** 300 ms — most UI transitions */
  base:   0.30,
  /** 600 ms — scroll reveals, section entries */
  slow:   0.60,
  /** 900 ms — hero enter, page load */
  hero:   0.90,
} as const

// ─── Easings ───────────────────────────────────────────────────────────────
/** Standard ease — most reveals and enters */
export const easeStandard: [number, number, number, number] = [0.22, 1, 0.36, 1]
/** Emphasized ease — primary CTAs, hero, important UI state changes */
export const easeEmphasized: [number, number, number, number] = [0.2, 0, 0, 1]
/** Exit ease — things leaving the screen */
export const easeExit: [number, number, number, number] = [0.4, 0, 1, 1]

// Named map for convenience
export const ease = {
  standard:   easeStandard,
  emphasized: easeEmphasized,
  exit:       easeExit,
} as const

// ─── Spring configs (for Framer Motion `spring` transition) ────────────────
export const spring = {
  /** Snappy, slightly bouncy — nav indicator, chip filters */
  snappy:    { type: 'spring', stiffness: 380, damping: 30 } as const,
  /** Smooth spring — cards lifting, dropdowns */
  smooth:    { type: 'spring', stiffness: 260, damping: 28 } as const,
  /** Gentle spring — hero graphic float */
  gentle:    { type: 'spring', stiffness: 120, damping: 20 } as const,
} as const

// ─── Distances ─────────────────────────────────────────────────────────────
export const distance = {
  /** Scroll-reveal translate distance (px → use as translateY) */
  reveal:   16,
  /** Maximum parallax travel (px) */
  parallax: 24,
} as const

// ─── Stagger ───────────────────────────────────────────────────────────────
export const stagger = {
  /** Between child items in a grid or list (seconds) */
  children: 0.07,
  /** Between top-level sections in a hero sequence (seconds) */
  hero:     0.12,
} as const

// ─── Scroll thresholds ─────────────────────────────────────────────────────
export const scroll = {
  /** Px scrolled before header becomes solid */
  headerSolid:  8,
  /** Px scrolled before back-to-top button appears */
  backToTop:    400,
  /** IntersectionObserver threshold for scroll reveals */
  revealThreshold: 0.15,
} as const

// ─── Reduced-motion guard ──────────────────────────────────────────────────
/**
 * Returns true if the user prefers reduced motion.
 * Always call this in client components before adding motion effects.
 * Usage: const reduced = prefersReducedMotion()
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// ─── Ambient & Pharma Material Motion Loops ───────────────────────────────
export const loop = {
  /** Floating capsule & pill ambient loop */
  float: {
    y: [-8, 8, -8],
    rotate: [-1.5, 1.5, -1.5],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
  /** Deep background blister & vial drift */
  floatSlow: {
    y: [-5, 5, -5],
    rotate: [1, -1, 1],
    transition: { duration: 7.5, repeat: Infinity, ease: 'easeInOut' },
  },
  /** Subtle node pulse */
  pulse: {
    scale: [1, 1.08, 1],
    opacity: [0.7, 1, 0.7],
    transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
  },
} as const

// ─── Reusable variant sets ─────────────────────────────────────────────────
/** Standard fade-up reveal variant for use with whileInView */
export const fadeUpVariant = {
  hidden:  { opacity: 0, y: distance.reveal },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.standard } },
} as const

/** Fade-in only (no Y movement) */
export const fadeInVariant = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.base, ease: ease.standard } },
} as const

/** Stagger container — wraps children with staggered animation */
export const staggerContainerVariant = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren:  stagger.children,
      delayChildren:    0,
    },
  },
} as const

/** Reduced-motion safe variant generator */
export function getMotionSafeVariants<T extends Record<string, unknown>>(variants: T, reduced: boolean): T {
  if (!reduced) return variants
  const staticVariants: Record<string, unknown> = {}
  for (const key of Object.keys(variants)) {
    staticVariants[key] = { opacity: 1, y: 0, x: 0, scale: 1, rotate: 0, transition: { duration: 0 } }
  }
  return staticVariants as T
}
