import type { FullProduct } from '../types'

const ursentin300: FullProduct = {
  slug: 'ursentin-300-tablet',
  name: 'Ursentin 300 Tablet',
  template: 'full',
  classification: 'Rx',
  therapeuticArea: 'hepatoprotective',

  composition: [
    { ingredient: 'Ursodeoxycholic Acid (Ursodiol)', strength: '300 mg' },
  ],

  shortDescription:
    'Treats cholesterol gallstones, primary biliary cirrhosis, primary sclerosing cholangitis, and cystic-fibrosis–related liver disease. Improves bile flow and helps break down cholesterol in bile.',

  uses: [
    'Gallbladder stones (cholesterol gallstones)',
    'Primary biliary cirrhosis',
    'Cystic fibrosis (liver involvement)',
    'Primary Sclerosing Cholangitis',
  ],

  benefits: [
    {
      heading: 'Dissolves cholesterol gallstones',
      body: 'Ursodeoxycholic acid (UDCA) reduces the amount of cholesterol in bile, making existing cholesterol gallstones soluble and gradually dissolving them without the need for surgery in suitable patients.',
    },
    {
      heading: 'Improves liver function',
      body: 'UDCA improves liver enzyme levels (ALT, AST, GGT, alkaline phosphatase), protecting liver cells from bile acid toxicity and reducing liver inflammation.',
    },
    {
      heading: 'Hepatoprotective (liver-protective)',
      body: 'By displacing toxic hydrophobic bile acids and improving bile flow, UDCA protects hepatocytes from bile acid–induced damage and cell death.',
    },
    {
      heading: 'Supports patients with chronic liver conditions',
      body: 'In primary biliary cirrhosis and primary sclerosing cholangitis, UDCA slows disease progression and improves survival in a subset of patients.',
    },
  ],

  sideEffects: [
    'Abdominal pain',
    'Diarrhoea',
    'Sinus inflammation (sinusitis)',
    'Nausea',
    'Headache',
    'Indigestion',
    'Viral infection (in some patients on long-term use)',
  ],

  howToUse:
    'Swallow the tablet whole with or after food, with milk or water, for better absorption. Take at the same time each day. Works gradually — continue the full course as prescribed.',

  howItWorks:
    'Ursodeoxycholic acid is a naturally occurring hydrophilic bile acid. It works by: (1) reducing the amount of cholesterol secreted into bile, increasing bile cholesterol solubility; (2) displacing hepatotoxic, hydrophobic bile acids from the bile acid pool, protecting liver cells; (3) improving bile flow (choleretic effect); and (4) modulating immune responses in autoimmune liver diseases such as primary biliary cirrhosis.',

  quickTips: [
    'Take after meals with milk or water for better absorption.',
    'Take regularly at the same time each day — this medicine works gradually and needs consistent use.',
    'Avoid alcohol and heavy or oily meals, which can worsen gallstone and liver conditions.',
    'Monitor for jaundice, severe itching, dark urine, pale stools, persistent pain, or fever — report immediately to your doctor.',
    'Do not stop this medicine without consulting your doctor, even if you feel well.',
  ],

  safetyAdvice: {
    alcohol:       { rating: 'consult-doctor',     note: 'Effect of alcohol is not known, and alcohol can worsen liver and gallbladder disease. Consult your doctor.' },
    pregnancy:     { rating: 'consult-doctor',     note: 'Safety during pregnancy has not been clearly established. Use only if prescribed.' },
    breastfeeding: { rating: 'consult-doctor',     note: 'Adequate data during breastfeeding is unavailable. Consult your doctor.' },
    driving:       { rating: 'safe',               note: 'Ursentin 300 does not usually affect the ability to drive.' },
    kidney:        { rating: 'consult-doctor',     note: 'Limited data available in patients with kidney disease. Consult your doctor.' },
    liver:         { rating: 'safe-if-prescribed', note: 'No dose adjustment required. This medicine is specifically used to treat liver conditions.' },
  },

  factBox: {
    habitForming:     'No',
    therapeuticClass: 'Gastro-intestinal',
    chemicalClass:    'Dihydroxy bile acid derivative',
    actionClass:      'Hepatoprotective Agents',
  },

  drugInteractions: [
    'Magaldrate',
    'Allylestrenol',
    'Conjugated Estrogens',
    'Dehydroepiandrosterone (Micronized)',
    'Desogestrel',
  ],

  storage: 'Store below 30°C in a cool, dry place away from direct sunlight. Keep out of reach of children.',

  marketer: {
    name:    'Avalin Laboratories Pvt Ltd',
    address: 'ASEB Road, Opp. ASTC Workshop, Ulubari, Guwahati, Assam 781007',
  },
}

export default ursentin300
