import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getProductsByClassification } from '@/lib/products'
import { therapeuticAreaLabels, isFullProduct } from '@/content/types'
import { ClassificationBadge } from '@/components/product/ClassificationBadge'
import { Icon } from '@/components/ui/Icon'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Prescription Medicines (Rx)',
  description:
    'Explore prescription pharmaceuticals marketed by Avalin Laboratories across anti-infectives, gastrointestinal, pain management, hepatoprotective, and critical care.',
  alternates: {
    canonical: '/products/prescription',
  },
}

export default function PrescriptionProductsPage() {
  const rxProducts = getProductsByClassification('Rx').filter(isFullProduct)

  // Group by therapeutic area for clear navigation
  const grouped = rxProducts.reduce<Record<string, typeof rxProducts>>((acc, p) => {
    const area = p.therapeuticArea
    if (!acc[area]) acc[area] = []
    acc[area].push(p)
    return acc
  }, {})

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'Prescription Medicines' },
        ]}
      />
      {/* Hero */}
      <section className="bg-surface border-b border-border py-12 md:py-16">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-text-tertiary">
              <li>
                <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/products" className="hover:text-primary-600 transition-colors">Products</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-text-secondary" aria-current="page">
                Prescription Medicines
              </li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600">
              Formulary & Clinical Portfolio
            </p>
            <ClassificationBadge classification="Rx" size="sm" />
          </div>

          <h1 className="font-heading text-h1-mobile md:text-h1 font-bold text-primary-900">
            Prescription Medicines
          </h1>
          <p className="mt-4 max-w-3xl text-body leading-relaxed text-text-secondary">
            Avalin Laboratories markets {rxProducts.length} prescription formulations
            developed for hospital, clinical, and specialist care settings. All medicines
            in this section require a valid prescription from a registered medical
            practitioner (RMP) and are distributed through licensed pharmaceutical supply
            channels.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/products/catalog"
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
            >
              View Full Catalog Table
            </Link>
            <Link
              href="/products/otc"
              className="rounded-lg border border-border bg-surface-alt px-4 py-2 text-sm font-semibold text-text-secondary hover:text-primary-600 hover:border-primary-300 transition-colors"
            >
              Switch to OTC Products
            </Link>
          </div>
        </div>
      </section>

      {/* Mandatory Statutory Note */}
      <div className="bg-safety-safe-bg/60 border-b border-safety-safe-DEFAULT/20 py-3">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-safety-safe-text flex items-center gap-2">
            <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              <strong>Prescription Medicine Notice (Rx):</strong> Information presented here is intended for
              registered medical practitioners, pharmacists, hospitals, and authorized healthcare distributors. Formulations must be dispensed strictly against a valid medical prescription.
            </span>
          </p>
        </div>
      </div>

      {/* Product List grouped by Therapeutic Area */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 space-y-12">
          {Object.entries(grouped).map(([areaKey, items]) => {
            const label = therapeuticAreaLabels[areaKey as keyof typeof therapeuticAreaLabels] || areaKey
            return (
              <div key={areaKey} className="scroll-mt-8">
                <div className="flex items-center justify-between border-b border-border pb-3 mb-6">
                  <h2 className="font-heading text-h3 font-bold text-primary-900">
                    {label}
                  </h2>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-alt border border-border text-text-secondary">
                    {items.length} {items.length === 1 ? 'Product' : 'Products'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((product) => (
                    <article
                      key={product.slug}
                      className="group rounded-card border border-border bg-surface-alt p-6 hover:shadow-card-hover hover:border-primary-200 transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        {/* Packshot Image */}
                        <div className="relative h-44 w-full rounded-lg bg-surface border border-border/80 mb-4 flex items-center justify-center overflow-hidden">
                          <Image
                            src={`/products/${product.slug}/${product.slug}-01.jpg`}
                            alt={`${product.name} packaging`}
                            fill
                            className="object-contain p-2.5 group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>

                        <div className="flex items-start justify-between gap-2 mb-2">
                          <ClassificationBadge classification="Rx" size="sm" />
                          {product.factBox.therapeuticClass && (
                            <span className="text-[11px] text-text-tertiary text-right truncate max-w-[160px]">
                              {product.factBox.therapeuticClass}
                            </span>
                          )}
                        </div>

                        <h3 className="font-heading text-lg font-bold text-primary-900 group-hover:text-primary-600 transition-colors">
                          <Link href={`/products/${product.slug}`}>
                            {product.name}
                          </Link>
                        </h3>

                        {/* Composition snapshot */}
                        <div className="mt-2.5 text-xs text-primary-700 bg-primary-50/60 rounded px-2 py-1.5 font-mono">
                          {product.composition.map((c) => `${c.ingredient} ${c.strength}`).join(' + ')}
                        </div>

                        <p className="mt-3 text-sm leading-relaxed text-text-secondary line-clamp-3">
                          {product.shortDescription}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-xs gap-3">
                        <Link
                          href={`/products/${product.slug}`}
                          className="font-semibold text-primary-600 hover:text-primary-800 transition-colors inline-flex items-center gap-1.5 min-h-[44px] px-2 py-1 -ml-2 rounded-lg hover:bg-brand-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 group/link"
                        >
                          <span>Details</span>
                          <Icon name="arrow-right" size={12} className="group-hover/link:translate-x-0.5 transition-transform" aria-hidden="true" />
                        </Link>
                        {product.oneMgUrl && (
                          <a
                            href={product.oneMgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 min-h-[44px] text-xs font-medium text-text-secondary hover:text-brand-800 hover:border-brand-400 hover:bg-brand-50/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 whitespace-nowrap"
                            title={`View ${product.name} on Tata 1mg (external site)`}
                          >
                            <span>Tata 1mg</span>
                            <Icon name="external" size={12} className="opacity-70 flex-shrink-0" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Inquiry Callout */}
      <section className="bg-surface-alt border-t border-border py-12">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-h3 font-bold text-primary-900">
            Institutional & Hospital Supply
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm text-text-secondary">
            For institutional rate contracts, tenders, hospital bulk inquiries, or distributor
            stockist appointments, please submit an official inquiry to our commercial team.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/reach-us"
              className="rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-sm"
            >
              Contact Commercial Team
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
