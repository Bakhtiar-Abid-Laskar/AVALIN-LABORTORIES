import type { LightProduct } from '../types'

const vitacomin: LightProduct = {
  slug: 'vitacomin-capsule',
  name: 'Vitacomin Capsule',
  template: 'light',
  classification: 'OTC',
  therapeuticArea: 'vitamins-minerals-nutrition',

  shortDescription:
    'A multivitamin and multimineral supplement used to manage vitamin and mineral deficiency arising from poor dietary habits, malabsorption, or increased nutritional demand due to stress or illness.',

  keyIngredients: [
    'Lycopene',
    'Ginseng Extract',
    'Vitamin A',
    'Vitamin B1 (Mononitrate)',
    'Vitamin B2 (Riboflavin)',
    'Niacinamide',
    'Vitamin B6',
    'Cyanocobalamin (Vitamin B12)',
    'Vitamin D3',
    'Calcium Pantothenate',
    'Folic Acid',
    'Dibasic Calcium Phosphate (Elemental Calcium & Phosphorus)',
    'Dried Ferrous Sulphate (Elemental Iron)',
    'Magnesium Sulphate',
    'Zinc Sulphate Monohydrate',
  ],

  keyBenefits: [
    'Restores decreased levels of essential vitamins and minerals',
    'Provides energy for daily activities and supports immune function',
    'Essential for overall growth, development, and cellular health',
  ],

  directionsForUse:
    'As mentioned on the label or as advised by a healthcare professional.',

  safetyInformation:
    'Read the label carefully before use. Store in a cool, dry place away from direct sunlight. Keep out of reach of children. Do not exceed the recommended dose.',

  storage: 'Store in a cool, dry place away from sunlight.',

  manufacturer: {
    name:    'Eastern Healthcare',
    address: 'Plot No. 7, Sector-6A, JIE SIIDCUL, Haridwar-249403 (Uttarakhand)',
  },

  marketer: {
    name:    'Avalin Laboratories Pvt Ltd',
    address: 'ASEB Road, Opp. ASTC Workshop, Ulubari, Guwahati, Assam 781007',
  },
}

export default vitacomin
