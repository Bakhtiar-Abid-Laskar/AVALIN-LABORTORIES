import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Callout } from '@/components/ui/Callout'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { contacts } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Pharmacovigilance',
  description:
    'Avalin Laboratories pharmacovigilance — procedures for reporting suspected adverse events, product quality concerns, and safety observations.',
  alternates: {
    canonical: '/pharmacovigilance',
  },
}

const REPORTABLE_ITEMS = [
  'Unexpected, adverse, or undesirable symptoms following administration of a medicine.',
  'Lack of expected clinical efficacy, suspected medication errors, misuse, or accidental exposure.',
  'Product exposure during pregnancy or lactation where an adverse event or risk is suspected.',
  'Product physical defects or packaging anomalies (e.g. damaged seal, discoloration, unexpected odor).',
]

const ESSENTIAL_CRITERIA = [
  {
    num: '01',
    label: 'Identifiable Patient',
    desc: 'Age, gender, or patient initials (confidentiality strictly preserved).',
  },
  {
    num: '02',
    label: 'Identifiable Reporter',
    desc: 'Name and contact information of the healthcare professional, patient, or caregiver reporting.',
  },
  {
    num: '03',
    label: 'Suspect Formulation',
    desc: 'Brand name, dosage strength, and batch / lot number (found on blister/bottle packaging).',
  },
  {
    num: '04',
    label: 'Adverse Event Details',
    desc: 'Description of the reaction, onset date, duration, severity, and any remedial actions taken.',
  },
]

import { InnerPageHero } from '@/components/layout/InnerPageHero'
import { TabletBevel, IllustratedIcon } from '@/components/pharma'
import { GlobalCta } from '@/components/layout/GlobalCta'

export default function PharmacovigilancePage() {
  return (
    <>
      {/* ─── 1. HERO SECTION ───────────────────────────────────────────── */}
      <InnerPageHero
        eyebrow="Patient Well-Being & Monitoring"
        title="Pharmacovigilance"
        description="Patient safety is central to our work. Pharmacovigilance is the ongoing discipline of detecting, assessing, understanding, and helping prevent adverse effects or other medicine-related concerns."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Pharmacovigilance' },
        ]}
        theme="dark-plum"
        heroImage={{
          src: '/hero/pharmacovigilance-clinical.jpg',
          alt: 'Stethoscope representing patient safety monitoring and pharmacovigilance practice',
          position: 'center center',
        }}
      />

      {/* ─── 2. STRUCTURED 2-COLUMN SECTION (RESOLVES H9) ──────────────── */}
      <Section surface="default" aria-label="Pharmacovigilance guidance and reporting">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left Sticky Column: Safety Desk Contact & Nav */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              {/* PV Desk Card */}
              <Card className="p-6 sm:p-7 bg-surface-alt border border-brand-200/80 shadow-card">
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="p-2.5 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center flex-shrink-0">
                    <IllustratedIcon name="pharmacovigilance" size={32} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-950">
                      Safety Reporting Desk
                    </h3>
                    <p className="text-xs text-brand-700 font-medium">Pharmacovigilance Unit</p>
                  </div>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed mb-4">
                  Dedicated channel monitored specifically for adverse event collection and clinical safety intake.
                </p>

                <div className="space-y-3 pt-3 border-t border-brand-200/60 text-xs">
                  <div>
                    <span className="text-text-tertiary block mb-0.5">Telephone Support Desk:</span>
                    <a
                      href={`tel:${contacts.phoneRaw}`}
                      className="font-medium text-brand-800 hover:text-brand-950 font-mono"
                    >
                      {contacts.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-text-tertiary block mb-0.5">Direct Safety Email:</span>
                    <Link
                      href={`mailto:${contacts.pvEmail}`}
                      className="font-medium text-brand-800 hover:text-brand-950 underline underline-offset-2 break-all"
                    >
                      {contacts.pvEmail}
                    </Link>
                  </div>
                  <div>
                    <span className="text-text-tertiary block mb-0.5">Response Protocol:</span>
                    <span className="font-semibold text-brand-950">Immediate log &amp; triage</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-200/60">
                  <Button as={Link} href="/reach-us" variant="primary" className="w-full justify-center text-xs">
                    Submit via Web Form
                  </Button>
                </div>
              </Card>

              {/* Quick Navigation Anchor Box */}
              <div className="hidden lg:block rounded-xl border border-brand-200/80 bg-surface-alt p-5 shadow-sm text-xs">
                <p className="font-semibold text-brand-950 uppercase tracking-wider text-[11px] mb-3">
                  Safety Protocol Navigation
                </p>
                <nav className="space-y-2 text-text-secondary">
                  <a href="#emergency" className="block hover:text-brand-700 transition-colors">
                    1. In an Emergency
                  </a>
                  <a href="#scope" className="block hover:text-brand-700 transition-colors">
                    2. Scope of Reporting
                  </a>
                  <a href="#criteria" className="block hover:text-brand-700 transition-colors">
                    3. Required Information
                  </a>
                  <a href="#submission" className="block hover:text-brand-700 transition-colors">
                    4. Submission Channels
                  </a>
                  <a href="#privacy-notice" className="block hover:text-brand-700 transition-colors">
                    5. Privacy &amp; Data Notice
                  </a>
                </nav>
              </div>
            </aside>

            {/* Right Main Column: Structured Protocol Cards */}
            <div className="lg:col-span-8 space-y-8">

              {/* Emergency Callout Primitive (Resolves detached icon in H9) */}
              <div id="emergency" className="scroll-mt-24">
                <Callout intent="emergency" title="In an Emergency">
                  <p>
                    If you believe a patient or someone under your care is experiencing a
                    life-threatening reaction, severe allergic episode, or critical medical event,
                    please <strong>seek immediate emergency medical assistance</strong> or contact
                    the nearest hospital. Pharmacovigilance reporting channels do not replace
                    emergency clinical interventions.
                  </p>
                </Callout>
              </div>

              {/* Section 1: Commitment & Scope */}
              <Card id="scope" className="p-7 sm:p-8 bg-surface-alt border border-brand-200/80 shadow-card scroll-mt-24">
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="p-2.5 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center flex-shrink-0">
                    <IllustratedIcon name="shield" size={36} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-700 block">
                      Surveillance Integrity
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-brand-950">
                      Our Safety Commitment &amp; Scope
                    </h2>
                  </div>
                </div>

                <div className="space-y-3.5 text-sm text-text-secondary leading-relaxed">
                  <p>
                    We actively encourage physicians, pharmacists, nurses, patients, and caregivers
                    to report any unexpected experiences associated with Avalin Laboratories formulations.
                    Timely post-marketing data helps maintain a continuous, rigorous safety profile.
                  </p>
                  <p>
                    You do <strong>not</strong> need to be certain that the product caused the reaction
                    in order to report it. A suspicion of an association is sufficient.
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-brand-200/80">
                  <h3 className="text-xs font-semibold text-brand-950 uppercase tracking-wider mb-3">
                    What Should Be Reported:
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-text-secondary">
                    {REPORTABLE_ITEMS.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Icon name="check" size={16} className="text-brand-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              {/* Section 2: Required Information Checklist */}
              <Card id="criteria" className="p-7 sm:p-8 bg-surface-alt border border-brand-200/80 shadow-card scroll-mt-24">
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="p-2.5 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center flex-shrink-0">
                    <IllustratedIcon name="vial" size={36} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-700 block">
                      Reporting Protocol
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-brand-950">
                      Minimum Information for Meaningful Review
                    </h2>
                  </div>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  To allow our medical team to appropriately log and investigate the incident in
                  conformance with global standards, please try to supply the following four components:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ESSENTIAL_CRITERIA.map((criterion) => (
                    <div
                      key={criterion.num}
                      className="p-5 rounded-2xl bg-brand-50/50 border border-brand-200/80 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-sm font-serif font-bold text-accent block mb-1">
                          {criterion.num}
                        </span>
                        <h3 className="font-serif text-base font-bold text-brand-950 mb-1.5">
                          {criterion.label}
                        </h3>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {criterion.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-xs text-text-tertiary">
                  All personal health details are stored with strict confidentiality and processed
                  solely for therapeutic surveillance and regulatory pharmacovigilance obligations.
                </p>
              </Card>

              {/* Section 3: How to Submit a Report */}
              <Card id="submission" className="p-7 sm:p-8 bg-surface-alt border border-brand-200/80 shadow-card scroll-mt-24">
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="p-2.5 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center flex-shrink-0">
                    <IllustratedIcon name="logistics" size={36} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-700 block">
                      Submission Pathways
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-brand-950">
                      How to Submit a Report
                    </h2>
                  </div>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  You can submit safety information through either of the following dedicated pathways:
                </p>

                <div className="space-y-4 text-sm">
                  <div className="p-4 rounded-xl bg-brand-50/60 border border-brand-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-serif font-bold text-brand-950 text-base">Online Contact Form</p>
                      <p className="text-xs text-text-secondary mt-0.5">
                        Select &ldquo;Pharmacovigilance / Safety Reporting&rdquo; under Inquiry Type.
                      </p>
                    </div>
                    <Button as={Link} href="/reach-us" variant="secondary" size="sm">
                      Open Form
                    </Button>
                  </div>

                  <div className="p-4 rounded-xl bg-brand-50/60 border border-brand-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-serif font-bold text-brand-950 text-base">Direct Safety Email</p>
                      <p className="text-xs text-text-secondary mt-0.5">
                        Send batch details and reaction narrative to {contacts.pvEmail}.
                      </p>
                    </div>
                    <Button as={Link} href={`mailto:${contacts.pvEmail}`} variant="secondary" size="sm">
                      Email PV Team
                    </Button>
                  </div>

                  <div className="p-4 rounded-xl bg-brand-50/60 border border-brand-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-serif font-bold text-brand-950 text-base">Telephone Support Desk</p>
                      <p className="text-xs text-text-secondary mt-0.5">
                        Direct institutional line for safety &amp; product inquiry triage: {contacts.phone}
                      </p>
                    </div>
                    <Button as="a" href={`tel:${contacts.phoneRaw}`} variant="secondary" size="sm">
                      Call Desk
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Section 4: Privacy & Confidentiality Notice */}
              <Card id="privacy-notice" className="p-7 sm:p-8 bg-surface-alt border border-brand-200/80 shadow-card scroll-mt-24">
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="p-2.5 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-center flex-shrink-0">
                    <IllustratedIcon name="shield" size={36} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-700 block">
                      Data Protection &amp; Confidentiality
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-brand-950">
                      Privacy &amp; Safety Data Notice
                    </h2>
                  </div>
                </div>

                <div className="space-y-3.5 text-sm text-text-secondary leading-relaxed">
                  <p>
                    All personal details, patient identifiable information, and reporter contacts provided
                    during pharmacovigilance reports are processed in strict confidence in compliance with applicable
                    Indian healthcare data privacy principles and statutory adverse event surveillance standards.
                  </p>
                  <p>
                    Data submitted is utilized exclusively for investigating safety signals, satisfying statutory
                    pharmacovigilance obligations with licensing authorities, and monitoring formulation quality. We do
                    not sell, commercialize, or share this data with third parties for commercial or marketing purposes.
                  </p>
                  <p className="text-xs text-text-tertiary pt-2 border-t border-brand-200/60">
                    For full details on data retention, access rights, and security measures, please consult our{' '}
                    <Link href="/privacy-policy" className="text-brand-800 font-semibold underline underline-offset-2 hover:text-brand-950">
                      Privacy Policy
                    </Link>.
                  </p>
                </div>
              </Card>

            </div>

          </div>
        </Container>
      </Section>

      {/* Global Partnership Call to Action */}
      <GlobalCta />
    </>
  )
}
