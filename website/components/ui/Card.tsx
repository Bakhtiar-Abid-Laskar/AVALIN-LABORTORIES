/**
 * Card — surface primitive — Avalin Laboratories
 *
 * Variants:
 *   default  — border + bg-surface-alt + shadow-card
 *   elevated — thicker shadow, no border
 *   flat     — no shadow, just border
 *   ghost    — no border, no shadow, just rounded background
 *
 * Usage:
 *   <Card>content</Card>
 *   <Card variant="elevated" className="p-10">content</Card>
 *   <Card as="article">content</Card>
 *   <Card interactive>hoverable card with lift</Card>
 *
 * Rules:
 *   - Padding is NOT included — apply it via className.
 *   - All cards use rounded-card from design tokens.
 *   - Interactive cards must always have focus-visible state.
 */

import { cn } from '@/lib/utils'
import type { ElementType, ComponentPropsWithRef } from 'react'

type CardVariant = 'default' | 'elevated' | 'blush' | 'plum' | 'flat' | 'ghost' | 'glass'

const VARIANT_CLASSES: Record<CardVariant, string> = {
  default:  'border border-border bg-surface-alt shadow-card',
  elevated: 'bg-surface-alt shadow-card-hover border border-border/60',
  blush:    'border border-brand-200/80 bg-brand-50/70 shadow-card',
  plum:     'border border-brand-800/80 bg-brand-900 text-white shadow-card-hover',
  flat:     'border border-border bg-surface-alt',
  ghost:    'bg-surface rounded-card',
  glass:    'glass-pharma',
}

type CardProps<T extends ElementType = 'div'> = {
  as?: T
  variant?: CardVariant
  /** Adds hover lift + cursor-pointer styles */
  interactive?: boolean
  className?: string
  children: React.ReactNode
} & Omit<ComponentPropsWithRef<T>, 'as' | 'variant' | 'interactive' | 'className' | 'children'>

export function Card<T extends ElementType = 'div'>({
  as,
  variant = 'default',
  interactive = false,
  className,
  children,
  ...rest
}: CardProps<T>) {
  const Tag = (as ?? 'div') as ElementType
  return (
    <Tag
      className={cn(
        'rounded-card',
        VARIANT_CLASSES[variant],
        interactive && [
          'cursor-pointer transition-all duration-base',
          'hover:shadow-card-hover hover:-translate-y-1 motion-reduce:hover:translate-y-0',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
        ],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
