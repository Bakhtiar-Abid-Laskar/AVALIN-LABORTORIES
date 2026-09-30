'use client'

/**
 * BackToTop — scroll-to-top floating action button — Avalin Laboratories
 *
 * Smooth animated enter/exit with motion tokens.
 * Appears when scrollY > scroll.backToTop.
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { scroll, duration, ease } from '@/lib/motion'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > scroll.backToTop)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: shouldReduceMotion ? 0 : duration.fast, ease: ease.standard }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom,0px))] right-4 sm:bottom-6 sm:right-6 z-50 h-11 w-11 rounded-full bg-primary-600 text-white shadow-card-hover hover:bg-primary-700 active:scale-95 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 flex items-center justify-center print:hidden"
        >
          <Icon name="arrow-up" size={20} className="stroke-[2.2]" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
