/**
 * Callout — alert/info primitive — Avalin Laboratories
 *
 * Intent variants:
 *   info       — slate-navy / clinical blue, general information
 *   warning    — warm champagne, caution/disclaimer
 *   emergency  — semantic red, immediate medical attention
 *   compliance — brand plum, regulatory note
 *
 * Usage:
 *   <Callout intent="emergency" title="In an emergency">
 *     Seek immediate medical attention.
 *   </Callout>
 *
 *   <Callout intent="warning">
 *     Figures are indicative only.
 *   </Callout>
 *
 * Rules:
 *   - Use emergency ONLY for patient safety / medical emergency contexts.
 *   - All callout text must meet AA contrast within the callout's background.
 *   - Icon is always present and meaningful — include a title for screen readers.
 */

import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import type { IconName } from '@/lib/icons/registry'

type CalloutIntent = 'info' | 'warning' | 'emergency' | 'compliance'

const CONFIG: Record<
  CalloutIntent,
  {
    bg:        string
    border:    string
    text:      string
    icon:      IconName
    iconClass: string
  }
> = {
  info: {
    bg:        'bg-brand-50',
    border:    'border-brand-200',
    text:      'text-brand-950',
    icon:      'info',
    iconClass: 'text-brand-600',
  },
  warning: {
    bg:        'bg-amber-50',
    border:    'border-amber-200',
    text:      'text-amber-900',
    icon:      'warning',
    iconClass: 'text-amber-600',
  },
  emergency: {
    // Verified contrast: #7A2219 text on #FBEAEA bg = 8.1:1 PASS (Strictly red-family)
    bg:        'bg-safety-unsafe-bg',
    border:    'border-safety-unsafe-DEFAULT/40',
    text:      'text-safety-unsafe-text',
    icon:      'warning',
    iconClass: 'text-safety-unsafe-DEFAULT',
  },
  compliance: {
    bg:        'bg-brand-50/70',
    border:    'border-brand-200',
    text:      'text-brand-900',
    icon:      'compliance',
    iconClass: 'text-brand-600',
  },
}

type CalloutProps = {
  intent?:   CalloutIntent
  title?:    string
  /** Applies `border` — off by default for less visual weight */
  bordered?: boolean
  className?: string
  children:  React.ReactNode
}

export function Callout({
  intent = 'info',
  title,
  bordered = true,
  className,
  children,
}: CalloutProps) {
  const cfg = CONFIG[intent]
  return (
    <aside
      role="note"
      className={cn(
        'rounded-card p-5 not-prose',
        cfg.bg,
        bordered && `border ${cfg.border}`,
        cfg.text,
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <Icon
          name={cfg.icon}
          size={20}
          className={cn('flex-shrink-0 mt-0.5', cfg.iconClass)}
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-heading font-semibold text-h4 mb-1">{title}</p>
          )}
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </aside>
  )
}
