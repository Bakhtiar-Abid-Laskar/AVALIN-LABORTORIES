import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600 mb-3">
        404
      </p>
      <h1 className="font-heading text-h2 font-bold text-primary-900 mb-4">
        Page not found
      </h1>
      <p className="text-body text-text-secondary max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
        Please use the navigation above or try one of the links below.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors shadow-cta"
        >
          Go to Home
        </Link>
        <Link
          href="/products"
          className="rounded-lg border border-brand-200 bg-surface-alt px-5 py-2.5 text-sm font-semibold text-brand-800 hover:bg-brand-50 hover:border-brand-400 transition-colors"
        >
          Browse Products
        </Link>
        <Link
          href="/reach-us"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}
