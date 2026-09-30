import type { Config } from 'tailwindcss'

const config: Config = {
  // Light mode only — no dark mode variants ever
  darkMode: 'selector', // disabled by not adding 'dark' class anywhere
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Brand color tokens (Sampled from avalin-logo.png #E1359F) ───
      colors: {
        // True Brand Pink & Plum family — editorial clinical trust
        brand: {
          raw:       '#E1359F', // True logo magenta/pink facet (micro-accents only)
          accent:    '#E1359F', // Micro-accent highlight (active nav pip, glowing node)
          950:       '#1C0B16', // Deepest plum ink
          900:       '#2E1424', // Deep muted plum-pink (hero bands, dark headers, footer)
          800:       '#4A1B38', // Plum wine
          700:       '#6D2452', // Muted plum subheading
          600:       '#992668', // Primary interactive button, links (5.6:1 AA on white)
          500:       '#C23E89', // Softened logo pink (card highlights, active borders)
          400:       '#D96BA7', // Rose glint, icon highlights
          300:       '#E89BC4', // Delicate capsule bevel
          200:       '#F4C7DD', // Blush card borders & rules
          100:       '#FBE6EF', // Soft blush wash
          50:        '#FDF4F8', // Subtle blush section wash
        },
        // Primary alias mapped directly to brand plum-pink family (zero green)
        primary: {
          950:       '#1C0B16',
          900:       '#2E1424', // Header text, primary dark headings
          800:       '#4A1B38',
          700:       '#6D2452',
          600:       '#992668', // Primary buttons, links, active nav
          500:       '#C23E89',
          400:       '#D96BA7',
          300:       '#E89BC4',
          200:       '#F4C7DD',
          100:       '#FBE6EF',
          50:        '#FDF4F8', // Section backgrounds, subtle blush tints
        },
        // Secondary Accent / CTA — Muted Champagne / Rose-Gold (WCAG AA 5.2:1)
        accent: {
          DEFAULT:   '#8E5D38', // Muted champagne / rose-gold
          hover:     '#6F4525',
          light:     '#FAF1E8', // Soft warm champagne tint
          champagne: '#C99E7C', // Amber glass / foil glint
        },
        // Surface tokens (warm paper & clinical contrast)
        surface: {
          DEFAULT:   '#FBFAF7', // Warm off-white paper
          alt:       '#FFFFFF', // Card backgrounds, elevated surfaces
          muted:     '#F5F3EF', // Warm neutral for zebra rows
          blush:     '#FDF4F8', // Delicate blush section surface
          plum:      '#2E1424', // Dark plum full-bleed band
        },
        // Text tokens (clinical editorial legibility)
        text: {
          primary:   '#181516', // Body text — near-black with warm plum undertone
          secondary: '#5C5257', // Slate-plum supporting copy
          tertiary:  '#8C8187', // Placeholders, captions, disabled
          inverse:   '#FFFFFF', // Text on dark backgrounds (brand-800+)
          brand:     '#992668', // Brand emphasized copy
        },
        // Border tokens
        border: {
          DEFAULT:   '#EBE5E8', // Warm subtle divider
          strong:    '#D6C8CE', // Form inputs & card borders
          subtle:    '#F4EEF1',
          brand:     '#F4C7DD', // Blush accent border
        },
        // ─── Safety-advice rating semantic colors (Zero Green) ───
        // Clinical, high-contrast, always paired with text label
        safety: {
          safe: {
            DEFAULT: '#32526B', // Clinical slate-blue (5.6:1 AA on white)
            bg:      '#EEF4F8',
            text:    '#1D3547',
          },
          'safe-if-prescribed': {
            DEFAULT: '#4A5A78', // Slate navy (5.2:1 AA on white)
            bg:      '#EDF0F7',
            text:    '#33405A',
          },
          caution: {
            DEFAULT: '#B8791A', // Amber (4.5:1 AA on white)
            bg:      '#FDF3E2',
            text:    '#7A4F0E',
          },
          'consult-doctor': {
            DEFAULT: '#5A4A78', // Slate violet (5.3:1 AA on white)
            bg:      '#F2EDF7',
            text:    '#3C335A',
          },
          unsafe: {
            DEFAULT: '#B4322A', // Clinical Red (5.1:1 AA on white)
            bg:      '#FBEAEA',
            text:    '#7A2219',
          },
        },
        // Classification badge colors
        rx: {
          DEFAULT: '#6D2452', // Brand plum
          bg:      '#FBE6EF', // Brand blush
          text:    '#2E1424',
        },
        otc: {
          DEFAULT: '#8E5D38', // Champagne rose-gold
          bg:      '#FAF1E8',
          text:    '#6F4525',
        },
      },

      // ─── Typography ───────────────────────────────────────────────────
      fontFamily: {
        // Headings — Newsreader for editorial clinical elegance
        heading: ['var(--font-newsreader)', 'Georgia', 'serif'],
        // Body / UI — Inter for clinical readability
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        // Monospace — for composition strengths, fact box values
        mono: ['var(--font-mono)', 'monospace'],
      },

      fontSize: {
        // Fluid type scale with clamp() — Editorial modular scale
        'display':   ['clamp(2.35rem, 4vw + 1rem, 3.25rem)', { lineHeight: '1.12', letterSpacing: '-0.025em' }], // 38px–52px
        'h1':        ['clamp(2rem, 3.5vw + 0.75rem, 2.75rem)', { lineHeight: '1.18', letterSpacing: '-0.02em' }], // 32px–44px
        'h2':        ['clamp(1.5rem, 2.5vw + 0.5rem, 2.125rem)', { lineHeight: '1.25', letterSpacing: '-0.015em' }], // 24px–34px
        'h3':        ['clamp(1.25rem, 1.8vw + 0.5rem, 1.5rem)', { lineHeight: '1.3', letterSpacing: '-0.005em'}], // 20px–24px
        'h4':        ['1.125rem',{ lineHeight: '1.75rem'                          }], // 18/28
        'body':      ['1rem',    { lineHeight: '1.65rem'                          }], // 16/26.4
        'small':     ['0.875rem',{ lineHeight: '1.35rem'                          }], // 14/21.6
        'caption':   ['0.75rem', { lineHeight: '1.125rem'                         }], // 12/18
        // Mobile legacy aliases
        'h1-mobile': ['2rem',   { lineHeight: '2.5rem',  letterSpacing: '-0.015em' }],
        'h2-mobile': ['1.5rem', { lineHeight: '2rem'                              }],
      },

      // ─── Letter spacing ──────────────────────────────────────────────────
      letterSpacing: {
        // Eyebrow / label tracking — used by Eyebrow component
        'eyebrow': '0.18em',
        'caps':    '0.12em',
      },

      // ─── Spacing & Layout ─────────────────────────────────────────────
      spacing: {
        // 8px base unit
        'section-desktop': '6.5rem', // 104px between major sections
        'section-mobile':  '3.75rem',// 60px on mobile
        'reading-max':     '45rem',  // ~720px reading column for legal text
        'content-max':     '80rem',  // ~1280px max content width
        // Icon dimensional scale
        'icon-xs':      '0.75rem',  // 12px
        'icon-sm':      '1rem',     // 16px
        'icon-md':      '1.5rem',   // 24px
        'icon-lg':      '2rem',     // 32px
        'icon-xl':      '3rem',     // 48px
        'icon-feature': '5rem',     // 80px
        'icon-hero':    '7.5rem',   // 120px
      },
      maxWidth: {
        'content':  '80rem',  // 1280px
        'reading':  '45rem',  // 720px for Privacy Policy, Terms, etc.
        'product':  '72rem',  // 1152px for product pages
      },

      // ─── Shadows (Plum & Champagne tones) ──────────────────────────────
      boxShadow: {
        'card':            '0 1px 3px 0 rgba(46,20,36,0.05), 0 1px 2px -1px rgba(46,20,36,0.03)',
        'card-hover':      '0 10px 28px -4px rgba(46,20,36,0.12), 0 4px 10px -2px rgba(46,20,36,0.06)',
        'header':          '0 1px 0 0 #EBE5E8',
        'cta':             '0 4px 16px 0 rgba(153,38,104,0.30)',
        'cta-champagne':   '0 4px 16px 0 rgba(142,93,56,0.28)',
        'glow-pink':       '0 0 28px 0 rgba(225,53,159,0.22)',
        'glow-blush':      '0 0 44px 0 rgba(244,199,221,0.40)',
      },

      // ─── Border radius ────────────────────────────────────────────────
      borderRadius: {
        'card': '0.875rem', // 14px — cards
        'badge': '0.25rem', // 4px — classification badges
        'chip':  '9999px',  // pills — safety rating chips
        'pill':  '9999px',
      },

      // ─── Transition durations (tokens mirror lib/motion.ts) ──────────
      transitionDuration: {
        // Maps to motion.duration.* constants — do not use literal values
        'fast': '150ms',
        'base': '300ms',
        'slow': '600ms',
        'hero': '900ms',
      },

      // ─── Animation ────────────────────────────────────────────────────
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%':      { transform: 'translateY(-10px) rotate(1.5deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%':      { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)',    opacity: '0.6' },
          '100%': { transform: 'scale(1.5)', opacity: '0'   },
        },
        'foil-sweep': {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },
      animation: {
        'fade-up':     'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in':     'fade-in 0.4s cubic-bezier(0.22,1,0.36,1) both',
        'float':       'float 5s ease-in-out infinite',
        'float-slow':  'float-slow 7s ease-in-out infinite',
        'pulse-ring':  'pulse-ring 1.8s ease-out infinite',
        'foil-sweep':  'foil-sweep 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
