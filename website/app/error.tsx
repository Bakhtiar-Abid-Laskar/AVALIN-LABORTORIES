'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Unhandled application error:', error)
  }, [error])

  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600 mb-4 border border-primary-200">
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>

      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600 mb-2">
        System Notice
      </p>

      <h1 className="font-heading text-h2-mobile md:text-h2 font-bold text-primary-900 mb-3">
        Something went wrong
      </h1>

      <p className="text-body text-text-secondary max-w-lg mb-8 leading-relaxed">
        An unexpected error occurred while loading this page. Our technical team has been notified.
        You can try reloading the view or navigate back to the main portal.
      </p>

      {error.digest && (
        <p className="text-xs font-mono text-text-tertiary mb-6 bg-surface-alt border border-border px-3 py-1.5 rounded">
          Error Reference ID: {error.digest}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
        >
          Try again
        </button>

        <Link
          href="/"
          className="rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text-secondary hover:text-primary-700 hover:border-primary-300 transition-colors"
        >
          Return to Home
        </Link>

        <Link
          href="/reach-us"
          className="rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text-secondary hover:text-primary-700 hover:border-primary-300 transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </div>
  )
}
