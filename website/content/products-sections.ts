/**
 * Single Source of Truth for /products section definitions, order, and metadata.
 * Drives both the sticky in-page navigation bar and the section body order.
 */

export type ProductSectionId =
  | 'overview'
  | 'prescription'
  | 'otc'
  | 'catalog'
  | 'therapeutic-areas'

export interface ProductSectionCounts {
  total: number
  rx: number
  otc: number
  ta: number
}

export interface ProductSectionDef {
  id: ProductSectionId
  label: string
  eyebrow: string
  badge?: 'Rx' | 'OTC'
  getCount?: (counts: ProductSectionCounts) => number | null
}

export const PRODUCT_SECTIONS: readonly ProductSectionDef[] = [
  {
    id: 'overview',
    label: 'Overview',
    eyebrow: 'Commercial & Hospital Formulary',
  },
  {
    id: 'prescription',
    label: 'Prescription Medicines',
    eyebrow: 'Schedule H & Ethical Formulations',
    badge: 'Rx',
    getCount: (c) => c.rx,
  },
  {
    id: 'otc',
    label: 'OTC Products',
    eyebrow: 'Direct Healthcare & Wellness',
    badge: 'OTC',
    getCount: (c) => c.otc,
  },
  {
    id: 'catalog',
    label: 'Product Catalog',
    eyebrow: 'Interactive Database',
    getCount: (c) => c.total,
  },
  {
    id: 'therapeutic-areas',
    label: 'Therapeutic Areas',
    eyebrow: 'Specialized Disciplines',
    getCount: (c) => c.ta,
  },
] as const
