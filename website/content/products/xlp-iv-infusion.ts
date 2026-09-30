import type { FullProduct } from '../types'

const xlpIV: FullProduct = {
  slug: 'xlp-iv-infusion',
  name: 'XLP IV Infusion',
  template: 'full',
  classification: 'Rx',
  therapeuticArea: 'pain-management-neuro-cns',

  composition: [
    { ingredient: 'Paracetamol (Acetaminophen)', strength: '1% w/v (10 mg/mL)' },
  ],

  shortDescription:
    'Relieves moderate pain and reduces fever in the short term. Used when oral administration is not possible — such as post-surgery, in intensive care, or in emergency settings.',

  uses: [
    'Relief of moderate to severe pain',
    'Treatment of Fever',
  ],

  benefits: [
    {
      heading: 'Effective pain relief',
      body: 'Provides analgesic (pain-relieving) action for moderate pain, including post-operative pain, when oral dosing is not possible or appropriate.',
    },
    {
      heading: 'Rapid fever reduction',
      body: 'As an antipyretic, Paracetamol IV reduces elevated body temperature efficiently, with onset faster than oral formulations due to direct intravenous delivery.',
    },
    {
      heading: 'Safe option when oral intake is restricted',
      body: 'The intravenous route makes XLP IV Infusion suitable for unconscious, post-operative, or critically ill patients unable to take oral medication.',
    },
  ],

  sideEffects: [
    'Limited data available on common side effects',
    'Vomiting (reported in some patients)',
    'Difficulty sleeping (reported in some patients)',
    'Constipation (reported in some patients)',
  ],

  howToUse:
    'Administered by a healthcare professional only. Do not self-administer. Given as an intravenous infusion over 15 minutes.',

  howItWorks:
    'Paracetamol (acetaminophen) is a centrally acting analgesic and antipyretic. It blocks the production of chemical messengers (prostaglandins) in the brain that are responsible for pain and fever signals. Unlike NSAIDs, it does not significantly inhibit peripheral cyclooxygenase enzymes, giving it a better gastrointestinal and platelet-related safety profile.',

  quickTips: [
    'Used for moderate pain and fever relief in the short term, especially post-surgery.',
    'Inform your doctor of any other medicines containing paracetamol to avoid an overdose.',
    'Inform your doctor if you have liver disease, severe kidney disease, or a history of alcohol abuse.',
    'Watch for signs of overdose in the first 24 hours: nausea, weight loss, pale skin, and abdominal pain.',
  ],

  safetyAdvice: {
    alcohol:       { rating: 'caution',        note: 'Use with caution. Alcohol increases the risk of liver damage when combined with paracetamol.' },
    pregnancy:     { rating: 'consult-doctor', note: 'Safety during pregnancy has not been clearly established. Use only if prescribed.' },
    breastfeeding: { rating: 'caution',        note: 'Small amounts may pass into breast milk. Hold breastfeeding until the drug is eliminated. Consult your doctor.' },
    driving:       { rating: 'consult-doctor', note: 'Effect on driving ability is unknown for IV paracetamol. Not relevant during inpatient use.' },
    kidney:        { rating: 'caution',        note: 'Considered the safest analgesic option for patients with kidney disease, but dose adjustment may be required.' },
    liver:         { rating: 'consult-doctor', note: 'Not recommended in severe or active liver disease. Consult your doctor.' },
  },

  factBox: {
    habitForming:     'No',
    therapeuticClass: 'Pain Analgesics',
    chemicalClass:    '1-hydroxy-2-unsubstituted benzenoids',
    actionClass:      'Analgesic & Antipyretic (Paracetamol)',
  },

  drugInteractions: [
    'Imatinib mesylate',
    'Bemiparin',
    'Certoparin',
    'Dalteparin',
    'Enoxaparin',
  ],

  storage: 'Store below 25°C. Do not refrigerate. Keep out of reach of children.',

  marketer: {
    name:    'Avalin Laboratories Pvt Ltd',
    address: 'ASEB Road, Opp. ASTC Workshop, Ulubari, Guwahati, Assam 781007',
  },
}

export default xlpIV
