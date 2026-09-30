import type { FullProduct } from '../types'

const provilin: FullProduct = {
  slug: 'provilin-capsule',
  name: 'Provilin Capsule',
  template: 'full',
  classification: 'Rx',
  therapeuticArea: 'probiotics',

  composition: [
    { ingredient: 'Lactobacillus Acidophilus',  strength: '2 Billion CFU' },
    { ingredient: 'Lactobacillus rhamnosus',    strength: '2 Billion CFU' },
    { ingredient: 'Lactobacillus reuteri',      strength: '2 Billion CFU' },
    { ingredient: 'Lactobacillus Plantarum',    strength: '1 Billion CFU' },
    { ingredient: 'Lactobacillus casei',        strength: '1 Billion CFU' },
    { ingredient: 'Lactobacillus fermentum',    strength: '1 Billion CFU' },
    { ingredient: 'Bifidobacterium bifidum',    strength: '1 Billion CFU' },
    { ingredient: 'Fructo Oligosaccharide (FOS)', strength: '100 mg'     },
  ],

  shortDescription:
    'A multi-strain probiotic and prebiotic dietary supplement supporting digestive health, balancing the gut microbiome, enhancing nutrient absorption, reducing gut inflammation, and strengthening immunity.',

  uses: [
    'Nutritional deficiencies',
    'Support for digestive health and gut microbiome balance',
  ],

  benefits: [
    {
      heading: 'Multi-strain probiotic support',
      body: 'A blend of seven clinically recognised probiotic strains replenishes beneficial gut bacteria that may be depleted by antibiotics, illness, or poor diet.',
    },
    {
      heading: 'Balances gut microbiome',
      body: 'The probiotic strains work synergistically to restore healthy bacterial balance in the digestive tract, supporting regular bowel movements.',
    },
    {
      heading: 'Prebiotic boost with FOS',
      body: 'Fructo Oligosaccharide (FOS) acts as a prebiotic — it selectively feeds the beneficial probiotic bacteria, enhancing their survival and activity in the gut.',
    },
    {
      heading: 'Strengthens immunity',
      body: 'A healthy gut microbiome is closely linked to immune function. Restoring gut flora with Provilin supports the body\'s natural defences.',
    },
  ],

  sideEffects: [
    'Bloating',
    'Upset stomach',
    'Flatulence',
  ],

  howToUse:
    'Take the capsule with or after food. Store in the refrigerator (2–8°C). Do not freeze. Keep out of reach of children.',

  howItWorks:
    'Provilin\'s seven probiotic strains colonise the gut, displacing harmful bacteria and producing substances (such as lactic acid and bacteriocins) that inhibit pathogen growth. They regulate bowel movement and reduce gut inflammation. The prebiotic Fructo Oligosaccharide is not digested by the human gut but is selectively fermented by the probiotic bacteria, promoting their growth and activity.',

  quickTips: [
    'Consult your doctor about your dietary habits — probiotics work best alongside a balanced diet.',
    'Inform your doctor if you have a family history of irritable bowel syndrome (IBS).',
    'Managing stress and anxiety can improve the effectiveness of probiotic therapy.',
  ],

  safetyAdvice: {
    alcohol:       { rating: 'consult-doctor', note: 'Effect of alcohol on this medicine is not known. Consult your doctor.' },
    pregnancy:     { rating: 'consult-doctor', note: 'Adequate safety data during pregnancy is not available. Use only under medical supervision.' },
    breastfeeding: { rating: 'consult-doctor', note: 'Data on use during breastfeeding is unavailable. Consult your doctor.' },
    driving:       { rating: 'consult-doctor', note: 'Effect on driving ability is not known. Exercise caution.' },
    kidney:        { rating: 'consult-doctor', note: 'Limited data available in patients with kidney disease. Consult your doctor.' },
    liver:         { rating: 'consult-doctor', note: 'Limited data available in patients with liver disease. Consult your doctor.' },
  },

  factBox: {
    habitForming:     'No',
    therapeuticClass: 'Gastro-intestinal',
    chemicalClass:    null,
    actionClass:      null,
  },

  storage: 'Store in refrigerator (2–8°C). Do not freeze. Keep out of reach of children.',

  marketer: {
    name:    'Avalin Laboratories Pvt Ltd',
    address: 'ASEB Road, Opp. ASTC Workshop, Ulubari, Guwahati, Assam 781007',
  },
}

export default provilin
