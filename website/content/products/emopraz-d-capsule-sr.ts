import type { FullProduct } from '../types'

const emoprazD: FullProduct = {
  slug: 'emopraz-d-capsule-sr',
  name: 'Emopraz-D Capsule SR',
  template: 'full',
  classification: 'Rx',
  therapeuticArea: 'gastrointestinal',

  composition: [
    { ingredient: 'Domperidone',  strength: '30 mg' },
    { ingredient: 'Esomeprazole', strength: '40 mg' },
  ],

  shortDescription:
    'Treats gastroesophageal reflux disease (GERD / acid reflux). Relieves heartburn, stomach pain, and irritation by reducing acid production and improving gastric motility.',

  uses: [
    'Treatment of Gastroesophageal reflux disease (GERD / acid reflux)',
  ],

  benefits: [
    {
      heading: 'Reduces stomach acid production',
      body: 'Esomeprazole (a proton pump inhibitor) blocks the enzyme responsible for acid secretion, providing sustained relief from heartburn and acid-related symptoms.',
    },
    {
      heading: 'Improves gastric motility',
      body: 'Domperidone (a prokinetic agent) increases movement of the stomach and intestines, helping food move through the digestive tract more efficiently and reducing nausea.',
    },
    {
      heading: 'Relieves heartburn and regurgitation',
      body: 'The combination addresses both the root cause (excess acid) and the symptom trigger (delayed gastric emptying), providing comprehensive GERD relief.',
    },
  ],

  sideEffects: [
    'Diarrhoea',
    'Headache',
    'Nausea',
    'Abdominal pain',
  ],

  howToUse:
    'Swallow the capsule whole on an empty stomach, 30 minutes to 1 hour before a meal. Do not chew, crush, or open the capsule.',

  howItWorks:
    'Domperidone is a dopamine D2 receptor antagonist (prokinetic) that increases contractions of the stomach and upper intestine, speeding up gastric emptying and reducing nausea and vomiting. Esomeprazole is a proton pump inhibitor (PPI) that irreversibly blocks the H+/K+-ATPase enzyme in gastric parietal cells, reducing stomach acid production for up to 24 hours.',

  quickTips: [
    'Take 30 minutes to 1 hour before a meal, on an empty stomach.',
    'Report watery diarrhoea, fever, or persistent stomach pain to your doctor.',
    'Long-term use may cause reduced bone density or magnesium deficiency — your doctor may recommend supplements.',
  ],

  safetyAdvice: {
    alcohol:       { rating: 'consult-doctor', note: 'Effect of alcohol on this medicine is not known. Consult your doctor.' },
    pregnancy:     { rating: 'consult-doctor', note: 'Animal studies show positive evidence of fetal risk. Use only if prescribed by your doctor.' },
    breastfeeding: { rating: 'unsafe',         note: 'May cause toxicity to the nursing infant. Avoid use while breastfeeding.' },
    driving:       { rating: 'unsafe',         note: 'May decrease alertness and cause sleepiness or dizziness. Do not drive until you know how this medicine affects you.' },
    kidney:        { rating: 'caution',        note: 'Dose adjustment may be needed in patients with kidney disease. Consult your doctor.' },
    liver:         { rating: 'unsafe',         note: 'Avoid in patients with liver disease. Consult your doctor.' },
  },

  factBox: {
    habitForming:     'No',
    therapeuticClass: 'Gastro-intestinal',
    chemicalClass:    null,
    actionClass:      null,
  },

  storage: 'Store below 25°C in a cool, dry place. Keep out of reach of children.',

  marketer: {
    name:    'Avalin Laboratories Pvt Ltd',
    address: 'ASEB Road, Opp. ASTC Workshop, Ulubari, Guwahati, Assam 781007',
  },
}

export default emoprazD
