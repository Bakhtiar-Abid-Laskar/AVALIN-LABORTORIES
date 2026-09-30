'use client'

/**
 * Header — primary site navigation — Avalin Laboratories
 *
 * Features:
 *   - Scroll-aware elevation and background
 *   - Route-aware active indicator with Framer Motion layoutId
 *   - Animated dropdown menus
 *   - Animated mobile navigation drawer with backdrop
 *   - Strictly derived from site-config and motion tokens (no magic values)
 */

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { nav, site, contacts } from '@/lib/site-config'
import { scroll, duration, ease } from '@/lib/motion'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { PhoneLink } from '@/components/ui/PhoneLink'
import { cn } from '@/lib/utils'

type NavItem = {
  href: string
  label: string
  children?: readonly { href: string; label: string }[]
}

const primaryNav = nav.primary as readonly NavItem[]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()

  // Scroll detection via motion token threshold
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > scroll.headerSolid)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  // Accessible keyboard control: close menu or dropdown on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileOpen) setMobileOpen(false)
        if (openDropdown) setOpenDropdown(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen, openDropdown])

  // Helper to determine if link is active
  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-surface-alt/90 backdrop-blur-md transition-shadow duration-base print:static print:border-b print:shadow-none',
        scrolled ? 'shadow-header border-b border-brand-200/70' : 'border-b border-brand-200/40',
      )}
      role="banner"
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-90 focus-visible:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-md"
          aria-label={`${site.name} — return to homepage`}
        >
          <Image
            src="/brand/avalin-logo.png"
            alt={`${site.name} logo`}
            width={40}
            height={40}
            priority
            className="h-9 w-9 object-contain"
          />
          <span className="font-heading text-lg font-bold tracking-tight text-primary-900 block">
            {site.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1 print:hidden">
          {primaryNav.map((item) => {
            const hasChildren = 'children' in item && item.children && item.children.length > 0
            const active = isLinkActive(item.href)

            if (hasChildren) {
              const isOpen = openDropdown === item.label
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className={cn(
                      'relative flex items-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600',
                      active ? 'text-primary-700 font-semibold' : 'text-text-secondary hover:text-primary-600 hover:bg-primary-50/70',
                    )}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                  >
                    <span>{item.label}</span>
                    <Icon
                      name="chevron-down"
                      size={14}
                      className={cn('transition-transform duration-fast', isOpen && 'rotate-180')}
                      aria-hidden="true"
                    />
                    {active && (
                      <motion.span
                        layoutId={shouldReduceMotion ? undefined : 'nav-active-pill'}
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-raw rounded-full shadow-[0_0_8px_rgba(225,53,159,0.7)]"
                        transition={{ duration: shouldReduceMotion ? 0 : duration.base, ease: ease.standard }}
                      />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: shouldReduceMotion ? 0 : duration.fast, ease: ease.standard }}
                        className="absolute left-0 top-full z-50 mt-1 w-56 rounded-card bg-surface-alt shadow-card-hover border border-brand-200/80 py-1.5 overflow-hidden"
                      >
                        {item.children?.map((child) => {
                          const childActive = pathname === child.href
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                'block px-4 py-2 text-sm transition-colors duration-fast',
                                childActive
                                  ? 'bg-brand-50 font-semibold text-brand-800'
                                  : 'text-text-secondary hover:bg-brand-50/70 hover:text-brand-600',
                              )}
                            >
                              {child.label}
                            </Link>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
                  active ? 'text-brand-800 font-semibold' : 'text-text-secondary hover:text-brand-600 hover:bg-brand-50/70',
                )}
              >
                <span>{item.label}</span>
                {active && (
                  <motion.span
                    layoutId={shouldReduceMotion ? undefined : 'nav-active-pill'}
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-raw rounded-full shadow-[0_0_8px_rgba(225,53,159,0.7)]"
                    transition={{ duration: shouldReduceMotion ? 0 : duration.base, ease: ease.standard }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Desktop Header CTA */}
        <div className="hidden lg:flex items-center gap-3 print:hidden">
          <Button as={Link} href={nav.cta.href} variant="primary" size="sm">
            {nav.cta.label}
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          id="mobile-menu-button"
          type="button"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="lg:hidden print:hidden rounded-lg p-2 text-text-secondary hover:text-brand-600 hover:bg-brand-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Icon name={mobileOpen ? 'close' : 'menu'} size={22} aria-hidden="true" />
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              className="fixed inset-0 top-16 bg-brand-950/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Drawer */}
            <motion.div
              id="mobile-menu"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0, y: -8, scale: 0.99 } : { opacity: 0, y: -8, scale: 0.99 }}
              transition={{ duration: shouldReduceMotion ? 0 : duration.base, ease: ease.standard }}
              className="relative z-50 lg:hidden print:hidden border-t border-brand-200/80 bg-surface-alt/98 backdrop-blur-xl shadow-2xl"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="px-5 py-6 space-y-2 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
                <nav className="space-y-1.5" aria-label="Mobile site links">
                  {primaryNav.map((item) => {
                    const hasChildren = 'children' in item && item.children && item.children.length > 0
                    const active = isLinkActive(item.href)

                    return (
                      <div key={item.href} className="space-y-1">
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-all min-h-[48px]',
                            active
                              ? 'bg-brand-50 text-brand-900 shadow-2xs border border-brand-200/80 font-bold'
                              : 'text-text-primary hover:bg-brand-50/60 hover:text-brand-700',
                          )}
                          onClick={() => setMobileOpen(false)}
                        >
                          <span>{item.label}</span>
                          <span
                            className={cn(
                              'text-sm transition-transform',
                              active ? 'text-brand-600 font-bold' : 'text-text-tertiary',
                            )}
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </Link>

                        {hasChildren && (
                          <div className="ml-3 pl-3 border-l-2 border-brand-200/70 space-y-1 my-1">
                            {item.children?.slice(1).map((child) => {
                              const childActive = pathname === child.href
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={cn(
                                    'flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors min-h-[44px]',
                                    childActive
                                      ? 'text-brand-900 font-semibold bg-brand-50/80'
                                      : 'text-text-secondary hover:text-brand-700 hover:bg-brand-50/40',
                                  )}
                                  onClick={() => setMobileOpen(false)}
                                >
                                  <span>{child.label}</span>
                                </Link>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </nav>

                {/* Primary CTA and Location Footer */}
                <div className="pt-5 border-t border-border/80 mt-4 space-y-3">
                  <Button
                    as={Link}
                    href={nav.cta.href}
                    variant="primary"
                    size="lg"
                    className="w-full justify-center shadow-card font-semibold"
                    onClick={() => setMobileOpen(false)}
                  >
                    {nav.cta.label}
                  </Button>

                  <div className="text-center pt-2">
                    <p className="text-xs text-text-tertiary">
                      Guwahati, Assam •{' '}
                      <a
                        href="mailto:avalin.laboratories@gmail.com"
                        className="text-brand-700 hover:underline font-medium"
                      >
                        avalin.laboratories@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
