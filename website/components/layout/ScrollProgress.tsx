'use client'

/**
 * ScrollProgress — reading indicator bar — Avalin Laboratories
 *
 * Slim accent-coloured bar fixed immediately below the header.
 * Tracks viewport scroll progress smoothly.
 * Respects `prefers-reduced-motion` (hidden when reduced motion is preferred).
 */

import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  })

  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) return null

  return (
    <div
      className="absolute top-[63px] left-0 right-0 z-10 h-[2.5px] bg-transparent pointer-events-none print:hidden overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="h-full bg-accent origin-left"
        style={{ scaleX }}
      />
    </div>
  )
}
