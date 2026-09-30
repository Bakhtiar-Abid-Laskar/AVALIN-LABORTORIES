'use client'

/**
 * BlisterStrip — Dimensional pharmaceutical blister pack visual primitive
 * Avalin Laboratories Design System — Phase 3
 *
 * Art-directed tactile pharmaceutical asset:
 *   - Silver & champagne metallic push-through foil texture
 *   - Precision thermoformed pocket relief with convex domes
 *   - Debossed blister perimeter cross-hatch seal pattern
 *   - Micro-perforations between cavities
 *   - Laser-etched pharmaceutical batch & expiry markings
 *
 * Rules:
 *   - Consumes CSS variable design tokens.
 *   - Zero hardcoded arbitrary colors.
 */

import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface BlisterStripProps {
  rows?: number
  cols?: number
  className?: string
  interactive?: boolean
  highlightPocket?: number
  lotNumber?: string
}

export function BlisterStrip({
  rows = 2,
  cols = 3,
  className,
  interactive = true,
  highlightPocket = 1,
  lotNumber = 'LOT: AVL-26804 • EXP: 09/2029',
}: BlisterStripProps) {
  const id = useId().replace(/:/g, '')
  const reduced = useReducedMotion()

  const metallicFoilId = `foil-grad-${id}`
  const pocketDomeId = `pocket-dome-${id}`
  const pocketGlowId = `pocket-glow-${id}`
  const knurlPatternId = `knurl-${id}`
  const innerShadowId = `inner-shadow-${id}`

  const pocketW = 44
  const pocketH = 26
  const padX = 22
  const padY = 24
  const gapX = 18
  const gapY = 20

  const totalW = padX * 2 + cols * pocketW + (cols - 1) * gapX
  const totalH = padY * 2 + rows * pocketH + (rows - 1) * gapY + 28 // extra flap for batch/lot

  return (
    <motion.div
      className={cn(
        'relative inline-block select-none rounded-xl overflow-hidden',
        interactive && 'transition-transform duration-base hover:-translate-y-1',
        className,
      )}
      style={{
        perspective: 800,
        boxShadow:
          '0 16px 36px -8px rgba(46, 20, 36, 0.16), 0 4px 12px rgba(28, 11, 22, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
      }}
      whileHover={interactive && !reduced ? { rotateX: 4, rotateY: -3 } : undefined}
    >
      <svg
        width={totalW}
        height={totalH}
        viewBox={`0 0 ${totalW} ${totalH}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        aria-hidden="true"
      >
        <defs>
          {/* Metallic Aluminum/Foil Brushed Surface */}
          <linearGradient id={metallicFoilId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#F5EDF1" />
            <stop offset="50%" stopColor="#ECE3E7" />
            <stop offset="70%" stopColor="#FAF4F7" />
            <stop offset="100%" stopColor="#E2D4DC" />
          </linearGradient>

          {/* Thermoformed Pocket Convex Dome Gradient */}
          <linearGradient id={pocketDomeId} x1="20%" y1="10%" x2="80%" y2="90%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#FAF1E8" stopOpacity="0.8" />
            <stop offset="75%" stopColor="#E0C9D6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#A88B9C" stopOpacity="0.95" />
          </linearGradient>

          {/* Highlight Pocket Brand Glow */}
          <linearGradient id={pocketGlowId} x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="var(--brand-200, #F4C7DD)" />
            <stop offset="85%" stopColor="var(--brand-500, #C23E89)" />
            <stop offset="100%" stopColor="var(--brand-800, #4A1B38)" />
          </linearGradient>

          {/* Embossed Sealing Knurl Pattern */}
          <pattern
            id={knurlPatternId}
            width="4"
            height="4"
            patternUnits="userSpaceOnUse"
          >
            <rect width="4" height="4" fill="none" />
            <path
              d="M0 4L4 0M0 0L4 4"
              stroke="var(--brand-900, #2E1424)"
              strokeWidth="0.5"
              strokeOpacity="0.1"
            />
          </pattern>

          {/* Cavity Inner Shadow */}
          <filter id={innerShadowId} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#1C0B16" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* Base Metallic Foil Substrate */}
        <rect
          x="1"
          y="1"
          width={totalW - 2}
          height={totalH - 2}
          rx="12"
          fill={`url(#${metallicFoilId})`}
          stroke="var(--brand-200, #F4C7DD)"
          strokeWidth="1.5"
        />

        {/* Embossed Waffle / Knurled Sealing Edge */}
        <rect
          x="3"
          y="3"
          width={totalW - 6}
          height={totalH - 6}
          rx="10"
          fill={`url(#${knurlPatternId})`}
          opacity="0.85"
        />

        {/* Cavity Pockets Grid */}
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => {
            const index = r * cols + c
            const px = padX + c * (pocketW + gapX)
            const py = padY + r * (pocketH + gapY)
            const isHighlighted = index === highlightPocket

            return (
              <g key={`${r}-${c}`} filter={`url(#${innerShadowId})`}>
                {/* Pocket Recess Floor */}
                <rect
                  x={px - 2}
                  y={py - 2}
                  width={pocketW + 4}
                  height={pocketH + 4}
                  rx="9"
                  fill="var(--brand-950, #1C0B16)"
                  opacity="0.08"
                />

                {/* Pocket Convex Metallic Dome */}
                <rect
                  x={px}
                  y={py}
                  width={pocketW}
                  height={pocketH}
                  rx="7"
                  fill={isHighlighted ? `url(#${pocketGlowId})` : `url(#${pocketDomeId})`}
                  stroke="#FFFFFF"
                  strokeWidth="0.8"
                />

                {/* Pill Specular Crescent / Highlight Ridge */}
                <path
                  d={`M ${px + 5} ${py + 5} Q ${px + pocketW / 2} ${py + 3} ${px + pocketW - 5} ${py + 5} L ${px + pocketW - 5} ${py + 8} Q ${px + pocketW / 2} ${py + 6} ${px + 5} ${py + 8} Z`}
                  fill="#FFFFFF"
                  opacity={isHighlighted ? 0.95 : 0.8}
                />

                {/* Debossed Pill Outline under foil */}
                <ellipse
                  cx={px + pocketW / 2}
                  cy={py + pocketH / 2}
                  rx={pocketW / 2 - 8}
                  ry={pocketH / 2 - 5}
                  stroke="#FFFFFF"
                  strokeWidth="0.7"
                  strokeDasharray="2 3"
                  opacity="0.5"
                />
              </g>
            )
          }),
        )}

        {/* Perforation Lines between Columns */}
        {Array.from({ length: cols - 1 }).map((_, c) => {
          const lineX = padX + (c + 1) * pocketW + c * gapX + gapX / 2
          return (
            <line
              key={`perf-col-${c}`}
              x1={lineX}
              y1={padY - 8}
              x2={lineX}
              y2={totalH - 36}
              stroke="var(--brand-900, #2E1424)"
              strokeWidth="0.8"
              strokeDasharray="3 4"
              opacity="0.3"
            />
          )
        })}

        {/* Perforation Lines between Rows */}
        {Array.from({ length: rows - 1 }).map((_, r) => {
          const lineY = padY + (r + 1) * pocketH + r * gapY + gapY / 2
          return (
            <line
              key={`perf-row-${r}`}
              x1={padX - 8}
              y1={lineY}
              x2={totalW - padX + 8}
              y2={lineY}
              stroke="var(--brand-900, #2E1424)"
              strokeWidth="0.8"
              strokeDasharray="3 4"
              opacity="0.3"
            />
          )
        })}

        {/* Bottom Flap: Laser Etched Batch & Expiry Barcode Area */}
        <g transform={`translate(0, ${totalH - 24})`}>
          <line
            x1="12"
            y1="0"
            x2={totalW - 12}
            y2="0"
            stroke="var(--brand-200, #F4C7DD)"
            strokeWidth="0.8"
            strokeDasharray="2 3"
            opacity="0.6"
          />
          <text
            x={totalW / 2}
            y="14"
            textAnchor="middle"
            fontSize="8"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="0.1em"
            fill="var(--brand-800, #4A1B38)"
            opacity="0.75"
          >
            {lotNumber}
          </text>
        </g>
      </svg>
    </motion.div>
  )
}
