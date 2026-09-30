import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Strict mode for better dev-time React warnings
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    // Explicitly allow local domain — no remote patterns needed for a static corporate site
    remotePatterns: [],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Force light color scheme — belt-and-suspenders alongside the meta tag
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              // No external iframes permitted
              "frame-src 'none'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "connect-src 'self'",
              "frame-ancestors 'self'",
            ].join('; '),
          },
          { key: 'X-Frame-Options',          value: 'SAMEORIGIN'    },
          { key: 'X-Content-Type-Options',   value: 'nosniff'       },
          { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  skipTrailingSlashRedirect: true,

  // Permanent redirects
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/who-we-are',
        permanent: true,
      },
      {
        source: '/about/',
        destination: '/who-we-are',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/who-we-are',
        permanent: true,
      },
      {
        source: '/about-us/',
        destination: '/who-we-are',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/reach-us',
        permanent: true,
      },
      {
        source: '/contact/',
        destination: '/reach-us',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/reach-us',
        permanent: true,
      },
      {
        source: '/contact-us/',
        destination: '/reach-us',
        permanent: true,
      },
      {
        source: '/otc-medicines-to-meet-your-needs',
        destination: '/products/otc',
        permanent: true,
      },
      {
        source: '/otc-medicines-to-meet-your-needs/',
        destination: '/products/otc',
        permanent: true,
      },
      {
        source: '/cart',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/cart/',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/shop',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/shop/',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/products-services',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/products-services/',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/quality',
        destination: '/regulatory-compliance',
        permanent: true,
      },
      {
        source: '/quality/',
        destination: '/regulatory-compliance',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
