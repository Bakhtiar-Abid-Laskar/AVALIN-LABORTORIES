'use client'

import { useState, useEffect } from 'react'

interface Section {
  id: string
  label: string
}

interface ProductAnchorNavProps {
  sections: Section[]
}

export function ProductAnchorNav({ sections }: ProductAnchorNavProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  return (
    <nav aria-label="On this page" className="rounded-card border border-border bg-surface-alt p-5 shadow-2xs">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">
        On this page
      </h3>
      <ul className="space-y-1">
        {sections.map((section) => {
          const isActive = activeId === section.id
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`block rounded px-2.5 py-1.5 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1 ${
                  isActive
                    ? 'font-semibold text-primary-900 bg-primary-50/80 border-l-2 border-primary-600 pl-2'
                    : 'text-text-secondary hover:text-primary-700 hover:bg-surface'
                }`}
              >
                {section.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
