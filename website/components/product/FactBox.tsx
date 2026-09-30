import type { FactBox as FactBoxType } from '@/content/types'

interface Props {
  factBox: FactBoxType
}

export function FactBox({ factBox }: Props) {
  const entries = [
    { label: 'Habit Forming',      value: factBox.habitForming      },
    { label: 'Therapeutic Class',  value: factBox.therapeuticClass  },
    ...(factBox.chemicalClass ? [{ label: 'Chemical Class', value: factBox.chemicalClass }] : []),
    ...(factBox.actionClass    ? [{ label: 'Action Class',  value: factBox.actionClass   }] : []),
  ]

  return (
    <div
      id="fact-box"
      className="rounded-card border border-border bg-primary-50 p-5 scroll-mt-24"
      aria-label="Fact box"
    >
      <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-primary-600">
        Fact Box
      </h3>
      <dl className="space-y-3">
        {entries.map(({ label, value }) => (
          <div key={label} className="flex flex-col sm:flex-row sm:gap-4">
            <dt className="text-xs font-semibold text-text-secondary min-w-[9rem]">
              {label}
            </dt>
            <dd className="text-sm font-medium text-text-primary fact-value mt-0.5 sm:mt-0">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
