import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getProductsByClassification } from '@/lib/products'
import { therapeuticAreaLabels, isLightProduct } from '@/content/types'
import { ClassificationBadge } from '@/components/product/ClassificationBadge'
import { Icon } from '@/components/ui/Icon'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Over-the-Counter (OTC) Products',
  description:
    'Discover over-the-counter health formulations by Avalin Laboratories, including digestive health solutions and nutritional multivitamin supplements.',
  alternates: {
    canonical: '/products/otc',
  },
}

export default function OtcProductsPage() {
  const otcProducts = getProductsByClassification('OTC').filter(isLightProduct)

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'OTC Products' },
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
                OTC Products
              </li>
            </ol>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600">
              Wellness & Non-Prescription Portfolio
            </p>
            <ClassificationBadge classification="OTC" size="sm" />
          </div>

          <h1 className="font-heading text-h1-mobile md:text-h1 font-bold text-primary-900">
            Over-the-Counter (OTC) Products
          </h1>
          <p className="mt-4 max-w-3xl text-body leading-relaxed text-text-secondary">
            Avalin Laboratories offers clinically formulated over-the-counter products designed
            for digestive comfort, dietary balance, and everyday nutritional support. These
            products meet strict quality benchmarks and are distributed through retail pharmacies
            and healthcare stockists across India.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/products/catalog"
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
            >
              Full Product Catalog
            </Link>
            <Link
              href="/products/prescription"
              className="rounded-lg border border-border bg-surface-alt px-4 py-2 text-sm font-semibold text-text-secondary hover:text-primary-600 hover:border-primary-300 transition-colors"
            >
              View Prescription Medicines
            </Link>
          </div>
        </div>
      </section>

      {/* Advisory Bar */}
      <div className="bg-surface-muted border-b border-border py-3">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-text-secondary flex items-center gap-2">
            <span className="font-semibold text-primary-900">Consumer Note:</span>
            While OTC products do not require a prescription, users should always read packaging labels carefully and consult a pharmacist or doctor if symptoms persist.
          </p>
        </div>
      </div>

      {/* OTC Category Cards */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <div className="border-b border-border pb-3 mb-8 flex items-center justify-between">
            <h2 className="font-heading text-h3 font-bold text-primary-900">
              Active Formulations
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-alt border border-border text-text-secondary">
              {otcProducts.length} Formulations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otcProducts.map((product) => {
              const areaLabel = therapeuticAreaLabels[product.therapeuticArea] || product.therapeuticArea
              const imageSrc = `/products/${product.slug}/${product.slug}-01.jpg`
              return (
                <article
                  key={product.slug}
                  className="rounded-card border border-border bg-surface-alt p-6 md:p-8 hover:shadow-card-hover hover:border-primary-200 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Packshot Image */}
                    <div className="relative h-56 w-full rounded-lg bg-surface border border-border/80 mb-5 flex items-center justify-center overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={`${product.name} packaging`}
                        fill
                        className="object-contain p-4 hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                        {areaLabel}
                      </span>
                      <ClassificationBadge classification="OTC" size="sm" />
                    </div>

                    <h3 className="font-heading text-xl font-bold text-primary-900">
                      <Link href={`/products/${product.slug}`} className="hover:text-primary-600 transition-colors">
                        {product.name}
                      </Link>
                    </h3>

                    {/* Key Ingredients pill list */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {product.keyIngredients.map((ing, idx) => (
                        <span key={idx} className="rounded-md bg-primary-50 px-2.5 py-1 text-xs font-mono text-primary-700">
                          {ing}
                        </span>
                      ))}
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                      {product.shortDescription}
                    </p>

                    {/* Key Benefits */}
                    {product.keyBenefits && product.keyBenefits.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-3">
                          Key Clinical Indications
                        </h4>
                        <ul className="space-y-2">
                          {product.keyBenefits.slice(0, 3).map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs text-text-secondary">
                              <svg className="h-4 w-4 text-primary-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-5 border-t border-border flex items-center justify-between gap-3">
                    <span className="text-xs text-text-tertiary">
                      Storage: <strong className="text-text-secondary">{product.storage || 'Room temperature'}</strong>
                    </span>

                    <div className="flex items-center gap-3">
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

                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors min-h-[44px] px-2 py-1 rounded-lg hover:bg-brand-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 group/link"
                      >
                        <span>Read full profile</span>
                        <Icon name="arrow-right" size={12} className="group-hover/link:translate-x-0.5 transition-transform" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Distribution inquiry */}
      <section className="bg-surface-alt border-t border-border py-12">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-h3 font-bold text-primary-900">
            Pharmacy Retail & Wholesaler Distribution
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm text-text-secondary">
            Avalin Laboratories partners with verified regional distributors and retail pharmacies
            across the country. Contact our distribution team for product catalog stock availability.
          </p>
          <div className="mt-6">
            <Link
              href="/reach-us"
              className="rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-sm inline-block"
            >
              Inquire for Pharmacy Stocking
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
