import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import therapeuticAreasData from '@/content/therapeutic-areas'
import { getProductsByTherapeuticArea } from '@/lib/products'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { InnerPageHero } from '@/components/layout/InnerPageHero'
import { IllustratedIcon, CapsuleFloating, type IllustratedIconName } from '@/components/pharma'
import { GlobalCta } from '@/components/layout/GlobalCta'

export const metadata: Metadata = {
  title: 'Therapeutic Areas',
  description:
    'Avalin Laboratories pharmaceutical products organized by therapeutic area — vitamins & nutrition, gastrointestinal, anti-infective, pain management, hepatoprotective, and probiotics.',
  alternates: {
    canonical: '/therapeutic-areas',
  },
}

export default function TherapeuticAreasPage() {
  return (
    <>
      {/* ─── 1. HERO SECTION ───────────────────────────────────────────── */}
      <InnerPageHero
        eyebrow="Clinical Disciplines & Portfolios"
        title="Therapeutic Areas"
        description="Our pharmaceutical portfolio spans six distinct therapeutic categories. Each section below details active formulations, composition profiles, and direct product monographs."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Therapeutic Areas' },
        ]}
        theme="dark-plum"
        visual={
          <div className="relative w-full h-[320px] flex items-center justify-center select-none">
            <div
              className="absolute inset-0 rounded-full pointer-events-none -z-10"
              style={{
                background: 'radial-gradient(circle, rgba(225, 53, 159, 0.2) 0%, transparent 65%)',
                filter: 'blur(30px)',
              }}
            />
            <div className="relative z-10 p-6 rounded-3xl bg-brand-950/70 border border-brand-400/30 backdrop-blur-md shadow-2xl flex items-center justify-center">
              <IllustratedIcon name="molecule" size={120} />
            </div>
            <div className="absolute -bottom-2 -left-2 z-20">
              <CapsuleFloating size={150} variant="plum-white" tilt={-15} float />
            </div>
            <div className="absolute top-2 right-0 z-20 rounded-xl bg-brand-900/90 backdrop-blur-md border border-accent/40 px-3.5 py-1.5 shadow-lg">
              <span className="text-[10px] font-mono font-bold tracking-wider text-accent-champagne uppercase">
                6 Medical Disciplines
              </span>
            </div>
          </div>
        }
      />

      {/* ─── 2. THERAPEUTIC AREAS LIST ─────────────────────────────────── */}
      <Section surface="default" aria-label="Therapeutic area product listings">
        <Container className="space-y-16">
          {therapeuticAreasData.map((area) => {
            const areaProducts = getProductsByTherapeuticArea(area.id)

            return (
              <div
                key={area.id}
                id={area.id}
                className="scroll-mt-24 transition-all duration-base target:p-6 target:rounded-2xl target:bg-brand-50/50 target:ring-2 target:ring-brand-400/40"
              >
                {/* Area Header */}
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 border border-brand-200 shadow-sm"
                      aria-hidden="true"
                    >
                      <IllustratedIcon name={area.id as IllustratedIconName} size={48} />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-950">
                        <Link href={`/therapeutic-areas/${area.id}`} className="hover:text-brand-700 transition-colors">
                          {area.label}
                        </Link>
                      </h2>
                      <p className="mt-2 text-body text-text-secondary max-w-3xl leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/therapeutic-areas/${area.id}`}
                    className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors whitespace-nowrap self-start mt-2"
                  >
                    <span>Dedicated view</span>
                    <Icon name="arrow-right" size={12} aria-hidden="true" />
                  </Link>
                </div>

                {/* Products in this Area */}
                {areaProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {areaProducts.map((product) => {
                      const imageSrc = `/products/${product.slug}/${product.slug}-01.jpg`
                      return (
                        <Card
                          key={product.slug}
                          as={Link}
                          href={`/products/${product.slug}`}
                          interactive
                          className="group p-6 bg-surface-alt border border-brand-200/70 hover:border-brand-400 hover:shadow-card-hover flex flex-col justify-between transition-all duration-base"
                        >
                          <div>
                            {/* Packshot Image */}
                            <div className="relative h-44 w-full rounded-xl bg-surface border border-border/80 mb-4 flex items-center justify-center overflow-hidden">
                              <Image
                                src={imageSrc}
                                alt={`${product.name} packaging`}
                                fill
                                className="object-contain p-2.5 group-hover:scale-105 transition-transform duration-base"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              />
                            </div>

                            <div className="mb-2">
                              <Badge classification={product.classification} size="sm" />
                            </div>

                            <h3 className="font-serif text-lg font-bold text-brand-950 group-hover:text-brand-700 transition-colors">
                              {product.name}
                            </h3>

                            <p className="mt-2 text-xs leading-relaxed text-text-secondary line-clamp-3">
                              {product.shortDescription}
                            </p>
                          </div>

                          <div className="mt-5 pt-3.5 border-t border-border flex items-center justify-between text-xs font-semibold text-brand-700">
                            <span>View Formulation Details</span>
                            <Icon
                              name="arrow-right"
                              size={13}
                              className="group-hover:translate-x-1 transition-transform duration-fast"
                              aria-hidden="true"
                            />
                          </div>
                        </Card>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-text-tertiary italic p-4 rounded-lg bg-surface border border-dashed border-border">
                    No products currently cataloged in this therapeutic area.
                  </p>
                )}

                <hr className="mt-16 border-border" />
              </div>
            )
          })}
        </Container>
      </Section>

      {/* Global Partnership Call to Action */}
      <GlobalCta />
    </>
  )
}
