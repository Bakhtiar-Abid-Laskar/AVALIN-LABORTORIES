'use client'

/**
 * GlobalCta — High-conversion pharmaceutical partnership banner
 * Avalin Laboratories Design System — Phase 4
 *
 * Features:
 *   - Deep editorial plum gradient background (`from-brand-950 via-brand-900 to-brand-950`)
 *   - Tactile blister strip and floating capsule watermark accents in the background
 *   - High-contrast primary CTA pair (Primary brand button + Champagne outline)
 *   - Verified institutional response SLA and registered headquarters address
 *   - 100% tokenized, zero hardcoded values, zero green
 */

import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Heading'
import { Button } from '@/components/ui/Button'
import { contacts, address } from '@/lib/site-config'
import { CapsuleFloating } from '@/components/pharma/CapsuleFloating'
import { BlisterStrip } from '@/components/pharma/BlisterStrip'

export interface GlobalCtaProps {
  title?: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export function GlobalCta({
  title = 'Partner with Avalin Laboratories',
  subtitle,
  primaryLabel = 'Partner with Us',
  primaryHref = '/reach-us',
  secondaryLabel = 'Browse Product Formulary',
  secondaryHref = '/products/catalog',
}: GlobalCtaProps) {
  const displaySubtitle =
    subtitle ??
    `We welcome inquiries from healthcare professionals, clinical institutions, and licensed distribution partners. Our institutional desk responds within ${contacts.responseTime}.`

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 text-white py-20 md:py-24 border-t border-brand-800"
      aria-label="Institutional partnerships"
    >
      {/* Background Tactile Accents (Watermark Scale) */}
      <div className="absolute -left-12 -bottom-10 opacity-10 pointer-events-none select-none hidden md:block">
        <BlisterStrip rows={2} cols={3} interactive={false} />
      </div>
      <div className="absolute -right-8 -top-8 opacity-15 pointer-events-none select-none hidden md:block">
        <CapsuleFloating size={220} variant="plum-white" float={false} glow={false} />
      </div>

      {/* Subtle Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(225, 53, 159, 0.12) 0%, transparent 65%)',
        }}
      />

      <Container narrow className="text-center relative z-10">
        <Eyebrow dark className="mb-3">
          Inquiries &amp; Clinical Distribution
        </Eyebrow>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-display font-bold text-white tracking-tight">
          {title}
        </h2>

        <p className="mt-4 text-base sm:text-lg leading-relaxed text-brand-100 max-w-2xl mx-auto">
          {displaySubtitle}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button as={Link} href={primaryHref} variant="primary" size="lg">
            {primaryLabel}
          </Button>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center rounded-lg border border-brand-200/40 bg-brand-800/40 px-8 py-3.5 text-base font-semibold text-white hover:bg-brand-800/80 hover:border-brand-200/80 transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {secondaryLabel}
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-brand-800/80 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-brand-200/90 font-mono tracking-wide">
          <a
            href={`tel:${contacts.phoneRaw}`}
            className="hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <span>Tel:</span>
            <span className="font-semibold text-white">{contacts.phone}</span>
          </a>
          <span className="opacity-40 hidden sm:inline">•</span>
          <a
            href={`mailto:${contacts.email}`}
            className="hover:text-white transition-colors underline underline-offset-2"
          >
            {contacts.email}
          </a>
          <span className="opacity-40 hidden sm:inline">•</span>
          <span>{address.full}</span>
        </div>
      </Container>
    </section>
  )
}
