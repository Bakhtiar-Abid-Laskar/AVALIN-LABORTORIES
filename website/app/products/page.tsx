import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllProducts } from '@/lib/products'
import therapeuticAreas from '@/content/therapeutic-areas'
import { therapeuticAreaLabels } from '@/content/types'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Eyebrow, SectionHeading } from '@/components/ui/Heading'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { CatalogTable } from '@/components/product/CatalogTable'
import { ProductsSectionBar } from '@/components/product/ProductsSectionBar'
import { IllustratedIcon, type IllustratedIconName } from '@/components/pharma'
import { GlobalCta } from '@/components/layout/GlobalCta'
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Our Products | Pharmaceutical Portfolio & Catalog',
  description:
    'Explore the complete Avalin Laboratories product portfolio — 13 formulations across 6 therapeutic areas, including 11 prescription (Rx) medicines, 2 OTC healthcare products, interactive catalog, and therapeutic area index.',
  alternates: {
    canonical: '/products',
  },
}

export default function ProductsPage() {
  const products = getAllProducts()
  const rxProducts = products.filter((p) => p.classification === 'Rx')
  const otcProducts = products.filter((p) => p.classification === 'OTC')

  const sectionCounts = {
    total: products.length,
    rx: rxProducts.length,
    otc: otcProducts.length,
    ta: therapeuticAreas.length,
  }

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Products' }]} />
      {/* ─── SECTION 1: OVERVIEW (HERO DIRECTLY UNDER SITE HEADER) ─────── */}
      <section
        id="overview"
        className="relative bg-brand-950 text-white border-b border-brand-900/60 py-16 md:py-24 scroll-mt-28 overflow-hidden"
      >
        {/* Hero Photo — right side, fades left to transparent */}
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-[55%] pointer-events-none"
          aria-hidden="true"
        >
          <Image
            src="/hero/products-medicine.jpg"
            alt="Assorted pharmaceutical tablets and capsules — Avalin Laboratories product range"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: 'center 45%' }}
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          {/* Left fade: brand-950 → transparent */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, var(--color-brand-950) 0%, var(--color-brand-950) 10%, color-mix(in srgb, var(--color-brand-950) 80%, transparent) 40%, color-mix(in srgb, var(--color-brand-950) 28%, transparent) 65%, transparent 100%)',
            }}
          />
          {/* Top/bottom vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 20%, transparent 78%, rgba(0,0,0,0.5) 100%)',
            }}
          />
        </div>

        <Container className="relative z-10">
          <div className="max-w-[50%] max-lg:max-w-full">
            <Eyebrow dark className="mb-3">
              Commercial &amp; Hospital Formulary
            </Eyebrow>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-display font-bold text-white tracking-tight">
              Our Products
            </h1>
            <p className="mt-4 text-base sm:text-lg text-brand-100 leading-relaxed max-w-lg">
              Avalin Laboratories markets an evidence-based portfolio of {products.length}{' '}
              pharmaceutical formulations across {therapeuticAreas.length} therapeutic disciplines.
              Manufactured in cGMP-compliant partner facilities, our range includes{' '}
              {rxProducts.length} prescription medications for clinical institutions and{' '}
              {otcProducts.length} over-the-counter wellness formulations.
            </p>

            {/* Metric chips */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-900/60 backdrop-blur-sm px-4 py-2 text-xs font-semibold text-brand-100">
                <span className="text-base font-bold text-white font-serif">{products.length}</span>
                <span>Total Formulations</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-900/60 backdrop-blur-sm px-4 py-2 text-xs font-semibold text-brand-100">
                <span className="text-base font-bold text-white font-serif">{rxProducts.length}</span>
                <span>Prescription (Rx)</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-900/60 backdrop-blur-sm px-4 py-2 text-xs font-semibold text-brand-100">
                <span className="text-base font-bold text-accent-champagne font-serif">{otcProducts.length}</span>
                <span>OTC Products</span>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <Button as="a" href="#catalog" variant="primary" icon={<Icon name="arrow-right" size={14} />}>
                Explore Product Catalog
              </Button>
              <a
                href="/avalin-product-formulary-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-brand-300/40 bg-brand-800/40 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800/80 hover:border-brand-200/80 transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Icon name="download" size={15} />
                <span>Download Formulary PDF</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── STICKY IN-PAGE SECTION NAVIGATION (BELOW HERO) ─────────────── */}
      <ProductsSectionBar counts={sectionCounts} />

      {/* ─── MEDICAL DISCLAIMER BAR ────────────────────────────────────── */}
      <div className="bg-surface-muted border-b border-border py-3">
        <Container>
          <p className="text-xs text-text-tertiary">
            <span className="font-semibold text-text-secondary">Medical disclaimer:</span>{' '}
            Product information on this site is for healthcare professionals, institutions, and distributors.
            It is not a substitute for professional medical advice. Rx medicines require a valid
            prescription from a registered medical practitioner.
          </p>
        </Container>
      </div>

      {/* ─── SECTION 2: PRESCRIPTION MEDICINES (RX) ─────────────────────── */}
      <Section id="prescription" surface="default" className="border-b border-border scroll-mt-32">
        <Container>
          <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <Eyebrow>Schedule H &amp; Ethical Formulations</Eyebrow>
                <Badge classification="Rx" size="sm" />
              </div>
              <h2 className="font-heading text-h2-mobile md:text-h2 font-bold text-primary-900">
                Prescription Medicines
              </h2>
              <p className="mt-2 text-sm text-text-secondary max-w-2xl leading-relaxed">
                Formulations requiring a valid prescription from a registered medical practitioner,
                manufactured in compliance with cGMP standards for hospital and clinical administration.
              </p>
            </div>

            <span className="text-xs font-semibold text-text-tertiary bg-surface-alt px-3 py-1.5 rounded-full border border-border">
              {rxProducts.length} Formulations
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rxProducts.map((product) => {
              const imageSrc = `/products/${product.slug}/${product.slug}-01.jpg`
              return (
                <Card
                  key={product.slug}
                  className="group p-5 bg-surface-alt border border-border hover:shadow-card-hover hover:border-primary-200 transition-all duration-base flex flex-col justify-between"
                >
                  <div>
                    {/* Packshot Image */}
                    <div className="relative h-48 w-full rounded-lg bg-surface border border-border/80 mb-4 flex items-center justify-center overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={`${product.name} packaging`}
                        fill
                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-base"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-xs text-primary-600 font-medium">
                        {therapeuticAreaLabels[product.therapeuticArea]}
                      </p>
                      <Badge classification="Rx" size="sm" />
                    </div>

                    <h3 className="font-heading text-lg font-bold text-primary-900 group-hover:text-primary-600 transition-colors">
                      <Link href={`/products/${product.slug}`}>{product.name}</Link>
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-3">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Actions: Details & External Tata 1mg */}
                  <div className="mt-5 pt-3.5 border-t border-border flex items-center justify-between gap-3 text-xs">
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-semibold text-primary-600 hover:text-primary-800 transition-colors inline-flex items-center gap-1.5 min-h-[44px] px-2 py-1 -ml-2 rounded-lg hover:bg-brand-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 group/link"
                    >
                      <span>View details</span>
                      <Icon
                        name="arrow-right"
                        size={12}
                        className="group-hover/link:translate-x-0.5 transition-transform"
                        aria-hidden="true"
                      />
                    </Link>

                    {product.oneMgUrl && (
                      <a
                        href={product.oneMgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 min-h-[44px] text-xs font-medium text-text-secondary hover:text-brand-800 hover:border-brand-400 hover:bg-brand-50/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 whitespace-nowrap"
                        title={`View ${product.name} on Tata 1mg (external site)`}
                      >
                        <span className="whitespace-nowrap">Tata 1mg</span>
                        <Icon name="external" size={12} className="opacity-70 flex-shrink-0" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* ─── SECTION 3: OTC PRODUCTS ────────────────────────────────────── */}
      <Section id="otc" surface="alt" className="border-b border-border scroll-mt-32">
        <Container>
          <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <Eyebrow>Direct Healthcare &amp; Wellness</Eyebrow>
                <Badge classification="OTC" size="sm" />
              </div>
              <h2 className="font-heading text-h2-mobile md:text-h2 font-bold text-primary-900">
                OTC Products
              </h2>
              <p className="mt-2 text-sm text-text-secondary max-w-2xl leading-relaxed">
                Over-the-counter formulations and nutritional supplements developed for everyday digestive,
                metabolic, and immune health, accessible without requiring a prescription.
              </p>
            </div>

            <span className="text-xs font-semibold text-text-tertiary bg-surface-alt px-3 py-1.5 rounded-full border border-border">
              {otcProducts.length} Formulations
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otcProducts.map((product) => {
              const imageSrc = `/products/${product.slug}/${product.slug}-01.jpg`
              return (
                <Card
                  key={product.slug}
                  className="group p-5 bg-surface-alt border border-border hover:shadow-card-hover hover:border-primary-200 transition-all duration-base flex flex-col justify-between"
                >
                  <div>
                    {/* Packshot Image */}
                    <div className="relative h-48 w-full rounded-lg bg-surface border border-border/80 mb-4 flex items-center justify-center overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={`${product.name} packaging`}
                        fill
                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-base"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-xs text-accent font-medium">
                        {therapeuticAreaLabels[product.therapeuticArea]}
                      </p>
                      <Badge classification="OTC" size="sm" />
                    </div>

                    <h3 className="font-heading text-lg font-bold text-primary-900 group-hover:text-primary-600 transition-colors">
                      <Link href={`/products/${product.slug}`}>{product.name}</Link>
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-3">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Actions: Details & External Tata 1mg */}
                  <div className="mt-5 pt-3.5 border-t border-border flex items-center justify-between gap-3 text-xs">
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-semibold text-primary-600 hover:text-primary-800 transition-colors inline-flex items-center gap-1.5 min-h-[44px] px-2 py-1 -ml-2 rounded-lg hover:bg-brand-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 group/link"
                    >
                      <span>View details</span>
                      <Icon
                        name="arrow-right"
                        size={12}
                        className="group-hover/link:translate-x-0.5 transition-transform"
                        aria-hidden="true"
                      />
                    </Link>

                    {product.oneMgUrl && (
                      <a
                        href={product.oneMgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 min-h-[44px] text-xs font-medium text-text-secondary hover:text-brand-800 hover:border-brand-400 hover:bg-brand-50/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 whitespace-nowrap"
                        title={`View ${product.name} on Tata 1mg (external site)`}
                      >
                        <span className="whitespace-nowrap">Tata 1mg</span>
                        <Icon name="external" size={12} className="opacity-70 flex-shrink-0" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* ─── SECTION 4: PRODUCT CATALOG ─────────────────────────────────── */}
      <Section id="catalog" surface="default" className="border-b border-border scroll-mt-32">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <SectionHeading
              eyebrow="Interactive Database"
              title="Product Catalog"
              textMaxWidth="max-w-2xl"
            >
              Search, filter, and inspect the complete formulary database. Filter by therapeutic area
              or classification, or search by brand name and active pharmaceutical ingredients (APIs).
            </SectionHeading>

            <div className="shrink-0 flex items-center gap-3">
              <a
                href="/avalin-product-formulary-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-primary-700 hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                <Icon name="file-text" size={14} />
                <span>PDF Formulary (35 KB)</span>
              </a>
            </div>
          </div>

          <CatalogTable products={products} />
        </Container>
      </Section>

      {/* ─── SECTION 5: THERAPEUTIC AREAS ───────────────────────────────── */}
      <Section id="therapeutic-areas" surface="alt" className="scroll-mt-32">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <SectionHeading
              eyebrow="Specialized Disciplines"
              title="Therapeutic Areas"
              textMaxWidth="max-w-2xl"
            >
              Our pharmaceutical portfolio addresses acute hospital needs, chronic disease management,
              and essential preventative wellness across six specialized medical categories.
            </SectionHeading>

            <Button as={Link} href="/therapeutic-areas" variant="secondary" icon={<Icon name="arrow-right" size={14} />}>
              Dedicated Therapeutic Index
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapeuticAreas.map((area) => {
              const matchingProducts = products.filter((p) => p.therapeuticArea === area.id)
              return (
                <Card
                  key={area.id}
                  className="p-6 bg-surface border border-border hover:shadow-card-hover hover:border-primary-300 transition-all duration-base flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-xl bg-brand-50 border border-brand-200 flex items-center justify-center">
                        <IllustratedIcon name={area.id as IllustratedIconName} size={40} />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-alt border border-border text-text-secondary">
                        {matchingProducts.length} {matchingProducts.length === 1 ? 'Product' : 'Products'}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-brand-950 mb-2">
                      <Link
                        href={`/therapeutic-areas#${area.id}`}
                        className="hover:text-brand-700 transition-colors"
                      >
                        {area.label}
                      </Link>
                    </h3>

                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                      {area.description}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-2 font-mono">
                      Key Formulations:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {matchingProducts.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/products/${p.slug}`}
                          className="text-xs px-2.5 py-1 rounded-lg bg-surface-alt border border-brand-200/80 text-brand-800 hover:border-brand-400 hover:text-brand-950 transition-colors"
                        >
                          {p.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Global Partnership Call to Action */}
      <GlobalCta />
    </>
  )
}
