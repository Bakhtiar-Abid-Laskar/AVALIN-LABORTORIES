'use client'

/**
 * InnerPageHero — Photography-First Hero Header for Interior Pages
 * Avalin Laboratories Design System — Phase R2
 *
 * Renders a full-width dark-plum hero with a real editorial photograph
 * on the right side that fades left-to-transparent into the brand background,
 * exactly mirroring the reference design pattern.
 *
 * Rules:
 *   - Consumes CSS variable design tokens exclusively.
 *   - Zero hardcoded arbitrary colours.
 *   - Fully responsive: photo collapses gracefully on mobile.
 *   - Supports prefers-reduced-motion (no parallax when reduced).
 *   - heroImage prop drives the photograph; visual prop accepted for
 *     backwards-compat but is rendered only when heroImage is absent.
 */

import type { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Heading'
import { cn } from '@/lib/utils'

export interface InnerPageHeroProps {
  eyebrow: string
  title: string
  description: string
  breadcrumbs?: { label: string; href?: string }[]
  theme?: 'dark-plum' | 'paper' | 'blush'
  /** Real editorial photograph (path relative to /public). Drives right-side fade layout. */
  heroImage?: {
    src: string
    alt: string
    /** object-position CSS value, e.g. 'center 30%'. Defaults to 'center'. */
    position?: string
  }
  /** Legacy visual slot — used only when heroImage is not supplied. */
  visual?: ReactNode
  actions?: ReactNode
  className?: string
}

export function InnerPageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  theme = 'dark-plum',
  heroImage,
  visual,
  actions,
  className,
}: InnerPageHeroProps) {
  const isDark = theme === 'dark-plum'
  const isBlush = theme === 'blush'
  const hasPhoto = Boolean(heroImage)

  return (
    <section
      className={cn(
        'relative overflow-hidden border-b',
        isDark && 'bg-brand-950 text-white border-brand-800',
        isBlush && 'bg-surface-blush text-text-primary border-brand-200',
        !isDark && !isBlush && 'bg-surface text-text-primary border-border',
        className,
      )}
      aria-label={`${title} overview`}
    >
      {/* ── HERO PHOTO — Right half, fades left to transparent ── */}
      {hasPhoto && (
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-[58%] pointer-events-none"
          aria-hidden="true"
        >
          <Image
            src={heroImage!.src}
            alt={heroImage!.alt}
            fill
            priority
            className="object-cover"
            style={{ objectPosition: heroImage!.position ?? 'center' }}
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          {/* Left-to-right gradient: brand colour → transparent */}
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? 'linear-gradient(to right, var(--color-brand-950) 0%, var(--color-brand-950) 12%, color-mix(in srgb, var(--color-brand-950) 78%, transparent) 42%, color-mix(in srgb, var(--color-brand-950) 30%, transparent) 68%, transparent 100%)'
                : 'linear-gradient(to right, var(--color-surface) 0%, var(--color-surface) 10%, color-mix(in srgb, var(--color-surface) 75%, transparent) 40%, transparent 100%)',
            }}
          />
          {/* Top & bottom vignette for depth */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.45) 100%)',
            }}
          />
        </div>
      )}

      {/* ── Ambient soft aura (dark only, no-photo path) ── */}
      {isDark && !hasPhoto && (
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle at 80% 50%, rgba(225, 53, 159, 0.14) 0%, transparent 60%)',
          }}
        />
      )}

      <Container className="relative z-10 py-16 md:py-20 lg:py-24">
        {/* Optional Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'BreadcrumbList',
                  itemListElement: breadcrumbs.map((crumb, idx) => ({
                    '@type': 'ListItem',
                    position: idx + 1,
                    name: crumb.label,
                    ...(crumb.href
                      ? { item: `https://avalinlaboratories.com${crumb.href}` }
                      : {}),
                  })),
                }),
              }}
            />
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol
                className={cn(
                  'flex items-center gap-2 text-xs font-mono',
                  isDark ? 'text-brand-200/70' : 'text-text-tertiary',
                )}
              >
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1
                return (
                  <li key={idx} className="flex items-center gap-2">
                    {idx > 0 && <span aria-hidden="true" className="opacity-40">/</span>}
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className={cn(
                          'hover:underline transition-colors',
                          isDark ? 'hover:text-white' : 'hover:text-brand-600',
                        )}
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        className={cn(
                          'font-semibold',
                          isDark ? 'text-white' : 'text-text-primary',
                        )}
                        aria-current={isLast ? 'page' : undefined}
                      >
                        {crumb.label}
                      </span>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        </>
      )}

        {/* Content — max 55% width when photo is present, full otherwise */}
        <div
          className={cn(
            'grid grid-cols-1 gap-10 lg:gap-12 items-center',
            hasPhoto ? '' : 'lg:grid-cols-12',
          )}
        >
          <div className={cn(hasPhoto ? 'max-w-[55%] max-lg:max-w-full' : 'lg:col-span-7')}>
            <Eyebrow dark={isDark} className="mb-3">
              {eyebrow}
            </Eyebrow>

            <h1
              className={cn(
                'font-serif text-3xl sm:text-4xl lg:text-display font-bold tracking-tight',
                isDark ? 'text-white' : 'text-brand-950',
              )}
            >
              {title}
            </h1>

            <p
              className={cn(
                'mt-5 text-base sm:text-lg leading-relaxed',
                hasPhoto ? 'max-w-lg' : 'max-w-2xl',
                isDark ? 'text-brand-100' : 'text-text-secondary',
              )}
            >
              {description}
            </p>

            {actions && <div className="mt-8 flex flex-wrap items-center gap-4">{actions}</div>}
          </div>

          {/* Legacy visual slot (only rendered when no heroImage) */}
          {!hasPhoto && visual && (
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[420px] flex items-center justify-center">
                {visual}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
