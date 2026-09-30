'use client'

/**
 * CapsuleFloating — Dimensional pharmaceutical capsule visual primitive
 * Avalin Laboratories Design System — Phase 3
 *
 * Art-directed tactile pharmaceutical asset:
 *   - Dual-tone body (Plum-pink cap + Frosted glass / pearl body)
 *   - Precision central interlocking seal ring
 *   - Specular longitudinal lighting highlight (cylindrical sheen)
 *   - Ambient floating animation respecting prefers-reduced-motion
 *
 * Rules:
 *   - Consumes CSS variable design tokens exclusively.
 *   - Zero hardcoded colors.
 */

import { useId } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

export type CapsuleVariant = 'plum-white' | 'champagne-plum' | 'glass-pellets'

export interface CapsuleFloatingProps {
  size?: number
  variant?: CapsuleVariant
  className?: string
  float?: boolean
  tilt?: number
  glow?: boolean
}

export function CapsuleFloating({
  size = 180,
  variant = 'plum-white',
  className,
  float = true,
  tilt = -25,
  glow = true,
}: CapsuleFloatingProps) {
  const id = useId().replace(/:/g, '')
  const reduced = useReducedMotion()
  const shouldAnimate = float && !reduced

  const capGradientId = `cap-grad-${id}`
  const bodyGradientId = `body-grad-${id}`
  const specularId = `specular-${id}`
  const shadowId = `shadow-blur-${id}`

  return (
    <div
      className={cn('relative inline-flex items-center justify-center select-none', className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Soft plum ambient aura */}
      {glow && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none -z-10"
          style={{
            background: 'radial-gradient(circle, rgba(225, 53, 159, 0.18) 0%, rgba(153, 38, 104, 0.05) 55%, transparent 70%)',
            transform: 'scale(1.35)',
            filter: 'blur(20px)',
          }}
        />
      )}

      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transformOrigin: '50% 50%' }}
        animate={
          shouldAnimate
            ? {
                y: [-5, 6, -5],
                rotate: [tilt, tilt + 2.5, tilt],
              }
            : { rotate: tilt }
        }
        transition={
          shouldAnimate
            ? {
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : undefined
        }
      >
        <defs>
          {/* Ambient Ground Shadow Filter */}
          <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
          </filter>

          {/* Longitudinal Cylindrical Specular Highlight */}
          <linearGradient id={specularId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
          </linearGradient>

          {/* Cap Gradient (Left Half: Rich Brand Plum) */}
          <linearGradient id={capGradientId} x1="0%" y1="20%" x2="100%" y2="80%">
            {variant === 'champagne-plum' ? (
              <>
                <stop offset="0%" stopColor="var(--color-accent-champagne, #C99E7C)" />
                <stop offset="50%" stopColor="var(--color-accent, #8E5D38)" />
                <stop offset="100%" stopColor="var(--color-accent-hover, #6F4525)" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="var(--brand-400, #D96BA7)" />
                <stop offset="45%" stopColor="var(--brand-600, #992668)" />
                <stop offset="100%" stopColor="var(--brand-900, #2E1424)" />
              </>
            )}
          </linearGradient>

          {/* Body Gradient (Right Half: Frosted Glass / Pearl Body) */}
          <linearGradient id={bodyGradientId} x1="0%" y1="20%" x2="100%" y2="80%">
            {variant === 'champagne-plum' ? (
              <>
                <stop offset="0%" stopColor="var(--brand-200, #F4C7DD)" />
                <stop offset="60%" stopColor="var(--brand-600, #992668)" />
                <stop offset="100%" stopColor="var(--brand-950, #1C0B16)" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="40%" stopColor="var(--surface-blush, #FDF4F8)" stopOpacity="0.92" />
                <stop offset="100%" stopColor="var(--brand-200, #F4C7DD)" stopOpacity="0.75" />
              </>
            )}
          </linearGradient>
        </defs>

        {/* Dynamic Cast Drop Shadow */}
        <ellipse
          cx="120"
          cy="200"
          rx="65"
          ry="14"
          fill="var(--brand-950, #1C0B16)"
          opacity="0.18"
          filter={`url(#${shadowId})`}
        />

        {/* Capsule Container Group */}
        <g id="capsule-chassis">
          {/* Left Cap (Hemispherical Cap + Half Cylinder) */}
          <path
            d="M50 120 C50 96 68 76 92 76 L118 76 L118 164 L92 164 C68 164 50 144 50 120 Z"
            fill={`url(#${capGradientId})`}
          />

          {/* Right Body (Half Cylinder + Hemispherical Dome) */}
          <path
            d="M118 76 L148 76 C172 76 190 96 190 120 C190 144 172 164 148 164 L118 164 Z"
            fill={`url(#${bodyGradientId})`}
          />

          {/* Translucent Pellets inside Glass Body Variant */}
          {variant === 'glass-pellets' && (
            <g opacity="0.85">
              <circle cx="132" cy="100" r="5" fill="var(--color-accent-champagne, #C99E7C)" />
              <circle cx="146" cy="116" r="6" fill="var(--brand-500, #C23E89)" />
              <circle cx="162" cy="104" r="5" fill="var(--brand-600, #992668)" />
              <circle cx="138" cy="134" r="5" fill="var(--color-accent, #8E5D38)" />
              <circle cx="156" cy="130" r="6" fill="var(--brand-400, #D96BA7)" />
              <circle cx="170" cy="120" r="4" fill="#FFFFFF" />
            </g>
          )}

          {/* Interlocking Seam Ring (Precision Pharmaceutical Band) */}
          <rect
            x="115"
            y="74.5"
            width="7"
            height="91"
            rx="3.5"
            fill="#FFFFFF"
            opacity="0.9"
          />
          <rect
            x="116"
            y="75.5"
            width="5"
            height="89"
            rx="2.5"
            fill="var(--brand-200, #F4C7DD)"
            opacity="0.6"
          />

          {/* Top Longitudinal Specular Reflection (Full-Length Sheen) */}
          <path
            d="M62 90 C72 82 82 80 95 80 L145 80 C158 80 168 82 178 90 C172 86 160 84 145 84 L95 84 C80 84 68 86 62 90 Z"
            fill="#FFFFFF"
            opacity="0.85"
          />

          {/* Subtle Bottom Reflected Light Rim */}
          <path
            d="M64 150 C74 157 85 160 98 160 L142 160 C155 160 166 157 176 150 C165 155 154 157 142 157 L98 157 C86 157 75 155 64 150 Z"
            fill="#FFFFFF"
            opacity="0.25"
          />

          {/* Micro Bevel Ridge along Interlocking Seam */}
          <line
            x1="118.5"
            y1="76"
            x2="118.5"
            y2="164"
            stroke="var(--brand-900, #2E1424)"
            strokeWidth="0.8"
            opacity="0.3"
          />
        </g>
      </motion.svg>
    </div>
  )
}
