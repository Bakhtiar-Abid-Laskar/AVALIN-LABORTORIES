import type { Metadata } from 'next'
import Link from 'next/link'
import { company } from '@/content/company'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms and conditions governing use of the Avalin Laboratories website, informational medical resources, and institutional communications.',
  alternates: {
    canonical: '/terms-of-service',
  },
}

export default function TermsOfServicePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface border-b border-border py-14 md:py-20">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
            Legal
          </p>
          <h1 className="font-heading text-h1-mobile md:text-h1 font-bold text-primary-900">
            Terms of Service
          </h1>
          <p className="mt-5 max-w-2xl text-body leading-relaxed text-text-secondary">
            Please read these terms carefully before utilizing our website, reviewing pharmaceutical monographs, or engaging with Avalin Laboratories Pvt Ltd.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <article className="mx-auto max-w-reading rounded-card border border-border bg-surface-alt p-6 md:p-12 shadow-card prose-legal">

            <p className="text-text-secondary mb-8">
              Welcome to the corporate and medical information website of{' '}
              <strong className="text-primary-900 font-semibold">{company.legalName}</strong>.
              By accessing or using this website, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <section>
              <h2>1. Scope of Website &amp; Non-Retail Nature</h2>
              <p>
                This website is dedicated solely to corporate, clinical, and institutional pharmaceutical information.
                Avalin Laboratories Pvt Ltd does not operate an online pharmacy, does not sell or dispense medications directly to retail consumers, does not process commercial transactions, and does not collect payments via this platform. All commercial supply is conducted strictly through licensed clinical distributors, hospital procurement departments, and authorized institutional channels in compliance with applicable Indian pharmaceutical regulations.
              </p>
            </section>

            <section>
              <h2>2. Medical &amp; Clinical Information Disclaimer</h2>
              <p>
                All content published on this website — including salt compositions, therapeutic areas, clinical indications, mechanisms of action, and safety advisories — is provided strictly for informational and educational purposes for registered healthcare professionals, medical practitioners, and patients under qualified supervision.
              </p>
              <p>
                The information provided herein does not constitute medical advice, diagnosis, or treatment recommendations, and must never be used as a substitute for professional clinical judgment. Prescription-only (Rx) formulations must be administered strictly in accordance with the direction of a registered medical practitioner.
              </p>
            </section>

            <section>
              <h2>3. Third-Party References &amp; Tata 1mg Trademark Notice</h2>
              <p>
                Certain product monograph pages include external reference links and reference cards directing visitors to third-party medical databases, including Tata 1mg (<code className="text-xs">1mg.com</code>).
              </p>
              <p>
                <strong>Trademark Attribution &amp; Non-Affiliation:</strong> Tata 1mg is a registered trademark of its respective owner. Avalin Laboratories Pvt Ltd is an independent pharmaceutical enterprise and is not affiliated with, endorsed by, sponsored by, or in commercial partnership with Tata 1mg. Reference links to 1mg are provided solely as independent third-party informational references for clinician and patient convenience. Avalin Laboratories does not control, endorse, or verify any external third-party content, pricing, commercial availability, or retail offerings hosted on external domains.
              </p>
            </section>

            <section>
              <h2>4. Pharmacovigilance &amp; Adverse Drug Event Reporting</h2>
              <p>
                Patient safety is our foremost commitment. Suspected adverse drug reactions, product quality complaints, or therapeutic defects should not be submitted via general contact inquiries. Reports should be communicated immediately and directly to our dedicated Pharmacovigilance unit at{' '}
                <Link
                  href={`mailto:${company.contacts.pvEmail}`}
                  className="text-primary-600 hover:text-primary-800 underline underline-offset-2 transition-colors font-medium"
                >
                  {company.contacts.pvEmail}
                </Link>
                {' '}or through our{' '}
                <Link
                  href="/pharmacovigilance"
                  className="text-primary-600 hover:text-primary-800 underline underline-offset-2 transition-colors font-medium"
                >
                  Adverse Event Reporting Protocol
                </Link>
                .
              </p>
            </section>

            <section>
              <h2>5. Intellectual Property Rights</h2>
              <p>
                All trademarks, product names, logos, formulations, text, graphics, and layout designs appearing on this website are the property of Avalin Laboratories Pvt Ltd or their respective legal owners. No reproduction, modification, distribution, or commercial exploitation of any site content is permitted without prior written authorization from Avalin Laboratories Pvt Ltd.
              </p>
            </section>

            <section>
              <h2>6. Institutional Inquiries &amp; Communications</h2>
              <p>
                Inquiries submitted through our institutional contact form or email channels are handled for corporate, distribution, and clinical correspondence. We reserve the right to verify credentials and institutional affiliation prior to releasing confidential formulary or regulatory documentation.
              </p>
            </section>

            <section>
              <h2>7. Governing Law &amp; Jurisdiction</h2>
              <p>
                These terms and conditions and any dispute or claim arising out of or in connection with them or their subject matter shall be governed by and construed in accordance with the Laws of India. The courts and arbitration tribunals of competent jurisdiction in Guwahati, Assam shall have exclusive jurisdiction to settle any dispute or claim.
              </p>
            </section>

            <section>
              <h2>8. Updates to Terms</h2>
              <p>
                Avalin Laboratories Pvt Ltd reserves the right to amend these Terms of Service at any time without prior notice. Continued use of this website following any amendments constitutes full acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2>9. Contact &amp; Regulatory Inquiries</h2>
              <p>
                For legal, clinical, or institutional correspondence regarding these terms, please contact:
              </p>
              <address className="not-italic text-sm text-text-secondary leading-relaxed mt-3 border-l-2 border-primary-600 pl-4 space-y-1">
                <strong className="text-primary-900 block font-semibold">{company.legalName}</strong>
                <div>{company.address.street}, {company.address.area}</div>
                <div>{company.address.city}, {company.address.state} — {company.address.pincode}, India</div>
                <div>
                  Telephone:{' '}
                  <a
                    href={`tel:${company.contacts.phoneRaw}`}
                    className="text-primary-600 hover:text-primary-800 font-mono transition-colors"
                  >
                    {company.contacts.phone}
                  </a>
                </div>
                <div>
                  Email:{' '}
                  <Link
                    href={`mailto:${company.contacts.email}`}
                    className="text-primary-600 hover:text-primary-800 underline underline-offset-2 transition-colors"
                  >
                    {company.contacts.email}
                  </Link>
                </div>
              </address>
            </section>

          </article>
        </div>
      </section>
    </>
  )
}
