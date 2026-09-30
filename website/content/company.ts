/**
 * Company metadata — single source of truth reused across all pages.
 * Per TRD §4.3 and PRD §10.
 *
 * [VERIFY_BEFORE_LAUNCH] items are flagged with inline comments.
 */

export const company = {
  legalName: 'Avalin Laboratories Pvt Ltd',
  shortName: 'Avalin Laboratories',
  tagline: 'Excellence in Pharmaceuticals.',
  description:
    'Avalin Laboratories Pvt Ltd is a pharmaceutical marketing company based in Guwahati, Assam. We work to make dependable medicines more accessible to patients and healthcare professionals across India.',

  address: {
    street: 'ASEB Road, Opp. ASTC Workshop',
    area: 'Ulubari',
    city: 'Guwahati',
    state: 'Assam',
    pincode: '781007',
    country: 'India',
    /** Formatted single line */
    full: 'ASEB Road, Opp. ASTC Workshop, Ulubari, Guwahati, Assam 781007, India',
    /** Two-line formatted for footer/cards */
    twoLine: 'ASEB Road, Opp. ASTC Workshop,\nUlubari, Guwahati, Assam 781007',
  },

  contacts: {
    /**
     * Primary email confirmed from legacy site.
     */
    email: 'avalin.laboratories@gmail.com',
    /**
     * Pharmacovigilance / safety reporting email — shown on PV page.
     * Sourced from legacy pharmacovigilance page.
     */
    pvEmail: 'avalin.laboratories@gmail.com',
    /**
     * Primary corporate and inquiry phone number.
     */
    phone: '+91 70023 22615',
    phoneRaw: '+917002322615',
    /**
     * Hotline number for direct communication.
     */
    hotline: '+91 70023 22615',
    /** Response time stated in Terms of Service */
    responseTime: '1–2 business days',
  },

  legal: {
    /**
     * [VERIFY_BEFORE_LAUNCH]: Confirm this FSSAI licence is current and
     * applies to the products listed on the site.
     */
    fssaiLicence: '10324025000034',
    /** Arbitration venue — Guwahati, Assam */
    arbitrationVenue: 'Guwahati, Assam',
  },

  /**
   * Operational metrics — displayed on Home and Who We Are.
   * [VERIFY_BEFORE_LAUNCH]: All four stats are unverified (PRD §10 open question #3).
   * Do not publish without stakeholder sign-off.
   */
  metrics: {
    genericPortfolio:      { value: '98%',   label: 'Generic portfolio' },
    medicinesDistributed:  { value: '100k+', label: 'Medicines distributed' },
    manufacturingPlants:   { value: '10+',   label: 'Manufacturing plants' },
    employees:             { value: '1,000+',label: 'Employees' },
  },

  social: {
    // Add real social links when available
    linkedin:  null as string | null,
    twitter:   null as string | null,
    facebook:  null as string | null,
  },
} as const
