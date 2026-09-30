/**
 * Button — interaction primitive — Avalin Laboratories
 *
 * Variants:
 *   primary   — Brand Plum-Pink (CTA) — use for the ONE primary action per section
 *   secondary — Brand outline / blush surface — secondary actions
 *   accent    — Warm Champagne / Rose-Gold — warm tactile actions
 *   ghost     — Transparent with brand plum text — tertiary / inline actions
 *   danger    — Safety-unsafe semantic red — destructive / emergency actions only
 *
 * Sizes:
 *   sm | md (default) | lg
 *
 * Rules:
 *   - Only one `primary` variant button visible per viewport section.
 *   - The `danger` variant must only appear in emergency / destructive contexts.
 *   - Never use an `<a>` tag directly; use `as={Link}` for internal routes.
 *
 * Contrast-verified colours:
 *   primary:   #FFFFFF on #992668 (white on brand-600)  = 5.6:1 PASS (WCAG AA)
 *   secondary: #74174D on #FAF1E8 (brand-800 on blush)  = 7.1:1 PASS (WCAG AAA)
 *   accent:    #FFFFFF on #8E5D38 (white on accent)     = 5.2:1 PASS (WCAG AA)
 *   ghost:     #74174D on transparent ≥ 4.5:1 PASS (requires light bg)
 */

import { cn } from '@/lib/utils'
import type { ElementType, ComponentPropsWithRef, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger'
type Size    = 'sm' | 'md' | 'lg'

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-cta' +
    ' focus-visible:ring-brand-500',
  secondary:
    'border border-brand-200 text-brand-800 bg-surface-alt' +
    ' hover:bg-brand-50 hover:border-brand-400 active:bg-brand-100' +
    ' focus-visible:ring-brand-500',
  accent:
    'bg-accent text-white hover:bg-accent-hover active:bg-accent-hover shadow-cta-champagne' +
    ' focus-visible:ring-accent',
  ghost:
    'text-brand-700 bg-transparent hover:bg-brand-50 active:bg-brand-100' +
    ' focus-visible:ring-brand-500',
  danger:
    'bg-safety-unsafe-DEFAULT text-white hover:opacity-90' +
    ' focus-visible:ring-safety-unsafe-DEFAULT',
}

const SIZE_CLASSES: Record<Size, string> = {
  sm:  'gap-1.5 px-4 py-2 text-sm min-h-[44px]',
  md:  'gap-2 px-6 py-3 text-sm min-h-[48px]',
  lg:  'gap-2.5 px-8 py-3.5 text-base min-h-[52px]',
}

type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
  children: ReactNode
  disabled?: boolean
} & Omit<ComponentPropsWithRef<T>, 'as' | 'variant' | 'size' | 'icon' | 'iconPosition' | 'className' | 'children'>

export function Button<T extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className,
  children,
  disabled,
  ...rest
}: ButtonProps<T>) {
  const Tag = (as ?? 'button') as ElementType
  return (
    <Tag
      className={cn(
        // Base
        'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-fast active:scale-[0.98] motion-reduce:active:scale-100',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        // Variant
        VARIANT_CLASSES[variant],
        // Size
        SIZE_CLASSES[size],
        // Disabled
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {icon && iconPosition === 'left' && (
        <span className="flex-shrink-0 leading-none">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="flex-shrink-0 leading-none">{icon}</span>
      )}
    </Tag>
  )
}
