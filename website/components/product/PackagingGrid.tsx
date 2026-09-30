'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface PackagingGridProps {
  images: string[]
  productName: string
}

const VIEW_LABELS = [
  'Primary Packshot & Front Panel',
  'Composition & Usage Details',
  'Packaging Warnings & Storage Specs',
  'Statutory Markings & Blister / Bottle',
  'Secondary Angle & Batch Details',
]

export function PackagingGrid({ images, productName }: PackagingGridProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const lastActiveTriggerRef = useRef<HTMLDivElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)

  // Body scroll lock and focus management
  useEffect(() => {
    if (activeImageIndex !== null) {
      document.body.style.overflow = 'hidden'
      closeButtonRef.current?.focus()
      return () => {
        document.body.style.overflow = ''
        lastActiveTriggerRef.current?.focus()
      }
    }
  }, [activeImageIndex])

  // Escape key & Tab focus trap listener
  useEffect(() => {
    if (activeImageIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveImageIndex(null)
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0))
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0))
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length > 0) {
          const first = focusable[0]
          const last = focusable[focusable.length - 1]
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault()
              last.focus()
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault()
              first.focus()
            }
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeImageIndex, images.length])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || activeImageIndex === null) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd
    if (diff > 50) {
      setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0))
    }
    if (diff < -50) {
      setActiveImageIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0))
    }
    setTouchStart(null)
  }

  if (!images || images.length === 0) return null


  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {images.map((img, idx) => {
          const label = VIEW_LABELS[idx] || `Packaging View ${idx + 1}`
          return (
            <div
              key={img}
              ref={idx === activeImageIndex ? lastActiveTriggerRef : undefined}
              onClick={() => setActiveImageIndex(idx)}
              className="group rounded-card border border-border bg-surface-alt p-4 hover:shadow-card-hover hover:border-primary-200 transition-all duration-200 cursor-pointer flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveImageIndex(idx)
                }
              }}
              aria-label={`View ${idx + 1}: ${label} — Enlarge image`}
            >
              <div className="relative h-56 w-full rounded-xl bg-surface border border-border/80 p-3 flex items-center justify-center overflow-hidden mb-3">
                <Image
                  src={img}
                  alt={`${productName} - ${label}`}
                  fill
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100%25' height='100%25' fill='%23F4F3EF'/%3E%3C/svg%3E"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 left-2.5 rounded-md bg-surface/90 backdrop-blur border border-border px-2 py-0.5 text-[11px] font-semibold text-text-secondary">
                  View {idx + 1}
                </span>
                <span className="absolute bottom-2.5 right-2.5 rounded-full bg-surface/90 backdrop-blur border border-border p-1.5 text-text-tertiary group-hover:text-primary-600 transition-colors shadow-2xs">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </span>
              </div>

              <div>
                <p className="font-heading font-semibold text-sm text-primary-900 group-hover:text-primary-600 transition-colors">
                  {label}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in print:hidden"
          onClick={() => setActiveImageIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="packaging-lightbox-title"
        >
          <div
            ref={modalRef}
            className="relative max-w-3xl w-full rounded-2xl bg-surface border border-border shadow-2xl p-6 sm:p-8 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-border">
              <div>
                <h3 id="packaging-lightbox-title" className="font-heading font-bold text-primary-900 text-base sm:text-lg">
                  {productName}
                </h3>
                <p className="text-xs text-text-tertiary">
                  {VIEW_LABELS[activeImageIndex] || `View ${activeImageIndex + 1}`} ({activeImageIndex + 1} of {images.length})
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setActiveImageIndex(null)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full border border-border p-2 text-text-secondary hover:text-primary-700 hover:bg-surface-alt transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                aria-label="Close packaging viewer"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div
              className="relative h-80 sm:h-96 md:h-[460px] w-full flex items-center justify-center touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={images[activeImageIndex]}
                alt={`${productName} — ${VIEW_LABELS[activeImageIndex] || `packaging view ${activeImageIndex + 1}`}`}
                fill
                sizes="(max-width: 1024px) 90vw, 768px"
                className="object-contain"
                priority
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev !== null ? (prev - 1 + images.length) % images.length : 0
                      )
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-surface/90 border border-border p-2.5 text-text-secondary hover:text-primary-700 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                    aria-label="Previous packaging image"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        prev !== null ? (prev + 1) % images.length : 0
                      )
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-surface/90 border border-border p-2.5 text-text-secondary hover:text-primary-700 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                    aria-label="Next packaging image"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>


            {images.length > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2.5 overflow-x-auto py-1 max-w-full">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-16 w-16 rounded-lg bg-surface border p-1 transition-all overflow-hidden flex-shrink-0 ${
                      idx === activeImageIndex
                        ? 'border-primary-600 ring-2 ring-primary-600/30 scale-105 shadow-sm'
                        : 'border-border opacity-70 hover:opacity-100 hover:border-primary-300'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${productName} thumbnail ${idx + 1}`}
                      fill
                      sizes="64px"
                      className="object-contain p-0.5"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
