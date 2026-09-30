async function runTests() {
  console.log('Testing /api/contact endpoint...\n')

  // Test 1: Incomplete submission (missing required phone and organization)
  console.log('--- Test 1: Missing phone and organization (compulsory check) ---')
  const incompletePayload = {
    name: 'Dr. John Doe',
    email: 'john.doe@clinic.in',
    phone: '', // missing
    organization: '', // missing
    inquiryType: 'Commercial Supply & Product Pricing',
    subject: 'Bulk Inquiry',
    message: 'We are requesting quotation for supply.',
    consent: true,
  }

  const res1 = await fetch('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(incompletePayload),
  })

  const data1 = await res1.json()
  console.log(`Status: ${res1.status}`)
  console.log('Field errors:', data1.fieldErrors)
  if (data1.fieldErrors?.phone && data1.fieldErrors?.organization) {
    console.log('✓ PASS: phone and organization properly flagged as compulsory.')
  } else {
    console.error('✗ FAIL: phone and organization were not properly flagged.')
    process.exit(1)
  }

  // Test 2: Complete valid submission
  console.log('\n--- Test 2: Valid complete submission (should dispatch to Google Form) ---')
  const validPayload = {
    name: 'Dr. Bhupen Hazarika',
    email: 'b.hazarika@guwahaticlinic.in',
    phone: '+91 94350 12345',
    organization: 'Guwahati Healthcare Diagnostic & Research Centre',
    inquiryType: 'Hospital / Institutional Tenders',
    subject: 'Institutional supply quote for Lisium 10mg and Ursentin 300mg',
    message: 'Requesting tender details and supply schedules for the upcoming quarterly hospital procurement cycle.',
    consent: true,
  }

  const res2 = await fetch('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validPayload),
  })

  const data2 = await res2.json()
  console.log(`Status: ${res2.status}`)
  console.log('Response body:', data2)
  if (res2.status === 200 && data2.success && data2.referenceId) {
    console.log(`✓ PASS: Valid submission accepted with Reference ID: ${data2.referenceId}`)
  } else {
    console.error('✗ FAIL: Valid submission rejected.')
    process.exit(1)
  }

  console.log('\nAll Contact Form Tests PASSED successfully!')
}

runTests().catch(console.error)
