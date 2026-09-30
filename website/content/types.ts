/**
 * Product type definitions — derived from TRD §4.1.
 *
 * HARD RULE (PRD §7): retail-only fields are NOT present in this type.
 * Adding price, substitutes, SKU availability, or any 1mg branding
 * is a TYPE ERROR by design.
 */

export type SafetyRating =
  | 'safe'
  | 'safe-if-prescribed'
  | 'caution'
  | 'consult-doctor'
  | 'unsafe'

export type ProductTemplate = 'full' | 'light'

export type Classification = 'Rx' | 'OTC'

export type TherapeuticArea =
  | 'vitamins-minerals-nutrition'
  | 'gastrointestinal'
  | 'anti-infective'
  | 'pain-management-neuro-cns'
  | 'hepatoprotective'
  | 'probiotics'

export interface SafetyAdviceEntry {
  rating: SafetyRating
  note: string
}

export interface SafetyAdvice {
  alcohol:       SafetyAdviceEntry
  pregnancy:     SafetyAdviceEntry
  breastfeeding: SafetyAdviceEntry
  driving:       SafetyAdviceEntry
  kidney:        SafetyAdviceEntry
  liver:         SafetyAdviceEntry
}

export interface Composition {
  ingredient: string
  strength: string
}

export interface Benefit {
  heading: string
  body: string
}

export interface FactBox {
  habitForming: 'Yes' | 'No'
  therapeuticClass: string
  chemicalClass?: string | null
  actionClass?: string | null
}

export interface ManufacturerInfo {
  name: string
  address: string
}

export interface MarketerInfo {
  name: string
  address: string
}

/** Full template product — all clinical sections present */
export interface FullProduct {
  slug:             string
  name:             string
  template:         'full'
  classification:   Classification
  therapeuticArea:  TherapeuticArea
  composition:      Composition[]
  shortDescription: string
  uses:             string[]
  benefits:         Benefit[]
  sideEffects:      string[]
  howToUse:         string
  howItWorks:       string
  quickTips:        string[]
  safetyAdvice:     SafetyAdvice
  factBox:          FactBox
  storage:          string
  drugInteractions?: string[] // Optional — only a few products have this
  oneMgUrl?:        string
  images?:          string[]
  manufacturer?:    ManufacturerInfo
  marketer:         MarketerInfo
}

/** Light template product — shorter OTC format, no safety matrix */
export interface LightProduct {
  slug:             string
  name:             string
  template:         'light'
  classification:   Classification
  therapeuticArea:  TherapeuticArea
  keyIngredients:   string[]
  shortDescription: string
  keyBenefits:      string[]
  directionsForUse: string
  safetyInformation: string
  storage?:         string
  oneMgUrl?:        string
  images?:          string[]
  manufacturer?:    ManufacturerInfo
  marketer:         MarketerInfo
}

export type Product = FullProduct | LightProduct

/** Type guard */
export function isFullProduct(p: Product): p is FullProduct {
  return p.template === 'full'
}
export function isLightProduct(p: Product): p is LightProduct {
  return p.template === 'light'
}

/** Label map for therapeutic areas */
export const therapeuticAreaLabels: Record<TherapeuticArea, string> = {
  'vitamins-minerals-nutrition':  'Vitamins, Minerals & Nutrition',
  'gastrointestinal':             'Gastrointestinal',
  'anti-infective':               'Anti-infective',
  'pain-management-neuro-cns':    'Pain Management & Neuro-CNS',
  'hepatoprotective':             'Hepatoprotective',
  'probiotics':                   'Probiotics',
}

/** Label map for safety ratings */
export const safetyRatingLabels: Record<SafetyRating, string> = {
  'safe':               'Safe',
  'safe-if-prescribed': 'Safe if Prescribed',
  'caution':            'Use with Caution',
  'consult-doctor':     'Consult Your Doctor',
  'unsafe':             'Unsafe',
}
