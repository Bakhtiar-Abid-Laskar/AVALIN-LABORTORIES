import type { Classification } from '@/content/types'
import { Icon, type IconName } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export type BadgeVariant = 'rx' | 'otc' | 'default' | 'champagne' | 'outline'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps {
  classification?: Classification
  variant?: BadgeVariant
  size?: BadgeSize
  icon?: IconName
  className?: string
  children?: ReactNode
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  rx: 'bg-rx-bg text-rx-text border-rx-DEFAULT/30',
  otc: 'bg-otc-bg text-otc-text border-otc-DEFAULT/30',
  default: 'bg-brand-50 text-brand-800 border-brand-200',
  champagne: 'bg-accent-light text-accent-hover border-accent/30',
  outline: 'bg-transparent text-text-secondary border-border',
}

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-3 py-1 text-sm gap-1.5',
}

export function Badge({
  classification,
  variant,
  size = 'md',
  icon,
  className,
  children,
}: BadgeProps) {
  // Derive variant and icon from classification if specified
  let effectiveVariant: BadgeVariant = variant ?? 'default'
  let effectiveIcon: IconName | undefined = icon
  let defaultLabel: string | undefined

  if (classification === 'Rx') {
    effectiveVariant = 'rx'
    effectiveIcon = icon ?? 'rx'
    defaultLabel = 'Rx Only'
  } else if (classification === 'OTC') {
    effectiveVariant = 'otc'
    effectiveIcon = icon ?? 'otc'
    defaultLabel = 'OTC Medicine'
  }

  const ariaLabel =
    classification === 'Rx'
      ? 'Prescription only medicine'
      : classification === 'OTC'
        ? 'Over the counter medicine'
        : undefined

  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-badge border',
        VARIANT_CLASSES[effectiveVariant],
        SIZE_CLASSES[size],
        className,
      )}
      aria-label={ariaLabel}
    >
      {effectiveIcon && (
        <Icon
          name={effectiveIcon}
          size={size === 'sm' ? 12 : 14}
          className="flex-shrink-0"
          aria-hidden="true"
        />
      )}
      <span>{children ?? defaultLabel}</span>
    </span>
  )
}
