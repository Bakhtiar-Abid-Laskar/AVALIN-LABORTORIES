/**
 * Container — layout primitive — Avalin Laboratories
 *
 * Centres content with the site's canonical max-width and horizontal padding.
 * Use this instead of `mx-auto max-w-content px-4 sm:px-6 lg:px-8` everywhere.
 *
 * Usage:
 *   <Container>...</Container>
 *   <Container as="article" className="py-12">...</Container>
 *   <Container narrow>...</Container>  // max-w-reading for prose
 */

import { cn } from '@/lib/utils'
import type { ElementType, ComponentPropsWithRef } from 'react'

type ContainerProps<T extends ElementType = 'div'> = {
  /** Render as any HTML element. Defaults to `div`. */
  as?: T
  /** Use max-w-reading (65ch) instead of max-w-content */
  narrow?: boolean
  className?: string
  children: React.ReactNode
} & Omit<ComponentPropsWithRef<T>, 'as' | 'narrow' | 'className' | 'children'>

export function Container<T extends ElementType = 'div'>({
  as,
  narrow = false,
  className,
  children,
  ...rest
}: ContainerProps<T>) {
  const Tag = (as ?? 'div') as ElementType
  return (
    <Tag
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        narrow ? 'max-w-reading' : 'max-w-content',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
