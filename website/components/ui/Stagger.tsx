'use client'

/**
 * Stagger — staggered child animation container — Avalin Laboratories
 *
 * Wraps a list of children and staggers their entry animations.
 * Children should be wrapped in <Stagger.Item> for automatic stagger.
 *
 * Usage:
 *   <Stagger>
 *     <Stagger.Item><Card>A</Card></Stagger.Item>
 *     <Stagger.Item><Card>B</Card></Stagger.Item>
 *     <Stagger.Item><Card>C</Card></Stagger.Item>
 *   </Stagger>
 *
 *   // Custom delay between items:
 *   <Stagger delay={0.1}>...</Stagger>
 *
 *   // As a grid:
 *   <Stagger className="grid grid-cols-3 gap-6">...</Stagger>
 */

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import {
  duration,
  ease,
  stagger as staggerTokens,
  fadeUpVariant,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

type StaggerProps = {
  children:   React.ReactNode
  className?: string
  delay?:     number
  /** Stagger delay between children in seconds */
  staggerDelay?: number
  once?:      boolean
}

export function Stagger({
  children,
  className,
  delay = 0,
  staggerDelay = staggerTokens.children,
  once = true,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: 0.1 })
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden:  {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren:   delay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

// ─── Stagger.Item ──────────────────────────────────────────────────────────
type StaggerItemProps = {
  children:   React.ReactNode
  className?: string
}

function StaggerItem({ children, className }: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      variants={fadeUpVariant}
      transition={{ duration: duration.slow, ease: ease.standard }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

Stagger.Item = StaggerItem
