/**
 * TrustTrio — elevated compliance, safety, and partnership strip — Avalin Laboratories
 * Phase 5 Editorial Rebuild
 *
 * Upgraded with bespoke illustrated pharmaceutical icons,
 * warm blush background, and tactile elevation cards.
 */

import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/Heading'
import { Icon } from '@/components/ui/Icon'
import { IllustratedIcon, type IllustratedIconName } from '@/components/pharma/IllustratedIcon'

interface TrustItem {
  id: string
  icon: IllustratedIconName
  tag: string
  title: string
  description: string
  href: string
  linkText: string
}

const TRUST_ITEMS: TrustItem[] = [
  {
    id: 'compliance',
    icon: 'shield',
    tag: 'Standards & Traceability',
    title: 'Regulatory Compliance',
    description:
      'Committed to robust quality management systems and full adherence to regulatory standards across all manufacturing partnerships.',
    href: '/regulatory-compliance',
    linkText: 'View compliance framework',
  },
  {
    id: 'pv',
    icon: 'pharmacovigilance',
    tag: 'Patient Well-Being',
    title: 'Pharmacovigilance',
    description:
      'Continuous safety monitoring, adverse event intake protocols, and transparent risk evaluation centered around patient protection.',
    href: '/pharmacovigilance',
    linkText: 'Safety reporting protocol',
  },
  {
    id: 'partnerships',
    icon: 'logistics',
    tag: 'Prescribers & Trade',
    title: 'Professional Partnerships',
    description:
      'Direct, reliable distribution and clinical information for healthcare providers, medical institutions, and distributors.',
    href: '/reach-us',
    linkText: 'Reach our trade desk',
  },
]

export function TrustTrio() {
  return (
    <section className="bg-surface-blush border-y border-brand-200/80 py-section-mobile md:py-section-desktop" aria-labelledby="trust-heading">
      <Container>
        <SectionHeading
          eyebrow="Integrity & Safety"
          title="Clinical Assurance & Accountability"
          centre
          id="trust-heading"
          className="mb-12 md:mb-16"
        >
          Our operations are structured around regulatory precision, proactive pharmacovigilance, and dependable professional partnerships.
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TRUST_ITEMS.map((item) => (
            <Card
              key={item.id}
              interactive
              className="flex flex-col justify-between p-7 lg:p-8 bg-surface-alt border border-brand-200/70 shadow-card hover:border-brand-400 hover:shadow-card-hover transition-all duration-base"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="p-2.5 rounded-2xl bg-brand-50/80 border border-brand-200 flex items-center justify-center flex-shrink-0">
                    <IllustratedIcon name={item.icon} size={48} />
                  </div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-text-tertiary">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-950 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-border">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors group"
                >
                  <span>{item.linkText}</span>
                  <Icon
                    name="arrow-right"
                    size={14}
                    className="transition-transform duration-fast group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
