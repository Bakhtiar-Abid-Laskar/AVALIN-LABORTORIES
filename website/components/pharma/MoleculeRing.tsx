'use client'

/**
 * MoleculeRing — Dimensional pharmaceutical molecular lattice primitive
 * Avalin Laboratories Design System — Phase 3
 *
 * Art-directed tactile pharmaceutical asset:
 *   - Hexagonal benzene formulation ring with delocalized pi-orbital
 *   - Covalent double-bond geometry
 *   - Functional group satellite nodes with brand plum-pink aura
 *   - Concentric orbital guide paths
 *   - Subtle ambient rotation respecting prefers-reduced-motion
 *
 * Rules:
 *   - Consumes CSS variable design tokens.
 *   - Zero green (replaced with brand plum, blush, and champagne).
 */

import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface MoleculeRingProps {
  size?: number
  className?: string
  rotate?: boolean
  glow?: boolean
}

export function MoleculeRing({
  size = 200,
  className,
  rotate = true,
  glow = true,
}: MoleculeRingProps) {
  const id = useId().replace(/:/g, '')
  const reduced = useReducedMotion()
  const shouldAnimate = rotate && !reduced

  const glowId = `node-glow-${id}`
  const ringGradId = `ring-grad-${id}`

  return (
    <div
      className={cn('relative inline-flex items-center justify-center select-none', className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Background Soft Aura */}
      {glow && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(circle, rgba(225, 53, 159, 0.12) 0%, rgba(153, 38, 104, 0.04) 50%, transparent 70%)',
            filter: 'blur(24px)',
          }}
        />
      )}

      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={shouldAnimate ? { rotate: 360 } : undefined}
        transition={
          shouldAnimate
            ? {
                duration: 45,
                repeat: Infinity,
                ease: 'linear',
              }
            : undefined
        }
      >
        <defs>
          {/* Radial glow for active atom centers */}
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--brand-raw, #E1359F)" stopOpacity="0.9" />
            <stop offset="60%" stopColor="var(--brand-600, #992668)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--brand-900, #2E1424)" stopOpacity="0" />
          </radialGradient>

          {/* Bond Line Gradient */}
          <linearGradient id={ringGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--brand-400, #D96BA7)" />
            <stop offset="50%" stopColor="var(--brand-600, #992668)" />
            <stop offset="100%" stopColor="var(--color-accent-champagne, #C99E7C)" />
          </linearGradient>
        </defs>

        {/* Concentric Guide Orbitals */}
        <circle cx="120" cy="120" r="105" stroke="var(--brand-200, #F4C7DD)" strokeWidth="1" strokeDasharray="3 6" opacity="0.3" />
        <circle cx="120" cy="120" r="80" stroke="var(--brand-300, #E89BC4)" strokeWidth="1" strokeDasharray="2 5" opacity="0.4" />

        {/* ── HEXAGONAL BENZENE CORE ── */}
        {/* Hexagon vertices: (120, 75), (159, 97.5), (159, 142.5), (120, 165), (81, 142.5), (81, 97.5) */}
        <g stroke="url(#ringGradId)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Outer Hexagon Bonds */}
          <polygon
            points="120,75 159,97.5 159,142.5 120,165 81,142.5 81,97.5"
            fill="var(--surface-blush, #FDF4F8)"
            fillOpacity="0.6"
          />

          {/* Delocalized Inner Pi-Aromatic Ring */}
          <circle
            cx="120"
            cy="120"
            r="28"
            stroke="var(--brand-500, #C23E89)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            fill="none"
            opacity="0.8"
          />

          {/* Alternating Covalent Double Bonds (Inside Rim) */}
          <line x1="120" y1="83" x2="152" y2="101.5" stroke="var(--brand-600, #992668)" strokeWidth="1.8" />
          <line x1="151" y1="138" x2="120" y2="156" stroke="var(--brand-600, #992668)" strokeWidth="1.8" />
          <line x1="88" y1="102" x2="88" y2="138" stroke="var(--brand-600, #992668)" strokeWidth="1.8" />

          {/* Peripheral Functional Group Bridge Bonds */}
          <line x1="120" y1="75" x2="120" y2="40" stroke="var(--brand-400, #D96BA7)" strokeWidth="1.8" />
          <line x1="159" y1="97.5" x2="190" y2="80" stroke="var(--brand-400, #D96BA7)" strokeWidth="1.8" />
          <line x1="159" y1="142.5" x2="190" y2="160" stroke="var(--color-accent-champagne, #C99E7C)" strokeWidth="1.8" />
          <line x1="120" y1="165" x2="120" y2="200" stroke="var(--brand-400, #D96BA7)" strokeWidth="1.8" />
          <line x1="81" y1="142.5" x2="50" y2="160" stroke="var(--brand-400, #D96BA7)" strokeWidth="1.8" />
          <line x1="81" y1="97.5" x2="50" y2="80" stroke="var(--color-accent-champagne, #C99E7C)" strokeWidth="1.8" />
        </g>

        {/* ── ATOMIC NODES WITH GLOW ── */}
        {/* Core Hex Nodes */}
        {[
          { cx: 120, cy: 75, r: 4.5, fill: 'var(--brand-600, #992668)' },
          { cx: 159, cy: 97.5, r: 4.5, fill: 'var(--brand-600, #992668)' },
          { cx: 159, cy: 142.5, r: 4.5, fill: 'var(--brand-600, #992668)' },
          { cx: 120, cy: 165, r: 4.5, fill: 'var(--brand-600, #992668)' },
          { cx: 81, cy: 142.5, r: 4.5, fill: 'var(--brand-600, #992668)' },
          { cx: 81, cy: 97.5, r: 4.5, fill: 'var(--brand-600, #992668)' },
        ].map((node, i) => (
          <g key={`core-${i}`}>
            <circle cx={node.cx} cy={node.cy} r={node.r} fill="#FFFFFF" stroke={node.fill} strokeWidth="2" />
          </g>
        ))}

        {/* Peripheral Satellite Groups (Hydroxyl, Amine, Ester Nodes) */}
        {/* Top Node (OH) */}
        <circle cx="120" cy="40" r="10" fill={`url(#${glowId})`} />
        <circle cx="120" cy="40" r="5" fill="var(--brand-raw, #E1359F)" stroke="#FFFFFF" strokeWidth="2" />

        {/* Right Top Node */}
        <circle cx="190" cy="80" r="9" fill={`url(#${glowId})`} />
        <circle cx="190" cy="80" r="4.5" fill="var(--brand-500, #C23E89)" stroke="#FFFFFF" strokeWidth="1.8" />

        {/* Right Bottom Node (Champagne / Ester) */}
        <circle cx="190" cy="160" r="10" fill="var(--color-accent-champagne, #C99E7C)" opacity="0.3" />
        <circle cx="190" cy="160" r="5" fill="var(--color-accent, #8E5D38)" stroke="#FFFFFF" strokeWidth="2" />

        {/* Bottom Node */}
        <circle cx="120" cy="200" r="9" fill={`url(#${glowId})`} />
        <circle cx="120" cy="200" r="4.5" fill="var(--brand-600, #992668)" stroke="#FFFFFF" strokeWidth="1.8" />

        {/* Left Bottom Node */}
        <circle cx="50" cy="160" r="9" fill={`url(#${glowId})`} />
        <circle cx="50" cy="160" r="4.5" fill="var(--brand-500, #C23E89)" stroke="#FFFFFF" strokeWidth="1.8" />

        {/* Left Top Node (Champagne / Ester) */}
        <circle cx="50" cy="80" r="10" fill="var(--color-accent-champagne, #C99E7C)" opacity="0.3" />
        <circle cx="50" cy="80" r="5" fill="var(--color-accent, #8E5D38)" stroke="#FFFFFF" strokeWidth="2" />
      </motion.svg>
    </div>
  )
}
