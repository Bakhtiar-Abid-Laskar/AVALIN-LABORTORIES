/**
 * StatsBand — verified metrics strip — Avalin Laboratories
 *
 * RULES:
 *   - Only stats with `verified: true` are rendered.
 *   - Unverified placeholder metrics (98%, 100k+, etc.) are never published.
 *   - Uses <CountUp> primitive for animated numeric figures.
 *   - Tabular figures for numbers, Newsreader heading font (no monospace).
 */

import { factualStats, getVerifiedStats } from '@/content/stats'
import { CountUp } from '@/components/ui/CountUp'
import { Container } from '@/components/ui/Container'

export function StatsBand() {
  const verifiedStats = getVerifiedStats(factualStats)

  if (verifiedStats.length === 0) return null

  return (
    <section className="bg-surface-alt border-y border-border py-8 sm:py-12 md:py-16" aria-label="Portfolio metrics">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-8 md:gap-0 divide-x divide-border">
          {verifiedStats.map((stat) => (
            <div key={stat.id} className="text-center px-4 md:px-6">
              {typeof stat.numericValue === 'number' ? (
                <CountUp
                  value={stat.numericValue}
                  suffix={stat.suffix ?? ''}
                  label={stat.label}
                  className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-accent"
                />
              ) : (
                <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-accent metric-value tabular-nums">
                  {stat.value}
                </div>
              )}
              <p className="mt-2 text-sm font-medium text-text-secondary">
                {stat.label}
              </p>
              {stat.description && (
                <p className="mt-1 text-xs text-text-tertiary hidden sm:block">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
