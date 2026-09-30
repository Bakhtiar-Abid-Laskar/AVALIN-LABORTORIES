import fs from 'fs'

async function fetchGoogleForm() {
  const url = 'https://forms.gle/sqr9ghGHuaNNK6iS8'
  console.log('Fetching', url)
  const res = await fetch(url, { redirect: 'follow' })
  console.log('Redirected to:', res.url)
  const html = await res.text()

  fs.writeFileSync('d:/avalin/website/scripts/google-form.html', html)
  console.log('Saved html to scripts/google-form.html, length:', html.length)

  // Look for FB_PUBLIC_LOAD_DATA_
  const match = html.match(/FB_PUBLIC_LOAD_DATA_\s*=\s*(\[.+?\]);<\/script>/s)
  if (match) {
    fs.writeFileSync('d:/avalin/website/scripts/google-form-data.json', match[1])
    console.log('Saved FB_PUBLIC_LOAD_DATA_')
  }

  // Also check form action
  const actionMatch = html.match(/<form[^>]+action="([^"]+)"/)
  console.log('Form action:', actionMatch ? actionMatch[1] : 'not found')

  // Check entries
  const entryMatches = [...html.matchAll(/entry\.(\d+)/g)].map(m => m[1])
  const uniqueEntries = [...new Set(entryMatches)]
  console.log('Unique entry IDs:', uniqueEntries)
}

fetchGoogleForm().catch(console.error)
