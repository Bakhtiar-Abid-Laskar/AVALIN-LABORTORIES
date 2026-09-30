/**
 * Eyebrow & SectionHeading — typography primitives — Avalin Laboratories
 *
 * Usage:
 *   <Eyebrow>Our Portfolio</Eyebrow>
 *
 *   <SectionHeading eyebrow="Medicine Safety" title="Pharmacovigilance">
 *     Optional sub-text paragraph below the heading.
 *   </SectionHeading>
 *
 *   // Dark (on dark surfaces):
 *   <SectionHeading eyebrow="..." title="..." dark />
 *
 *   // Centred:
 *   <SectionHeading eyebrow="..." title="..." centre />
 */

import { cn } from '@/lib/utils'

// ─── Eyebrow ───────────────────────────────────────────────────────────────
type EyebrowProps = {
  dark?: boolean
  accent?: 'brand' | 'champagne' | 'muted'
  className?: string
  children: React.ReactNode
}

export function Eyebrow({ dark = false, accent = 'brand', className, children }: EyebrowProps) {
  let colorClass = dark ? 'text-brand-200' : 'text-brand-600'
  if (accent === 'champagne') {
    colorClass = dark ? 'text-accent-light' : 'text-accent'
  } else if (accent === 'muted') {
    colorClass = dark ? 'text-white/60' : 'text-text-tertiary'
  }

  return (
    <p
      className={cn(
        'text-caption font-semibold uppercase tracking-eyebrow',
        colorClass,
        className,
      )}
    >
      {children}
    </p>
  )
}

// ─── SectionHeading ────────────────────────────────────────────────────────
type SectionHeadingProps = {
  eyebrow?:      string
  eyebrowAccent?: 'brand' | 'champagne' | 'muted'
  title:         string
  /** Optional level override — defaults to h2 */
  level?:        2 | 3
  dark?:         boolean
  centre?:       boolean
  /** Optional max-width for the sub-text (default: max-w-2xl) */
  textMaxWidth?: string
  className?:    string
  id?:           string
  children?:     React.ReactNode
}

export function SectionHeading({
  eyebrow,
  eyebrowAccent = 'brand',
  title,
  level = 2,
  dark = false,
  centre = false,
  textMaxWidth = 'max-w-2xl',
  className,
  id,
  children,
}: SectionHeadingProps) {
  const Tag = `h${level}` as 'h2' | 'h3'
  return (
    <div className={cn(centre && 'text-center', className)}>
      {eyebrow && (
        <Eyebrow dark={dark} accent={eyebrowAccent} className="mb-3">
          {eyebrow}
        </Eyebrow>
      )}
      <Tag
        id={id}
        className={cn(
          'font-heading font-bold',
          level === 2 ? 'text-h2-mobile md:text-h2' : 'text-h3',
          dark ? 'text-white' : 'text-brand-950',
        )}
      >
        {title}
      </Tag>
      {children && (
        <div
          className={cn(
            'mt-4 text-body leading-relaxed',
            dark ? 'text-brand-100/90' : 'text-text-secondary',
            centre ? 'mx-auto' : undefined,
            textMaxWidth,
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}
