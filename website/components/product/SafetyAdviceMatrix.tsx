import type { SafetyAdvice, SafetyRating } from '@/content/types'
import { safetyRatingLabels } from '@/content/types'

interface Props {
  safetyAdvice: SafetyAdvice
}

// Tailwind classes for each rating — always paired with text label
const ratingStyles: Record<SafetyRating, { chip: string; dot: string }> = {
  'safe':               { chip: 'bg-safety-safe-bg text-safety-safe-text',                       dot: 'bg-safety-safe' },
  'safe-if-prescribed': { chip: 'bg-safety-safe-if-prescribed-bg text-safety-safe-if-prescribed-text', dot: 'bg-safety-safe-if-prescribed' },
  'caution':            { chip: 'bg-safety-caution-bg text-safety-caution-text',                 dot: 'bg-safety-caution' },
  'consult-doctor':     { chip: 'bg-safety-consult-doctor-bg text-safety-consult-doctor-text',   dot: 'bg-safety-consult-doctor' },
  'unsafe':             { chip: 'bg-safety-unsafe-bg text-safety-unsafe-text',                   dot: 'bg-safety-unsafe' },
}

const categoryMeta: {
  key: keyof SafetyAdvice
  label: string
  icon: React.ReactNode
}[] = [
  {
    key: 'alcohol',
    label: 'Alcohol',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3h7.5l-2.25 9h3l-6 9 1.5-9H9l-.75-9z" />
      </svg>
    ),
  },
  {
    key: 'pregnancy',
    label: 'Pregnancy',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <circle cx="12" cy="8" r="3" />
        <path strokeLinecap="round" d="M12 11c-3 0-5 2.5-5 5h10c0-2.5-2-5-5-5z" />
        <path strokeLinecap="round" d="M12 14v4" />
      </svg>
    ),
  },
  {
    key: 'breastfeeding',
    label: 'Breastfeeding',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <circle cx="12" cy="7" r="3" />
        <path strokeLinecap="round" d="M9 13h6m-3 0v6" />
        <circle cx="8" cy="17" r="1.5" />
      </svg>
    ),
  },
  {
    key: 'driving',
    label: 'Driving',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    key: 'kidney',
    label: 'Kidney',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" d="M7 9C5 9 4 11 4 13c0 2.5 1.5 5 3 5s2-1.5 2-3V9zM17 9c2 0 3 2 3 4 0 2.5-1.5 5-3 5s-2-1.5-2-3V9z" />
      </svg>
    ),
  },
  {
    key: 'liver',
    label: 'Liver',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" d="M4 12c0-4 3-7 8-7s8 3 8 7c0 3-2 5-4 6l-4 1-4-1c-2-1-4-3-4-6z" />
      </svg>
    ),
  },
]

function SafetyCard({
  label,
  icon,
  rating,
  note,
}: {
  label: string
  icon: React.ReactNode
  rating: SafetyRating
  note: string
}) {
  const styles = ratingStyles[rating]

  return (
    <div className="rounded-card border border-border bg-surface-alt p-4 flex flex-col gap-3">
      {/* Icon + label */}
      <div className="flex items-center gap-2 text-text-secondary">
        {icon}
        <span className="text-sm font-semibold text-text-primary">{label}</span>
      </div>

      {/* Rating chip — ALWAYS has text label, never color alone */}
      <span
        className={`safety-chip w-fit ${styles.chip}`}
        role="status"
        aria-label={`${label} safety rating: ${safetyRatingLabels[rating]}`}
      >
        <span className={`inline-block h-1.5 w-1.5 rounded-full ${styles.dot}`} aria-hidden="true" />
        {safetyRatingLabels[rating]}
      </span>

      {/* Note */}
      <p className="text-xs leading-relaxed text-text-secondary">{note}</p>
    </div>
  )
}

export function SafetyAdviceMatrix({ safetyAdvice }: Props) {
  return (
    <section aria-labelledby="safety-advice-heading">
      <h2 id="safety-advice-heading" className="sr-only">
        Safety Advice
      </h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        role="list"
        aria-label="Safety advice by category"
      >
        {categoryMeta.map(({ key, label, icon }) => (
          <div key={key} role="listitem">
            <SafetyCard
              label={label}
              icon={icon}
              rating={safetyAdvice[key].rating}
              note={safetyAdvice[key].note}
            />
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 rounded-lg bg-surface p-3 border border-border">
        <p className="w-full text-xs font-medium text-text-secondary mb-1">Rating key:</p>
        {(Object.keys(safetyRatingLabels) as SafetyRating[]).map((rating) => (
          <span key={rating} className={`safety-chip ${ratingStyles[rating].chip}`}>
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${ratingStyles[rating].dot}`} aria-hidden="true" />
            {safetyRatingLabels[rating]}
          </span>
        ))}
      </div>
    </section>
  )
}
