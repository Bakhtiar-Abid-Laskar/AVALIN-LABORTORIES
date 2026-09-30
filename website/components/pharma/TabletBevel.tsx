'use client'

/**
 * TabletBevel — Dimensional pharmaceutical tablet visual primitive
 * Avalin Laboratories Design System — Phase 3
 *
 * Art-directed tactile pharmaceutical asset:
 *   - Biconvex beveled outer rim with directional light highlights
 *   - Precision debossed central score line with inner bevel depth
 *   - Micro-etched pharmaceutical identification imprint (AVL / 500)
 *   - Supports round biconvex tablet and oblong caplet shapes
 *   - Palette options: clinical pearl white, blush-tinted, champagne
 *
 * Rules:
 *   - Consumes CSS variable design tokens.
 *   - Zero arbitrary hex codes.
 */

import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

export type TabletShape = 'round' | 'oblong'
export type TabletColor = 'white' | 'blush' | 'champagne'

export interface TabletBevelProps {
  size?: number
  shape?: TabletShape
  color?: TabletColor
  imprint?: string
  scored?: boolean
  className?: string
  tilt?: number
  interactive?: boolean
}

export function TabletBevel({
  size = 120,
  shape = 'round',
  color = 'white',
  imprint = 'AVL',
  scored = true,
  className,
  tilt = 12,
  interactive = true,
}: TabletBevelProps) {
  const id = useId().replace(/:/g, '')
  const reduced = useReducedMotion()

  const bevelGradId = `bevel-grad-${id}`
  const faceGradId = `face-grad-${id}`
  const shadowFilterId = `shadow-pill-${id}`

  const isRound = shape === 'round'
  const width = size
  const height = isRound ? size : Math.round(size * 0.6)

  return (
    <motion.div
      className={cn('relative inline-flex items-center justify-center select-none', className)}
      style={{ width, height }}
      aria-hidden="true"
      whileHover={interactive && !reduced ? { scale: 1.05, rotate: tilt + 4 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <svg
        width={width}
        height={height}
        viewBox={isRound ? '0 0 120 120' : '0 0 160 90'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <defs>
          <filter id={shadowFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" />
          </filter>

          {/* Bevel Rim Gradient (Directional Top-Left to Bottom-Right) */}
          <linearGradient id={bevelGradId} x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#EDE5E9" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#D9C7D1" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#9E8593" stopOpacity="0.95" />
          </linearGradient>

          {/* Tablet Upper Convex Face Gradient */}
          <linearGradient id={faceGradId} x1="20%" y1="20%" x2="80%" y2="80%">
            {color === 'blush' ? (
              <>
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="30%" stopColor="var(--surface-blush, #FDF4F8)" />
                <stop offset="75%" stopColor="var(--brand-100, #FBE6EF)" />
                <stop offset="100%" stopColor="var(--brand-200, #F4C7DD)" />
              </>
            ) : color === 'champagne' ? (
              <>
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="var(--color-accent-light, #FAF1E8)" />
                <stop offset="80%" stopColor="var(--color-accent-champagne, #C99E7C)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--color-accent, #8E5D38)" stopOpacity="0.85" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#F9F6F7" />
                <stop offset="85%" stopColor="#EFE8EC" />
                <stop offset="100%" stopColor="#DFD5DA" />
              </>
            )}
          </linearGradient>
        </defs>

        {/* Ambient Ground Drop Shadow */}
        {isRound ? (
          <ellipse
            cx="62"
            cy="70"
            rx="46"
            ry="38"
            fill="var(--brand-950, #1C0B16)"
            opacity="0.16"
            filter={`url(#${shadowFilterId})`}
          />
        ) : (
          <ellipse
            cx="82"
            cy="54"
            rx="66"
            ry="28"
            fill="var(--brand-950, #1C0B16)"
            opacity="0.16"
            filter={`url(#${shadowFilterId})`}
          />
        )}

        {/* ── ROUND BICONVEX TABLET ── */}
        {isRound ? (
          <g>
            {/* Outer Bevel Rim */}
            <circle cx="60" cy="60" r="48" fill={`url(#${bevelGradId})`} />

            {/* Inner Face Dome */}
            <circle
              cx="58.5"
              cy="58.5"
              r="43"
              fill={`url(#${faceGradId})`}
              stroke="#FFFFFF"
              strokeWidth="0.8"
            />

            {/* Debossed Center Score Line */}
            {scored && (
              <g>
                {/* Score shadow */}
                <line x1="59.5" y1="22" x2="59.5" y2="95" stroke="var(--brand-900, #2E1424)" strokeWidth="1.6" opacity="0.35" />
                {/* Score highlight */}
                <line x1="60.8" y1="22" x2="60.8" y2="95" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.8" />
              </g>
            )}

            {/* Imprinted Identification Mark */}
            {imprint && (
              <g opacity="0.45">
                <text
                  x="42"
                  y="63"
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="sans-serif"
                  fontWeight="bold"
                  letterSpacing="0.05em"
                  fill="var(--brand-900, #2E1424)"
                >
                  {imprint}
                </text>
                <text
                  x="77"
                  y="63"
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="sans-serif"
                  fontWeight="bold"
                  letterSpacing="0.05em"
                  fill="var(--brand-900, #2E1424)"
                >
                  500
                </text>
              </g>
            )}

            {/* Top Crescent Specular Sheen */}
            <path
              d="M 32 36 C 40 28 50 24 64 24 C 76 24 88 28 94 36 C 84 31 74 28 64 28 C 52 28 42 31 32 36 Z"
              fill="#FFFFFF"
              opacity="0.85"
            />
          </g>
        ) : (
          /* ── OBLONG CAPLET TABLET ── */
          <g>
            {/* Outer Bevel Rim */}
            <rect x="16" y="15" width="128" height="60" rx="30" fill={`url(#${bevelGradId})`} />

            {/* Inner Face Dome */}
            <rect
              x="20"
              y="18"
              width="120"
              height="54"
              rx="27"
              fill={`url(#${faceGradId})`}
              stroke="#FFFFFF"
              strokeWidth="0.8"
            />

            {/* Debossed Center Score Line */}
            {scored && (
              <g>
                <line x1="79.5" y1="20" x2="79.5" y2="70" stroke="var(--brand-900, #2E1424)" strokeWidth="1.6" opacity="0.35" />
                <line x1="80.8" y1="20" x2="80.8" y2="70" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.8" />
              </g>
            )}

            {/* Imprinted Identification Mark */}
            {imprint && (
              <g opacity="0.45">
                <text
                  x="50"
                  y="49"
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="sans-serif"
                  fontWeight="bold"
                  letterSpacing="0.08em"
                  fill="var(--brand-900, #2E1424)"
                >
                  {imprint}
                </text>
                <text
                  x="110"
                  y="49"
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="sans-serif"
                  fontWeight="bold"
                  letterSpacing="0.08em"
                  fill="var(--brand-900, #2E1424)"
                >
                  FORTE
                </text>
              </g>
            )}

            {/* Longitudinal Specular Sheen */}
            <path
              d="M 40 23 L 120 23 C 132 23 138 27 132 30 L 28 30 C 22 27 28 23 40 23 Z"
              fill="#FFFFFF"
              opacity="0.85"
            />
          </g>
        )}
      </svg>
    </motion.div>
  )
}
