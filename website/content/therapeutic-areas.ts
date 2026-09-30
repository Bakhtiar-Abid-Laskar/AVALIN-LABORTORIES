import type { TherapeuticArea } from './types'
import type { IconName } from '@/lib/icons/registry'

export interface TherapeuticAreaData {
  id: TherapeuticArea
  label: string
  description: string
  exampleProducts: string[] // product slugs
  /** Icon registry name — see lib/icons/registry.tsx */
  icon: IconName
}

const therapeuticAreas: TherapeuticAreaData[] = [
  {
    id: 'vitamins-minerals-nutrition',
    label: 'Vitamins, Minerals & Nutrition',
    description:
      'Our nutrition portfolio addresses deficiencies in calcium, Vitamin D, Vitamin B12, and essential micronutrients — supporting bone health, immunity, and overall metabolic function across all age groups.',
    exampleProducts: [
      'lisium-k2-soft-gelatin-capsule',
      'lisium-tablet',
      'avaco-60k-softgel-capsule',
      'vitacomin-capsule',
    ],
    icon: 'nutrition',
  },
  {
    id: 'gastrointestinal',
    label: 'Gastrointestinal',
    description:
      'From acid reflux and GERD to digestive enzyme support, our gastrointestinal range helps patients achieve effective symptom relief and improved gut health through evidence-based combinations.',
    exampleProducts: [
      'emopraz-d-capsule-sr',
      'rezopraz-d-capsule-sr',
      'adezyme-syrup',
    ],
    icon: 'digestive',
  },
  {
    id: 'anti-infective',
    label: 'Anti-infective',
    description:
      'Our antibiotic portfolio includes broad-spectrum beta-lactam/beta-lactamase inhibitor combinations for serious bacterial infections across respiratory, urinary, skin, and systemic sites.',
    exampleProducts: [
      'niltaz-4-5-injection',
      'nilaxone-s-injection',
    ],
    icon: 'shield-virus',
  },
  {
    id: 'pain-management-neuro-cns',
    label: 'Pain Management & Neuro-CNS',
    description:
      'Our pain and neurology range addresses both acute pain (via IV paracetamol) and chronic neuropathic pain (via multimodal combinations), with a focus on safety and clinical appropriateness.',
    exampleProducts: [
      'xlp-iv-infusion',
      'neuron-m-tablet',
    ],
    icon: 'neuro',
  },
  {
    id: 'hepatoprotective',
    label: 'Hepatoprotective',
    description:
      'Our hepatoprotective product supports patients with cholesterol gallstones and chronic liver conditions, using ursodeoxycholic acid to protect liver cells and improve bile composition.',
    exampleProducts: [
      'ursentin-300-tablet',
    ],
    icon: 'liver',
  },
  {
    id: 'probiotics',
    label: 'Probiotics',
    description:
      'Our multi-strain probiotic is formulated with clinically validated bacterial strains and a prebiotic (FOS) to restore and maintain a healthy gut microbiome, supporting digestion and immunity.',
    exampleProducts: [
      'provilin-capsule',
    ],
    icon: 'probiotic',
  },
]

export default therapeuticAreas

export function getTherapeuticAreaById(id: TherapeuticArea): TherapeuticAreaData | undefined {
  return therapeuticAreas.find((a) => a.id === id)
}
