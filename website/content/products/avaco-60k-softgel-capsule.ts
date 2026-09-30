import type { FullProduct } from '../types'

const avaco60k: FullProduct = {
  slug: 'avaco-60k-softgel-capsule',
  name: 'Avaco 60K Softgel Capsule',
  template: 'full',
  classification: 'Rx',
  therapeuticArea: 'vitamins-minerals-nutrition',

  composition: [
    { ingredient: 'Vitamin D3 (Cholecalciferol)', strength: '60,000 IU' },
  ],

  shortDescription:
    'Treats Vitamin D deficiency and osteoporosis. Helps the body absorb calcium effectively, contributing to strong bones and a healthy immune system.',

  uses: [
    'Treatment of Vitamin D deficiency',
    'Treatment of Osteoporosis',
  ],

  benefits: [
    {
      heading: 'Corrects Vitamin D deficiency',
      body: 'A single high-dose capsule provides 60,000 IU of Vitamin D3, rapidly correcting deficiency and restoring normal blood vitamin D levels.',
    },
    {
      heading: 'Improved calcium absorption',
      body: 'Vitamin D3 significantly enhances intestinal absorption of calcium from food, ensuring adequate calcium availability for bones and muscles.',
    },
    {
      heading: 'Supports bone health and reduces fracture risk',
      body: 'Adequate Vitamin D is essential for bone mineralisation. It helps prevent osteoporosis and reduces the risk of fractures, particularly in older adults.',
    },
    {
      heading: 'Immune system support',
      body: 'Vitamin D3 plays a role in modulating immune function, supporting the body\'s defence against infections.',
    },
  ],

  sideEffects: [
    'No common side effects seen at recommended doses',
    'Overdose may cause weakness, muscle pain, metallic taste, nausea, or vomiting',
  ],

  howToUse:
    'Swallow the capsule whole with or after food. Take as directed by your doctor — typically once weekly or as prescribed.',

  howItWorks:
    'Vitamin D3 (cholecalciferol) is the natural form of Vitamin D that the body synthesises from sunlight. When taken orally, it raises blood vitamin D levels, which in turn stimulates the intestines to absorb more calcium from food. Adequate calcium and Vitamin D working together support bone mineralisation, muscle function, and immune regulation.',

  quickTips: [
    'Take with food for faster and better absorption.',
    'Aim for 10–40 minutes of sun exposure 3 times per week and eat Vitamin D-rich foods (egg yolk, mushrooms, dairy, oily fish).',
    'Avoid taking this medicine at night as it may affect sleep quality.',
    'Do not take antacids within 2 hours of this medicine.',
    'Watch for signs of excessive Vitamin D: nausea, vomiting, poor appetite, constipation, weakness, or weight loss.',
  ],

  safetyAdvice: {
    alcohol:       { rating: 'consult-doctor',     note: 'Effect of alcohol on this medicine is not known. Consult your doctor.' },
    pregnancy:     { rating: 'safe-if-prescribed', note: 'No harmful effects observed in animal studies. Generally considered safe when prescribed.' },
    breastfeeding: { rating: 'safe-if-prescribed', note: 'Low or no adverse effects. Likely safe when taken at prescribed doses.' },
    driving:       { rating: 'safe',               note: 'Avaco 60K does not usually affect the ability to drive.' },
    kidney:        { rating: 'safe-if-prescribed', note: 'Use with caution. Contraindicated in severe renal impairment or a history of kidney stones.' },
    liver:         { rating: 'safe-if-prescribed', note: 'No dose adjustment required for liver disease.' },
  },

  factBox: {
    habitForming:     'No',
    therapeuticClass: 'Vitamins, Minerals & Nutrients',
    chemicalClass:    'Vitamin D derivative',
    actionClass:      'Vitamins',
  },

  storage: 'Store below 25°C in a cool, dry place away from direct sunlight. Keep out of reach of children.',

  marketer: {
    name:    'Avalin Laboratories Pvt Ltd',
    address: 'ASEB Road, Opp. ASTC Workshop, Ulubari, Guwahati, Assam 781007',
  },
}

export default avaco60k
