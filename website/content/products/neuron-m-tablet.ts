import type { FullProduct } from '../types'

const neuronM: FullProduct = {
  slug: 'neuron-m-tablet',
  name: 'Neuron-M Tablet',
  template: 'full',
  classification: 'Rx',
  therapeuticArea: 'pain-management-neuro-cns',

  composition: [
    { ingredient: 'Methylcobalamin', strength: '1500 mcg' },
    { ingredient: 'Nortriptyline',   strength: '10 mg'    },
    { ingredient: 'Pregabalin',      strength: '75 mg'    },
  ],

  shortDescription:
    'A combination for neuropathic pain management. Controls nerve calcium channel activity, regulates mood, and protects nerve fibres to reduce chronic nerve-damage pain.',

  uses: [
    'Treatment of Neuropathic pain',
  ],

  benefits: [
    {
      heading: 'Neuropathic pain relief',
      body: 'Pregabalin reduces abnormal electrical activity in damaged nerve pathways, decreasing the intensity and frequency of neuropathic pain signals.',
    },
    {
      heading: 'Mood regulation and nerve pain modulation',
      body: 'Nortriptyline (a tricyclic antidepressant) increases serotonin and noradrenaline levels in nerve synapses, amplifying natural pain-suppression pathways and improving mood.',
    },
    {
      heading: 'Nerve protection and repair',
      body: 'Methylcobalamin (active Vitamin B12) is essential for myelin sheath synthesis — the protective covering around nerves. It supports nerve repair and reduces the severity of nerve damage pain.',
    },
  ],

  sideEffects: [
    'Constipation',
    'Weight gain',
    'Dizziness',
    'Sleepiness',
    'Tiredness',
    'Blurred vision',
    'Dry mouth',
    'Uncoordinated movements',
    'Decreased appetite',
    'Difficulty urinating',
    'Low blood pressure on standing (orthostatic hypotension)',
    'Increased heart rate',
    'Nausea',
    'Vomiting',
    'Diarrhoea',
    'Headache',
  ],

  howToUse:
    'Swallow the tablet whole with or without food. Take at the same time each day as prescribed. Do not stop without consulting your doctor.',

  howItWorks:
    'Methylcobalamin supports myelin production and nerve repair via its role in nucleic acid and protein synthesis, reducing pain from nerve damage. Nortriptyline (a tricyclic antidepressant used here for neuropathic pain) inhibits reuptake of serotonin and noradrenaline in synapses, enhancing the brain\'s descending pain-inhibitory pathways. Pregabalin binds to the alpha-2-delta subunit of voltage-gated calcium channels in the central nervous system, reducing the release of excitatory neurotransmitters and thereby decreasing the sensation of neuropathic pain.',

  quickTips: [
    'This medicine is prescribed for long-lasting pain caused by nerve damage.',
    'Inform your doctor about any other pain medicines or a history of seizures you may have.',
    'Seek medical help immediately if you experience hallucinations, fever, sweating, shivering, fast heart rate, muscle twitching, or loss of coordination.',
    'Physiotherapy may be recommended alongside medication for better outcomes.',
  ],

  safetyAdvice: {
    alcohol:       { rating: 'consult-doctor', note: 'Effect of alcohol with this medicine is not known. Avoid alcohol during treatment.' },
    pregnancy:     { rating: 'consult-doctor', note: 'Animal studies show positive evidence of fetal risk. Use only if strictly prescribed by your doctor.' },
    breastfeeding: { rating: 'consult-doctor', note: 'May pass into breast milk. Consult your doctor before breastfeeding.' },
    driving:       { rating: 'unsafe',         note: 'May significantly decrease alertness, cause dizziness and drowsiness. Do not drive or operate machinery.' },
    kidney:        { rating: 'caution',        note: 'Pregabalin is renally excreted. Dose adjustment is required in patients with kidney disease.' },
    liver:         { rating: 'caution',        note: 'Nortriptyline is hepatically metabolised. Dose adjustment may be needed in liver disease.' },
  },

  factBox: {
    habitForming:     'No',
    therapeuticClass: 'Neuro-CNS',
    chemicalClass:    null,
    actionClass:      null,
  },

  storage: 'Store below 30°C in a cool, dry place away from direct sunlight. Keep out of reach of children.',

  marketer: {
    name:    'Avalin Laboratories Pvt Ltd',
    address: 'ASEB Road, Opp. ASTC Workshop, Ulubari, Guwahati, Assam 781007',
  },
}

export default neuronM
