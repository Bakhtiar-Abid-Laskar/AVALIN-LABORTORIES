import type { FullProduct } from '../types'

const nilaxoneS: FullProduct = {
  slug: 'nilaxone-s-injection',
  name: 'Nilaxone-S Injection',
  template: 'full',
  classification: 'Rx',
  therapeuticArea: 'anti-infective',

  composition: [
    { ingredient: 'Ceftriaxone', strength: '1000 mg' },
    { ingredient: 'Sulbactam',   strength: '500 mg'  },
  ],

  shortDescription:
    'A combination antibiotic that treats bacterial infections by preventing bacterial growth and spread. Effective against infections of the ear, sinuses, throat, lungs, urinary tract, and skin.',

  uses: [
    'Bacterial infections of the ear, sinuses, and throat',
    'Respiratory tract infections (pneumonia)',
    'Urinary tract infections',
    'Skin and soft tissue infections',
  ],

  benefits: [
    {
      heading: 'Third-generation cephalosporin antibiotic',
      body: 'Ceftriaxone has a broad spectrum of activity against both gram-positive and gram-negative bacteria and excellent tissue penetration, making it effective for severe infections.',
    },
    {
      heading: 'Beta-lactamase inhibition',
      body: 'Sulbactam is a beta-lactamase inhibitor that prevents resistant bacteria from inactivating ceftriaxone, significantly expanding the range of treatable organisms.',
    },
    {
      heading: 'Convenient once or twice daily dosing',
      body: 'Ceftriaxone\'s long half-life allows for once or twice daily administration, simplifying treatment in hospitalised patients.',
    },
  ],

  sideEffects: [
    'Limited data available on common side effects',
    'Diarrhoea may occur',
    'Injection site reactions possible',
  ],

  howToUse:
    'Administered by a healthcare professional only as an intravenous or intramuscular injection. Do not self-administer. Complete the full prescribed course.',

  howItWorks:
    'Ceftriaxone is a third-generation cephalosporin antibiotic that kills bacteria by binding to penicillin-binding proteins (PBPs) on the bacterial cell wall, inhibiting peptidoglycan cross-linking and causing cell wall disruption and bacterial death. Sulbactam is a beta-lactamase inhibitor that binds to and inactivates the beta-lactamase enzymes produced by resistant bacteria, protecting ceftriaxone from enzymatic degradation and restoring its antibacterial effectiveness.',

  quickTips: [
    'Complete the full prescribed course of antibiotics — stopping early may cause antibiotic resistance.',
    'Diarrhoea may occur during treatment. Probiotics may help; report bloody stools or severe cramps to your doctor.',
    'Stop this medicine and seek immediate medical help if you develop an itchy rash, swelling of the face, throat or tongue, or difficulty breathing (allergic reaction).',
  ],

  safetyAdvice: {
    alcohol:       { rating: 'caution',        note: 'Use with caution during antibiotic therapy. Avoid excessive alcohol.' },
    pregnancy:     { rating: 'consult-doctor', note: 'Safety during pregnancy has not been clearly established. Use only if prescribed.' },
    breastfeeding: { rating: 'caution',        note: 'Small amounts may pass into breast milk. Consult your doctor before breastfeeding.' },
    driving:       { rating: 'safe',           note: 'Nilaxone-S does not usually affect the ability to drive.' },
    kidney:        { rating: 'caution',        note: 'Dose adjustment may be needed in severe kidney disease.' },
    liver:         { rating: 'consult-doctor', note: 'Generally no dose adjustment needed for mild-to-moderate liver disease. Consult your doctor.' },
  },

  factBox: {
    habitForming:     'No',
    therapeuticClass: 'Anti-infectives',
    chemicalClass:    null,
    actionClass:      null,
  },

  storage: 'Store below 25°C in a cool, dry place. Keep out of reach of children.',

  marketer: {
    name:    'Avalin Laboratories Pvt Ltd',
    address: 'ASEB Road, Opp. ASTC Workshop, Ulubari, Guwahati, Assam 781007',
  },
}

export default nilaxoneS
