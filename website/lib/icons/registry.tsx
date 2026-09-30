/**
 * Icon registry — Avalin Laboratories
 *
 * Single source for all SVG icons used across the site.
 * All icons are 24x24 viewBox, stroke-based (currentColor).
 *
 * RULE: No emoji in UI. All pictographic representation uses this registry.
 * RULE: Every icon used in the UI must have an entry here.
 *
 * Adding a new icon:
 *   1. Add its name to IconName
 *   2. Add its JSX to ICONS map
 *   3. Import <Icon name="..."> in the component
 */

export type IconName =
  // Therapeutic area icons
  | 'nutrition'
  | 'digestive'
  | 'shield-virus'
  | 'neuro'
  | 'liver'
  | 'probiotic'
  // Trust / commitment icons
  | 'quality'
  | 'patient-safety'
  | 'partnership'
  // Navigation / UI
  | 'arrow-right'
  | 'arrow-up-right'
  | 'chevron-down'
  | 'chevron-up'
  | 'chevron-right'
  | 'menu'
  | 'close'
  | 'check'
  | 'warning'
  | 'info'
  | 'external'
  // Contact / compliance
  | 'mail'
  | 'phone'
  | 'location'
  | 'document'
  | 'compliance'
  | 'pharmacovigilance'
  | 'fssai'
  // Products
  | 'rx'
  | 'otc'
  | 'molecule'
  | 'search'
  | 'download'
  | 'file-text'
  // Misc
  | 'loader'

export type IconProps = {
  /** Size in px — applied to both width and height */
  size?: number
  /** Applied as className for color, custom sizing */
  className?: string
  /** Title for accessibility — if provided, renders <title> inside SVG */
  title?: string
  'aria-hidden'?: boolean | 'true' | 'false'
}

type SvgChildren = React.ReactElement | React.ReactElement[]

// Shared SVG path data only — components handle wrapper
const PATHS: Record<IconName, SvgChildren> = {
  // ── Therapeutic area icons ───────────────────────────────────────────────
  nutrition: (
    <>
      {/* Stylized leaf with molecular dot */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V12m0 0c0-4.418 3.582-8 8-8-4.418 0-8 3.582-8 8zm0 0c0-4.418-3.582-8-8-8 4.418 0 8 3.582 8 8z" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  digestive: (
    <>
      {/* Simplified stomach/gut curve */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 4c-1 0-3 1-3 4 0 2 1 3.5 2 4.5S8 14 8 16c0 3 2 4 4 4s4-1 4-4c0-1-.5-2-1-3s-1.5-2-1.5-3.5C13.5 7 15 5.5 15 4" />
      <path strokeLinecap="round" d="M9.5 9c0 1 .5 2 1.5 2" />
    </>
  ),
  'shield-virus': (
    <>
      {/* Shield with pathogen cross */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6L12 3z" />
      <path strokeLinecap="round" d="M12 9v6M9 12h6" />
    </>
  ),
  neuro: (
    <>
      {/* Pulse wave / neuron */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h2l2-5 3 10 3-14 3 10 2-5h3" />
    </>
  ),
  liver: (
    <>
      {/* Stylized liver silhouette */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 9c0-3.5 2-5 5-5 2 0 3 1 4 2.5C15.5 8 18 9 18 12c0 4-3 8-8 9-3-.5-5-3-5-7V9z" />
      <circle cx="10" cy="14" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  probiotic: (
    <>
      {/* Circular cell / gut flora pattern */}
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
      <path strokeLinecap="round" d="M12 8.5V9M12 15v.5M8.5 12H9M15 12h.5" strokeWidth={1} />
    </>
  ),

  // ── Trust / commitment icons ─────────────────────────────────────────────
  quality: (
    <>
      {/* Document with checkmark */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </>
  ),
  'patient-safety': (
    <>
      {/* Person inside shield */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6L12 3z" />
      <circle cx="12" cy="10" r="2" />
      <path strokeLinecap="round" d="M8 18c0-2.209 1.79-4 4-4s4 1.791 4 4" />
    </>
  ),
  partnership: (
    <>
      {/* Two overlapping rings / handshake abstraction */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM13.5 11a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
    </>
  ),

  // ── Navigation / UI ──────────────────────────────────────────────────────
  'arrow-right': (
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  ),
  'arrow-up-right': (
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
  ),
  'chevron-down': (
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  ),
  'chevron-up': (
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5-7.5" />
  ),
  'chevron-right': (
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  ),
  menu: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  ),
  close: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  ),
  check: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  ),
  warning: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  ),
  info: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  ),
  external: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  ),

  // ── Contact / compliance ─────────────────────────────────────────────────
  mail: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  ),
  phone: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.338c0-1.44 1.176-2.603 2.628-2.588 5.803.074 10.5 4.773 10.5 10.578 0 1.452-1.164 2.628-2.604 2.628-.283 0-.55-.046-.8-.131l-1.737-.58a2.25 2.25 0 00-2.156.44l-.943.81a.75.75 0 01-.942 0l-.944-.81a2.25 2.25 0 00-2.156-.44l-1.737.58a2.588 2.588 0 01-.8.131C1.677 17.316.75 16.139.75 14.697V7.5A2.25 2.25 0 003 5.25h.75" />
  ),
  location: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  ),
  document: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  ),
  compliance: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </>
  ),
  pharmacovigilance: (
    <>
      {/* Pulse line inside shield */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6L12 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h1.5l1-2.5 2 5 1-2.5H16" strokeWidth={1.5} />
    </>
  ),
  fssai: (
    <>
      {/* Stylized badge / certificate */}
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      <path strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2" strokeWidth={1} />
    </>
  ),

  // ── Products ─────────────────────────────────────────────────────────────
  rx: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-4" />
      <text x="7" y="15" fontSize="8" fontWeight="bold" stroke="none" fill="currentColor" fontFamily="monospace">Rx</text>
    </>
  ),
  otc: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <text x="5.5" y="15" fontSize="7" fontWeight="bold" stroke="none" fill="currentColor" fontFamily="monospace">OTC</text>
    </>
  ),
  molecule: (
    <>
      <circle cx="12" cy="12" r="2" />
      <circle cx="6" cy="7" r="1.5" />
      <circle cx="18" cy="7" r="1.5" />
      <circle cx="6" cy="17" r="1.5" />
      <circle cx="18" cy="17" r="1.5" />
      <path strokeLinecap="round" d="M10 11L7.5 8.5M14 11l2.5-2.5M10 13L7.5 15.5M14 13l2.5 2.5" />
    </>
  ),
  search: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  ),
  download: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  ),
  'file-text': (
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  ),

  // ── Misc ─────────────────────────────────────────────────────────────────
  loader: (
    <>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        strokeLinecap="round" />
    </>
  ),
}

export default PATHS
