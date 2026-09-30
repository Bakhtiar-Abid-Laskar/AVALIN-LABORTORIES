/**
 * Product data loader — single source of truth for all product access.
 * getAllProducts() and getProductBySlug() are the ONLY ways the app reads products.
 */
import type { Product, TherapeuticArea } from '../content/types'

import lisiumK2        from '../content/products/lisium-k2-soft-gelatin-capsule'
import vitacomin       from '../content/products/vitacomin-capsule'
import lisiumTablet    from '../content/products/lisium-tablet'
import adezymeSymp     from '../content/products/adezyme-syrup'
import avaco60k        from '../content/products/avaco-60k-softgel-capsule'
import emoprazD        from '../content/products/emopraz-d-capsule-sr'
import provilin        from '../content/products/provilin-capsule'
import xlpIV           from '../content/products/xlp-iv-infusion'
import neuronM         from '../content/products/neuron-m-tablet'
import niltaz          from '../content/products/niltaz-4-5-injection'
import nilaxoneS       from '../content/products/nilaxone-s-injection'
import rezoprazD       from '../content/products/rezopraz-d-capsule-sr'
import ursentin300     from '../content/products/ursentin-300-tablet'

export const ONE_MG_URLS: Record<string, string> = {
  'lisium-k2-soft-gelatin-capsule': 'https://www.1mg.com/drugs/lisium-k2-soft-gelatin-capsule-954672',
  'vitacomin-capsule':              'https://www.1mg.com/otc/vitacomin-capsule-otc954370',
  'lisium-tablet':                  'https://www.1mg.com/drugs/lisium-tablet-954374',
  'adezyme-syrup':                  'https://www.1mg.com/otc/adezyme-syrup-otc954332',
  'avaco-60k-softgel-capsule':       'https://www.1mg.com/drugs/avaco-60k-softgel-capsule-954383',
  'emopraz-d-capsule-sr':           'https://www.1mg.com/drugs/emopraz-d-capsule-sr-962811',
  'provilin-capsule':               'https://www.1mg.com/drugs/provilin-capsule-1082671',
  'xlp-iv-infusion':                'https://www.1mg.com/drugs/xlp-iv-infusion-1082681',
  'neuron-m-tablet':                'https://www.1mg.com/drugs/neuron-m-tablet-1082662',
  'niltaz-4-5-injection':           'https://www.1mg.com/drugs/niltaz-4.5-injection-1082686',
  'nilaxone-s-injection':           'https://www.1mg.com/drugs/nilaxone-s-injection-1082656',
  'rezopraz-d-capsule-sr':          'https://www.1mg.com/drugs/rezopraz-d-capsule-sr-962814',
  'ursentin-300-tablet':            'https://www.1mg.com/drugs/ursentin-300-tablet-1082652',
}

export const PRODUCT_IMAGES: Record<string, string[]> = {
  'adezyme-syrup': [
    '/products/adezyme-syrup/adezyme-syrup-01.jpg',
    '/products/adezyme-syrup/adezyme-syrup-02.jpg',
    '/products/adezyme-syrup/adezyme-syrup-03.jpg',
  ],
  'avaco-60k-softgel-capsule': [
    '/products/avaco-60k-softgel-capsule/avaco-60k-softgel-capsule-01.jpg',
    '/products/avaco-60k-softgel-capsule/avaco-60k-softgel-capsule-02.jpg',
    '/products/avaco-60k-softgel-capsule/avaco-60k-softgel-capsule-04.jpg',
  ],
  'emopraz-d-capsule-sr': [
    '/products/emopraz-d-capsule-sr/emopraz-d-capsule-sr-01.jpg',
    '/products/emopraz-d-capsule-sr/emopraz-d-capsule-sr-02.jpg',
    '/products/emopraz-d-capsule-sr/emopraz-d-capsule-sr-04.jpg',
  ],
  'lisium-k2-soft-gelatin-capsule': [
    '/products/lisium-k2-soft-gelatin-capsule/lisium-k2-soft-gelatin-capsule-01.jpg',
    '/products/lisium-k2-soft-gelatin-capsule/lisium-k2-soft-gelatin-capsule-02.jpg',
  ],
  'lisium-tablet': [
    '/products/lisium-tablet/lisium-tablet-01.jpg',
    '/products/lisium-tablet/lisium-tablet-02.jpg',
    '/products/lisium-tablet/lisium-tablet-04.jpg',
  ],
  'neuron-m-tablet': [
    '/products/neuron-m-tablet/neuron-m-tablet-01.jpg',
    '/products/neuron-m-tablet/neuron-m-tablet-02.jpg',
    '/products/neuron-m-tablet/neuron-m-tablet-03.jpg',
    '/products/neuron-m-tablet/neuron-m-tablet-05.jpg',
  ],
  'nilaxone-s-injection': [
    '/products/nilaxone-s-injection/nilaxone-s-injection-01.jpg',
    '/products/nilaxone-s-injection/nilaxone-s-injection-02.jpg',
    '/products/nilaxone-s-injection/nilaxone-s-injection-03.jpg',
    '/products/nilaxone-s-injection/nilaxone-s-injection-05.jpg',
  ],
  'niltaz-4-5-injection': [
    '/products/niltaz-4-5-injection/niltaz-4-5-injection-01.jpg',
    '/products/niltaz-4-5-injection/niltaz-4-5-injection-02.jpg',
    '/products/niltaz-4-5-injection/niltaz-4-5-injection-03.jpg',
    '/products/niltaz-4-5-injection/niltaz-4-5-injection-05.jpg',
  ],
  'provilin-capsule': [
    '/products/provilin-capsule/provilin-capsule-01.jpg',
    '/products/provilin-capsule/provilin-capsule-02.jpg',
    '/products/provilin-capsule/provilin-capsule-03.jpg',
  ],
  'rezopraz-d-capsule-sr': [
    '/products/rezopraz-d-capsule-sr/rezopraz-d-capsule-sr-01.jpg',
    '/products/rezopraz-d-capsule-sr/rezopraz-d-capsule-sr-02.jpg',
    '/products/rezopraz-d-capsule-sr/rezopraz-d-capsule-sr-04.jpg',
  ],
  'ursentin-300-tablet': [
    '/products/ursentin-300-tablet/ursentin-300-tablet-01.jpg',
    '/products/ursentin-300-tablet/ursentin-300-tablet-02.jpg',
    '/products/ursentin-300-tablet/ursentin-300-tablet-03.jpg',
    '/products/ursentin-300-tablet/ursentin-300-tablet-05.jpg',
  ],
  'vitacomin-capsule': [
    '/products/vitacomin-capsule/vitacomin-capsule-01.jpg',
    '/products/vitacomin-capsule/vitacomin-capsule-02.jpg',
    '/products/vitacomin-capsule/vitacomin-capsule-03.jpg',
  ],
  'xlp-iv-infusion': [
    '/products/xlp-iv-infusion/xlp-iv-infusion-01.jpg',
    '/products/xlp-iv-infusion/xlp-iv-infusion-02.jpg',
    '/products/xlp-iv-infusion/xlp-iv-infusion-04.jpg',
  ],
}

export function getOneMgUrl(slug: string): string | undefined {
  return ONE_MG_URLS[slug]
}

export function getProductImages(slug: string): string[] {
  return PRODUCT_IMAGES[slug] || [`/products/${slug}/${slug}-01.jpg`]
}

const RAW_PRODUCTS: Product[] = [
  lisiumK2,
  lisiumTablet,
  vitacomin,
  adezymeSymp,
  avaco60k,
  emoprazD,
  provilin,
  xlpIV,
  neuronM,
  niltaz,
  nilaxoneS,
  rezoprazD,
  ursentin300,
]

// Enrich each product with its authentic 1mg reference URL and full image set
const ALL_PRODUCTS: Product[] = RAW_PRODUCTS.map((p) => ({
  ...p,
  oneMgUrl: ONE_MG_URLS[p.slug] || undefined,
  images: PRODUCT_IMAGES[p.slug] || [`/products/${p.slug}/${p.slug}-01.jpg`],
}))

export function getAllProducts(): Product[] {
  return ALL_PRODUCTS
}

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug)
}

export function getProductsByTherapeuticArea(area: TherapeuticArea): Product[] {
  return ALL_PRODUCTS.filter((p) => p.therapeuticArea === area)
}

export function getProductsByClassification(classification: 'Rx' | 'OTC'): Product[] {
  return ALL_PRODUCTS.filter((p) => p.classification === classification)
}

export function getAllProductSlugs(): string[] {
  return ALL_PRODUCTS.map((p) => p.slug)
}
