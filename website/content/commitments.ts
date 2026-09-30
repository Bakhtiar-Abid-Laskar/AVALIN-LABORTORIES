/**
 * Commitments content module — Avalin Laboratories
 *
 * Used on: Who We Are (commitments section), Home (trust trio is separate).
 * Icons reference the icon registry — no emoji.
 */

import type { IconName } from '@/lib/icons/registry'

export interface Commitment {
  id:      string
  icon:    IconName
  title:   string
  body:    string
}

const commitments: Commitment[] = [
  {
    id:    'quality-first',
    icon:  'quality',
    title: 'Quality First',
    body:  'We work with manufacturing partners to meet defined quality standards — from supplier qualification to product release.',
  },
  {
    id:    'patient-safety',
    icon:  'patient-safety',
    title: 'Patient Safety',
    body:  'Our pharmacovigilance process ensures that adverse event reports are taken seriously and acted upon. Patient wellbeing drives every decision.',
  },
  {
    id:    'trusted-partnerships',
    icon:  'partnership',
    title: 'Trusted Partnerships',
    body:  'We build lasting relationships with healthcare professionals, distributors, and institutions by being reliable, responsive, and transparent.',
  },
]

export default commitments
