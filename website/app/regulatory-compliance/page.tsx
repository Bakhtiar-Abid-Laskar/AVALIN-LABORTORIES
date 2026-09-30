import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/Heading'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { GlobalCta } from '@/components/layout/GlobalCta'
import { legal } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Regulatory Compliance',
  description:
    'Avalin Laboratories is committed to quality management systems, batch traceability, and responsible regulatory practices across our pharmaceutical product lifecycle.',
  alternates: {
    canonical: '/regulatory-compliance',
  },
}

const QUALITY_PILLARS = [
  {
    icon: 'quality' as const,
    title: 'Quality Management Systems',
    description:
      'Our quality protocols span active pharmaceutical ingredient (API) vetting, rigorous supplier qualification, manufacturing process validation, and documented batch inspection before market release.',
  },
  {
    icon: 'compliance' as const,
    title: 'Product Oversight & Safety Signals',
    description:
      'We maintain structured review mechanisms to monitor product quality feedback, evaluate potential safety signals, and initiate corrective and preventive actions (CAPA) throughout the formulation lifecycle.',
  },
  {
    icon: 'document' as const,
    title: 'Traceability & Controlled Documentation',
    description:
      'Every batch produced by our certified manufacturing partners carries comprehensive batch records, analytical certificates of analysis (CoA), and distribution logs to support total supply chain auditability.',
  },
  {
    icon: 'partnership' as const,
    title: 'Responsible Statutory Engagement',
    description:
      'We interface with licensing authorities, drug control departments, and healthcare professionals transparently, adhering strictly to Indian regulatory standards and labeling requirements.',
  },
]

import { InnerPageHero } from '@/components/layout/InnerPageHero'
import { VialGlass, IllustratedIcon } from '@/components/pharma'

export default function RegulatoryCompliancePage() {
  return (
    <>
      {/* ─── 1. HERO SECTION ───────────────────────────────────────────── */}
      <InnerPageHero
        eyebrow="Quality Assurance & Governance"
        title="Regulatory Compliance"
        description="Avalin Laboratories is committed to maintaining systems and practices that support the quality, safety, and traceability of our products. We work to meet applicable regulatory requirements and to keep our processes aligned with the needs of patients, healthcare professionals, and distribution partners."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Regulatory Compliance' },
        ]}
        theme="dark-plum"
        heroImage={{
          src: '/hero/regulatory-qc-lab.jpg',
          alt: 'Researcher dispensing samples into a multi-well plate in a pharmaceutical quality-control laboratory',
          position: 'center 30%',
        }}
      />

      {/* ─── 2. COMPLIANCE APPROACH & STATUTORY DETAILS ────────────────── */}
      {/* Resolves H8: Completely unique, non-duplicated operational approach content */}
      <Section surface="default" aria-labelledby="approach-heading">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-8">
              <Card className="p-8 sm:p-10 bg-surface-alt border border-brand-200/80 shadow-card h-full">
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-2.5 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center flex-shrink-0">
                    <IllustratedIcon name="shield" size={36} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-700 block">
                      Governance Framework
                    </span>
                    <h2 id="approach-heading" className="font-serif text-2xl sm:text-3xl font-bold text-brand-950">
                      Our Compliance Approach
                    </h2>
                  </div>
                </div>

                <div className="space-y-4 text-body text-text-secondary leading-relaxed">
                  <p>
                    Pharmaceutical distribution demands accountability at every transition point.
                    At Avalin Laboratories, our compliance approach establishes clear operational
                    governance across vendor selection, regulatory filings, storage guidelines, and
                    post-release monitoring.
                  </p>
                  <p>
                    We collaborate exclusively with production facilities licensed under current Good
                    Manufacturing Practices (cGMP) and inspected in accordance with Schedule M of the
                    Drugs and Cosmetics Rules. Standard Operating Procedures (SOPs) govern batch sample
                    retention, cold-chain integrity where specified, and prompt documentation handover
                    for institutional tenders and hospital inspections.
                  </p>
                </div>
              </Card>
            </div>

            {/* Statutory Licencing Card */}
            <div className="lg:col-span-4">
              <Card className="p-8 bg-brand-50/70 border border-brand-200/80 shadow-card h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-800 text-white flex items-center justify-center mb-4 shadow-sm">
                    <Icon name="fssai" size={22} aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brand-950 mb-2">
                    Statutory Authorizations
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed mb-6">
                    Operating in full compliance with state and central food and drug safety directives.
                  </p>

                  <div className="space-y-3 border-t border-brand-200/60 pt-4 text-xs">
                    <div>
                      <p className="text-text-tertiary">FSSAI Registration:</p>
                      <p className="font-mono font-semibold text-brand-950 text-sm mt-0.5">
                        {legal.fssaiLicence}
                      </p>
                    </div>
                    <div>
                      <p className="text-text-tertiary">Jurisdiction &amp; Venue:</p>
                      <p className="font-medium text-text-primary mt-0.5">
                        {legal.arbitrationVenue}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-200/60 mt-6">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-brand-700 block mb-1">
                    Audits &amp; Verification
                  </span>
                  <p className="text-xs text-text-secondary">
                    Documentation packages available for institutional partner audits on request.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── 3. PROCESS DIAGRAM: QUALITY LIFECYCLE ─────────────────────── */}
      <Section surface="blush" aria-labelledby="process-heading" className="border-y border-brand-200/80">
        <Container>
          <SectionHeading
            eyebrow="Quality Assurance Pipeline"
            title="End-to-End Quality Lifecycle"
            centre
            id="process-heading"
            className="mb-12"
          >
            Structured checkpoints ensure each formulation consistently satisfies therapeutic standards.
          </SectionHeading>

          {/* Process Diagram Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              { step: '01', title: 'Supplier Qualification', desc: 'API & excipient supplier verification against pharmacopoeial monographs (IP/BP/USP).' },
              { step: '02', title: 'cGMP Formulation', desc: 'Regulated manufacturing adhering to Schedule M protocols and in-process testing.' },
              { step: '03', title: 'Batch Release & CoA', desc: 'Independent analytical testing, certificate of analysis verification, and formal sign-off.' },
              { step: '04', title: 'Pharmacovigilance', desc: 'Continuous adverse event monitoring, customer feedback intake, and batch traceability.' },
            ].map((item, idx) => (
              <Card key={item.step} className="p-6 bg-surface-alt border border-brand-200/70 shadow-card hover:shadow-card-hover relative flex flex-col justify-between transition-all duration-base">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold font-serif text-accent">
                      {item.step}
                    </span>
                    {idx < 3 && (
                      <span className="hidden md:inline-block text-brand-400 text-xs font-mono">
                        →
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-base font-bold text-brand-950 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── 4. FOUR QUALITY PILLARS ───────────────────────────────────── */}
      <Section surface="default" aria-labelledby="pillars-heading">
        <Container>
          <SectionHeading
            eyebrow="Operational Rigor"
            title="Core Compliance Pillars"
            centre
            id="pillars-heading"
            className="mb-12"
          >
            Systematic disciplines designed to ensure patient confidence and prescriber trust.
          </SectionHeading>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {QUALITY_PILLARS.map((pillar) => {
              const iconMap: Record<string, 'shield' | 'pharmacovigilance' | 'vial' | 'logistics'> = {
                'Quality Management Systems': 'shield',
                'Product Oversight & Safety Signals': 'pharmacovigilance',
                'Traceability & Controlled Documentation': 'vial',
                'Responsible Statutory Engagement': 'logistics',
              }
              const iconName = iconMap[pillar.title] ?? 'shield'

              return (
                <Card
                  key={pillar.title}
                  interactive
                  className="p-7 sm:p-8 bg-surface-alt border border-brand-200/70 shadow-card hover:shadow-card-hover hover:border-brand-400 flex flex-col justify-between transition-all duration-base"
                >
                  <div>
                    <div className="p-3 rounded-2xl bg-brand-50/90 border border-brand-200 mb-5 w-fit">
                      <IllustratedIcon name={iconName} size={48} />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-brand-950 mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {pillar.description}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Global Partnership CTA */}
      <GlobalCta
        title="Questions Regarding Product Documentation?"
        subtitle="For batch certificates of analysis, technical dossiers, or regulatory verification inquiries, please get in touch with our team."
        primaryLabel="Contact Our Desk"
        primaryHref="/reach-us"
        secondaryLabel="Pharmacovigilance Protocol"
        secondaryHref="/pharmacovigilance"
      />
    </>
  )
}
