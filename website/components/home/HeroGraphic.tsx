'use client'

/**
 * HeroGraphic — Layered Pharmaceutical Hero Composition
 * Avalin Laboratories Design System — Phase 4
 *
 * Art-directed tactile pharmaceutical composition:
 *   - Foreground: Dual-tone CapsuleFloating with specular glass sheen
 *   - Midground: Hexagonal MoleculeRing formulation lattice with glowing pink nodes
 *   - Background: Soft plum-magenta ambient optical aura
 *   - Clinical Floating Badges: Cleanroom GMP Standards & Pharmacovigilance Monitoring
 *   - 100% Tokenized: Zero teal, zero green.
 *   - Fully supports prefers-reduced-motion.
 */

import { motion, useReducedMotion } from 'motion/react'
import { CapsuleFloating } from '@/components/pharma/CapsuleFloating'
import { MoleculeRing } from '@/components/pharma/MoleculeRing'
import { IllustratedIcon } from '@/components/pharma/IllustratedIcon'

export function HeroGraphic() {
  const reduced = useReducedMotion()

  return (
    <div
      className="relative w-full h-[440px] sm:h-[480px] lg:h-[520px] flex items-center justify-center pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* ── 1. AMBIENT OPTICAL PLUM AURA ── */}
      <div
        className="absolute w-80 h-80 rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(225, 53, 159, 0.22) 0%, rgba(153, 38, 104, 0.12) 45%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'translateY(-10px)',
        }}
      />
      <div
        className="absolute w-60 h-60 rounded-full pointer-events-none -z-10 top-8 right-6"
        style={{
          background: 'radial-gradient(circle, rgba(201, 158, 124, 0.18) 0%, rgba(142, 93, 56, 0.08) 50%, transparent 70%)',
          filter: 'blur(32px)',
        }}
      />

      {/* ── 2. MIDGROUND: FORMULATION MOLECULE RING ── */}
      <div className="absolute inset-0 flex items-center justify-center opacity-75 sm:opacity-90">
        <MoleculeRing size={360} rotate={!reduced} glow={false} />
      </div>

      {/* ── 3. FOREGROUND: DUAL-COLOR FLOATING CAPSULE ── */}
      <div className="relative z-10 flex items-center justify-center drop-shadow-2xl">
        <CapsuleFloating
          size={240}
          variant="plum-white"
          tilt={-26}
          float={!reduced}
          glow={false}
        />
      </div>

      {/* ── 4. FLOATING CLINICAL BADGE: GMP STANDARDS (TOP LEFT) ── */}
      <motion.div
        className="absolute top-6 left-2 sm:left-6 z-20 pointer-events-auto rounded-xl bg-brand-950/85 backdrop-blur-md border border-brand-400/30 px-4 py-2.5 shadow-xl flex items-center gap-3 transition-transform hover:scale-105"
        animate={reduced ? {} : { y: [0, -7, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      >
        <div className="w-9 h-9 rounded-lg bg-brand-900/90 border border-brand-400/40 flex items-center justify-center flex-shrink-0">
          <IllustratedIcon name="shield" size={24} />
        </div>
        <div>
          <p className="text-[10px] font-mono font-bold tracking-widest text-brand-300 uppercase">
            Standards
          </p>
          <p className="text-xs font-semibold text-white tracking-tight">
            cGMP Partner Facilities
          </p>
        </div>
      </motion.div>

      {/* ── 5. FLOATING CLINICAL BADGE: PHARMACOVIGILANCE (BOTTOM RIGHT) ── */}
      <motion.div
        className="absolute bottom-8 right-2 sm:right-6 z-20 pointer-events-auto rounded-xl bg-brand-950/85 backdrop-blur-md border border-accent/40 px-4 py-2.5 shadow-xl flex items-center gap-3 transition-transform hover:scale-105"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      >
        <div className="w-9 h-9 rounded-lg bg-brand-900/90 border border-accent/40 flex items-center justify-center flex-shrink-0">
          <IllustratedIcon name="pharmacovigilance" size={24} />
        </div>
        <div>
          <p className="text-[10px] font-mono font-bold tracking-widest text-accent-champagne uppercase">
            Active Safety
          </p>
          <p className="text-xs font-semibold text-white tracking-tight">
            Vigilant Patient Monitoring
          </p>
        </div>
      </motion.div>
    </div>
  )
}
