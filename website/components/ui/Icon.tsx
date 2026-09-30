/**
 * <Icon> — Universal icon component — Avalin Laboratories
 *
 * Usage:
 *   <Icon name="arrow-right" size={20} className="text-accent" />
 *   <Icon name="compliance" title="Regulatory Compliance" />
 *
 * Rules:
 *   - All icons are decorative by default (aria-hidden="true").
 *   - Pass `title` to make an icon meaningful for screen readers.
 *   - Default size: 20px
 *   - All colours via `className` (e.g. "text-primary-600").
 */

import PATHS, { type IconName, type IconProps } from '@/lib/icons/registry'

export type { IconName }

export function Icon({
  name,
  size = 20,
  className,
  title,
  'aria-hidden': ariaHidden,
}: IconProps & { name: IconName }) {
  const isDecorative = !title
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden ?? (isDecorative ? 'true' : undefined)}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      {PATHS[name]}
    </svg>
  )
}
