'use client'

/**
 * IllustratedIcon — Bespoke Dimensional Pharma Icon System
 * Avalin Laboratories Design System — Phase 3
 *
 * Replaces generic thin-stroke icons with art-directed, multi-layered,
 * dimensional pharmaceutical visual assets (64px - 120px feature, 24px inline).
 *
 * Rules:
 *   - Consumes CSS variable design tokens exclusively.
 *   - Zero hardcoded colors.
 *   - Unique SVG IDs via `useId()` for leak-free gradient references.
 *   - Accessible with optional `title` tag and automatic `aria-hidden`.
 */

import { useId, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type IllustratedIconName =
  | 'capsule'
  | 'blister'
  | 'vial'
  | 'tablet'
  | 'microscope'
  | 'pipette'
  | 'shield'
  | 'mortar'
  | 'cold-chain'
  | 'logistics'
  | 'pharmacovigilance'
  | 'molecule'
  | 'nutrition'
  | 'digestive'
  | 'neuro'
  | 'liver'
  | 'probiotic'
  | 'immuno'
  // Therapeutic area IDs and aliases
  | 'vitamins-minerals-nutrition'
  | 'gastrointestinal'
  | 'anti-infective'
  | 'shield-virus'
  | 'pain-management-neuro-cns'
  | 'hepatoprotective'
  | 'probiotics'

export interface IllustratedIconProps {
  name: IllustratedIconName
  size?: number
  className?: string
  title?: string
  'aria-hidden'?: boolean | 'true' | 'false'
}

export function IllustratedIcon({
  name,
  size = 64,
  className,
  title,
  'aria-hidden': ariaHidden,
}: IllustratedIconProps) {
  const uid = useId().replace(/:/g, '')
  const isDecorative = !title

  // Unique IDs for gradients
  const gBrand = `g-brand-${uid}`
  const gChampagne = `g-champ-${uid}`
  const gGlass = `g-glass-${uid}`
  const gDark = `g-dark-${uid}`
  const gSlate = `g-slate-${uid}`

  // Render icon graphic based on name
  let iconContent: ReactNode = null

  switch (name) {
    // ── 1. CAPSULE ─────────────────────────────────────────────────────────────
    case 'capsule':
      iconContent = (
        <g transform="translate(12, 12)">
          {/* Cast Shadow */}
          <ellipse cx="28" cy="38" rx="16" ry="3.5" fill="var(--brand-950, #1C0B16)" opacity="0.18" />
          {/* Angled Capsule */}
          <g transform="rotate(-30 28 24)">
            {/* Plum Cap */}
            <path d="M12 24 C12 17.4 17.4 12 24 12 L28 12 L28 36 L24 36 C17.4 36 12 30.6 12 24 Z" fill={`url(#${gBrand})`} />
            {/* White / Pearl Body */}
            <path d="M28 12 L36 12 C42.6 12 48 17.4 48 24 C48 30.6 42.6 36 36 36 L28 36 Z" fill={`url(#${gGlass})`} stroke="var(--brand-200, #F4C7DD)" strokeWidth="0.8" />
            {/* Center Band */}
            <rect x="26.5" y="11" width="3" height="26" rx="1.5" fill="#FFFFFF" opacity="0.9" />
            {/* Specular Sheen */}
            <path d="M16 16 C20 14 26 14 32 14 L42 14 C44 14 42 16 38 16 L22 16 C18 16 16 18 16 16 Z" fill="#FFFFFF" opacity="0.85" />
          </g>
        </g>
      )
      break

    // ── 2. BLISTER PACK ────────────────────────────────────────────────────────
    case 'blister':
      iconContent = (
        <g transform="translate(10, 10)">
          {/* Base Foil Card */}
          <rect x="4" y="4" width="48" height="48" rx="8" fill={`url(#${gGlass})`} stroke="var(--brand-300, #E89BC4)" strokeWidth="1.2" />
          {/* Knurled Edge */}
          <rect x="6" y="6" width="44" height="44" rx="6" fill="none" stroke="var(--brand-200, #F4C7DD)" strokeWidth="0.8" strokeDasharray="2 2" />
          {/* 4 Blister Domes */}
          {[
            { x: 12, y: 12, fill: `url(#${gBrand})` },
            { x: 30, y: 12, fill: `url(#${gChampagne})` },
            { x: 12, y: 30, fill: `url(#${gChampagne})` },
            { x: 30, y: 30, fill: `url(#${gBrand})` },
          ].map((d, i) => (
            <g key={i}>
              <rect x={d.x} y={d.y} width="14" height="14" rx="4" fill={d.fill} />
              <rect x={d.x + 2} y={d.y + 2} width="5" height="3" rx="1.5" fill="#FFFFFF" opacity="0.8" />
            </g>
          ))}
          {/* Center Perforation Score */}
          <line x1="28" y1="6" x2="28" y2="50" stroke="var(--brand-300, #E89BC4)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="6" y1="28" x2="50" y2="28" stroke="var(--brand-300, #E89BC4)" strokeWidth="1" strokeDasharray="3 3" />
        </g>
      )
      break

    // ── 3. VIAL ────────────────────────────────────────────────────────────────
    case 'vial':
      iconContent = (
        <g transform="translate(14, 8)">
          {/* Shadow */}
          <ellipse cx="20" cy="56" rx="14" ry="3.5" fill="var(--brand-950, #1C0B16)" opacity="0.2" />
          {/* Flip-off Cap */}
          <rect x="13" y="4" width="14" height="4" rx="2" fill={`url(#${gBrand})`} />
          {/* Aluminum Crimp Collar */}
          <rect x="11" y="8" width="18" height="6" rx="1.5" fill={`url(#${gChampagne})`} />
          {/* Glass Body */}
          <path d="M 14 14 C 14 18 6 22 6 30 L 6 52 C 6 55 10 56 20 56 C 30 56 34 55 34 52 L 34 30 C 34 22 26 18 26 14 Z" fill={`url(#${gGlass})`} stroke="var(--brand-300, #E89BC4)" strokeWidth="1.2" />
          {/* Liquid Formulation Fill */}
          <path d="M 7 34 L 7 51 C 7 54 11 55 20 55 C 29 55 33 54 33 51 L 33 34 Q 20 37 7 34 Z" fill={`url(#${gBrand})`} opacity="0.85" />
          {/* Liquid Meniscus Highlight */}
          <ellipse cx="20" cy="34" rx="13" ry="2" fill="#FFFFFF" opacity="0.5" />
          {/* Graduations */}
          <line x1="9" y1="40" x2="13" y2="40" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" />
          <line x1="9" y1="44" x2="15" y2="44" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" />
          <line x1="9" y1="48" x2="13" y2="48" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" />
          {/* Specular Highlight */}
          <rect x="9" y="24" width="2" height="26" rx="1" fill="#FFFFFF" opacity="0.8" />
        </g>
      )
      break

    // ── 4. TABLET ──────────────────────────────────────────────────────────────
    case 'tablet':
      iconContent = (
        <g transform="translate(10, 10)">
          {/* Shadow */}
          <ellipse cx="28" cy="36" rx="20" ry="14" fill="var(--brand-950, #1C0B16)" opacity="0.18" />
          {/* Outer Bevel Rim */}
          <circle cx="26" cy="26" r="22" fill={`url(#${gChampagne})`} />
          {/* Inner Face Dome */}
          <circle cx="25.5" cy="25.5" r="19" fill={`url(#${gGlass})`} stroke="#FFFFFF" strokeWidth="0.8" />
          {/* Scored Break-line */}
          <line x1="25.5" y1="8" x2="25.5" y2="43" stroke="var(--brand-900, #2E1424)" strokeWidth="1.2" opacity="0.3" />
          <line x1="26.3" y1="8" x2="26.3" y2="43" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.9" />
          {/* Engraved Rx/AVL Mark */}
          <text x="18" y="28" fontSize="6" fontFamily="sans-serif" fontWeight="bold" fill="var(--brand-700, #6D2452)" opacity="0.6">A</text>
          <text x="31" y="28" fontSize="6" fontFamily="sans-serif" fontWeight="bold" fill="var(--brand-700, #6D2452)" opacity="0.6">L</text>
          {/* Top Crescent Specular Sheen */}
          <path d="M 12 18 C 16 12 22 9 30 9 C 34 9 38 11 41 14 C 36 12 31 11 26 11 C 19 11 14 13 12 18 Z" fill="#FFFFFF" opacity="0.85" />
        </g>
      )
      break

    // ── 5. MICROSCOPE ──────────────────────────────────────────────────────────
    case 'microscope':
      iconContent = (
        <g transform="translate(8, 8)">
          {/* Heavy Cast Base */}
          <rect x="12" y="50" width="36" height="6" rx="3" fill={`url(#${gDark})`} />
          {/* Curved Arm */}
          <path d="M 38 50 C 44 46 44 26 34 18 C 30 15 24 16 22 18" stroke={`url(#${gBrand})`} strokeWidth="4.5" strokeLinecap="round" fill="none" />
          {/* Stage Platform */}
          <rect x="16" y="38" width="22" height="3" rx="1.5" fill={`url(#${gDark})`} />
          {/* Specimen Slide with Pink Drop */}
          <rect x="20" y="36" width="14" height="2" rx="0.5" fill="#FFFFFF" />
          <circle cx="27" cy="37" r="1.5" fill="var(--brand-raw, #E1359F)" />
          {/* Optical Tube (Angled Eyepiece & Objective) */}
          <g transform="rotate(22 24 22)">
            {/* Eyepiece */}
            <rect x="22" y="4" width="8" height="5" rx="1.5" fill={`url(#${gChampagne})`} />
            {/* Main Tube */}
            <rect x="23.5" y="9" width="5" height="18" fill={`url(#${gDark})`} />
            {/* Nosepiece Revolver */}
            <circle cx="26" cy="27" r="4.5" fill={`url(#${gBrand})`} />
            {/* Objective Lens */}
            <rect x="24.5" y="28" width="3" height="7" rx="1" fill={`url(#${gChampagne})`} />
          </g>
          {/* Coarse Adjustment Knob */}
          <circle cx="37" cy="28" r="4" fill={`url(#${gChampagne})`} stroke="#FFFFFF" strokeWidth="1" />
        </g>
      )
      break

    // ── 6. PIPETTE ─────────────────────────────────────────────────────────────
    case 'pipette':
      iconContent = (
        <g transform="translate(10, 8)">
          {/* Angled Pipette Body */}
          <g transform="rotate(-35 24 24)">
            {/* Rubber Bulb (Brand Plum) */}
            <path d="M 22 4 C 18 4 16 8 18 12 L 20 15 L 28 15 L 30 12 C 32 8 30 4 26 4 Z" fill={`url(#${gBrand})`} />
            {/* Collar Ring */}
            <rect x="19" y="15" width="10" height="2.5" rx="1" fill={`url(#${gChampagne})`} />
            {/* Glass Barrel */}
            <path d="M 20 17.5 L 20 38 L 22 46 L 24 49 L 26 46 L 28 38 L 28 17.5 Z" fill={`url(#${gGlass})`} stroke="var(--brand-200, #F4C7DD)" strokeWidth="0.8" />
            {/* Liquid Aspirated Inside */}
            <path d="M 21 28 L 21 38 L 22.5 45 L 24 48 L 25.5 45 L 27 38 L 27 28 Z" fill={`url(#${gBrand})`} opacity="0.9" />
            {/* Volumetric Graduations */}
            <line x1="22" y1="22" x2="25" y2="22" stroke="var(--brand-600, #992668)" strokeWidth="0.7" />
            <line x1="22" y1="26" x2="26" y2="26" stroke="var(--brand-600, #992668)" strokeWidth="0.7" />
            <line x1="22" y1="30" x2="25" y2="30" stroke="var(--brand-600, #992668)" strokeWidth="0.7" />
          </g>
          {/* Falling Calibrated Droplet */}
          <path d="M 37 44 C 37 44 42 49 42 52 C 42 54.8 39.8 57 37 57 C 34.2 57 32 54.8 32 52 C 32 49 37 44 37 44 Z" fill={`url(#${gBrand})`} />
          <circle cx="35" cy="51" r="1.2" fill="#FFFFFF" opacity="0.8" />
        </g>
      )
      break

    // ── 7. SHIELD (CLINICAL TRUST / CLEANROOM) ─────────────────────────────────
    case 'shield':
      iconContent = (
        <g transform="translate(10, 8)">
          {/* Shadow */}
          <ellipse cx="26" cy="54" rx="18" ry="4" fill="var(--brand-950, #1C0B16)" opacity="0.18" />
          {/* Outer Protective Crest */}
          <path d="M 26 6 L 46 13 C 46 29 38 43 26 50 C 14 43 6 29 6 13 L 26 6 Z" fill={`url(#${gBrand})`} />
          {/* Inner Inset Layer */}
          <path d="M 26 10 L 42 16 C 42 29 35 40 26 46 C 17 40 10 29 10 16 L 26 10 Z" fill={`url(#${gGlass})`} stroke="#FFFFFF" strokeWidth="0.8" />
          {/* Cleanroom Pharma Cross */}
          <path d="M 23 20 L 29 20 L 29 26 L 35 26 L 35 32 L 29 32 L 29 38 L 23 38 L 23 32 L 17 32 L 17 26 L 23 26 Z" fill={`url(#${gChampagne})`} />
          {/* Micro Star / Checkmark at Cross Center */}
          <circle cx="26" cy="29" r="2" fill="#FFFFFF" />
        </g>
      )
      break

    // ── 8. MORTAR & PESTLE ────────────────────────────────────────────────────
    case 'mortar':
      iconContent = (
        <g transform="translate(8, 8)">
          {/* Cast Shadow */}
          <ellipse cx="30" cy="52" rx="20" ry="4" fill="var(--brand-950, #1C0B16)" opacity="0.18" />
          {/* Mortar Bowl Substrate */}
          <path d="M 12 28 C 12 44 20 48 30 48 C 40 48 48 44 48 28 L 52 24 L 8 24 Z" fill={`url(#${gGlass})`} stroke="var(--brand-300, #E89BC4)" strokeWidth="1.2" />
          {/* Ground Bioactive Powder Inside */}
          <path d="M 15 28 C 15 38 21 42 30 42 C 39 42 45 38 45 28 Z" fill={`url(#${gBrand})`} opacity="0.65" />
          {/* Mortar Rim Lip */}
          <ellipse cx="30" cy="24" rx="22" ry="4" fill={`url(#${gGlass})`} stroke="var(--brand-200, #F4C7DD)" strokeWidth="1" />
          {/* Angled Pestle */}
          <g transform="rotate(-32 30 24)">
            <path d="M 28 4 L 34 4 C 36 4 36 28 38 32 C 38 36 34 38 30 38 C 26 38 22 36 22 32 C 24 28 26 4 28 4 Z" fill={`url(#${gChampagne})`} stroke="#FFFFFF" strokeWidth="0.8" />
            <ellipse cx="31" cy="6" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.8" />
          </g>
        </g>
      )
      break

    // ── 9. COLD-CHAIN TEMPERATURE GAUGE ───────────────────────────────────────
    case 'cold-chain':
      iconContent = (
        <g transform="translate(10, 8)">
          {/* Protective Cryo Housing Capsule */}
          <rect x="8" y="6" width="36" height="50" rx="18" fill={`url(#${gSlate})`} stroke="var(--brand-200, #F4C7DD)" strokeWidth="1.2" />
          {/* Glass Thermometer Bore */}
          <rect x="23" y="12" width="6" height="30" rx="3" fill="#FFFFFF" opacity="0.9" />
          {/* Liquid Mercury Bulb (Brand Plum) */}
          <circle cx="26" cy="44" r="7" fill={`url(#${gBrand})`} stroke="#FFFFFF" strokeWidth="1" />
          {/* Mercury Column */}
          <rect x="24.5" y="24" width="3" height="16" rx="1.5" fill="var(--brand-600, #992668)" />
          {/* Clinical Cold Graduations */}
          <line x1="16" y1="16" x2="21" y2="16" stroke="var(--brand-300, #E89BC4)" strokeWidth="1" />
          <line x1="18" y1="20" x2="21" y2="20" stroke="var(--brand-300, #E89BC4)" strokeWidth="0.8" />
          <line x1="14" y1="24" x2="21" y2="24" stroke="var(--brand-300, #E89BC4)" strokeWidth="1.2" />
          <line x1="18" y1="28" x2="21" y2="28" stroke="var(--brand-300, #E89BC4)" strokeWidth="0.8" />
          {/* Sub-Zero Indicator */}
          <text x="32" y="26" fontSize="6" fontFamily="monospace" fontWeight="bold" fill="var(--brand-600, #992668)">2-8°C</text>
          {/* Snowflake Micro-Badge */}
          <circle cx="26" cy="44" r="2.5" fill="#FFFFFF" />
        </g>
      )
      break

    // ── 10. GLOBAL LOGISTICS / FREIGHT ────────────────────────────────────────
    case 'logistics':
      iconContent = (
        <g transform="translate(8, 10)">
          {/* Cargo Freighter / Vessel Hull */}
          <path d="M 6 36 L 46 36 L 42 48 L 12 48 Z" fill={`url(#${gDark})`} />
          {/* Water Surface Line */}
          <path d="M 4 48 C 10 46 16 50 22 48 C 28 46 34 50 40 48 C 44 46 48 50 50 48" stroke="var(--brand-300, #E89BC4)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Cold-Chain Shipping Containers */}
          <rect x="12" y="26" width="13" height="10" rx="1.5" fill={`url(#${gBrand})`} stroke="#FFFFFF" strokeWidth="0.5" />
          <rect x="27" y="26" width="13" height="10" rx="1.5" fill={`url(#${gChampagne})`} stroke="#FFFFFF" strokeWidth="0.5" />
          <rect x="19" y="16" width="13" height="10" rx="1.5" fill={`url(#${gGlass})`} stroke="var(--brand-200, #F4C7DD)" strokeWidth="0.8" />
          {/* Pharma Cross on Central Container */}
          <path d="M 24 19 L 27 19 L 27 21 L 29 21 L 29 24 L 27 24 L 27 26 L 24 26 L 24 24 L 22 24 L 22 21 L 24 21 Z" fill="var(--brand-600, #992668)" />
          {/* Bridge / Wheelhouse */}
          <path d="M 40 22 L 46 22 L 46 36 L 40 36 Z" fill={`url(#${gDark})`} />
          <rect x="42" y="24" width="3" height="3" fill="var(--color-accent-champagne, #C99E7C)" />
        </g>
      )
      break

    // ── 11. PHARMACOVIGILANCE / HEARTBEAT ─────────────────────────────────────
    case 'pharmacovigilance':
      iconContent = (
        <g transform="translate(8, 8)">
          {/* Outer Protective Crest */}
          <path d="M 28 6 L 50 14 C 50 32 40 46 28 54 C 16 46 6 32 6 14 L 28 6 Z" fill={`url(#${gGlass})`} stroke="var(--brand-300, #E89BC4)" strokeWidth="1.2" />
          {/* Inner Safety Fill */}
          <path d="M 28 10 L 46 17 C 46 32 37 43 28 50 C 19 43 10 32 10 17 L 28 10 Z" fill={`url(#${gBrand})`} opacity="0.12" />
          {/* Continuous ECG Pulse Rhythm */}
          <path d="M 12 30 L 20 30 L 23 20 L 27 42 L 31 16 L 35 34 L 38 30 L 44 30" stroke={`url(#${gBrand})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Active Sensor Node at Apex */}
          <circle cx="31" cy="16" r="3.5" fill="var(--brand-raw, #E1359F)" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Baseline Indicator */}
          <line x1="12" y1="30" x2="44" y2="30" stroke="var(--brand-200, #F4C7DD)" strokeWidth="0.8" strokeDasharray="2 3" />
        </g>
      )
      break

    // ── 12. MOLECULE / SYNTHESIS ──────────────────────────────────────────────
    case 'molecule':
      iconContent = (
        <g transform="translate(8, 8)">
          {/* Orbital Guide */}
          <circle cx="28" cy="28" r="22" stroke="var(--brand-200, #F4C7DD)" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.6" />
          {/* Hexagonal Bond Ring */}
          <polygon points="28,14 40,21 40,35 28,42 16,35 16,21" fill="var(--surface-blush, #FDF4F8)" stroke={`url(#${gBrand})`} strokeWidth="2.2" strokeLinejoin="round" />
          {/* Delocalized Pi Ring */}
          <circle cx="28" cy="28" r="7" stroke="var(--color-accent-champagne, #C99E7C)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          {/* Nodes */}
          {[
            { cx: 28, cy: 14, fill: `url(#${gBrand})` },
            { cx: 40, cy: 21, fill: `url(#${gChampagne})` },
            { cx: 40, cy: 35, fill: `url(#${gBrand})` },
            { cx: 28, cy: 42, fill: `url(#${gChampagne})` },
            { cx: 16, cy: 35, fill: `url(#${gBrand})` },
            { cx: 16, cy: 21, fill: `url(#${gChampagne})` },
          ].map((n, i) => (
            <circle key={i} cx={n.cx} cy={n.cy} r="3.2" fill={n.fill} stroke="#FFFFFF" strokeWidth="1.2" />
          ))}
          {/* Center Glowing Core */}
          <circle cx="28" cy="28" r="2.5" fill="var(--brand-raw, #E1359F)" />
        </g>
      )
      break

    // ── 13. NUTRITION (BIOACTIVE BOTANICAL + MOLECULE) ─────────────────────────
    case 'nutrition':
    case 'vitamins-minerals-nutrition':
      iconContent = (
        <g transform="translate(8, 8)">
          {/* Bioactive Leaf Outline */}
          <path d="M 28 50 C 28 50 12 36 12 22 C 12 12 22 6 28 6 C 34 6 44 12 44 22 C 44 36 28 50 28 50 Z" fill={`url(#${gGlass})`} stroke="var(--brand-300, #E89BC4)" strokeWidth="1.2" />
          {/* Stem & Bioactive Cellular Matrix */}
          <path d="M 28 50 L 28 14" stroke={`url(#${gBrand})`} strokeWidth="2" strokeLinecap="round" />
          {/* Leaf Vein Nodes */}
          <path d="M 28 24 L 38 18 M 28 32 L 40 26 M 28 40 L 36 36 M 28 24 L 18 18 M 28 32 L 16 26 M 28 40 L 20 36" stroke="var(--brand-400, #D96BA7)" strokeWidth="1.2" strokeLinecap="round" />
          {/* Bioactive Nutrient Spheres */}
          <circle cx="38" cy="18" r="3" fill={`url(#${gChampagne})`} stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="18" cy="18" r="3" fill={`url(#${gBrand})`} stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="28" cy="10" r="3.5" fill="var(--brand-raw, #E1359F)" stroke="#FFFFFF" strokeWidth="1.2" />
        </g>
      )
      break

    // ── 14. DIGESTIVE (GASTROINTESTINAL PROTECTION) ───────────────────────────
    case 'digestive':
    case 'gastrointestinal':
      iconContent = (
        <g transform="translate(8, 8)">
          {/* Gastrointestinal Silhouette */}
          <path d="M 24 8 C 22 8 16 11 16 18 C 16 26 26 28 26 36 C 26 44 18 46 18 50 C 18 52 24 52 28 50 C 34 46 36 38 36 32 C 36 24 26 22 26 16 C 26 11 30 8 24 8 Z" fill={`url(#${gGlass})`} stroke="var(--brand-300, #E89BC4)" strokeWidth="1.5" />
          {/* Enteric Coated Micro-Pellets */}
          {[
            { cx: 22, cy: 18, fill: `url(#${gBrand})` },
            { cx: 27, cy: 26, fill: `url(#${gChampagne})` },
            { cx: 23, cy: 34, fill: `url(#${gBrand})` },
            { cx: 30, cy: 40, fill: `url(#${gChampagne})` },
          ].map((p, i) => (
            <circle key={i} cx={p.cx} cy={p.cy} r="2.8" fill={p.fill} stroke="#FFFFFF" strokeWidth="0.8" />
          ))}
          {/* Protective Mucosal Shield Arc */}
          <path d="M 12 18 C 10 26 10 38 14 46" stroke="var(--brand-400, #D96BA7)" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3" />
        </g>
      )
      break

    // ── 15. NEURO (SYNAPTIC NEURAL NETWORK) ───────────────────────────────────
    case 'neuro':
    case 'pain-management-neuro-cns':
      iconContent = (
        <g transform="translate(8, 8)">
          {/* Neural Synapse Pathways */}
          <path d="M 28 28 L 14 14 M 28 28 L 42 14 M 28 28 L 44 38 M 28 28 L 28 48 M 28 28 L 12 38" stroke={`url(#${gBrand})`} strokeWidth="2" strokeLinecap="round" />
          {/* Central Soma Cell Body */}
          <circle cx="28" cy="28" r="8" fill={`url(#${gDark})`} stroke="var(--brand-400, #D96BA7)" strokeWidth="1.5" />
          <circle cx="28" cy="28" r="3.5" fill="var(--brand-raw, #E1359F)" />
          {/* Synaptic Terminal Nodes */}
          <circle cx="14" cy="14" r="4.5" fill={`url(#${gChampagne})`} stroke="#FFFFFF" strokeWidth="1.2" />
          <circle cx="42" cy="14" r="4.5" fill={`url(#${gBrand})`} stroke="#FFFFFF" strokeWidth="1.2" />
          <circle cx="44" cy="38" r="4.5" fill={`url(#${gChampagne})`} stroke="#FFFFFF" strokeWidth="1.2" />
          <circle cx="28" cy="48" r="4.5" fill={`url(#${gBrand})`} stroke="#FFFFFF" strokeWidth="1.2" />
          <circle cx="12" cy="38" r="4.5" fill={`url(#${gChampagne})`} stroke="#FFFFFF" strokeWidth="1.2" />
          {/* Neurotransmitter Action Potential Rings */}
          <circle cx="28" cy="28" r="14" stroke="var(--brand-300, #E89BC4)" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.6" />
        </g>
      )
      break

    // ── 16. LIVER (HEPATIC METABOLISM & DETOX) ────────────────────────────────
    case 'liver':
    case 'hepatoprotective':
      iconContent = (
        <g transform="translate(8, 8)">
          {/* Hepatic Lobule Anatomical Silhouette */}
          <path d="M 12 18 C 12 12 18 10 26 10 C 34 10 44 14 44 24 C 44 36 36 44 24 46 C 14 46 12 36 12 28 Z" fill={`url(#${gBrand})`} opacity="0.85" stroke="var(--brand-200, #F4C7DD)" strokeWidth="1.2" />
          {/* Gallbladder / Metabolic Ducts */}
          <path d="M 28 20 C 32 24 34 32 30 38" stroke="var(--color-accent-champagne, #C99E7C)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="30" cy="38" r="3.5" fill={`url(#${gChampagne})`} stroke="#FFFFFF" strokeWidth="1" />
          {/* Cellular Filtration Hexagons */}
          <polygon points="20,18 24,20 24,24 20,26 16,24 16,20" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.75" />
          <polygon points="26,26 30,28 30,32 26,34 22,32 22,28" fill="none" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.75" />
        </g>
      )
      break

    // ── 17. PROBIOTIC (MICROENCAPSULATED COLONIES) ───────────────────────────
    case 'probiotic':
    case 'probiotics':
      iconContent = (
        <g transform="translate(8, 8)">
          {/* Protective Microcapsule Shell */}
          <circle cx="28" cy="28" r="22" fill={`url(#${gGlass})`} stroke="var(--brand-300, #E89BC4)" strokeWidth="1.2" />
          {/* Inner Protective Fluid */}
          <circle cx="28" cy="28" r="18" fill="var(--surface-blush, #FDF4F8)" opacity="0.7" />
          {/* Active Lactobacillus & Bifidobacteria Colonies */}
          <rect x="22" y="16" width="12" height="6" rx="3" fill={`url(#${gBrand})`} transform="rotate(25 28 19)" />
          <rect x="18" y="26" width="14" height="6" rx="3" fill={`url(#${gChampagne})`} transform="rotate(-15 25 29)" />
          <rect x="24" y="34" width="10" height="5" rx="2.5" fill={`url(#${gBrand})`} transform="rotate(10 29 36)" />
          {/* Spore Cluster Beads */}
          <circle cx="16" cy="20" r="2" fill="var(--brand-raw, #E1359F)" />
          <circle cx="38" cy="30" r="2.5" fill="var(--brand-raw, #E1359F)" />
          <circle cx="36" cy="18" r="1.8" fill="var(--color-accent, #8E5D38)" />
          {/* Protective Halo */}
          <circle cx="28" cy="28" r="24" stroke="var(--brand-200, #F4C7DD)" strokeWidth="0.8" strokeDasharray="2 4" />
        </g>
      )
      break

    // ── 18. IMMUNO (IMMUNE BARRIER & DEFENSE) ─────────────────────────────────
    case 'immuno':
    case 'anti-infective':
    case 'shield-virus':
      iconContent = (
        <g transform="translate(8, 8)">
          {/* Defensive Fortress Shield */}
          <path d="M 28 6 L 48 14 C 48 30 39 44 28 50 C 17 44 8 30 8 14 L 28 6 Z" fill={`url(#${gGlass})`} stroke="var(--brand-300, #E89BC4)" strokeWidth="1.2" />
          {/* Central Immunoglobulin Y-Antibody */}
          <path d="M 28 42 L 28 28 M 28 28 L 20 18 M 28 28 L 36 18" stroke={`url(#${gBrand})`} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Variable Antigen-Binding Tips */}
          <circle cx="20" cy="18" r="3.5" fill={`url(#${gChampagne})`} stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="36" cy="18" r="3.5" fill={`url(#${gChampagne})`} stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="28" cy="42" r="3.5" fill="var(--brand-raw, #E1359F)" stroke="#FFFFFF" strokeWidth="1" />
          {/* Radiating Immunity Arcs */}
          <path d="M 14 12 C 22 8 34 8 42 12" stroke="var(--brand-200, #F4C7DD)" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 3" />
        </g>
      )
      break

    default:
      iconContent = null
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('inline-block select-none overflow-visible flex-shrink-0 transition-transform duration-base group-hover:scale-105 motion-reduce:group-hover:scale-100', className)}
      aria-hidden={ariaHidden ?? (isDecorative ? 'true' : undefined)}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      <defs>
        {/* Brand Plum-Pink Gradient */}
        <linearGradient id={gBrand} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--brand-400, #D96BA7)" />
          <stop offset="60%" stopColor="var(--brand-600, #992668)" />
          <stop offset="100%" stopColor="var(--brand-900, #2E1424)" />
        </linearGradient>

        {/* Warm Champagne Gradient */}
        <linearGradient id={gChampagne} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-accent-light, #FAF1E8)" />
          <stop offset="50%" stopColor="var(--color-accent-champagne, #C99E7C)" />
          <stop offset="100%" stopColor="var(--color-accent, #8E5D38)" />
        </linearGradient>

        {/* Frosted Borosilicate Glass Substrate */}
        <linearGradient id={gGlass} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="40%" stopColor="var(--surface-blush, #FDF4F8)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--brand-100, #FBE6EF)" stopOpacity="0.75" />
        </linearGradient>

        {/* Deep Plum Gradient */}
        <linearGradient id={gDark} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--brand-700, #6D2452)" />
          <stop offset="60%" stopColor="var(--brand-900, #2E1424)" />
          <stop offset="100%" stopColor="var(--brand-950, #1C0B16)" />
        </linearGradient>

        {/* Slate Clinical Gradient */}
        <linearGradient id={gSlate} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="var(--safety-safe-bg, #EEF4F8)" />
          <stop offset="100%" stopColor="var(--safety-safe, #32526B)" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {iconContent}
    </svg>
  )
}
