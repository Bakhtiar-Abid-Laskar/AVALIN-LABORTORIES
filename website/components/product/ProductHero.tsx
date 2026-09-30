import { ClassificationBadge } from './ClassificationBadge'
import { ProductGallery } from './ProductGallery'
import type { Classification } from '@/content/types'

interface Props {
  name: string
  classification: Classification
  shortDescription: string
  therapeuticAreaLabel: string
  slug?: string
  oneMgUrl?: string
  images?: string[]
}

export function ProductHero({
  name,
  classification,
  shortDescription,
  therapeuticAreaLabel,
  slug,
  oneMgUrl,
  images,
}: Props) {
  const imageList =
    images && images.length > 0
      ? images
      : slug
      ? [`/products/${slug}/${slug}-01.jpg`]
      : []

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 rounded-card border border-border bg-surface-alt p-6 md:p-8 shadow-sm">
      {imageList.length > 0 && (
        <div className="flex-shrink-0 self-center lg:self-start">
          <ProductGallery images={imageList} productName={name} />
        </div>
      )}

      <div className="flex-1 flex flex-col gap-3.5 min-w-0 w-full">
        <div className="flex flex-wrap items-center gap-3">
          <ClassificationBadge classification={classification} />
          {oneMgUrl && (
            <a
              href={oneMgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-2 min-h-[44px] text-xs font-semibold text-text-secondary hover:text-primary-700 hover:border-primary-300 hover:bg-primary-50 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1"
              title={`View ${name} on Tata 1mg (external site)`}
            >
              <span>View on Tata 1mg (external site)</span>
              <svg className="h-3.5 w-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>

        <h1 className="font-heading text-h1-mobile md:text-h1 font-bold text-primary-900 leading-tight">
          {name}
        </h1>

        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600">
          {therapeuticAreaLabel}
        </p>

        <p className="text-body leading-relaxed text-text-secondary">
          {shortDescription}
        </p>
      </div>
    </div>
  )
}
