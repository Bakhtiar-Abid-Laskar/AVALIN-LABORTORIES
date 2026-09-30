import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { contacts, address, site, legal } from '@/lib/site-config'
import { ContactForm } from '@/components/ui/ContactForm'
import { ProductContextBanner } from '@/components/ui/ProductContextBanner'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Callout } from '@/components/ui/Callout'
import { Icon } from '@/components/ui/Icon'

export const metadata: Metadata = {
  title: 'Reach Us | Contact & Institutional Inquiries — Avalin Laboratories',
  description:
    'Connect with Avalin Laboratories corporate office in Guwahati, Assam. Inquiries for healthcare professionals, hospital supply, clinical distribution, and regulatory communication.',
  alternates: {
    canonical: '/reach-us',
  },
}

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: `Reach ${site.name} — Institutional & Healthcare Inquiries`,
  url: `${site.baseUrl}/reach-us`,
  description:
    'Contact Avalin Laboratories Pvt Ltd for product inquiries, hospital supply, clinical distribution, and pharmacovigilance reports.',
  mainEntity: {
    '@type': 'Organization',
    name: site.legalName,
    url: site.baseUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.pincode,
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: contacts.email,
        telephone: contacts.phoneRaw,
        contactType: 'General Inquiries',
        availableLanguage: ['English', 'Hindi', 'Assamese'],
      },
      {
        '@type': 'ContactPoint',
        email: contacts.pvEmail,
        telephone: contacts.phoneRaw,
        contactType: 'Pharmacovigilance',
        availableLanguage: ['English'],
      },
    ],
  },
}

import { InnerPageHero } from '@/components/layout/InnerPageHero'
import { CapsuleFloating, IllustratedIcon } from '@/components/pharma'
import { GlobalCta } from '@/components/layout/GlobalCta'

export default function ReachUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      {/* ─── 1. HERO SECTION ───────────────────────────────────────────── */}
      <InnerPageHero
        eyebrow="Contact & Institutional Desk"
        title="Reach Avalin Laboratories"
        description="Connect with our corporate office in Guwahati, Assam. We welcome inquiries from healthcare professionals, clinical institutions, authorized distributors, and partners."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Reach Us' },
        ]}
        theme="dark-plum"
        heroImage={{
          src: '/hero/reach-us-office.jpg',
          alt: 'Professional team collaborating around a table — Avalin Laboratories institutional desk',
          position: 'center 35%',
        }}
      />

      {/* ─── 2. MAIN INTERACTIVE CONTENT ───────────────────────────────── */}
      <Section surface="default" aria-label="Contact methods and inquiry form">
        <Container>
          {/* Pharmacovigilance Alert Banner (Resolves C3 & H7 with WCAG AA compliance) */}
          <div className="mb-10">
            <Callout intent="emergency" title="Adverse Drug Reaction or Safety Observation?">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
                <p className="text-xs sm:text-sm text-safety-unsafe-text/90 max-w-2xl leading-relaxed">
                  For suspected adverse drug reactions, product quality defects, or patient safety reports,
                  do not wait for standard corporate communication. Please report directly to our dedicated
                  Pharmacovigilance unit for immediate expedited triage.
                </p>
                <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
                  <a
                    href={`mailto:${contacts.pvEmail}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-safety-unsafe-DEFAULT px-4 py-2 text-xs font-bold text-white hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-safety-unsafe-DEFAULT"
                  >
                    <Icon name="mail" size={14} aria-hidden="true" />
                    <span>Email Safety Desk</span>
                  </a>
                  <Link
                    href="/pharmacovigilance"
                    className="text-xs font-semibold text-safety-unsafe-text hover:underline inline-flex items-center gap-1"
                  >
                    <span>PV Protocol</span>
                    <Icon name="arrow-right" size={12} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Callout>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Product Context Banner + Native Contact Form (Resolves C1, H5) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Context Banner: Displays preselected product if arriving from a catalog card */}
              <Suspense fallback={null}>
                <ProductContextBanner />
              </Suspense>

              <ContactForm />
            </div>

            {/* Right Column: Corporate Sidebar Information */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Corporate Office Card */}
              <Card className="p-6 sm:p-7 bg-surface-alt border border-brand-200/80 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center flex-shrink-0">
                    <IllustratedIcon name="shield" size={30} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-950">
                      Corporate Office
                    </h3>
                    <p className="text-xs text-brand-700 font-medium">Headquarters</p>
                  </div>
                </div>

                <address className="not-italic text-sm text-text-secondary leading-relaxed">
                  <strong className="text-brand-950 block font-semibold mb-1">
                    {site.legalName}
                  </strong>
                  {address.street}<br />
                  {address.area}<br />
                  {address.city}, {address.state} — {address.pincode}<br />
                  {address.country}
                </address>

                <p className="mt-4 pt-3 border-t border-brand-200/60 text-xs text-text-tertiary">
                  Landmark: Opp. ASTC Central Workshop, Ulubari
                </p>
              </Card>

              {/* Direct Email Card */}
              <Card className="p-6 sm:p-7 bg-surface-alt border border-brand-200/80 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center flex-shrink-0">
                    <IllustratedIcon name="pharmacovigilance" size={30} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-950">
                      Direct Correspondence
                    </h3>
                    <p className="text-xs text-brand-700 font-medium">Commercial &amp; Institutional</p>
                  </div>
                </div>

                <p className="text-xs text-text-secondary mb-3 leading-relaxed">
                  For official tender submissions, commercial accounts, and verified distributor inquiries:
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="phone" size={14} className="text-brand-700 flex-shrink-0" aria-hidden="true" />
                    <a
                      href={`tel:${contacts.phoneRaw}`}
                      className="text-sm font-semibold text-brand-800 hover:text-brand-950 font-mono transition-colors"
                    >
                      {contacts.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <Icon name="mail" size={14} className="text-brand-700 flex-shrink-0" aria-hidden="true" />
                    <a
                      href={`mailto:${contacts.email}`}
                      className="text-sm font-semibold text-brand-800 hover:text-brand-950 break-all underline underline-offset-2 transition-colors"
                    >
                      {contacts.email}
                    </a>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-200/60 text-xs text-text-tertiary flex items-center justify-between">
                  <span>Standard response window:</span>
                  <span className="font-medium text-brand-950">{contacts.responseTime}</span>
                </div>
              </Card>

              {/* Statutory Registrations Card */}
              <Card className="p-6 sm:p-7 bg-surface-alt border border-brand-200/80 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center flex-shrink-0">
                    <IllustratedIcon name="logistics" size={30} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-950">
                      Statutory Identifiers
                    </h3>
                    <p className="text-xs text-brand-700 font-medium">Compliance &amp; Monograph</p>
                  </div>
                </div>

                <dl className="space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-brand-200/60 pb-2">
                    <dt className="text-text-tertiary">FSSAI Registration</dt>
                    <dd className="font-mono font-medium text-brand-950">{legal.fssaiLicence}</dd>
                  </div>
                  <div className="flex justify-between border-b border-brand-200/60 pb-2">
                    <dt className="text-text-tertiary">Headquarters Hub</dt>
                    <dd className="text-text-primary font-medium">Guwahati, Assam</dd>
                  </div>
                  <div className="flex justify-between pt-0.5">
                    <dt className="text-text-tertiary">Commercial Scope</dt>
                    <dd className="text-text-primary font-medium">Pharmaceutical Marketer</dd>
                  </div>
                </dl>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Global Partnership Call to Action */}
      <GlobalCta />
    </>
  )
}
