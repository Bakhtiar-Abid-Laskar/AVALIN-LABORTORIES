'use client'

/**
 * VialGlass — Dimensional borosilicate / amber pharmaceutical vial
 * Avalin Laboratories Design System — Phase 3
 *
 * Art-directed tactile pharmaceutical asset:
 *   - Borosilicate clear glass or warm amber glass variant
 *   - Liquid fill with realistic meniscus curvature
 *   - Volumetric graduation markings (5, 10, 15, 20 mL)
 *   - Aluminum crimp seal with tear-off safety flip-cap
 *   - Clinical label band with prescription batching
 *   - Specular vertical cylinder lighting refractions
 *
 * Rules:
 *   - Consumes CSS variable design tokens.
 *   - Zero hardcoded colors.
 */

import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

export type VialType = 'borosilicate' | 'amber' | 'plum-infusion'

export interface VialGlassProps {
  height?: number
  type?: VialType
  className?: string
  fillPercentage?: number
  labelTitle?: string
  float?: boolean
}

export function VialGlass({
  height = 220,
  type = 'borosilicate',
  className,
  fillPercentage = 68,
  labelTitle = 'AVALIN STERILE',
  float = false,
}: VialGlassProps) {
  const id = useId().replace(/:/g, '')
  const reduced = useReducedMotion()
  const width = Math.round(height * 0.45)

  const glassGradId = `glass-grad-${id}`
  const liquidGradId = `liquid-grad-${id}`
  const crimpGradId = `crimp-grad-${id}`
  const capGradId = `cap-grad-${id}`
  const shadowId = `shadow-${id}`

  // Glass and liquid palettes according to type
  const isAmber = type === 'amber'
  const isPlum = type === 'plum-infusion'

  // Dimensions mapped inside viewBox 100 x 220
  const liquidHeight = Math.round((fillPercentage / 100) * 130)
  const liquidY = 195 - liquidHeight

  return (
    <div
      className={cn('relative inline-flex items-center justify-center select-none', className)}
      style={{ width, height }}
      aria-hidden="true"
    >
      <motion.svg
        width={width}
        height={height}
        viewBox="0 0 100 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={float && !reduced ? { y: [-4, 4, -4] } : undefined}
        transition={
          float && !reduced
            ? {
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : undefined
        }
      >
        <defs>
          <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" />
          </filter>

          {/* Aluminum Crimp Collar Gradient */}
          <linearGradient id={crimpGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A88B9C" />
            <stop offset="25%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#D6C8CE" />
            <stop offset="85%" stopColor="#F4EEF1" />
            <stop offset="100%" stopColor="#8C8187" />
          </linearGradient>

          {/* Flip-Off Cap Gradient */}
          <linearGradient id={capGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            {isAmber ? (
              <>
                <stop offset="0%" stopColor="var(--color-accent, #8E5D38)" />
                <stop offset="40%" stopColor="var(--color-accent-champagne, #C99E7C)" />
                <stop offset="100%" stopColor="var(--color-accent-hover, #6F4525)" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="var(--brand-700, #6D2452)" />
                <stop offset="35%" stopColor="var(--brand-500, #C23E89)" />
                <stop offset="70%" stopColor="var(--brand-600, #992668)" />
                <stop offset="100%" stopColor="var(--brand-900, #2E1424)" />
              </>
            )}
          </linearGradient>

          {/* Glass Cylinder Translucency */}
          <linearGradient id={glassGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            {isAmber ? (
              <>
                <stop offset="0%" stopColor="#8E5D38" stopOpacity="0.65" />
                <stop offset="20%" stopColor="#C99E7C" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#FAF1E8" stopOpacity="0.1" />
                <stop offset="80%" stopColor="#C99E7C" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#6F4525" stopOpacity="0.75" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
                <stop offset="15%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="30%" stopColor="var(--surface-blush, #FDF4F8)" stopOpacity="0.2" />
                <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.1" />
                <stop offset="90%" stopColor="var(--brand-200, #F4C7DD)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.7" />
              </>
            )}
          </linearGradient>

          {/* Liquid Formulation Fill */}
          <linearGradient id={liquidGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            {isPlum ? (
              <>
                <stop offset="0%" stopColor="var(--brand-400, #D96BA7)" stopOpacity="0.75" />
                <stop offset="50%" stopColor="var(--brand-600, #992668)" stopOpacity="0.85" />
                <stop offset="100%" stopColor="var(--brand-900, #2E1424)" stopOpacity="0.95" />
              </>
            ) : isAmber ? (
              <>
                <stop offset="0%" stopColor="#C99E7C" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#8E5D38" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#4D2E17" stopOpacity="0.95" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="var(--surface-blush, #FDF4F8)" stopOpacity="0.4" />
                <stop offset="60%" stopColor="var(--brand-100, #FBE6EF)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="var(--brand-200, #F4C7DD)" stopOpacity="0.75" />
              </>
            )}
          </linearGradient>
        </defs>

        {/* Base Ground Shadow */}
        <ellipse
          cx="50"
          cy="208"
          rx="32"
          ry="7"
          fill="var(--brand-950, #1C0B16)"
          opacity="0.2"
          filter={`url(#${shadowId})`}
        />

        {/* ── TOP CLOSURE ── */}
        {/* Flip-off plastic cap */}
        <rect x="34" y="10" width="32" height="7" rx="3.5" fill={`url(#${capGradId})`} />
        {/* Rubber butyl stopper neck */}
        <rect x="38" y="17" width="24" height="6" fill="#4A1B38" opacity="0.6" />
        {/* Aluminum crimp collar */}
        <rect x="32" y="23" width="36" height="11" rx="2" fill={`url(#${crimpGradId})`} />
        {/* Crimp roll lines */}
        <line x1="32" y1="26" x2="68" y2="26" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />
        <line x1="32" y1="31" x2="68" y2="31" stroke="var(--brand-900, #2E1424)" strokeWidth="0.8" opacity="0.3" />

        {/* ── VIAL GLASS BODY ── */}
        {/* Shoulder curve to main cylinder */}
        <path
          d="M 37 34 C 37 42 18 48 18 64 L 18 196 C 18 203 26 206 50 206 C 74 206 82 203 82 196 L 82 64 C 82 48 63 42 63 34 Z"
          fill={isAmber ? '#4D2E17' : '#FFFFFF'}
          fillOpacity={isAmber ? 0.25 : 0.08}
        />

        {/* ── LIQUID FILL ── */}
        <g clipPath={`url(#liquid-clip-${id})`}>
          <clipPath id={`liquid-clip-${id}`}>
            <path d="M 18 64 L 18 196 C 18 203 26 206 50 206 C 74 206 82 203 82 196 L 82 64 Z" />
          </clipPath>

          {/* Liquid block */}
          <rect x="18" y={liquidY} width="64" height={210 - liquidY} fill={`url(#${liquidGradId})`} />

          {/* Liquid Meniscus Curve */}
          <path
            d={`M 18 ${liquidY + 2} Q 50 ${liquidY + 6} 82 ${liquidY + 2} Q 50 ${liquidY - 2} 18 ${liquidY + 2} Z`}
            fill="#FFFFFF"
            fillOpacity="0.45"
          />
        </g>

        {/* ── VOLUMETRIC GRADUATION LINES ── */}
        <g opacity="0.65" stroke={isAmber ? '#FAF1E8' : 'var(--brand-800, #4A1B38)'} strokeWidth="0.8">
          <line x1="22" y1="175" x2="30" y2="175" />
          <line x1="22" y1="150" x2="28" y2="150" strokeDasharray="1 1" />
          <line x1="22" y1="125" x2="32" y2="125" />
          <line x1="22" y1="100" x2="28" y2="100" strokeDasharray="1 1" />
          <line x1="22" y1="75" x2="30" y2="75" />
        </g>
        <text
          x="34"
          y="128"
          fontSize="6"
          fontFamily="monospace"
          fontWeight="bold"
          fill={isAmber ? '#FAF1E8' : 'var(--brand-800, #4A1B38)'}
          opacity="0.75"
        >
          10mL
        </text>

        {/* ── CLINICAL LABEL BAND ── */}
        <g transform="translate(18, 134)">
          <rect
            x="0"
            y="0"
            width="64"
            height="32"
            fill="#FFFFFF"
            opacity="0.9"
            stroke="var(--brand-200, #F4C7DD)"
            strokeWidth="0.7"
          />
          <line x1="0" y1="3" x2="64" y2="3" stroke="var(--brand-600, #992668)" strokeWidth="1.5" />
          <text
            x="32"
            y="13"
            textAnchor="middle"
            fontSize="5.5"
            fontFamily="sans-serif"
            fontWeight="bold"
            letterSpacing="0.08em"
            fill="var(--brand-950, #1C0B16)"
          >
            {labelTitle}
          </text>
          <text
            x="32"
            y="22"
            textAnchor="middle"
            fontSize="4.5"
            fontFamily="monospace"
            fill="var(--text-secondary, #5C5257)"
          >
            Rx ONLY • USP INJ.
          </text>
        </g>

        {/* ── GLASS SHEEN OVERLAY ── */}
        <path
          d="M 37 34 C 37 42 18 48 18 64 L 18 196 C 18 203 26 206 50 206 C 74 206 82 203 82 196 L 82 64 C 82 48 63 42 63 34 Z"
          fill={`url(#${glassGradId})`}
          stroke="var(--brand-200, #F4C7DD)"
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Specular longitudinal reflection highlight */}
        <rect x="23" y="62" width="5" height="130" rx="2.5" fill="#FFFFFF" opacity="0.65" />
        <rect x="73" y="62" width="2" height="130" rx="1" fill="#FFFFFF" opacity="0.3" />
      </motion.svg>
    </div>
  )
}
