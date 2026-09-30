/**
 * Divider — decorative / structural divider — Avalin Laboratories
 *
 * Usage:
 *   <Divider />
 *   <Divider label="or" />
 *   <Divider className="my-8" />
 *   <Divider vertical className="h-8" />  // for inline dividers
 */

import { cn } from '@/lib/utils'

type DividerProps = {
  /** Optional text label centred in the divider */
  label?:     string
  /** Optional motif: 'none' | 'hexagon' | 'dot' */
  motif?:     'none' | 'hexagon' | 'dot'
  variant?:   'default' | 'blush' | 'champagne'
  vertical?:  boolean
  className?: string
  'aria-hidden'?: boolean
}

const VARIANT_BORDER_CLASSES = {
  default:   'bg-border',
  blush:     'bg-brand-200',
  champagne: 'bg-accent/30',
}

export function Divider({
  label,
  motif = 'none',
  variant = 'default',
  vertical = false,
  className,
  'aria-hidden': ariaHidden = true,
}: DividerProps) {
  const borderBg = VARIANT_BORDER_CLASSES[variant]

  if (vertical) {
    return (
      <div
        className={cn('inline-block w-px self-stretch', borderBg, className)}
        aria-hidden={ariaHidden}
        role="separator"
        aria-orientation="vertical"
      />
    )
  }

  if (label) {
    return (
      <div
        className={cn('flex items-center gap-3', className)}
        role="separator"
      >
        <div className={cn('flex-1 h-px', borderBg)} />
        <span className="text-xs text-text-tertiary font-medium tracking-wide uppercase">
          {label}
        </span>
        <div className={cn('flex-1 h-px', borderBg)} />
      </div>
    )
  }

  if (motif === 'hexagon') {
    return (
      <div className={cn('flex items-center gap-3', className)} role="separator" aria-hidden={ariaHidden}>
        <div className={cn('flex-1 h-px', borderBg)} />
        <div className="w-2.5 h-2.5 rotate-45 border border-brand-400 bg-brand-50/80 rounded-[1px]" />
        <div className={cn('flex-1 h-px', borderBg)} />
      </div>
    )
  }

  if (motif === 'dot') {
    return (
      <div className={cn('flex items-center gap-3', className)} role="separator" aria-hidden={ariaHidden}>
        <div className={cn('flex-1 h-px', borderBg)} />
        <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
        <div className={cn('flex-1 h-px', borderBg)} />
      </div>
    )
  }

  return (
    <hr
      className={cn('border-0 h-px', borderBg, className)}
      aria-hidden={ariaHidden}
    />
  )
}
