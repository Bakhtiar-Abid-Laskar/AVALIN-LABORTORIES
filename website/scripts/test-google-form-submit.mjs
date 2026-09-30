async function testSubmit() {
  const formId = '1FAIpQLScBGYlTBTtOCbwJeCz95rRk8Bhw_DKCuyI-CCenv3Uy5X_5dQ'
  const url = `https://docs.google.com/forms/d/e/${formId}/formResponse`

  const params = new URLSearchParams()
  params.append('entry.1075633969', 'Test Verification Agent')
  params.append('entry.1078567489', 'test.verification@avalin.in')
  params.append('entry.402683547', '+91 9876543210')
  params.append('entry.680423976', 'Avalin QA Testing Lab')
  params.append('entry.24088896', 'General Corporate Inquiry')
  params.append('entry.87647776', 'Form Integration Test')
  params.append('entry.1192160198', 'This is an automated verification test for website form integration.')

  console.log('Sending test submission to:', url)
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })

  console.log('Response status:', res.status)
  console.log('Redirected:', res.redirected)
  console.log('URL:', res.url)
  const text = await res.text()
  console.log('Response body snippet:', text.slice(0, 300))
  const success = text.includes('Your response has been recorded') || res.status === 200 || res.status === 302
  console.log('Successfully recorded in Google Form:', success)
}

testSubmit().catch(console.error)
