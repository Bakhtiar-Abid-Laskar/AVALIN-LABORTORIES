import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { site } from '@/lib/site-config'
import { getAllProducts } from '@/lib/products'
import { therapeuticAreaLabels } from '@/content/types'
import therapeuticAreasData from '@/content/therapeutic-areas'
import { StatsBand } from '@/components/home/StatsBand'
import { TrustTrio } from '@/components/home/TrustTrio'
import { GlobalCta } from '@/components/layout/GlobalCta'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading, Eyebrow } from '@/components/ui/Heading'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { IllustratedIcon, TabletBevel, CapsuleFloating, type IllustratedIconName } from '@/components/pharma'

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: site.description,
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  const allProducts = getAllProducts()
  const featuredProducts = allProducts.slice(0, 4)

  return (
    <>
      {/* ─── 1. HERO SECTION — Photography + Gradient Fade ──────────────── */}
      <section
        className="relative overflow-hidden bg-brand-950 text-white border-b border-brand-800"
        aria-label="Hero"
      >
        {/* Hero Photo — right side, fades left to transparent */}
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-[58%] pointer-events-none"
          aria-hidden="true"
        >
          <Image
            src="/hero/home-pharma-production.jpg"
            alt="Pharmaceutical blister packs — Avalin Laboratories product portfolio"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: 'center 40%' }}
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          {/* Left gradient fade: brand-950 → transparent */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, var(--color-brand-950) 0%, var(--color-brand-950) 12%, color-mix(in srgb, var(--color-brand-950) 78%, transparent) 42%, color-mix(in srgb, var(--color-brand-950) 30%, transparent) 68%, transparent 100%)',
            }}
          />
          {/* Top/bottom vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 20%, transparent 75%, rgba(0,0,0,0.55) 100%)',
            }}
          />
        </div>

        <Container className="relative z-10 py-14 sm:py-20 md:py-28 lg:py-32">
          {/* Text block — max 52% width on desktop */}
          <div className="max-w-[52%] max-lg:max-w-full">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-display font-bold leading-[1.14] tracking-tight text-white">
              Excellence in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-champagne via-accent-light to-white">
                Pharmaceuticals.
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-brand-100 max-w-lg">
              Avalin Laboratories is committed to making dependable, high-quality
              medicines more accessible to patients and healthcare professionals across India.
            </p>

            {/* Trust chips — corrected text */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-900/70 backdrop-blur-sm px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-brand-100">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                cGMP Qualified Partners
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-900/70 backdrop-blur-sm px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-brand-100">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-champagne shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                Active Pharmacovigilance
              </div>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button as={Link} href="/products" variant="primary" size="lg" className="w-full sm:w-auto justify-center text-center">
                Explore Our Products
              </Button>
              <Link
                href="/reach-us"
                className="inline-flex items-center justify-center rounded-lg border border-brand-300/40 bg-brand-800/40 px-8 py-3.5 text-base font-semibold text-white hover:bg-brand-800/80 hover:border-brand-200/80 transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white w-full sm:w-auto text-center"
              >
                Partner with Us
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 2. STATS BAND (VERIFIED ONLY) ─────────────────────────────── */}
      <StatsBand />

      {/* ─── 3. WHO WE ARE TEASER ──────────────────────────────────────── */}
      <Section surface="default" aria-labelledby="about-heading">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="About Avalin Laboratories"
                title="Rooted in Assam. Serving India."
                id="about-heading"
              >
                Founded and headquartered in Guwahati, Avalin Laboratories Pvt Ltd
                brings together a portfolio of prescription and over-the-counter
                medicines across six key therapeutic areas.
              </SectionHeading>

              <div className="mt-5 space-y-4 text-body leading-relaxed text-text-secondary">
                <p>
                  We partner with experienced, cGMP-compliant manufacturing facilities
                  to ensure that every product meets established quality, safety, and
                  traceability standards before entering circulation.
                </p>
                <p>
                  Our focus remains straightforward: providing medical professionals,
                  hospitals, and distribution networks with dependable pharmaceutical options.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href="/who-we-are"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors group"
                >
                  <span>Learn more about our company</span>
                  <Icon
                    name="arrow-right"
                    size={15}
                    className="transition-transform duration-fast group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative p-8 rounded-3xl bg-surface-alt border border-brand-200/80 shadow-card flex items-center justify-center w-full max-w-[360px] aspect-square overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none -z-10"
                  style={{
                    background: 'radial-gradient(circle, rgba(225, 53, 159, 0.12) 0%, transparent 70%)',
                  }}
                />
                <Image
                  src="/brand/avalin-logo.png"
                  alt={`${site.name} emblem`}
                  width={200}
                  height={200}
                  className="object-contain drop-shadow-md relative z-10"
                />
                <div className="absolute -bottom-2 -left-2 z-20">
                  <TabletBevel size={64} shape="round" color="champagne" imprint="AVL" tilt={10} />
                </div>
                <div className="absolute -top-3 -right-3 z-20">
                  <CapsuleFloating size={120} variant="plum-white" tilt={-20} float={false} glow={false} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── 4. THERAPEUTIC AREAS ──────────────────────────────────────── */}
      <Section surface="blush" aria-labelledby="ta-heading" className="border-y border-brand-200/80">
        <Container>
          <SectionHeading
            eyebrow="Our Portfolio"
            title="Therapeutic Areas"
            centre
            id="ta-heading"
            className="mb-12"
          >
            Avalin Laboratories addresses critical health needs across six focused
            therapeutic categories, spanning specialized prescription and supportive OTC care.
          </SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapeuticAreasData.map((area) => (
              <Card
                key={area.id}
                as={Link}
                href={`/therapeutic-areas#${area.id}`}
                interactive
                className="group flex flex-col justify-between p-6 sm:p-7 bg-surface-alt border border-brand-200/70 hover:border-brand-400 hover:shadow-card-hover transition-all duration-base"
              >
                <div>
                  <div className="p-2.5 rounded-2xl bg-brand-50/90 border border-brand-200 flex items-center justify-center mb-5 w-fit">
                    <IllustratedIcon name={area.id as IllustratedIconName} size={48} />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-brand-950 group-hover:text-brand-700 transition-colors">
                    {area.label}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">
                    {area.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-semibold text-brand-700">
                  <span>
                    {area.exampleProducts.length} product{area.exampleProducts.length !== 1 ? 's' : ''}
                  </span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-fast">
                    Explore <Icon name="arrow-right" size={13} aria-hidden="true" />
                  </span>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button as={Link} href="/products" variant="secondary">
              View All Products
            </Button>
          </div>
        </Container>
      </Section>

      {/* ─── 5. FEATURED PRODUCTS ──────────────────────────────────────── */}
      <Section surface="default" aria-labelledby="featured-heading">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <Eyebrow className="mb-2">Formulary Highlights</Eyebrow>
              <h2 id="featured-heading" className="font-serif text-3xl sm:text-4xl font-bold text-brand-950">
                Selected Products
              </h2>
            </div>
            <Link
              href="/products/catalog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors group"
            >
              <span>View full catalog</span>
              <Icon name="arrow-right" size={14} className="group-hover:translate-x-1 transition-transform duration-fast" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => {
              const imageSrc = `/products/${product.slug}/${product.slug}-01.jpg`
              const areaLabel = therapeuticAreaLabels[product.therapeuticArea]

              return (
                <Card
                  key={product.slug}
                  className="group flex flex-col justify-between p-5 bg-surface-alt border border-brand-200/60 hover:shadow-card-hover hover:border-brand-400 transition-all duration-base"
                >
                  <div>
                    {/* Packshot Image Container */}
                    <div className="relative h-44 w-full rounded-xl bg-surface border border-border mb-4 flex items-center justify-center overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={`${product.name} packaging`}
                        fill
                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-base"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>

                    {/* Classification & Area (No truncation - Resolves H3) */}
                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2.5">
                      <Badge classification={product.classification} size="sm" />
                      <span className="text-xs text-text-tertiary">
                        {areaLabel}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-serif text-base font-bold text-brand-950 group-hover:text-brand-700 transition-colors">
                      <Link href={`/products/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h3>

                    {/* Short Description */}
                    <p className="mt-2 text-xs leading-relaxed text-text-secondary line-clamp-3">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Actions (Resolves H4 wrapping & touch target compliance) */}
                  <div className="mt-5 pt-3.5 border-t border-border flex items-center justify-between gap-3 text-xs">
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-semibold text-brand-700 hover:text-brand-900 transition-colors inline-flex items-center gap-1.5 min-h-[44px] px-2 py-1 -ml-2 rounded-lg hover:bg-brand-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      <span>Details</span>
                      <Icon name="arrow-right" size={12} aria-hidden="true" />
                    </Link>

                    {product.oneMgUrl && (
                      <a
                        href={product.oneMgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-surface border border-border px-3 py-2 min-h-[44px] text-xs font-medium text-text-secondary hover:text-brand-800 hover:border-brand-400 hover:bg-brand-50/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 whitespace-nowrap"
                        title={`View ${product.name} on Tata 1mg (external site)`}
                      >
                        <span>Tata 1mg</span>
                        <Icon name="external" size={12} className="opacity-70 flex-shrink-0" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button as={Link} href="/products/catalog" variant="secondary" className="w-full justify-center">
              View Full Catalog
            </Button>
          </div>
        </Container>
      </Section>

      {/* ─── 6. TRUST TRIO (ELEVATED CLINICAL ASSURANCE) ────────────────── */}
      <TrustTrio />

      {/* ─── 7. PARTNERSHIP CALL TO ACTION ─────────────────────────────── */}
      <GlobalCta />
    </>
  )
}
