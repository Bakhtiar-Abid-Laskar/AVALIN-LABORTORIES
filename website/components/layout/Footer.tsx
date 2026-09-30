/**
 * Footer — global site footer — Avalin Laboratories
 *
 * Requirements:
 *   - 4-column responsive grid (Brand, Explore, Quality & Safety, Contact)
 *   - Strictly derived from site-config (no hardcoded URLs, emails, or phone numbers)
 *   - WCAG AA compliant text contrast (> 4.5:1 for body/small text on primary-900)
 *   - Icon registry usage (no unicode arrows or emojis)
 */

import Link from 'next/link'
import Image from 'next/image'
import { footer, contacts, address, site, legal } from '@/lib/site-config'
import { Icon } from '@/components/ui/Icon'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="w-full border-t border-brand-800 bg-gradient-to-b from-brand-900 via-brand-950 to-brand-950 text-brand-100 print:bg-white print:text-text-primary print:border-t print:pt-6"
      role="contentinfo"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-1 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded"
              aria-label={`${site.name} — return to homepage`}
            >
              <Image
                src="/brand/avalin-logo.png"
                alt={`${site.name} logo`}
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="font-heading text-lg font-bold tracking-tight text-white">
                {site.name}
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-brand-200 max-w-xs">
              {site.tagline} {site.description.slice(0, 115)}…
            </p>

            {legal.fssaiLicence && (
              <div className="inline-flex items-center gap-2 rounded bg-brand-800/80 px-2.5 py-1 text-xs font-medium text-brand-100 border border-brand-700/60">
                <Icon name="fssai" size={14} className="text-brand-300" aria-hidden="true" />
                <span>FSSAI Lic: <span className="font-mono">{legal.fssaiLicence}</span></span>
              </div>
            )}
          </div>

          {/* Col 2: Explore links */}
          <div>
            <h2 className="mb-4 text-xs font-bold tracking-eyebrow uppercase text-white font-mono">
              Explore
            </h2>
            <ul className="space-y-3 text-sm">
              {footer.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-brand-200 hover:text-white hover:translate-x-0.5 transition-all duration-fast focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quality & Safety */}
          <div>
            <h2 className="mb-4 text-xs font-bold tracking-eyebrow uppercase text-white font-mono">
              Quality &amp; Safety
            </h2>
            <ul className="space-y-3 text-sm">
              {footer.qualitySafety.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-brand-200 hover:text-white hover:translate-x-0.5 transition-all duration-fast focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Inquiries */}
          <div>
            <h2 className="mb-4 text-xs font-bold tracking-eyebrow uppercase text-white font-mono">
              Contact
            </h2>
            <div className="space-y-3.5 text-sm text-brand-200">
              <address className="not-italic leading-relaxed">
                {address.twoLine}
              </address>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2">
                  <Icon name="phone" size={15} className="text-brand-300 flex-shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${contacts.phoneRaw}`}
                    className="text-brand-100 hover:text-white transition-colors font-mono font-medium"
                  >
                    {contacts.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Icon name="mail" size={15} className="text-brand-300 flex-shrink-0" aria-hidden="true" />
                  <Link
                    href={`mailto:${contacts.email}`}
                    className="text-brand-100 hover:text-white underline underline-offset-2 transition-colors break-all"
                  >
                    {contacts.email}
                  </Link>
                </div>

                <div className="pt-2">
                  <Link
                    href="/reach-us"
                    className="inline-flex items-center gap-1.5 font-medium text-white hover:text-accent-champagne transition-colors group"
                  >
                    <span>Reach Us &amp; Inquiries</span>
                    <Icon
                      name="arrow-right"
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Disclaimer */}
        <div className="mt-12 border-t border-brand-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-200/90">
          <p>
            &copy; {currentYear} {site.legalName}. All rights reserved.
          </p>
          <p className="text-center sm:text-right max-w-xl leading-relaxed text-brand-200/80">
            {footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  )
}
