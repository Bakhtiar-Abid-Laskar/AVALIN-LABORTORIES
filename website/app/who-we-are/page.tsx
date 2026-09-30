import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { site, company, address } from '@/lib/site-config'
import commitments from '@/content/commitments'
import { StatsBand } from '@/components/home/StatsBand'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/Heading'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

import { InnerPageHero } from '@/components/layout/InnerPageHero'
import { CapsuleFloating, TabletBevel } from '@/components/pharma'
import { IllustratedIcon } from '@/components/pharma/IllustratedIcon'

import { GlobalCta } from '@/components/layout/GlobalCta'

export const metadata: Metadata = {
  title: 'Who We Are',
  description:
    'Learn about Avalin Laboratories Pvt Ltd — a pharmaceutical marketer based in Guwahati, Assam, committed to delivering reliable medicines across India.',
  alternates: {
    canonical: '/who-we-are',
  },
}

export default function WhoWeArePage() {
  return (
    <>
      {/* ─── 1. HERO SECTION ───────────────────────────────────────────── */}
      <InnerPageHero
        eyebrow="About Our Organization"
        title="Who We Are"
        description="Avalin Laboratories Pvt Ltd is a pharmaceutical marketing company based in Guwahati, Assam. We work to make dependable, high-quality medicines more accessible to patients and healthcare professionals across India."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Who We Are' },
        ]}
        theme="dark-plum"
        heroImage={{
          src: '/hero/who-we-are-lab.jpg',
          alt: 'Scientist examining samples under a microscope in a pharmaceutical research laboratory',
          position: 'center 20%',
        }}
      />

      {/* ─── 2. COMPANY STORY & MISSION ────────────────────────────────── */}
      <Section surface="default" aria-labelledby="about-story-heading">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Foundations & Vision"
                title="Rooted in Assam. Serving India."
                id="about-story-heading"
              >
                Founded and headquartered in Guwahati, Avalin Laboratories Pvt Ltd
                brings together a focused portfolio of prescription and over-the-counter
                medicines across six core therapeutic areas.
              </SectionHeading>

              <div className="mt-6 space-y-4 text-body leading-relaxed text-text-secondary">
                <p>
                  From nutritional support and gastrointestinal therapy to anti-infective
                  interventions, pain management, hepatoprotection, and probiotic formulations,
                  our products address essential day-to-day therapeutic requirements.
                </p>
                <p>
                  We operate in close collaboration with certified, cGMP-compliant manufacturing
                  partners. Every formulation is prepared under controlled quality regimes,
                  adhering to rigorous supplier qualification, batch release testing, and full
                  traceability standards.
                </p>
                <p>
                  Our commitment extends beyond commercial distribution: transparent clinical
                  dialogue with prescribers, active post-marketing pharmacovigilance, and dependable
                  supply partnerships across healthcare networks.
                </p>
              </div>
            </div>

            {/* Emblem presentation with clear-space rules (Resolves M2) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative p-10 rounded-2xl bg-surface-alt border border-border shadow-card flex items-center justify-center w-full max-w-[340px] aspect-square">
                <Image
                  src="/brand/avalin-logo.png"
                  alt={`${site.name} emblem`}
                  width={200}
                  height={200}
                  className="object-contain drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── 3. VERIFIED PORTFOLIO METRICS ─────────────────────────────── */}
      {/* Resolves C2: Only verified factual figures are displayed */}
      <StatsBand />

      {/* ─── 4. OUR COMMITMENTS ────────────────────────────────────────── */}
      <Section surface="blush" aria-labelledby="values-heading" className="border-y border-brand-200/80">
        <Container>
          <SectionHeading
            eyebrow="Core Principles"
            title="Our Commitments"
            centre
            id="values-heading"
            className="mb-12"
          >
            Guiding principles that govern how we formulate, test, distribute, and support our products.
          </SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {commitments.map((item) => {
              const iconName: 'shield' | 'pharmacovigilance' | 'logistics' =
                item.id === 'quality-first'
                  ? 'shield'
                  : item.id === 'patient-safety'
                  ? 'pharmacovigilance'
                  : 'logistics'

              return (
                <Card
                  key={item.id}
                  interactive
                  className="p-7 sm:p-8 bg-surface-alt border border-brand-200/70 shadow-card hover:shadow-card-hover hover:border-brand-400 text-center flex flex-col items-center transition-all duration-base"
                >
                  <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-brand-50/90 border border-brand-200 mb-5">
                    <IllustratedIcon name={iconName} size={48} />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brand-950 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {item.body}
                  </p>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* ─── 5. FIND US / HEADQUARTERS (RESOLVES M4) ───────────────────── */}
      <Section surface="default" aria-labelledby="find-us-heading">
        <Container>
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              eyebrow="Presence & Headquarters"
              title="Find Us"
              centre
              id="find-us-heading"
              className="mb-10"
            >
              Operating from the commercial hub of Guwahati, Assam to serve healthcare networks across the nation.
            </SectionHeading>

            {/* Structured Location Card with Visual Details */}
            <Card className="p-8 sm:p-10 bg-surface-alt border border-brand-200/80 shadow-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-md bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800 border border-brand-200 mb-4">
                    <Icon name="location" size={14} className="text-brand-600" aria-hidden="true" />
                    <span>Registered Office &amp; Operations</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-brand-950 mb-3">
                    {company.legalName}
                  </h3>

                  <address className="not-italic text-sm text-text-secondary leading-relaxed mb-4">
                    <p className="font-medium text-text-primary">{address.street}</p>
                    <p>{address.area}</p>
                    <p>{address.city}, {address.state} — {address.pincode}</p>
                    <p className="text-text-tertiary">{address.country}</p>
                  </address>

                  <div className="text-xs text-text-tertiary space-y-1 mb-4 border-t border-border pt-3">
                    <p><span className="font-semibold text-text-secondary">Landmark:</span> Opp. ASTC Central Workshop</p>
                    <p><span className="font-semibold text-text-secondary">District:</span> Kamrup Metropolitan</p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-brand-950 mb-6">
                    <Icon name="phone" size={14} className="text-brand-700 flex-shrink-0" aria-hidden="true" />
                    <a href={`tel:${company.contacts.phoneRaw}`} className="hover:underline font-semibold">
                      {company.contacts.phone}
                    </a>
                  </div>

                  <Button as={Link} href="/reach-us" variant="primary" size="md">
                    Get in Touch
                  </Button>
                </div>

                {/* Regional Context Card */}
                <div className="rounded-2xl bg-brand-50/70 border border-brand-200 p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 text-brand-900 font-semibold text-sm mb-2">
                      <Icon name="compliance" size={18} className="text-brand-600" aria-hidden="true" />
                      <span>Strategic Geographic Hub</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed mb-4">
                      Situated in Ulubari, Guwahati, our central office coordinates product distribution,
                      regulatory compliance documentation, and prescribers&apos; inquiries for regional and
                      pan-India clinical requirements.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-brand-200">
                    <p className="text-xs font-medium text-brand-950">
                      Standard Response Window:
                    </p>
                    <p className="text-xs text-brand-700 font-semibold">
                      {company.contacts.responseTime}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Global Partnership Call to Action */}
      <GlobalCta />
    </>
  )
}
