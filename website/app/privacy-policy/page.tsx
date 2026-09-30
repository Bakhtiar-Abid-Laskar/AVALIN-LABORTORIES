import type { Metadata } from 'next'
import Link from 'next/link'
import { company } from '@/content/company'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Avalin Laboratories privacy policy — how we collect, use, share, and protect personal data on our website and in our operations.',
  alternates: {
    canonical: '/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-surface border-b border-border py-14 md:py-20">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
            Legal
          </p>
          <h1 className="font-heading text-h1-mobile md:text-h1 font-bold text-primary-900">
            Privacy Policy
          </h1>
          <p className="mt-5 max-w-2xl text-body leading-relaxed text-text-secondary">
            This policy explains how Avalin Laboratories Pvt Ltd collects, uses,
            and protects personal data when you use this website or engage with our
            services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-section-mobile md:py-section-desktop">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <article className="mx-auto max-w-reading rounded-card border border-border bg-surface-alt p-6 md:p-12 shadow-card prose-legal">

            <section>
              <h2>Information We Collect</h2>
              <p>
                When you interact with our website or engage with Avalin Laboratories,
                we may collect the following types of personal data:
              </p>
              <ul>
                <li>Your name, institutional affiliation, address, phone number, and email address.</li>
                <li>Information about the formulations or therapeutic areas you enquire about or request clinical documentation for.</li>
                <li>Your IP address, browser settings, and pages visited on our website.</li>
                <li>Information you voluntarily submit via our inquiry forms or correspondence.</li>
              </ul>
            </section>

            <section>
              <h2>How We Use Your Information</h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul>
                <li>
                  Responding to inquiries, requests, comments, or questions regarding
                  our formulations and manufacturing capabilities.
                </li>
                <li>
                  Providing clinical documentation, monographs, or regulatory dossiers
                  requested by verified healthcare professionals and institutional partners.
                </li>
                <li>
                  Processing institutional procurement, hospital supply, or distribution enquiries.
                </li>
                <li>
                  Improving our website presentation, technical performance, and visitor accessibility.
                </li>
                <li>
                  Complying with statutory obligations related to pharmacovigilance
                  and adverse event reporting.
                </li>
              </ul>
              <p>
                We do not sell, rent, or trade personal data, nor do we run promotional email marketing or unsolicited consumer advertising campaigns.
              </p>
            </section>

            <section>
              <h2>Sharing of Information</h2>
              <p>
                We do not sell or rent personal data. We may share data with trusted
                third parties that assist us in operating our services, processing
                transactions, managing and analyzing data, marketing our products and
                services, and complying with legal obligations. These third parties
                are obligated to safeguard the data and only use it as instructed.
              </p>
              <p>
                We may also be required by law, legal process, litigation, and/or
                requests from public and governmental authorities to disclose personal
                data. We may also disclose information if required to do so by law or
                in the good-faith belief that such action is reasonably necessary to
                comply with legal obligations, respond to claims, or protect the
                rights, property, or safety of our company, customers, or the public.
              </p>
            </section>

            <section>
              <h2>Your Choices and Rights</h2>
              <p>
                If you have provided personal data to us, you have certain rights in
                relation to that information including rights of access, rectification,
                erasure, restriction, objection, and more. You may opt out of
                non-essential communications at any time. Please{' '}
                <Link href="/reach-us" className="text-primary-600 hover:text-primary-800 underline underline-offset-2 transition-colors">
                  contact us
                </Link>{' '}
                if you wish to exercise these rights.
              </p>
            </section>

            <section>
              <h2>Data Retention</h2>
              <p>
                We retain personal data for as long as needed to fulfil the purposes
                outlined in this privacy policy or as required by law, contract, or
                legitimate business purposes.
              </p>
            </section>

            <section>
              <h2>Data Security</h2>
              <p>
                We have implemented administrative, technical, and physical safeguards
                to help prevent unauthorized access, use, or disclosure of personal data.
                However, no internet-based services can be guaranteed to be 100% secure.
              </p>
            </section>

            <section>
              <h2>Children</h2>
              <p>
                Our products and services are not designed for or intentionally targeted
                towards children under the age of 18. We do not intentionally gather
                personal data from those who are under the age of 18.
              </p>
            </section>

            <section>
              <h2>Cookies &amp; Functional Storage</h2>
              <p>
                We use strictly essential local storage and session tokens to record your cookie consent choice and ensure proper technical operation of this website. We do not use third-party marketing, retargeting, or advertising tracking cookies.
              </p>
              <p>
                With your explicit consent, we load an interactive inquiry form hosted by Google Forms on our Reach Us page. Google may set functional security cookies (such as reCAPTCHA verification cookies) to safeguard form submissions against automated spam. If you decline cookies, the Google Form is not loaded into your browser, and you may contact our team directly via email or open the form in a separate tab.
              </p>
            </section>

            <section>
              <h2>Changes to the Policy</h2>
              <p>
                We may occasionally amend this privacy policy to comply with legal
                requirements, enhance functionality of services, or address changes in
                the way we operate. We encourage you to periodically review this page
                for the latest version of our privacy policy.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>
                For questions about this privacy policy or to exercise your data rights,
                please contact us by telephone at{' '}
                <a
                  href={`tel:${company.contacts.phoneRaw}`}
                  className="text-primary-600 hover:text-primary-800 font-mono transition-colors"
                >
                  {company.contacts.phone}
                </a>{' '}
                or via email at{' '}
                <Link
                  href={`mailto:${company.contacts.email}`}
                  className="text-primary-600 hover:text-primary-800 underline underline-offset-2 transition-colors"
                >
                  {company.contacts.email}
                </Link>
                . We respond to all enquiries within {company.contacts.responseTime}.
              </p>
            </section>

          </article>
        </div>
      </section>
    </>
  )
}
