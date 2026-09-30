interface Props {
  tips: string[]
}

export function QuickTipsList({ tips }: Props) {
  return (
    <ul className="space-y-3" aria-label="Quick tips">
      {tips.map((tip, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full bg-primary-600 text-white flex items-center justify-center"
            aria-hidden="true"
          >
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
            </svg>
          </span>
          <span className="text-sm leading-relaxed text-text-secondary">{tip}</span>
        </li>
      ))}
    </ul>
  )
}
