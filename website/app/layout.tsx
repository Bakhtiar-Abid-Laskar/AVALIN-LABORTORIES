import type { Metadata, Viewport } from 'next'
import { Inter, Newsreader, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/layout/CookieBanner'
import { BackToTop } from '@/components/layout/BackToTop'
import { PrintFooter } from '@/components/layout/PrintFooter'
import { RouteTransition } from '@/components/layout/RouteTransition'
import { site, organizationSchema } from '@/lib/site-config'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FBFAF7',
  colorScheme: 'light',
}

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    'Avalin Laboratories',
    'pharmaceutical marketer',
    'Guwahati',
    'Assam',
    'prescription medicines',
    'OTC medicines',
    'Lisium',
    'Avaco',
    'Emopraz',
    'Rezopraz',
    'Niltaz',
    'Nilaxone',
    'Provilin',
    'Neuron-M',
    'Ursentin',
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  metadataBase: new URL(site.baseUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [site.ogImage],
  },
  icons: {
    icon: [
      { url: '/brand/icon-32.png',  sizes: '32x32',     type: 'image/png' },
      { url: '/brand/icon-192.png', sizes: '192x192',   type: 'image/png' },
    ],
    apple: '/brand/apple-touch-icon.png',
    shortcut: '/brand/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Force light rendering at the HTML element level
    <html lang="en" className={`${inter.variable} ${newsreader.variable} ${ibmPlexMono.variable}`} style={{ colorScheme: 'light' }}>
      <head>
        {/* LIGHT MODE ONLY — overrides OS/browser dark-mode preference */}
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#FBFAF7" />

        {/* Organization Schema from canonical site config */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-surface text-text-primary font-body antialiased">
        {/* Skip to content for keyboard / screen-reader users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Header />

        <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col">
          <RouteTransition>
            {children}
          </RouteTransition>
        </main>

        <Footer />
        <CookieBanner />
        <BackToTop />
        <PrintFooter />
      </body>
    </html>
  )
}
