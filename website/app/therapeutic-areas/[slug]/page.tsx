import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import therapeuticAreas, { getTherapeuticAreaById } from '@/content/therapeutic-areas'
import { getProductsByTherapeuticArea } from '@/lib/products'
import type { TherapeuticArea } from '@/content/types'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { InnerPageHero } from '@/components/layout/InnerPageHero'
import { IllustratedIcon, CapsuleFloating, type IllustratedIconName } from '@/components/pharma'
import { GlobalCta } from '@/components/layout/GlobalCta'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return therapeuticAreas.map((area) => ({
    slug: area.id,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const area = getTherapeuticAreaById(slug as TherapeuticArea)

  if (!area) return { title: 'Therapeutic Area Not Found' }

  return {
    title: `${area.label} Portfolio`,
    description: area.description,
    alternates: {
      canonical: `/therapeutic-areas/${area.id}`,
    },
    openGraph: {
      title: `${area.label} | Avalin Laboratories`,
      description: area.description,
      url: `/therapeutic-areas/${area.id}`,
    },
  }
}

export default async function TherapeuticAreaDetailPage({ params }: PageProps) {
  const { slug } = await params
  const area = getTherapeuticAreaById(slug as TherapeuticArea)

  if (!area) notFound()

  const products = getProductsByTherapeuticArea(area.id)

  return (
    <>
      <InnerPageHero
        eyebrow="Therapeutic Area Portfolio"
        title={area.label}
        description={area.description}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Therapeutic Areas', href: '/therapeutic-areas' },
          { label: area.label },
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
              <IllustratedIcon name={area.id as IllustratedIconName} size={120} />
            </div>
            <div className="absolute -bottom-2 -left-2 z-20">
              <CapsuleFloating size={150} variant="plum-white" tilt={-15} float />
            </div>
            <div className="absolute top-2 right-0 z-20 rounded-xl bg-brand-900/90 backdrop-blur-md border border-accent/40 px-3.5 py-1.5 shadow-lg">
              <span className="text-[10px] font-mono font-bold tracking-wider text-accent-champagne uppercase">
                {products.length} {products.length === 1 ? 'Formulation' : 'Formulations'}
              </span>
            </div>
          </div>
        }
      />

      <Section surface="default" aria-label={`${area.label} active products`}>
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4 mb-8">
            <div>
              <h2 className="font-heading text-h3 font-bold text-primary-900">
                Formulations in {area.label}
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                Active commercial and hospital products under this clinical discipline.
              </p>
            </div>
            <Link
              href="/therapeutic-areas"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors"
            >
              <span>← All Therapeutic Areas</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const imageSrc = `/products/${product.slug}/${product.slug}-01.jpg`
              return (
                <Card
                  key={product.slug}
                  as="article"
                  interactive
                  className="group flex flex-col justify-between p-5 bg-surface-alt border border-brand-200/60 hover:shadow-card-hover hover:border-brand-400 transition-all duration-base"
                >
                  <div>
                    <div className="relative h-44 w-full rounded-xl bg-surface border border-border mb-4 flex items-center justify-center overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={`${product.name} packaging`}
                        fill
                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-base"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2.5">
                      <Badge classification={product.classification} size="sm" />
                      <span className="text-xs text-text-tertiary">
                        {area.label}
                      </span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-brand-950 group-hover:text-brand-700 transition-colors">
                      <Link href={`/products/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-text-secondary line-clamp-3">
                      {product.shortDescription}
                    </p>
                  </div>

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

          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="font-heading text-lg font-bold text-primary-900 mb-4">
              Explore Other Therapeutic Disciplines
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {therapeuticAreas
                .filter((a) => a.id !== area.id)
                .map((otherArea) => (
                  <Link
                    key={otherArea.id}
                    href={`/therapeutic-areas/${otherArea.id}`}
                    className="p-3 rounded-lg border border-border bg-surface-alt hover:bg-primary-50/50 hover:border-primary-200 text-xs font-semibold text-text-primary transition-all text-center"
                  >
                    {otherArea.label}
                  </Link>
                ))}
            </div>
          </div>
        </Container>
      </Section>

      <GlobalCta />
    </>
  )
}
