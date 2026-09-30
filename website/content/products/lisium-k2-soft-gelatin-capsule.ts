import type { FullProduct } from '../types'

const lisiumK2: FullProduct = {
  slug: 'lisium-k2-soft-gelatin-capsule',
  name: 'Lisium K2 Soft Gelatin Capsule',
  template: 'full',
  classification: 'Rx',
  therapeuticArea: 'vitamins-minerals-nutrition',

  composition: [
    { ingredient: 'Calcitriol',            strength: '0.25 mcg' },
    { ingredient: 'Calcium Citrate Malate', strength: '500 mg'  },
    { ingredient: 'Magnesium',             strength: '40 mg'    },
    { ingredient: 'Vitamin K2-7',          strength: '45 mcg'   },
  ],

  shortDescription:
    'A combination of mineral and vitamin supplements prescribed to treat nutritional deficiencies. Ensures proper growth and functioning of the body and strengthens immunity.',

  uses: ['Treatment of Nutritional deficiencies'],

  benefits: [
    {
      heading: 'Highly absorbable calcium for bone health',
      body: 'Calcium Citrate Malate is one of the most bioavailable forms of calcium, helping to build and maintain strong bones and reducing the risk of fractures.',
    },
    {
      heading: 'Enhanced calcium absorption',
      body: 'Calcitriol (active vitamin D) regulates the body\'s use of dietary calcium and parathyroid hormone, ensuring calcium is effectively absorbed and utilised.',
    },
    {
      heading: 'Bone mineralisation support',
      body: 'Magnesium plays an essential role in bone mineralisation and muscle function, working alongside calcium to maintain skeletal integrity.',
    },
    {
      heading: 'Cardiovascular and immune support',
      body: 'Vitamin K2-7 directs calcium to bones rather than arteries, helping to reduce fracture risk and supporting cardiovascular health and immune function.',
    },
  ],

  sideEffects: [
    'Limited data available on common side effects',
    'Excessive doses may cause hypercalcaemia (high blood calcium)',
  ],

  howToUse:
    'Swallow the capsule whole with or without food. Do not chew, crush, or break. Take as directed by your doctor.',

  howItWorks:
    'Calcitriol is the active form of Vitamin D that helps the body utilise dietary calcium and regulates parathyroid hormone levels. Calcium Citrate Malate is a highly bioavailable calcium salt that is well absorbed even without food. Magnesium supports bone mineralisation and enzymatic functions. Vitamin K2-7 (menaquinone) activates proteins that bind calcium into bone and prevents its deposition in blood vessels, reducing fracture risk and supporting cardiovascular health.',

  quickTips: [
    'Take after meals with water for better absorption.',
    'Avoid consuming high-oxalate foods (spinach, strong tea) at the same time.',
    'Maintain at least a 2-hour gap from iron supplements or thyroid medications.',
    'Inform your doctor if you are on blood thinners (e.g., warfarin) — Vitamin K2 may interact.',
    'Do not exceed the prescribed dose; excess calcium can cause hypercalcaemia.',
  ],

  safetyAdvice: {
    alcohol:       { rating: 'caution',        note: 'Use with caution; avoid excessive alcohol intake as it may affect calcium absorption.' },
    pregnancy:     { rating: 'consult-doctor', note: 'Safety during pregnancy has not been fully established. Use only if your doctor has prescribed it.' },
    breastfeeding: { rating: 'consult-doctor', note: 'No adequate data available. Consult your doctor before using while breastfeeding.' },
    driving:       { rating: 'consult-doctor', note: 'The effect on driving ability is not known. Exercise caution until you know how this medicine affects you.' },
    kidney:        { rating: 'caution',        note: 'Use with caution in patients with severe kidney disease. Dose adjustment may be required.' },
    liver:         { rating: 'consult-doctor', note: 'Limited data available. Consult your doctor if you have a liver condition.' },
  },

  factBox: {
    habitForming:     'No',
    therapeuticClass: 'Vitamins, Minerals & Nutrients',
    chemicalClass:    null,
    actionClass:      null,
  },

  storage: 'Store below 25°C in a cool, dry place away from direct sunlight. Keep out of reach of children.',

  marketer: {
    name:    'Avalin Laboratories Pvt Ltd',
    address: 'ASEB Road, Opp. ASTC Workshop, Ulubari, Guwahati, Assam 781007',
  },
}

export default lisiumK2
