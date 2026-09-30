import Link from 'next/link'

interface Props {
  productName: string
  productSlug: string
}

export function RequestInfoCTA({ productName, productSlug: _productSlug }: Props) {
  // Pre-fill parameter for Reach Us page
  const reachUsUrl = `/reach-us?product=${encodeURIComponent(productName)}`

  return (
    <div className="rounded-card border border-primary-100 bg-primary-50 p-6 sm:p-8 text-center sm:text-left">
      <div className="sm:flex sm:items-center sm:justify-between gap-6">
        <div>
          <h3 className="font-heading text-h4 font-bold text-primary-900 mb-2">
            Need more information about {productName}?
          </h3>
          <p className="text-sm text-text-secondary max-w-md">
            Our team can provide detailed product information, documentation, and
            support for healthcare professionals and distribution partners.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex-shrink-0">
          <Link
            href={reachUsUrl}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-cta hover:bg-accent-hover transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Request Information
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
