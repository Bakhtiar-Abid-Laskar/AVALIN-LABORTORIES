/**
 * Stats content module — Avalin Laboratories
 *
 * Each stat has a `verified` boolean.
 * RULE: Only stats with `verified: true` may be displayed in the UI.
 * Count-up animation is only applied to verified stats.
 *
 * NOTE: All four operational metrics are currently UNVERIFIED.
 *    The stats band will not render until at least one is verified.
 *    Verified factual alternatives are provided below.
 */

export interface Stat {
  id:          string
  value:       string
  /** Numeric value for count-up animation (optional) */
  numericValue?: number
  suffix?:     string
  label:       string
  /** true = client has confirmed this figure for publication */
  verified:    boolean
  /** Short description for screen readers */
  description?: string
}

// ─── Unverified operational metrics ────────────────────────────────────────
// These must NOT render until `verified` is set to true by client.
export const operationalStats: Stat[] = [
  {
    id:           'generic-portfolio',
    value:        '98%',
    numericValue: 98,
    suffix:       '%',
    label:        'Generic portfolio',
    verified:     false,
    description:  'Percentage of portfolio that is generic formulations',
  },
  {
    id:           'medicines-distributed',
    value:        '100k+',
    label:        'Medicines distributed',
    verified:     false,
    description:  'Total medicines distributed to date',
  },
  {
    id:           'manufacturing-plants',
    value:        '10+',
    label:        'Manufacturing plants',
    verified:     false,
    description:  'Number of partner manufacturing plants',
  },
  {
    id:           'employees',
    value:        '1,000+',
    label:        'Employees',
    verified:     false,
    description:  'Number of employees across operations',
  },
]

// ─── Verified factual stats (derived from data — safe to show) ─────────────
// These are derived directly from the product data file and are factual.
export const factualStats: Stat[] = [
  {
    id:           'therapeutic-areas',
    value:        '6',
    numericValue:  6,
    label:        'Therapeutic areas',
    verified:     true,
    description:  'Key therapeutic areas covered by Avalin portfolio',
  },
  {
    id:           'product-formulations',
    value:        '13+',
    numericValue:  13,
    suffix:       '+',
    label:        'Product formulations',
    verified:     true,
    description:  'Total pharmaceutical formulations in the portfolio',
  },
  {
    id:           'hq-location',
    value:        'Guwahati',
    label:        'Headquarters',
    verified:     true,
    description:  'Headquartered in Guwahati, Assam',
  },
  {
    id:           'classification-mix',
    value:        'Rx + OTC',
    label:        'Portfolio classification',
    verified:     true,
    description:  'Portfolio spans both prescription and OTC medicines',
  },
]

/** Returns only verified stats from a given array */
export function getVerifiedStats(stats: Stat[]): Stat[] {
  return stats.filter((s) => s.verified)
}
