'use client'

/**
 * CountUp — animated number counter — Avalin Laboratories
 *
 * RULES:
 *   - Only renders for stats with `verified: true`.
 *   - Respects `prefers-reduced-motion` (shows final value immediately).
 *   - Triggers on IntersectionObserver entry.
 *
 * Usage:
 *   <CountUp value={13} suffix="+" label="Product formulations" />
 *   <CountUp value={6} label="Therapeutic areas" className="text-4xl" />
 */

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

type CountUpProps = {
  value:      number
  suffix?:    string
  prefix?:    string
  label:      string
  duration?:  number
  className?: string
}

export function CountUp({
  value,
  suffix = '',
  prefix = '',
  label,
  duration = 1800,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const shouldReduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(value)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (shouldReduceMotion) return
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const start = Date.now()
    const startValue = 0
    let rafId: number

    function tick() {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(startValue + (value - startValue) * eased))
      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        setDisplay(value)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isInView, value, duration, shouldReduceMotion])

  return (
    <div
      ref={ref}
      data-count-to={value}
      aria-label={`${prefix}${value}${suffix} ${label}`}
      className={cn('metric-value tabular-nums', className)}
    >
      {prefix}
      {display.toLocaleString('en-IN')}
      {suffix}
    </div>
  )
}
