import fs from 'fs'

const raw = fs.readFileSync('d:/avalin/website/scripts/google-form-data.json', 'utf8')
const data = JSON.parse(raw)

// In FB_PUBLIC_LOAD_DATA_, data[1][1] is the array of questions
const questions = data[1][1]

console.log('Form Title:', data[1][8])
console.log('Form Description:', data[1][0])
console.log('\n--- QUESTIONS ---')

questions.forEach((q, idx) => {
  const label = q[1]
  const description = q[2]
  const fieldInfo = q[4] ? q[4][0] : null
  const entryId = fieldInfo ? fieldInfo[0] : null
  const options = fieldInfo && fieldInfo[1] ? fieldInfo[1].map(opt => opt[0]) : []
  const required = fieldInfo ? fieldInfo[2] === 1 : false

  console.log(`[${idx + 1}] Label: "${label}"`)
  console.log(`    Entry ID: entry.${entryId}`)
  console.log(`    Required: ${required}`)
  if (options.length > 0) {
    console.log(`    Options:`, options)
  }
})
