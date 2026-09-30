import type { FullProduct } from '../types'

const lisiumTablet: FullProduct = {
  slug: 'lisium-tablet',
  name: 'Lisium Tablet',
  template: 'full',
  classification: 'Rx',
  therapeuticArea: 'vitamins-minerals-nutrition',

  composition: [
    { ingredient: 'Calcium',    strength: '500 mg'  },
    { ingredient: 'Vitamin D3', strength: '250 IU'  },
  ],

  shortDescription:
    'A nutritional supplement for calcium deficiency. Increases calcium absorption from food and prevents or treats low blood calcium levels.',

  uses: [
    'Treatment and prevention of Calcium deficiency',
  ],

  benefits: [
    {
      heading: 'Prevents and treats low blood calcium',
      body: 'Calcium supplementation helps correct hypocalcaemia (low blood calcium), preventing conditions such as muscle cramps, spasms, and osteoporosis.',
    },
    {
      heading: 'Keeps bones strong',
      body: 'Adequate calcium intake is essential for maintaining bone density and reducing the risk of fractures, especially in post-menopausal women and the elderly.',
    },
    {
      heading: 'Supports nerve, muscle, and heart function',
      body: 'Calcium is critical for normal nerve signal transmission, muscle contraction, and maintaining a regular heartbeat.',
    },
    {
      heading: 'Enhanced absorption with Vitamin D3',
      body: 'Vitamin D3 raises blood vitamin D levels, significantly improving the amount of calcium absorbed from food and supplements.',
    },
  ],

  sideEffects: ['Limited data available on common side effects'],

  howToUse:
    'Swallow the tablet whole with or without food. Do not chew, crush, or break. Follow your doctor\'s prescribed dose and schedule.',

  howItWorks:
    'Calcium directly supplements the body\'s dietary intake of this essential mineral. Vitamin D3 (cholecalciferol) raises blood vitamin D levels, which in turn stimulates intestinal calcium absorption — ensuring that more of the calcium you consume is actually utilised by your body.',

  quickTips: [
    'Inform your doctor if you have kidney disease or a history of kidney stones.',
    'Tell your doctor about antihypertensives, antibiotics, heart, or bone medications you are taking.',
    'Iron supplements may reduce calcium absorption — take them at different times.',
    'Maintain a healthy lifestyle with a calcium-rich diet and weight-bearing exercise.',
  ],

  safetyAdvice: {
    alcohol:       { rating: 'consult-doctor',     note: 'Safety with alcohol is not established. Consult your doctor.' },
    pregnancy:     { rating: 'consult-doctor',     note: 'Animal studies show positive evidence of fetal risk. Use only if prescribed by your doctor.' },
    breastfeeding: { rating: 'safe-if-prescribed', note: 'Low or no adverse effects seen in animal studies. Likely safe when prescribed.' },
    driving:       { rating: 'safe',               note: 'Lisium Tablet does not usually affect the ability to drive.' },
    kidney:        { rating: 'unsafe',             note: 'Avoid in kidney disease. High calcium can worsen kidney function or cause kidney stones.' },
    liver:         { rating: 'safe-if-prescribed', note: 'No dose adjustment required for liver disease when used as prescribed.' },
  },

  factBox: {
    habitForming:     'No',
    therapeuticClass: 'Vitamins, Minerals & Nutrients',
    chemicalClass:    null,
    actionClass:      null,
  },

  storage: 'Store below 25°C in a cool, dry place. Keep out of reach of children.',

  marketer: {
    name:    'Avalin Laboratories Pvt Ltd',
    address: 'ASEB Road, Opp. ASTC Workshop, Ulubari, Guwahati, Assam 781007',
  },
}

export default lisiumTablet
