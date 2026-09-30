'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type ConsentState = 'undecided' | 'accepted' | 'rejected'

export function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>('undecided')
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('avalin-cookie-consent') as ConsentState | null
    if (stored && (stored === 'accepted' || stored === 'rejected')) {
      setConsent(stored)
      setVisible(false)
    } else {
      // Small delay so banner doesn't flash immediately on load
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('avalin-cookie-consent', 'accepted')
    setConsent('accepted')
    setVisible(false)
    // Dispatch event so ContactFormEmbed can listen and load
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: 'accepted' }))
  }

  const handleReject = () => {
    localStorage.setItem('avalin-cookie-consent', 'rejected')
    setConsent('rejected')
    setVisible(false)
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: 'rejected' }))
  }

  if (!visible || consent !== 'undecided') return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-6 print:hidden"
    >
      <div className="mx-auto max-w-3xl rounded-card bg-surface-alt border border-border shadow-card-hover p-5 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Brand mark */}
          <div className="flex-shrink-0 h-9 w-9 rounded-full bg-primary-50 border border-border flex items-center justify-center">
            <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-primary mb-1">
              This site uses cookies
            </p>
            <p className="text-xs text-text-secondary leading-relaxed">
              We use essential cookies to make this site work. With your consent, we may
              also load our contact form (hosted by Google, which may set its own cookies)
              and privacy-respecting analytics.{' '}
              <button
                className="underline underline-offset-2 hover:text-primary-600 focus-visible:text-primary-600 transition-colors"
                onClick={() => setShowDetails(!showDetails)}
                aria-expanded={showDetails}
              >
                {showDetails ? 'Show less' : 'Learn more'}
              </button>
            </p>

            {showDetails && (
              <div className="mt-3 rounded-lg bg-surface p-3 text-xs text-text-secondary space-y-2 border border-border">
                <p>
                  <strong className="text-text-primary">Essential cookies:</strong>{' '}
                  Required for basic site function (navigation, this consent preference).
                  Always active.
                </p>
                <p>
                  <strong className="text-text-primary">Google Form cookies:</strong>{' '}
                  Set by Google when you use the contact form on our Reach Us page.
                  Loaded only after your consent.
                </p>
                <p>
                  <strong className="text-text-primary">Analytics:</strong>{' '}
                  Privacy-respecting, cookieless analytics to understand how the site is
                  used. No personal data shared.
                </p>
                <p>
                  Read our{' '}
                  <Link href="/privacy-policy" className="underline hover:text-primary-600 transition-colors">
                    Privacy Policy
                  </Link>{' '}
                  for full details.
                </p>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                id="cookie-accept-all"
                onClick={handleAccept}
                className="rounded-lg bg-primary-600 px-4 py-2 text-xs font-semibold text-white hover:bg-primary-700 transition-colors focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
              >
                Accept all
              </button>
              <button
                id="cookie-reject-non-essential"
                onClick={handleReject}
                className="rounded-lg border border-border bg-surface px-4 py-2 text-xs font-semibold text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
              >
                Reject non-essential
              </button>
              <Link
                href="/privacy-policy"
                className="rounded-lg px-3 py-2 text-xs text-text-tertiary hover:text-text-secondary transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Hook to check cookie consent state.
 * Use in any component that needs to conditionally load third-party content.
 */
export function useCookieConsent(): ConsentState {
  const [consent, setConsent] = useState<ConsentState>('undecided')

  useEffect(() => {
    const stored = localStorage.getItem('avalin-cookie-consent') as ConsentState | null
    if (stored) setConsent(stored)

    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as ConsentState
      setConsent(detail)
    }
    window.addEventListener('cookie-consent', handler)
    return () => window.removeEventListener('cookie-consent', handler)
  }, [])

  return consent
}
