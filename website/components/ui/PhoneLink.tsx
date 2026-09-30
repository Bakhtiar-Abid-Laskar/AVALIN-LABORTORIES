import type { ReactNode } from 'react'
import { contacts } from '@/lib/site-config'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'

export interface PhoneLinkProps {
  className?: string
  showIcon?: boolean
  iconSize?: number
  iconClassName?: string
  children?: ReactNode
}

/**
 * Server-rendered tap-to-call phone link.
 * Guarantees a valid, canonical tel: protocol href (+917002322615).
 */
export function PhoneLink({
  className,
  showIcon = false,
  iconSize = 14,
  iconClassName,
  children,
}: PhoneLinkProps) {
  return (
    <a
      href={`tel:${contacts.phoneRaw}`}
      className={cn('inline-flex items-center gap-1.5 font-mono', className)}
    >
      {showIcon && (
        <Icon
          name="phone"
          size={iconSize}
          className={cn('flex-shrink-0', iconClassName)}
          aria-hidden="true"
        />
      )}
      <span>{children ?? contacts.phone}</span>
    </a>
  )
}
