'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Product, Classification } from '@/content/types'
import { therapeuticAreaLabels, isFullProduct } from '@/content/types'
import { ClassificationBadge } from '@/components/product/ClassificationBadge'

interface CatalogTableProps {
  products: Product[]
}

export function CatalogTable({ products }: CatalogTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [classificationFilter, setClassificationFilter] = useState<'All' | Classification>('All')
  const [selectedArea, setSelectedArea] = useState<string>('All')
  const [sortField, setSortField] = useState<'name' | 'therapeuticArea' | null>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Initialize filter state from URL parameters on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const q = params.get('q')
    const classification = params.get('classification')
    const area = params.get('area')
    const sort = params.get('sort')
    const order = params.get('order')

    if (q) setSearchQuery(q)
    if (classification === 'Rx' || classification === 'OTC') {
      setClassificationFilter(classification)
    }
    if (area && area !== 'All') {
      setSelectedArea(area)
    }
    if (sort === 'name' || sort === 'therapeuticArea') {
      setSortField(sort)
    }
    if (order === 'asc' || order === 'desc') {
      setSortOrder(order)
    }
  }, [])

  // Sync state to URL without full page reload
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)

    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim())
    } else {
      params.delete('q')
    }

    if (classificationFilter !== 'All') {
      params.set('classification', classificationFilter)
    } else {
      params.delete('classification')
    }

    if (selectedArea !== 'All') {
      params.set('area', selectedArea)
    } else {
      params.delete('area')
    }

    if (sortField && sortField !== 'name') {
      params.set('sort', sortField)
    } else {
      params.delete('sort')
    }

    if (sortOrder && sortOrder !== 'asc') {
      params.set('order', sortOrder)
    } else {
      params.delete('order')
    }

    const queryStr = params.toString()
    const newPath = queryStr
      ? `${window.location.pathname}?${queryStr}`
      : window.location.pathname

    if (newPath !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(null, '', newPath)
    }
  }, [searchQuery, classificationFilter, selectedArea, sortField, sortOrder])

  const toggleSort = (field: 'name' | 'therapeuticArea') => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  // Unique therapeutic areas present in the dataset
  const uniqueAreas = useMemo(() => {
    const areas = new Set(products.map((p) => p.therapeuticArea))
    return Array.from(areas)
  }, [products])

  // Dynamic suggestions generated from real active ingredients and therapeutic areas
  const sampleSuggestions = useMemo(() => {
    const list: string[] = []
    uniqueAreas.forEach((area) => {
      const label = therapeuticAreaLabels[area]
      if (label && !list.includes(label)) list.push(label)
    })
    for (const p of products) {
      if (list.length >= 8) break
      if (isFullProduct(p)) {
        for (const c of p.composition) {
          if (!list.includes(c.ingredient) && list.length < 8) {
            list.push(c.ingredient)
          }
        }
      } else {
        for (const ing of p.keyIngredients) {
          if (!list.includes(ing) && list.length < 8) {
            list.push(ing)
          }
        }
      }
    }
    return list.slice(0, 6)
  }, [products, uniqueAreas])

  // Filtered and sorted products list (tolerant of punctuation, multiple tokens, extra spaces)
  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase().replace(/[^\w\s]/gi, ' ').replace(/\s+/g, ' ')
    const queryTokens = normalizedQuery ? normalizedQuery.split(' ').filter(Boolean) : []

    const filtered = products.filter((p) => {
      // Classification filter
      if (classificationFilter !== 'All' && p.classification !== classificationFilter) {
        return false
      }
      // Therapeutic area filter
      if (selectedArea !== 'All' && p.therapeuticArea !== selectedArea) {
        return false
      }
      // Search query filter (matches all tokens against searchable metadata)
      if (queryTokens.length > 0) {
        const nameText = p.name.toLowerCase()
        const descText = p.shortDescription.toLowerCase()
        const areaText = (therapeuticAreaLabels[p.therapeuticArea] || '').toLowerCase()

        let ingredientText = ''
        if (isFullProduct(p)) {
          ingredientText = p.composition.map((c) => c.ingredient.toLowerCase()).join(' ')
        } else {
          ingredientText = p.keyIngredients.map((ing) => ing.toLowerCase()).join(' ')
        }

        const searchableBlock = `${nameText} ${descText} ${areaText} ${ingredientText}`
        return queryTokens.every((token) => searchableBlock.includes(token))
      }
      return true
    })

    if (!sortField) return filtered

    return [...filtered].sort((a, b) => {
      let valA = ''
      let valB = ''
      if (sortField === 'name') {
        valA = a.name.toLowerCase()
        valB = b.name.toLowerCase()
      } else if (sortField === 'therapeuticArea') {
        valA = (therapeuticAreaLabels[a.therapeuticArea] || a.therapeuticArea).toLowerCase()
        valB = (therapeuticAreaLabels[b.therapeuticArea] || b.therapeuticArea).toLowerCase()
      }
      const cmp = valA.localeCompare(valB)
      return sortOrder === 'asc' ? cmp : -cmp
    })
  }, [products, searchQuery, classificationFilter, selectedArea, sortField, sortOrder])

  const resetFilters = () => {
    setSearchQuery('')
    setClassificationFilter('All')
    setSelectedArea('All')
    setSortField('name')
    setSortOrder('asc')
  }

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="rounded-card border border-border bg-surface-alt p-5 shadow-sm space-y-4 print:hidden">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <label htmlFor="catalog-search" className="sr-only">
              Search medicines
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-tertiary">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="catalog-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by brand name, ingredient, or area..."
              className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-8 text-base sm:text-sm text-text-primary placeholder:text-text-tertiary focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-text-tertiary hover:text-text-primary"
                aria-label="Clear search"
              >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>

          {/* Area Selector and Formulary PDF Download */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
              <label htmlFor="area-select" className="text-xs font-semibold text-text-secondary whitespace-nowrap">
                Therapeutic Area:
              </label>
              <select
                id="area-select"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full sm:w-auto rounded-lg border border-border bg-surface px-3 py-2.5 text-base sm:text-xs font-medium text-text-primary focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 transition-colors"
              >
                <option value="All">All Therapeutic Areas</option>
                {uniqueAreas.map((area) => (
                  <option key={area} value={area}>
                    {therapeuticAreaLabels[area] || area}
                  </option>
                ))}
              </select>
            </div>

            <a
              href="/avalin-product-formulary-2026.pdf"
              download="avalin-product-formulary-2026.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary-200 bg-primary-50 px-4 py-2.5 text-xs font-semibold text-primary-800 hover:bg-primary-100 hover:border-primary-300 transition-colors shadow-2xs whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 w-full sm:w-auto"
              title="Download Avalin Official Product Formulary (PDF, 36 KB)"
              aria-label="Download product formulary (PDF, 36 KB)"
            >
              <svg className="h-4 w-4 text-primary-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span>Download Formulary (PDF, 36 KB)</span>
            </a>
          </div>
        </div>

        {/* Classification Pill Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/60 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-text-tertiary mr-1 font-medium">Filter:</span>
            {(['All', 'Rx', 'OTC'] as const).map((filter) => {
              const isActive = classificationFilter === filter
              const count =
                filter === 'All'
                  ? products.length
                  : products.filter((p) => p.classification === filter).length
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setClassificationFilter(filter)}
                  className={`rounded-full px-3 py-1 font-medium transition-all ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-surface text-text-secondary border border-border hover:border-primary-300 hover:text-primary-700'
                  }`}
                >
                  {filter === 'All' ? 'All Portfolio' : filter === 'Rx' ? 'Prescription (Rx)' : 'OTC Medicines'}
                  <span className={`ml-1.5 text-[11px] opacity-80 ${isActive ? 'text-white' : 'text-text-tertiary'}`}>
                    ({count})
                  </span>
                </button>
              )
            })}
          </div>

          {/* Result Count and Reset with aria-live */}
          <div className="flex items-center gap-3 text-text-tertiary" aria-live="polite">
            <span>
              Showing <strong className="text-text-primary font-semibold">{filteredProducts.length}</strong> of {products.length} medicines
            </span>
            {(searchQuery || classificationFilter !== 'All' || selectedArea !== 'All') && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-primary-600 hover:text-primary-800 underline font-medium"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product Table / Cards */}
      {filteredProducts.length === 0 ? (
        <div
          className="rounded-card border border-dashed border-border bg-surface-alt p-8 sm:p-12 text-center"
          aria-live="polite"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600 mb-3">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="font-heading text-lg font-bold text-primary-900 mb-1">
            No matching products found
          </h2>
          <p className="text-sm text-text-secondary max-w-md mx-auto mb-4 leading-relaxed">
            {searchQuery ? (
              <>No medicine matched your query &ldquo;<strong className="text-text-primary">{searchQuery}</strong>&rdquo;. Try searching for an active ingredient or therapeutic category below:</>
            ) : (
              <>We couldn&apos;t find any medicine matching your selected filter criteria. Try resetting your filters.</>
            )}
          </p>

          {/* Dynamic Suggestion Chips from Real Data */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
            <span className="text-xs font-medium text-text-tertiary mr-1">Suggested searches:</span>
            {sampleSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setSearchQuery(suggestion)}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-primary-700 hover:border-primary-400 hover:bg-primary-50 transition-colors shadow-2xs"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={resetFilters}
              className="w-full sm:w-auto rounded-lg bg-primary-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-primary-700 transition-colors"
            >
              Clear search &amp; filters
            </button>
            <Link
              href="/reach-us"
              className="w-full sm:w-auto rounded-lg border border-border bg-surface px-5 py-2.5 text-xs font-semibold text-text-secondary hover:text-primary-700 hover:border-primary-300 transition-colors"
            >
              Contact us for products not listed / institutional enquiries →
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-card border border-border bg-surface-alt shadow-card">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm" role="table" aria-label="Avalin Laboratories Product Catalog">
              <thead>
                <tr className="border-b border-border bg-primary-50">
                  <th
                    scope="col"
                    aria-sort={sortField === 'name' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
                    className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-primary-700"
                  >
                    <button
                      type="button"
                      onClick={() => toggleSort('name')}
                      className="inline-flex items-center gap-1.5 font-semibold text-primary-800 hover:text-primary-950 focus-visible:outline-none focus-visible:underline"
                      title="Sort by Product Brand"
                    >
                      <span>Product Brand</span>
                      <span aria-hidden="true" className="text-xs text-primary-600">
                        {sortField === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    </button>
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-primary-700">
                    Active Formulation
                  </th>
                  <th
                    scope="col"
                    aria-sort={sortField === 'therapeuticArea' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
                    className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-primary-700"
                  >
                    <button
                      type="button"
                      onClick={() => toggleSort('therapeuticArea')}
                      className="inline-flex items-center gap-1.5 font-semibold text-primary-800 hover:text-primary-950 focus-visible:outline-none focus-visible:underline"
                      title="Sort by Therapeutic Area"
                    >
                      <span>Therapeutic Area</span>
                      <span aria-hidden="true" className="text-xs text-primary-600">
                        {sortField === 'therapeuticArea' ? (sortOrder === 'asc' ? '▲' : '▼') : '↕'}
                      </span>
                    </button>
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-primary-700">
                    Category
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-primary-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProducts.map((product, i) => {
                  const ingredients = isFullProduct(product)
                    ? product.composition.map((c) => `${c.ingredient} ${c.strength}`).join(' + ')
                    : product.keyIngredients.join(' • ')
                  const imageSrc = `/products/${product.slug}/${product.slug}-01.jpg`
                  return (
                    <tr
                      key={product.slug}
                      className={`hover:bg-primary-50/50 transition-colors ${i % 2 === 1 ? 'bg-surface-muted/30' : 'bg-surface-alt'}`}
                    >
                      <td className="px-5 py-3.5 font-semibold text-primary-900">
                        <div className="flex items-center gap-3.5">
                          <div className="relative h-12 w-12 flex-shrink-0 rounded-lg border border-border bg-surface p-1 flex items-center justify-center overflow-hidden">
                            <Image
                              src={imageSrc}
                              alt={`${product.name} packaging`}
                              width={44}
                              height={44}
                              className="object-contain max-h-full max-w-full"
                            />
                          </div>
                          <div>
                            <Link
                              href={`/products/${product.slug}`}
                              className="hover:text-primary-600 transition-colors focus-visible:underline font-heading font-bold"
                            >
                              {product.name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-xs font-mono text-text-secondary max-w-xs truncate">
                        {ingredients}
                      </td>
                      <td className="px-5 py-3.5 text-xs font-medium text-text-secondary">
                        {therapeuticAreaLabels[product.therapeuticArea]}
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <ClassificationBadge classification={product.classification} size="sm" />
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-3 min-h-[44px]">
                          {product.oneMgUrl && (
                            <a
                              href={product.oneMgUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg bg-surface border border-border px-3 py-2 min-h-[44px] text-xs font-medium text-text-secondary hover:text-brand-800 hover:border-brand-400 hover:bg-brand-50/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 whitespace-nowrap"
                              title={`View ${product.name} on Tata 1mg (external site)`}
                            >
                              <span>Tata 1mg</span>
                              <svg className="h-3.5 w-3.5 opacity-60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                          <Link
                            href={`/products/${product.slug}`}
                            className="inline-flex items-center gap-1 min-h-[44px] px-2.5 py-2 text-xs font-semibold text-brand-700 hover:text-brand-900 rounded-lg hover:bg-brand-50/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                            aria-label={`View clinical profile for ${product.name}`}
                          >
                            Profile →
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View */}
          <div className="md:hidden p-3.5 sm:p-4 space-y-4 bg-surface-muted/40">
            {filteredProducts.map((product) => {
              const ingredients = isFullProduct(product)
                ? product.composition.map((c) => `${c.ingredient} ${c.strength}`).join(' + ')
                : product.keyIngredients.join(' • ')
              const imageSrc = `/products/${product.slug}/${product.slug}-01.jpg`
              return (
                <div
                  key={product.slug}
                  className="rounded-2xl border border-brand-200/80 bg-surface-alt p-4 space-y-3.5 shadow-2xs hover:shadow-card transition-all"
                >
                  <div className="flex gap-3.5 items-start">
                    <Link
                      href={`/products/${product.slug}`}
                      className="relative h-20 w-20 flex-shrink-0 rounded-xl border border-brand-200/70 bg-surface p-2 flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity"
                      aria-label={`View clinical details for ${product.name}`}
                    >
                      <Image
                        src={imageSrc}
                        alt={`${product.name} packaging`}
                        width={72}
                        height={72}
                        className="object-contain max-h-full max-w-full"
                      />
                    </Link>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-heading font-bold text-primary-950 text-base leading-snug">
                          <Link href={`/products/${product.slug}`} className="hover:text-primary-700 transition-colors">
                            {product.name}
                          </Link>
                        </h3>
                        <ClassificationBadge classification={product.classification} size="sm" />
                      </div>
                      <p className="text-xs font-medium text-text-tertiary">
                        {therapeuticAreaLabels[product.therapeuticArea]}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-brand-200/60 bg-brand-50/50 p-2.5">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-text-tertiary block mb-0.5">
                      Active Formulation
                    </span>
                    <p className="text-xs font-mono font-medium text-brand-950 leading-relaxed">
                      {ingredients}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2 border-t border-border/70">
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-xl bg-brand-50 text-xs font-semibold text-brand-800 hover:bg-brand-100 hover:text-brand-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 w-full sm:w-auto text-center"
                    >
                      <span>Clinical Profile</span>
                      <span aria-hidden="true">→</span>
                    </Link>

                    {product.oneMgUrl && (
                      <a
                        href={product.oneMgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-surface border border-border px-3.5 py-2.5 min-h-[44px] text-xs font-medium text-text-secondary hover:text-brand-800 hover:border-brand-400 hover:bg-brand-50/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 whitespace-nowrap w-full sm:w-auto text-center"
                        title={`View ${product.name} on Tata 1mg (external site)`}
                      >
                        <span>View on Tata 1mg</span>
                        <svg className="h-3.5 w-3.5 opacity-60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
