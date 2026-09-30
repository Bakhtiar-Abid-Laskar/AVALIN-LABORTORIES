import type { Composition } from '@/content/types'

interface Props {
  composition: Composition[]
}

export function CompositionTable({ composition }: Props) {
  return (
    <div className="overflow-hidden rounded-card border border-border">
      <table className="w-full text-sm" role="table" aria-label="Product composition">
        <thead>
          <tr className="border-b border-border bg-primary-50">
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-primary-600"
            >
              Active Ingredient
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-primary-600"
            >
              Strength
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-surface-alt">
          {composition.map((item, i) => (
            <tr
              key={i}
              className={i % 2 === 1 ? 'bg-surface-muted' : ''}
            >
              <td className="px-4 py-3 font-medium text-text-primary">
                {item.ingredient}
              </td>
              <td className="px-4 py-3 text-right font-mono text-sm tabular-nums text-text-secondary composition-strength">
                {item.strength}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
