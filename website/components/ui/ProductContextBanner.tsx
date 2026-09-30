'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

/**
 * Reads ?product= from the URL and renders a context strip above the
 * inquiry form so the user knows their product inquiry is pre-noted.
 * Renders nothing when no product param is present.
 */
export function ProductContextBanner() {
  const params = useSearchParams()
  const productName = params.get('product')

  if (!productName) return null

  return (
    <div
      className="mb-6 flex items-start gap-3 rounded-card border border-primary-200 bg-primary-50 px-5 py-4"
      role="status"
      aria-live="polite"
    >
      {/* Tag icon */}
      <div className="flex-shrink-0 mt-0.5 text-primary-600">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L8.659 3.659A2.25 2.25 0 0 0 7.068 3h-1.5z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 6h.008v.008H6V6z" />
        </svg>
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-primary-900">
          Inquiry pre-noted for:{' '}
          <span className="font-bold">{decodeURIComponent(productName)}</span>
        </p>
        <p className="mt-0.5 text-xs text-text-secondary">
          Please mention this product in the form below so our team can respond accurately.
        </p>
      </div>

      {/* Link back to product */}
      <Link
        href="/products"
        className="flex-shrink-0 text-xs font-semibold text-primary-600 hover:text-primary-800 hover:underline whitespace-nowrap"
        aria-label="Browse all products"
      >
        Browse products
      </Link>
    </div>
  )
}
