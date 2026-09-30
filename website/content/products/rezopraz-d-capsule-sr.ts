import type { FullProduct } from '../types'

const rezoprazD: FullProduct = {
  slug: 'rezopraz-d-capsule-sr',
  name: 'Rezopraz D Capsule SR',
  template: 'full',
  classification: 'Rx',
  therapeuticArea: 'gastrointestinal',

  composition: [
    { ingredient: 'Domperidone',  strength: '30 mg' },
    { ingredient: 'Rabeprazole', strength: '20 mg' },
  ],

  shortDescription:
    'Treats gastroesophageal reflux disease (GERD). Reduces stomach acid production and improves gut motility, relieving heartburn, stomach pain, and irritation.',

  uses: [
    'Treatment of Gastroesophageal reflux disease (GERD / acid reflux)',
  ],

  benefits: [
    {
      heading: 'Reduces stomach acid',
      body: 'Rabeprazole (a proton pump inhibitor) provides potent and sustained reduction of stomach acid production, relieving heartburn and protecting the oesophagus.',
    },
    {
      heading: 'Improves gut motility',
      body: 'Domperidone (a D2 receptor antagonist / prokinetic) improves the rate at which the stomach empties, reducing nausea, bloating, and regurgitation.',
    },
    {
      heading: 'Controls nausea and vomiting',
      body: 'Domperidone also acts on the chemoreceptor trigger zone in the brain to reduce the sensation of nausea and the urge to vomit.',
    },
  ],

  sideEffects: [
    'No common side effects seen at recommended doses',
    'Diarrhoea (reported in some patients)',
    'Stomach pain (reported in some patients)',
    'Headache (reported in some patients)',
    'Weakness (reported in some patients)',
    'Flatulence (reported in some patients)',
  ],

  howToUse:
    'Swallow the capsule whole on an empty stomach, preferably in the morning, 1 hour before breakfast. Do not chew, crush, or open the capsule.',

  howItWorks:
    'Domperidone is a selective dopamine D2 receptor antagonist that enhances gastric and intestinal motility (prokinetic), speeding up gastric emptying and reducing nausea. It also acts on the chemoreceptor trigger zone (CTZ) in the brain. Rabeprazole is a proton pump inhibitor (PPI) that irreversibly inhibits the gastric H+/K+-ATPase enzyme (proton pump), providing sustained reduction in gastric acid secretion.',

  quickTips: [
    'Take 1 hour before a meal, preferably in the morning.',
    'Report watery diarrhoea, fever, or persistent stomach pain to your doctor.',
    'If no improvement after 14 days, consult your doctor.',
    'Long-term use may require calcium or magnesium supplementation — discuss with your doctor.',
    'Use caution if taking methotrexate or certain antiviral drugs — consult your doctor about interactions.',
  ],

  safetyAdvice: {
    alcohol:       { rating: 'consult-doctor', note: 'Effect of alcohol with this medicine is not known. Consult your doctor.' },
    pregnancy:     { rating: 'unsafe',         note: 'Can cause serious harm including birth defects and pregnancy loss. Do not use during pregnancy.' },
    breastfeeding: { rating: 'unsafe',         note: 'May cause toxicity to the nursing infant. Do not use while breastfeeding.' },
    driving:       { rating: 'unsafe',         note: 'May decrease alertness and affect driving ability. Do not drive or operate machinery.' },
    kidney:        { rating: 'caution',        note: 'Dose adjustment may be required in kidney disease. Consult your doctor.' },
    liver:         { rating: 'unsafe',         note: 'Not recommended in patients with moderate to severe liver disease.' },
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

export default rezoprazD
