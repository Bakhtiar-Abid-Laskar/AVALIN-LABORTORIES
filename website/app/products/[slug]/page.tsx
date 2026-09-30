import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllProductSlugs, getProductBySlug } from '@/lib/products'
import { isFullProduct, therapeuticAreaLabels } from '@/content/types'
import Link from 'next/link'
import { ProductHero }         from '@/components/product/ProductHero'
import { CompositionTable }    from '@/components/product/CompositionTable'
import { SafetyAdviceMatrix }  from '@/components/product/SafetyAdviceMatrix'
import { FactBox }             from '@/components/product/FactBox'
import { QuickTipsList }       from '@/components/product/QuickTipsList'
import { ManufacturerBlock }   from '@/components/product/ManufacturerBlock'
import { RequestInfoCTA }      from '@/components/product/RequestInfoCTA'
import { ClassificationBadge } from '@/components/product/ClassificationBadge'
import { PackagingGrid }       from '@/components/product/PackagingGrid'
import { ProductAnchorNav }    from '@/components/product/ProductAnchorNav'
import { Icon }                from '@/components/ui/Icon'
import { company }             from '@/content/company'




interface Props {
  params: Promise<{ slug: string }>
}

// Generate all product pages at build time (SSG)
export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/products/${slug}` },
  }
}

// Anchor nav sections for full-template products
const FULL_SECTIONS = [
  { id: 'composition',     label: 'Composition'     },
  { id: 'packaging-views', label: 'Packaging Views' },
  { id: 'uses',            label: 'Uses'            },
  { id: 'benefits',        label: 'Benefits'        },
  { id: 'how-to-use',      label: 'How to Use'      },
  { id: 'how-it-works',    label: 'How It Works'    },
  { id: 'side-effects',    label: 'Side Effects'    },
  { id: 'quick-tips',      label: 'Quick Tips'      },
  { id: 'safety',          label: 'Safety Advice'   },
  { id: 'storage',         label: 'Storage'         },
]

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const isFull = isFullProduct(product)
  const therapeuticLabel = therapeuticAreaLabels[product.therapeuticArea]

  const activeIngs = isFullProduct(product)
    ? product.composition.map((c) => `${c.ingredient} ${c.strength}`).join(', ')
    : product.keyIngredients.join(', ')

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': ['Product', 'Drug'],
    name: product.name,
    description: product.shortDescription,
    url: `https://avalinlaboratories.com/products/${product.slug}`,
    image: `https://avalinlaboratories.com/products/${product.slug}/${product.slug}-01.jpg`,
    activeIngredient: activeIngs,
    category:
      product.classification === 'Rx'
        ? 'Prescription Medicine (Schedule H)'
        : 'Over-the-Counter Product (OTC)',
    prescriptionStatus:
      product.classification === 'Rx'
        ? 'https://schema.org/PrescriptionOnly'
        : 'https://schema.org/OTC',
    identifier: company.legal.fssaiLicence,
    brand: {
      '@type': 'Brand',
      name: 'Avalin Laboratories',
    },
    manufacturer: {
      '@type': ['Organization', 'MedicalOrganization'],
      name: company.legalName,
      url: 'https://avalinlaboratories.com',
      identifier: company.legal.fssaiLicence,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0.00',
      priceCurrency: 'INR',
      description: 'Prescription/institutional supply or authorized pharmacy stockist availability.',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://avalinlaboratories.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: 'https://avalinlaboratories.com/products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://avalinlaboratories.com/products/${product.slug}`,
      },
    ],
  }

  return (
    <div className="bg-surface pb-24 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([productSchema, breadcrumbSchema]) }}
      />
      {/* ─── BREADCRUMB ─────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="border-b border-border bg-surface-alt">
        <ol className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-text-tertiary">
          <li><Link href="/" className="hover:text-brand-700 transition-colors">Home</Link></li>
          <li aria-hidden="true">›</li>
          <li><Link href="/products" className="hover:text-brand-700 transition-colors">Products</Link></li>
          <li aria-hidden="true">›</li>
          <li className="text-text-secondary font-medium truncate max-w-[200px]" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-10">

          {/* ─── MAIN CONTENT ─────────────────────────────────────────── */}
          <article className="min-w-0">

            {/* Product hero with interactive image gallery & 1mg link */}
            <ProductHero
              name={product.name}
              classification={product.classification}
              shortDescription={product.shortDescription}
              therapeuticAreaLabel={therapeuticLabel}
              slug={product.slug}
              oneMgUrl={product.oneMgUrl}
              images={product.images}
            />

            {/* ── FULL TEMPLATE ──────────────────────────────────────── */}
            {isFull && (
              <div className="mt-10 space-y-12">

                {/* Composition */}
                <section id="composition" aria-labelledby="composition-heading" className="scroll-mt-24">
                  <h2 id="composition-heading" className="font-heading text-h3 font-bold text-primary-900 mb-5">
                    Composition
                  </h2>
                  <CompositionTable composition={product.composition} />
                </section>

                {/* Packaging & Label Views */}
                {product.images && product.images.length > 0 && (
                  <section id="packaging-views" aria-labelledby="packaging-views-heading" className="scroll-mt-24">
                    <div className="flex items-center justify-between border-b border-border pb-3 mb-6">
                      <div>
                        <h2 id="packaging-views-heading" className="font-heading text-h3 font-bold text-primary-900">
                          Packaging &amp; Label Views
                        </h2>
                        <p className="mt-1 text-xs text-text-tertiary">
                          High-resolution views of packaging angles, blister details, and regulatory label markings.
                        </p>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-alt border border-border text-text-secondary">
                        {product.images.length} {product.images.length === 1 ? 'View' : 'Views'} Available
                      </span>
                    </div>
                    <PackagingGrid images={product.images} productName={product.name} />
                  </section>
                )}

                {/* Uses */}
                <section id="uses" aria-labelledby="uses-heading" className="scroll-mt-24">
                  <h2 id="uses-heading" className="font-heading text-h3 font-bold text-primary-900 mb-5">
                    Uses
                  </h2>
                  <ul className="space-y-2">
                    {product.uses.map((use, i) => (
                      <li key={i} className="flex items-start gap-2 text-body text-text-secondary">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary-600 flex-shrink-0" aria-hidden="true" />
                        {use}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Benefits */}
                <section id="benefits" aria-labelledby="benefits-heading" className="scroll-mt-24">
                  <h2 id="benefits-heading" className="font-heading text-h3 font-bold text-primary-900 mb-5">
                    Benefits
                  </h2>
                  <div className="space-y-4">
                    {product.benefits.map((benefit, i) => (
                      <div key={i} className="rounded-card border border-border bg-surface-alt p-5">
                        <h3 className="font-semibold text-text-primary mb-2">{benefit.heading}</h3>
                        <p className="text-sm leading-relaxed text-text-secondary">{benefit.body}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* How to Use */}
                <section id="how-to-use" aria-labelledby="howto-heading" className="scroll-mt-24">
                  <h2 id="howto-heading" className="font-heading text-h3 font-bold text-primary-900 mb-4">
                    How to Use
                  </h2>
                  <p className="text-body leading-relaxed text-text-secondary">{product.howToUse}</p>
                </section>

                {/* How It Works */}
                <section id="how-it-works" aria-labelledby="howitworks-heading" className="scroll-mt-24">
                  <h2 id="howitworks-heading" className="font-heading text-h3 font-bold text-primary-900 mb-4">
                    How It Works
                  </h2>
                  <p className="text-body leading-relaxed text-text-secondary">{product.howItWorks}</p>
                </section>

                {/* Side Effects */}
                <section id="side-effects" aria-labelledby="se-heading" className="scroll-mt-24">
                  <h2 id="se-heading" className="font-heading text-h3 font-bold text-primary-900 mb-5">
                    Side Effects
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.sideEffects.map((effect, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                        <span className="h-1.5 w-1.5 rounded-full bg-safety-caution flex-shrink-0" aria-hidden="true" />
                        {effect}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-text-tertiary">
                    This is not an exhaustive list. If you experience unexpected side
                    effects, consult your doctor or{' '}
                    <a href="/pharmacovigilance" className="text-primary-700 underline font-medium hover:text-primary-900">
                      report via our pharmacovigilance process
                    </a>
                    .
                  </p>
                </section>

                {/* Quick Tips */}
                <section id="quick-tips" aria-labelledby="qt-heading" className="scroll-mt-24">
                  <h2 id="qt-heading" className="font-heading text-h3 font-bold text-primary-900 mb-5">
                    Quick Tips
                  </h2>
                  <QuickTipsList tips={product.quickTips} />
                </section>

                {/* Safety Advice */}
                <section id="safety" aria-labelledby="safety-section-heading" className="scroll-mt-24">
                  <h2 id="safety-section-heading" className="font-heading text-h3 font-bold text-primary-900 mb-5">
                    Safety Advice
                  </h2>
                  <SafetyAdviceMatrix safetyAdvice={product.safetyAdvice} />
                </section>

                {/* Drug Interactions */}
                {product.drugInteractions && product.drugInteractions.length > 0 && (
                  <section id="drug-interactions" aria-labelledby="di-heading" className="scroll-mt-24">
                    <h2 id="di-heading" className="font-heading text-h3 font-bold text-primary-900 mb-4">
                      Known Drug Interactions
                    </h2>
                    <p className="text-sm text-text-secondary mb-4">
                      This medicine may interact with the following drugs. Always inform your
                      prescriber of all medicines you are taking:
                    </p>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {product.drugInteractions.map((drug, i) => (
                        <li
                          key={i}
                          className="rounded-lg border border-border bg-surface-alt px-3 py-2 text-sm text-text-secondary"
                        >
                          {drug}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Fact Box (Mobile view — desktop shown in sidebar) */}
                <div id="fact-box" className="lg:hidden print:block scroll-mt-24">
                  <FactBox factBox={product.factBox} />
                </div>

                {/* Storage */}
                <section id="storage" aria-labelledby="storage-heading" className="scroll-mt-24">
                  <h2 id="storage-heading" className="font-heading text-h3 font-bold text-primary-900 mb-4">
                    Storage
                  </h2>
                  <div className="flex items-start gap-3 rounded-card border border-border bg-primary-50 p-5">
                    <svg className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.251 2.251 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.251 2.251 0 0 1 2.012-1.244h3.86M12 3v8.25m0 0-3-3m3 3 3-3" />
                    </svg>
                    <p className="text-sm leading-relaxed text-text-secondary">{product.storage}</p>
                  </div>
                </section>

              </div>
            )}

            {/* ── LIGHT TEMPLATE ─────────────────────────────────────── */}
            {!isFull && (
              <div className="mt-10 space-y-10">
                <section aria-labelledby="ingredients-heading">
                  <h2 id="ingredients-heading" className="font-heading text-h3 font-bold text-primary-900 mb-5">
                    Key Ingredients
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {product.keyIngredients.map((ingredient, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm text-primary-700 font-medium"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </section>

                <section aria-labelledby="kb-heading">
                  <h2 id="kb-heading" className="font-heading text-h3 font-bold text-primary-900 mb-5">
                    Key Benefits
                  </h2>
                  <ul className="space-y-3">
                    {product.keyBenefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                        <span className="mt-0.5 h-5 w-5 rounded-full bg-primary-600 text-white flex items-center justify-center flex-shrink-0" aria-hidden="true">
                          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                          </svg>
                        </span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </section>

                <section aria-labelledby="directions-heading">
                  <h2 id="directions-heading" className="font-heading text-h3 font-bold text-primary-900 mb-4">
                    Directions for Use
                  </h2>
                  <p className="text-body leading-relaxed text-text-secondary">
                    {product.directionsForUse}
                  </p>
                </section>

                <section aria-labelledby="safety-info-heading">
                  <h2 id="safety-info-heading" className="font-heading text-h3 font-bold text-primary-900 mb-4">
                    Safety Information
                  </h2>
                  <p className="text-body leading-relaxed text-text-secondary">
                    {product.safetyInformation}
                  </p>
                </section>

                {product.storage && (
                  <section aria-labelledby="storage-light-heading">
                    <h2 id="storage-light-heading" className="font-heading text-h3 font-bold text-primary-900 mb-4">
                      Storage
                    </h2>
                    <div className="flex items-start gap-3 rounded-card border border-border bg-primary-50 p-5">
                      <p className="text-sm leading-relaxed text-text-secondary">{product.storage}</p>
                    </div>
                  </section>
                )}

                {/* Packaging & Label Views (OTC) */}
                {product.images && product.images.length > 0 && (
                  <section aria-labelledby="packaging-views-otc-heading" className="print:hidden">
                    <div className="flex items-center justify-between border-b border-border pb-3 mb-6">
                      <div>
                        <h2 id="packaging-views-otc-heading" className="font-heading text-h3 font-bold text-primary-900">
                          Packaging &amp; Label Views
                        </h2>
                        <p className="mt-1 text-xs text-text-tertiary">
                          High-resolution views of packaging angles, bottle details, and consumer directions.
                        </p>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-alt border border-border text-text-secondary">
                        {product.images.length} {product.images.length === 1 ? 'View' : 'Views'} Available
                      </span>
                    </div>
                    <PackagingGrid images={product.images} productName={product.name} />
                  </section>
                )}
              </div>
            )}

            {/* Manufacturer block */}
            <div className="mt-12">
              <ManufacturerBlock
                marketer={product.marketer}
                manufacturer={'manufacturer' in product ? product.manufacturer : undefined}
              />
            </div>

            {/* Request Info CTA */}
            <div className="mt-8 print:hidden">
              <RequestInfoCTA
                productName={product.name}
                productSlug={product.slug}
              />
            </div>

            {/* Monograph Print Footer (Phase 2.1) */}
            <div className="hidden print:block mt-8 pt-4 border-t-2 border-border text-[10px] text-text-secondary space-y-1">
              <p className="font-semibold text-text-primary text-[11px]">
                Avalin Laboratories Pvt Ltd — Official Product Monograph
              </p>
              <p>
                Digital Reference:{' '}
                <span className="font-mono">https://avalinlaboratories.com/products/{product.slug}</span>
              </p>
              {product.oneMgUrl && (
                <p>
                  Tata 1mg Third-Party Reference:{' '}
                  <span className="font-mono">{product.oneMgUrl}</span>
                </p>
              )}
              <p className="text-text-tertiary">
                This document is intended for registered medical practitioners and institutional healthcare facilities. Not for commercial distribution or retail sale.
              </p>
            </div>
          </article>

          {/* ─── SIDEBAR ──────────────────────────────────────────────── */}
          <aside className="hidden lg:block print:hidden" aria-label="Product navigation">
            {/* Fact box at top of sidebar for full products */}
            {isFull && (
              <div className="sticky top-20 space-y-5">
                <FactBox factBox={product.factBox} />

                {/* Interactive Anchor nav with active tracking */}
                <ProductAnchorNav sections={FULL_SECTIONS} />


                {/* 1mg Reference Card */}
                {product.oneMgUrl && (
                  <div className="rounded-card border border-border bg-surface-alt p-4 print:hidden">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary mb-1">
                      Online Reference
                    </p>
                    <p className="text-xs text-text-secondary mb-3">
                      View this medicine&apos;s monograph and safety information on Tata 1mg.
                    </p>
                    <a
                      href={product.oneMgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 min-h-[44px] text-xs font-semibold text-text-primary hover:text-primary-700 hover:border-primary-300 hover:bg-primary-50 transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1"
                    >
                      <span>View on Tata 1mg</span>
                      <Icon name="external" size={13} className="opacity-70" aria-hidden="true" />
                    </a>
                    <p className="mt-2 text-[10px] text-text-tertiary leading-tight">
                      Tata 1mg is a trademark of its respective owner. Avalin Laboratories is not affiliated with Tata 1mg.
                    </p>
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* ─── STICKY MOBILE CTA BAR (Design doc.md §8) ──────────────────── */}
      <div className="lg:hidden print:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-alt/95 backdrop-blur border-t border-border px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_12px_rgba(0,0,0,0.06)] flex items-center justify-between gap-3">


        <div className="min-w-0">
          <p className="font-heading font-bold text-sm text-primary-900 truncate">
            {product.name}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <ClassificationBadge classification={product.classification} size="sm" />
            <span className="text-[11px] text-text-tertiary truncate">
              {therapeuticLabel}
            </span>
          </div>
        </div>
        <Link
          href={`/reach-us?product=${encodeURIComponent(product.name)}`}
          className="flex-shrink-0 rounded-lg bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors"
        >
          Request Info
        </Link>
      </div>
    </div>
  )
}
