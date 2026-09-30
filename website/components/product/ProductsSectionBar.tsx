'use client'

import { useState, useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import {
  PRODUCT_SECTIONS,
  type ProductSectionId,
  type ProductSectionCounts,
} from '@/content/products-sections'
import { cn } from '@/lib/utils'

interface ProductsSectionBarProps {
  counts: ProductSectionCounts
  className?: string
}

export function ProductsSectionBar({ counts, className }: ProductsSectionBarProps) {
  const [activeId, setActiveId] = useState<ProductSectionId>('overview')
  const navContainerRef = useRef<HTMLDivElement>(null)
  const chipRefs = useRef<Record<string, HTMLAnchorElement | null>>({})

  // IntersectionObserver for scroll-spy
  useEffect(() => {
    const handleScroll = () => {
      // If at the very top of the page, active is overview
      if (window.scrollY < 120) {
        setActiveId('overview')
        return
      }

      // Check each section position relative to header + nav offset (130px)
      const offset = 130
      let currentActive: ProductSectionId = 'overview'

      for (const section of PRODUCT_SECTIONS) {
        const el = document.getElementById(section.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= offset) {
            currentActive = section.id
          }
        }
      }

      setActiveId(currentActive)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Auto-scroll active chip into view horizontally on mobile
  useEffect(() => {
    const activeChip = chipRefs.current[activeId]
    if (activeChip && navContainerRef.current) {
      activeChip.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      })
    }
  }, [activeId])

  return (
    <div
      className={cn(
        'sticky top-16 z-30 bg-surface/95 backdrop-blur-md border-b border-border py-3 shadow-xs print:hidden',
        className
      )}
    >
      <Container>
        <div className="relative">
          {/* Subtle mobile edge fade indicators */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-surface to-transparent sm:hidden z-10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-surface to-transparent sm:hidden z-10"
            aria-hidden="true"
          />

          <nav
            ref={navContainerRef}
            aria-label="Products Section Navigation"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 text-xs font-semibold scroll-smooth"
          >
            <span className="text-text-tertiary mr-1 shrink-0 uppercase tracking-wider text-[11px] font-mono select-none">
              Sections:
            </span>

            {PRODUCT_SECTIONS.map((section) => {
              const isActive = activeId === section.id
              const count = section.getCount ? section.getCount(counts) : null

              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  ref={(el) => {
                    chipRefs.current[section.id] = el
                  }}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'rounded-full border px-3.5 py-1.5 transition-colors shrink-0 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1',
                    isActive
                      ? 'bg-brand-700 text-white border-brand-700 shadow-xs'
                      : 'bg-surface-alt border-border text-text-secondary hover:text-brand-800 hover:border-brand-300 hover:bg-brand-50/50'
                  )}
                >
                  <span>{section.label}</span>
                  {count !== null && count !== undefined && (
                    <span
                      className={cn(
                        'rounded-full text-[10px] px-1.5 py-0.2 font-mono transition-colors',
                        isActive
                          ? 'bg-white/20 text-white'
                          : section.badge === 'OTC'
                            ? 'bg-otc-bg text-otc-text'
                            : 'bg-brand-100 text-brand-800'
                      )}
                    >
                      {count}
                    </span>
                  )}
                </a>
              )
            })}
          </nav>
        </div>
      </Container>
    </div>
  )
}
