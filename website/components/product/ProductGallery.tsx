'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

const PANEL_DESCRIPTIONS = [
  'primary carton, front brand panel and formulation strength',
  'blister packaging / bottle composition and dosage details',
  'side panel with directions, warnings, and batch details',
  'statutory markings and packaging angle',
  'secondary package inspection view',
]

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const triggerRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)

  const imageList = images && images.length > 0 ? images : []
  const currentImage = imageList[selectedIndex] || imageList[0]

  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % imageList.length)
  }, [imageList.length])

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + imageList.length) % imageList.length)
  }, [imageList.length])

  // Keyboard navigation & focus management for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false)
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()

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
  }, [isLightboxOpen, nextImage, prevImage])

  // Body scroll lock and focus management
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden'
      closeButtonRef.current?.focus()
      return () => {
        document.body.style.overflow = ''
        triggerRef.current?.focus()
      }
    }
  }, [isLightboxOpen])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd
    if (diff > 50) nextImage() // Swiped left -> next
    if (diff < -50) prevImage() // Swiped right -> prev
    setTouchStart(null)
  }

  if (imageList.length === 0) return null

  const currentDesc = PANEL_DESCRIPTIONS[selectedIndex] || `packaging angle ${selectedIndex + 1}`

  return (
    <div className="flex flex-col items-center">
      {/* ─── MAIN STAGE ─── */}
      <div className="group relative h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80 rounded-2xl bg-surface border border-border shadow-sm p-4 flex items-center justify-center overflow-hidden">
        {/* Main Image */}
        <div
          ref={triggerRef}
          className="relative h-full w-full cursor-zoom-in flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 rounded-lg"
          onClick={() => setIsLightboxOpen(true)}
          role="button"
          tabIndex={0}
          aria-label={`Enlarge ${productName} — ${currentDesc}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setIsLightboxOpen(true)
            }
          }}
        >
          <Image
            src={currentImage}
            alt={`${productName} — ${currentDesc}`}
            fill
            priority
            placeholder="blur"
            blurDataURL="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100%25' height='100%25' fill='%23F4F3EF'/%3E%3C/svg%3E"
            sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 320px"
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Counter Badge */}
        {imageList.length > 1 && (
          <span className="absolute top-3 left-3 rounded-full bg-surface/90 backdrop-blur border border-border px-2.5 py-0.5 text-[11px] font-semibold text-text-secondary shadow-2xs pointer-events-none print:hidden">
            {selectedIndex + 1} / {imageList.length}
          </span>
        )}

        {/* Expand / Lightbox Icon Trigger */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-3 right-3 rounded-full bg-surface/90 backdrop-blur border border-border p-1.5 text-text-secondary hover:text-primary-700 hover:border-primary-300 transition-colors shadow-2xs print:hidden"
          title="Click to enlarge"
          aria-label="Enlarge image"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </button>

        {/* Arrow Navigation (visible if > 1 image) */}
        {imageList.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-surface/90 backdrop-blur border border-border p-1.5 text-text-secondary hover:text-primary-700 hover:border-primary-300 opacity-80 group-hover:opacity-100 transition-all shadow-sm print:hidden"
              aria-label="Previous image"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-surface/90 backdrop-blur border border-border p-1.5 text-text-secondary hover:text-primary-700 hover:border-primary-300 opacity-80 group-hover:opacity-100 transition-all shadow-sm print:hidden"
              aria-label="Next image"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* ─── THUMBNAIL STRIP ─── */}
      {imageList.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-2 max-w-xs sm:max-w-sm flex-wrap print:hidden">
          {imageList.map((img, idx) => {
            const isSelected = idx === selectedIndex
            return (
              <button
                key={img}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`View packaging image ${idx + 1}`}
                className={`relative h-14 w-14 rounded-lg bg-surface border p-1 transition-all overflow-hidden ${
                  isSelected
                    ? 'border-primary-600 ring-2 ring-primary-600/30 scale-105 shadow-sm'
                    : 'border-border opacity-70 hover:opacity-100 hover:border-primary-300'
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  sizes="56px"
                  className="object-contain p-0.5"
                />
              </button>
            )
          })}
        </div>
      )}

      {/* ─── FULLSCREEN LIGHTBOX MODAL ─── */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in print:hidden"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} image viewer`}
        >

          <div
            ref={modalRef}
            className="relative max-w-3xl w-full rounded-2xl bg-surface border border-border shadow-2xl p-6 sm:p-8 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-border">
              <div>
                <h3 id="lightbox-title" className="font-heading font-bold text-primary-900 text-base sm:text-lg">
                  {productName}
                </h3>
                <p className="text-xs text-text-tertiary">
                  Packaging view {selectedIndex + 1} of {imageList.length} — {currentDesc}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full border border-border p-2 text-text-secondary hover:text-primary-700 hover:bg-surface-alt transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                aria-label="Close image viewer"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Large Lightbox Image View with Touch Swipe */}
            <div
              className="relative h-80 sm:h-96 md:h-[460px] w-full flex items-center justify-center touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={currentImage}
                alt={`${productName} — ${currentDesc}`}
                fill
                sizes="(max-width: 1024px) 90vw, 768px"
                className="object-contain"
                priority
              />

              {/* Prev / Next Modal Arrows (min 44x44px touch target) */}
              {imageList.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-surface/90 border border-border p-2.5 text-text-secondary hover:text-primary-700 hover:border-primary-300 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                    aria-label="Previous packaging view"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-surface/90 border border-border p-2.5 text-text-secondary hover:text-primary-700 hover:border-primary-300 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                    aria-label="Next packaging view"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>


            {/* Modal Bottom Thumbnails */}
            {imageList.length > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2.5 overflow-x-auto py-1 max-w-full">
                {imageList.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative h-16 w-16 rounded-lg bg-surface border p-1 transition-all overflow-hidden flex-shrink-0 ${
                      idx === selectedIndex
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
    </div>
  )
}
