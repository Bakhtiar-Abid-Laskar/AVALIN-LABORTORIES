import type { Metadata } from 'next'
import { getAllProducts } from '@/lib/products'
import { CatalogTable } from '@/components/product/CatalogTable'
import Link from 'next/link'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Product Catalog',
  description:
    'Complete Avalin Laboratories product catalog — all 13 pharmaceutical products with composition, therapeutic area, and classification.',
  alternates: {
    canonical: '/products/catalog',
  },
}

export default function ProductCatalogPage() {
  const products = getAllProducts()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'Product Catalog' },
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
                Catalog
              </li>
            </ol>
          </nav>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-600">
            Formulary Database
          </p>
          <h1 className="font-heading text-h1-mobile md:text-h1 font-bold text-primary-900">
            Pharmaceutical Product Catalog
          </h1>
          <p className="mt-3 text-body text-text-secondary max-w-2xl leading-relaxed">
            Search and filter Avalin Laboratories&apos; active marketed formulations. Select any
            product to view active ingredients, pharmacological mechanism, clinical indications,
            and safety matrices.
          </p>
        </div>
      </section>

      {/* Catalog Search & Table Section */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <CatalogTable products={products} />

          {/* Need more information callout */}
          <div className="mt-12 rounded-card border border-border bg-surface p-6 sm:p-8 text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-lg font-bold text-primary-900 mb-2">
              Looking for Institutional Supply or Tenders?
            </h2>
            <p className="text-sm text-text-secondary mb-5">
              Contact our sales and distribution team for bulk hospital ordering, batch availability,
              and authorized distributor stockist allocations.
            </p>
            <Link
              href="/reach-us"
              className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-primary-700 transition-colors"
            >
              Submit Commercial Inquiry →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
