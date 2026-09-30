'use client'

import { useEffect, useRef, useState } from 'react'

interface MetricItem {
  value: string
  label: string
}

interface MetricCounterProps {
  metrics: MetricItem[]
}

export function MetricCounter({ metrics }: MetricCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasAnimated(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.25 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0"
    >
      {metrics.map(({ value, label }) => (
        <div key={label} className="px-6 py-8 text-center transition-all duration-700">
          <p
            className={`font-heading text-3xl md:text-4xl font-bold text-primary-600 tabular-nums metric-value transition-all duration-700 ${
              hasAnimated
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-3 scale-95'
            }`}
          >
            {value}
          </p>
          <p className="mt-1.5 text-xs sm:text-sm font-medium text-text-secondary">
            {label}
          </p>
        </div>
      ))}
    </div>
  )
}
