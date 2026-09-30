import { readdirSync } from 'fs'
import { join } from 'path'

const productFiles = readdirSync('d:/avalin/website/content/products')
  .filter(f => f.endsWith('.ts'))
  .map(f => f.replace(/\.ts$/, ''))

const baseRoutes = [
  '/',
  '/who-we-are',
  '/products',
  '/products/catalog',
  '/products/prescription',
  '/products/otc',
  '/therapeutic-areas',
  '/regulatory-compliance',
  '/pharmacovigilance',
  '/reach-us',
  '/privacy-policy',
  '/terms-of-service',
  '/sitemap.xml',
  '/robots.txt',
]

const productRoutes = productFiles.map(slug => `/products/${slug}`)
const allRoutes = [...baseRoutes, ...productRoutes]

async function verify() {
  console.log(`Auditing ${allRoutes.length} routes against http://localhost:3000...\n`)
  let failed = 0

  for (const r of allRoutes) {
    try {
      const res = await fetch(`http://localhost:3000${r}`)
      if (res.status === 200) {
        console.log(`  ✓ [${res.status}] ${r}`)
      } else {
        console.error(`  ✗ [${res.status}] ${r}`)
        failed++
      }
    } catch (err) {
      console.error(`  ✗ [ERROR] ${r} -> ${err.message}`)
      failed++
    }
  }

  console.log(`\nRoute Audit Complete. Total: ${allRoutes.length}, Failed: ${failed}`)
  if (failed > 0) process.exit(1)
}

verify()
