/**
 * Section — layout primitive — Avalin Laboratories
 *
 * Page section with standardised vertical padding and optional surface variant.
 *
 * Usage:
 *   <Section>...</Section>
 *   <Section surface="muted">...</Section>
 *   <Section surface="dark" className="border-b border-primary-700">...</Section>
 *
 * Surface variants:
 *   default  — `bg-surface` (warm off-white)
 *   muted    — `bg-surface-muted`
 *   alt      — `bg-surface-alt` (pure white)
 *   primary  — `bg-primary-50`
 *   dark     — `bg-gradient-to-br from-primary-900 to-primary-800`
 */

import { cn } from '@/lib/utils'

type SectionSurface = 'default' | 'muted' | 'alt' | 'primary' | 'blush' | 'dark' | 'plum'

const SURFACE_CLASSES: Record<SectionSurface, string> = {
  default: 'bg-surface text-text-primary',
  muted:   'bg-surface-muted text-text-primary',
  alt:     'bg-surface-alt text-text-primary',
  primary: 'bg-brand-50 text-text-primary',
  blush:   'bg-brand-50 text-text-primary',
  dark:    'bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 text-white',
  plum:    'bg-brand-900 text-white',
}

type SectionProps = {
  surface?: SectionSurface
  /** Remove default vertical padding */
  noPad?: boolean
  className?: string
  id?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  children: React.ReactNode
}

export function Section({
  surface = 'default',
  noPad = false,
  className,
  id,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        SURFACE_CLASSES[surface],
        !noPad && 'py-section-mobile md:py-section-desktop',
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  )
}
