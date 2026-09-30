/**
 * Site configuration — Avalin Laboratories
 *
 * Single source of truth for:
 *   - Company identity & contact (extends content/company.ts)
 *   - Navigation structure (header + footer)
 *   - SEO base values
 *   - Response time & other UX copy
 *
 * RULE: Every email, phone, address, FSSAI number, nav label, and footer link
 * must reference this file. Zero literals in components.
 */

import { company } from '@/content/company'

// ─── Re-export the canonical company data ──────────────────────────────────
export { company }

// ─── Site metadata ─────────────────────────────────────────────────────────
export const site = {
  baseUrl:     'https://avalinlaboratories.com',
  name:        company.shortName,
  legalName:   company.legalName,
  tagline:     company.tagline,
  description: company.description,
  locale:      'en_IN',
  ogImage:     '/brand/og-image.png',
} as const

// ─── Navigation structure ──────────────────────────────────────────────────
export const nav = {
  primary: [
    { href: '/',                     label: 'Home'                  },
    { href: '/who-we-are',           label: 'Who We Are'            },
    { href: '/products',             label: 'Our Products'          },
    { href: '/regulatory-compliance', label: 'Regulatory Compliance' },
    { href: '/pharmacovigilance',     label: 'Pharmacovigilance'    },
    { href: '/reach-us',              label: 'Reach Us'             },
  ],
  /** Primary CTA shown in header and mobile menu */
  cta: {
    href:  '/reach-us',
    label: 'Partner with Us',
  },
} as const

// ─── Footer structure ──────────────────────────────────────────────────────
export const footer = {
  explore: [
    { href: '/',                     label: 'Home'              },
    { href: '/who-we-are',           label: 'Who We Are'        },
    { href: '/products',             label: 'Our Products'      },
    { href: '/products/catalog',     label: 'Product Catalog'   },
    { href: '/therapeutic-areas',    label: 'Therapeutic Areas' },
  ],
  qualitySafety: [
    { href: '/regulatory-compliance', label: 'Regulatory Compliance' },
    { href: '/pharmacovigilance',     label: 'Pharmacovigilance'     },
    { href: '/privacy-policy',        label: 'Privacy Policy'        },
    { href: '/terms-of-service',      label: 'Terms of Service'      },
  ],
  disclaimer:
    'This site provides product information for healthcare professionals and distributors. Content is not a substitute for professional medical advice.',
} as const

// ─── Contacts (canonical — one source, no literals elsewhere) ──────────────
export const contacts = {
  /** Public general inquiry email */
  email:        company.contacts.email,
  /** Pharmacovigilance / safety reporting email */
  pvEmail:      company.contacts.pvEmail,
  /** Response time stated site-wide */
  responseTime: company.contacts.responseTime,
  /** Display formatted phone number */
  phone:        company.contacts.phone,
  /** Raw dialable phone number */
  phoneRaw:     company.contacts.phoneRaw,
} as const

// ─── Legal / statutory ─────────────────────────────────────────────────────
export const legal = {
  fssaiLicence:      company.legal.fssaiLicence,
  arbitrationVenue:  company.legal.arbitrationVenue,
} as const

// ─── Address ───────────────────────────────────────────────────────────────
export const address = company.address

// ─── Social links ──────────────────────────────────────────────────────────
export const social = company.social

// ─── Schema.org Organization JSON-LD ──────────────────────────────────────
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type':    ['Organization', 'MedicalOrganization'],
  name:        company.legalName,
  legalName:   company.legalName,
  url:         site.baseUrl,
  logo:        `${site.baseUrl}/brand/avalin-logo.png`,
  image:       `${site.baseUrl}/brand/og-image.png`,
  description: company.description,
  telephone:   company.contacts.phoneRaw,
  email:       company.contacts.email,
  identifier:  company.legal.fssaiLicence,
  address: {
    '@type':         'PostalAddress',
    streetAddress:   company.address.street,
    addressLocality: company.address.city,
    addressRegion:   company.address.state,
    postalCode:      company.address.pincode,
    addressCountry:  'IN',
  },
  contactPoint: [
    {
      '@type':       'ContactPoint',
      contactType:   'General Inquiries',
      email:          company.contacts.email,
      telephone:      company.contacts.phoneRaw,
      availableLanguage: ['English', 'Hindi', 'Assamese'],
    },
    {
      '@type':       'ContactPoint',
      contactType:   'Pharmacovigilance',
      email:          company.contacts.pvEmail,
      telephone:      company.contacts.phoneRaw,
      availableLanguage: ['English'],
    },
  ],
} as const
