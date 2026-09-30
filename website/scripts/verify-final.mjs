import fs from 'fs'

const routes = [
  '/',
  '/who-we-are',
  '/products',
  '/regulatory-compliance',
  '/pharmacovigilance',
  '/reach-us',
  '/therapeutic-areas',
]

async function verifyAll() {
  console.log('=== AVALIN LABORATORIES FINAL VERIFICATION ===\n')

  let allOk = true

  for (const route of routes) {
    const start = Date.now()
    const res = await fetch('http://localhost:3000' + route)
    const elapsed = Date.now() - start
    const text = await res.text()

    const hasH1 = /<h1[^>]*>.*?<\/h1>/is.test(text)
    const hasCanonical = text.includes('rel="canonical"')
    const hasDescription = text.includes('name="description"')
    const hasGreen = /(teal-|emerald-|#10b981|#059669|#047857)/i.test(text)

    // Check for emojis
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u
    const hasEmoji = emojiRegex.test(text)

    const routePass = res.status === 200 && hasH1 && hasCanonical && hasDescription && !hasGreen && !hasEmoji
    if (!routePass) allOk = false

    console.log(
      `Route: ${route.padEnd(25)} | HTTP: ${res.status} | Time: ${(elapsed + 'ms').padEnd(6)} | H1: ${hasH1 ? 'YES' : 'NO '} | Canonical: ${hasCanonical ? 'YES' : 'NO '} | Green: ${hasGreen ? 'FAIL' : 'NONE'} | Emoji: ${hasEmoji ? 'FAIL' : 'NONE'}`
    )
  }

  console.log(`\nOverall Route Verification: ${allOk ? 'ALL PASSED (100%)' : 'SOME CHECKS FAILED'}`)
}

verifyAll()
