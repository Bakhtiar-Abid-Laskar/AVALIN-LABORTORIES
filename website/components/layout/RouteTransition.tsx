'use client'

/**
 * RouteTransition — page entrance transition wrapper — Avalin Laboratories
 *
 * Smooth entrance animation on route navigation.
 * Respects `prefers-reduced-motion`.
 */

import { motion, useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { duration, ease } from '@/lib/motion'
import { type ReactNode } from 'react'

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: duration.base,
        ease: ease.standard,
      }}
      className="flex-1 w-full flex flex-col"
    >
      {children}
    </motion.div>
  )
}
