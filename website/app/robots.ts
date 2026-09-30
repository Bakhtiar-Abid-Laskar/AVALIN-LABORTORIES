import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/dev/', '/thank-you/'],
    },
    sitemap: 'https://avalinlaboratories.com/sitemap.xml',
    host: 'https://avalinlaboratories.com',
  }
}
