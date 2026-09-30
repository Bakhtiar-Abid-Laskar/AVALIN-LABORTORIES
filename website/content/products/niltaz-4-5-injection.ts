import type { FullProduct } from '../types'

const niltaz: FullProduct = {
  slug: 'niltaz-4-5-injection',
  name: 'Niltaz 4.5 Injection',
  template: 'full',
  classification: 'Rx',
  therapeuticArea: 'anti-infective',

  composition: [
    { ingredient: 'Piperacillin', strength: '4000 mg' },
    { ingredient: 'Tazobactam',  strength: '500 mg'  },
  ],

  shortDescription:
    'A combination antibiotic that treats a wide range of bacterial infections by killing microorganisms. Effective against infections of the ear, sinuses, throat, lungs, urinary tract, skin, joints, and bones.',

  uses: [
    'Bacterial infections of the ear, sinuses, and throat',
    'Respiratory tract infections (pneumonia)',
    'Urinary tract infections',
    'Skin and soft tissue infections',
    'Bone and joint infections',
  ],

  benefits: [
    {
      heading: 'Broad-spectrum antibiotic coverage',
      body: 'Piperacillin is an extended-spectrum penicillin antibiotic effective against both gram-positive and gram-negative bacteria, including Pseudomonas aeruginosa.',
    },
    {
      heading: 'Beta-lactamase inhibition',
      body: 'Tazobactam inhibits beta-lactamase enzymes produced by resistant bacteria, preventing them from breaking down piperacillin and expanding the range of organisms that can be treated.',
    },
    {
      heading: 'Effective against resistant organisms',
      body: 'The combination is active against many bacteria that are resistant to standard penicillins, making it a valuable treatment for hospital-acquired and community infections.',
    },
  ],

  sideEffects: [
    'Diarrhoea',
    'Nausea',
    'Vomiting',
    'Rash',
    'Injection site reactions (pain, redness, swelling)',
  ],

  howToUse:
    'Administered by a healthcare professional only as an intravenous infusion. Do not self-administer. Complete the full prescribed course even if you feel better.',

  howItWorks:
    'Piperacillin is a penicillin-type antibiotic that kills bacteria by interfering with bacterial cell wall synthesis — specifically by binding to penicillin-binding proteins, preventing cross-linking of peptidoglycan chains and causing cell lysis. Tazobactam is a beta-lactamase inhibitor that binds to and irreversibly inhibits the beta-lactamase enzymes produced by resistant bacteria, protecting piperacillin from enzymatic degradation and restoring its antibacterial activity.',

  quickTips: [
    'Complete the full course of treatment even if symptoms improve early — stopping early can cause antibiotic resistance.',
    'Diarrhoea may occur during treatment. Probiotics may help; report bloody stools or severe abdominal cramps to your doctor.',
    'Stop this medicine and inform your doctor immediately if you develop an itchy rash, swelling of the face/throat/tongue, or breathing difficulty (signs of an allergic reaction).',
  ],

  safetyAdvice: {
    alcohol:       { rating: 'safe',               note: 'No usual harmful interaction with alcohol at recommended doses.' },
    pregnancy:     { rating: 'safe-if-prescribed', note: 'No harmful effects observed in animal studies. Use only if prescribed by your doctor.' },
    breastfeeding: { rating: 'safe-if-prescribed', note: 'Unlikely to cause harm to the nursing infant at prescribed doses.' },
    driving:       { rating: 'consult-doctor',     note: 'Effect on driving ability is not fully established. Exercise caution.' },
    kidney:        { rating: 'caution',            note: 'Dose adjustment may be needed in patients with kidney disease as piperacillin is renally excreted.' },
    liver:         { rating: 'safe-if-prescribed', note: 'Dose adjustment is generally not required in patients with liver disease.' },
  },

  factBox: {
    habitForming:     'No',
    therapeuticClass: 'Anti-infectives',
    chemicalClass:    null,
    actionClass:      null,
  },

  storage: 'Store below 30°C in a cool, dry place. Keep out of reach of children.',

  marketer: {
    name:    'Avalin Laboratories Pvt Ltd',
    address: 'ASEB Road, Opp. ASTC Workshop, Ulubari, Guwahati, Assam 781007',
  },
}

export default niltaz
