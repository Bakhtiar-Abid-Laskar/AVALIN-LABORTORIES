'use client'

/**
 * Reveal — scroll-triggered fade-up animation wrapper — Avalin Laboratories
 *
 * Uses IntersectionObserver + Framer Motion.
 * Respects `prefers-reduced-motion`.
 *
 * Usage:
 *   <Reveal>
 *     <Card>...</Card>
 *   </Reveal>
 *
 *   <Reveal delay={0.2}>
 *     <p>Delayed reveal</p>
 *   </Reveal>
 *
 *   <Reveal direction="left">
 *     <div>Slides in from left</div>
 *   </Reveal>
 */

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import {
  duration,
  ease,
  distance,
  fadeUpVariant,
  fadeInVariant,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

type RevealDirection = 'up' | 'left' | 'right' | 'none'

type RevealProps = {
  children: React.ReactNode
  delay?:    number
  direction?: RevealDirection
  className?: string
  /** Once — only animate on first intersection (default: true) */
  once?:     boolean
  /** Intersection threshold (default: 0.15) */
  threshold?: number
}

function getVariants(direction: RevealDirection) {
  if (direction === 'none') return fadeInVariant
  if (direction === 'left')  return { hidden: { opacity: 0, x: distance.reveal },  visible: { opacity: 1, x: 0 } }
  if (direction === 'right') return { hidden: { opacity: 0, x: -distance.reveal }, visible: { opacity: 1, x: 0 } }
  return fadeUpVariant // up (default)
}

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  once = true,
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={getVariants(direction)}
      transition={{
        duration: duration.slow,
        ease:     ease.standard,
        delay,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
