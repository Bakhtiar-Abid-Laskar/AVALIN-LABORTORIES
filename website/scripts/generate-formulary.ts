import fs from 'fs'
import path from 'path'
import PDFDocument from 'pdfkit'
import { getAllProducts, ONE_MG_URLS } from '../lib/products.ts'
import { company } from '../content/company.ts'
import { therapeuticAreaLabels } from '../content/types.ts'
import { isFullProduct } from '../content/types.ts'

const products = getAllProducts()
const OUT_PATH = path.join(process.cwd(), 'public', 'avalin-product-formulary-2026.pdf')

console.log('Generating Avalin Product Formulary 2026 PDF...')


const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 45, right: 45 },
  info: {
    Title: 'Avalin Laboratories Product Formulary 2026',
    Author: 'Avalin Laboratories Pvt Ltd',
    Subject: 'Clinical Product Monograph Compendium & Pharmaceutical Directory',
    Keywords: 'Avalin Laboratories, Formulary, Prescription, OTC, Pharmaceuticals, India',
    CreationDate: new Date('2026-09-01'),
  },
  bufferPages: true,
})

const stream = fs.createWriteStream(OUT_PATH)
doc.pipe(stream)

// Color palette
const TEAL_900 = '#0B3B3C'
const TEAL_600 = '#116466'
const AMBER_700 = '#7A5806'
const TEXT_DARK = '#1B1F1E'
const TEXT_MUTED = '#5A6663'
const LINE_COLOR = '#DDE3E1'
const BG_TINT = '#F4F7F6'

// ─── COVER PAGE ───────────────────────────────────────────────────────────
doc.rect(0, 0, doc.page.width, 180).fill(TEAL_900)

doc.fillColor('#FFFFFF')
  .font('Helvetica-Bold')
  .fontSize(24)
  .text('AVALIN LABORATORIES PVT LTD', 45, 55, { characterSpacing: 1 })

doc.fillColor('#9DD4D5')
  .font('Helvetica')
  .fontSize(12)
  .text('Excellence in Pharmaceuticals • Guwahati, Assam', 45, 88)

doc.fillColor('#FFFFFF')
  .font('Helvetica-Bold')
  .fontSize(16)
  .text('OFFICIAL PRODUCT FORMULARY 2026', 45, 120)

doc.fillColor('#C8EAEA')
  .font('Helvetica')
  .fontSize(10)
  .text('Clinical Monograph Compendium & Institutional Reference Directory', 45, 142)

doc.y = 210

doc.fillColor(TEXT_DARK)
  .font('Helvetica-Bold')
  .fontSize(12)
  .text('Institutional & Clinical Notice', 45, doc.y)

doc.moveDown(0.4)
doc.fillColor(TEXT_MUTED)
  .font('Helvetica')
  .fontSize(9.5)
  .text(
    'This formulary compendium is published strictly for registered medical practitioners, hospital clinical pharmacy departments, healthcare institutions, and authorized procurement authorities. It provides certified salt compositions, therapeutic classifications, clinical usage guidance, and validated storage specifications for formulations marketed by Avalin Laboratories Pvt Ltd.',
    { lineGap: 3, width: 500 }
  )

doc.moveDown(1)
doc.fillColor(TEAL_900)
  .font('Helvetica-Bold')
  .fontSize(11)
  .text('Corporate & Regulatory Headquarters:')

doc.moveDown(0.3)
doc.fillColor(TEXT_DARK)
  .font('Helvetica')
  .fontSize(9)
  .text(company.legalName)
  .text(company.address.full)
  .text(`FSSAI Licence No: ${company.legal.fssaiLicence}`)
  .text(`Official Inquiries: ${company.contacts.email}`)
  .text(`Pharmacovigilance Reporting: ${company.contacts.pvEmail}`)

doc.moveDown(1.5)
doc.fillColor(TEAL_900)
  .font('Helvetica-Bold')
  .fontSize(12)
  .text('Table of Contents — Active Formulations')

doc.moveDown(0.5)

// Table of contents grid
const startY = doc.y
doc.rect(45, startY, 505, 20).fill(BG_TINT)
doc.fillColor(TEAL_900)
  .font('Helvetica-Bold')
  .fontSize(8.5)
  .text('PRODUCT BRAND', 52, startY + 6)
  .text('TYPE', 225, startY + 6)
  .text('THERAPEUTIC AREA', 280, startY + 6)
  .text('ACTIVE FORMULATION', 410, startY + 6)

let rowY = startY + 22
products.forEach((p, idx) => {
  if (idx % 2 === 1) {
    doc.rect(45, rowY, 505, 18).fill('#FAFCFB')
  }

  doc.fillColor(TEXT_DARK)
    .font('Helvetica-Bold')
    .fontSize(8)
    .text(p.name, 52, rowY + 5, { width: 165 })

  const isRx = p.classification === 'Rx'
  doc.fillColor(isRx ? TEAL_600 : AMBER_700)
    .font('Helvetica-Bold')
    .fontSize(7.5)
    .text(p.classification, 225, rowY + 5)

  doc.fillColor(TEXT_MUTED)
    .font('Helvetica')
    .fontSize(7.5)
    .text(therapeuticAreaLabels[p.therapeuticArea] || p.therapeuticArea, 280, rowY + 5, { width: 125 })

  let shortComp = ''
  if (isFullProduct(p)) {
    shortComp = p.composition.map((c) => `${c.ingredient} ${c.strength}`).join(', ')
  } else {
    shortComp = p.keyIngredients.join(', ')
  }

  doc.fillColor(TEXT_MUTED)
    .font('Helvetica')
    .fontSize(7.5)
    .text(shortComp, 410, rowY + 5, { width: 135, height: 14, ellipsis: true })

  rowY += 18
})

// ─── PRODUCT MONOGRAPHS ──────────────────────────────────────────────────
products.forEach((product) => {
  doc.addPage()

  // Monograph Header banner
  doc.rect(45, 40, 505, 42).fill(BG_TINT)
  doc.rect(45, 40, 5, 42).fill(product.classification === 'Rx' ? TEAL_900 : AMBER_700)

  doc.fillColor(TEAL_900)
    .font('Helvetica-Bold')
    .fontSize(14)
    .text(product.name, 58, 48)

  const typeLabel = product.classification === 'Rx' ? 'PRESCRIPTION ONLY MEDICINE (Rx)' : 'OVER-THE-COUNTER PRODUCT (OTC)'
  doc.fillColor(product.classification === 'Rx' ? TEAL_600 : AMBER_700)
    .font('Helvetica-Bold')
    .fontSize(8)
    .text(`${typeLabel}  •  ${therapeuticAreaLabels[product.therapeuticArea]}`, 58, 66)

  doc.y = 92

  // Composition
  doc.fillColor(TEAL_900)
    .font('Helvetica-Bold')
    .fontSize(10)
    .text('1. ACTIVE COMPOSITION & INGREDIENTS', 45, doc.y)

  doc.moveDown(0.3)
  if (isFullProduct(product)) {
    product.composition.forEach((comp) => {
      doc.fillColor(TEXT_DARK)
        .font('Helvetica-Bold')
        .fontSize(8.5)
        .text(`• ${comp.ingredient}`, 55, doc.y, { continued: true })
        .font('Helvetica')
        .fillColor(TEXT_MUTED)
        .text(` (${comp.strength})`)

    })
  } else {
    doc.fillColor(TEXT_DARK)
      .font('Helvetica')
      .fontSize(8.5)
      .text(`Key Ingredients: ${product.keyIngredients.join(', ')}`, 55, doc.y)
  }

  doc.moveDown(0.6)

  // Clinical Indications / Uses
  doc.fillColor(TEAL_900)
    .font('Helvetica-Bold')
    .fontSize(10)
    .text('2. THERAPEUTIC INDICATIONS & CLINICAL USES', 45, doc.y)

  doc.moveDown(0.3)
  if (isFullProduct(product)) {
    product.uses.forEach((u) => {
      doc.fillColor(TEXT_DARK)
        .font('Helvetica')
        .fontSize(8.5)
        .text(`• ${u}`, 55, doc.y)
    })
  } else {
    product.keyBenefits.forEach((b) => {
      doc.fillColor(TEXT_DARK)
        .font('Helvetica')
        .fontSize(8.5)
        .text(`• ${b}`, 55, doc.y)
    })
  }

  doc.moveDown(0.6)

  // Administration & Dosage Instructions
  doc.fillColor(TEAL_900)
    .font('Helvetica-Bold')
    .fontSize(10)
    .text('3. ADMINISTRATION & DIRECTIONS FOR USE', 45, doc.y)

  doc.moveDown(0.3)
  const usageText = isFullProduct(product) ? product.howToUse : product.directionsForUse
  doc.fillColor(TEXT_DARK)
    .font('Helvetica')
    .fontSize(8.5)
    .text(usageText, 55, doc.y, { width: 495, lineGap: 2 })

  doc.moveDown(0.6)

  // Storage Specifications
  doc.fillColor(TEAL_900)
    .font('Helvetica-Bold')
    .fontSize(10)
    .text('4. STORAGE & HANDLING SPECIFICATIONS', 45, doc.y)

  doc.moveDown(0.3)
  doc.fillColor(TEXT_DARK)
    .font('Helvetica')
    .fontSize(8.5)
    .text(product.storage || 'Store in a cool, dry place away from direct sunlight.', 55, doc.y, { width: 495 })

  doc.moveDown(0.6)

  // Safety Advice Matrix
  if (isFullProduct(product)) {
    doc.fillColor(TEAL_900)
      .font('Helvetica-Bold')
      .fontSize(10)
      .text('5. CLINICAL SAFETY MATRIX', 45, doc.y)

    doc.moveDown(0.3)
    const matrixY = doc.y
    doc.rect(45, matrixY, 505, 16).fill(BG_TINT)
    doc.fillColor(TEAL_900)
      .font('Helvetica-Bold')
      .fontSize(7.5)
      .text('PARAMETER', 52, matrixY + 4)
      .text('RATING', 150, matrixY + 4)
      .text('CLINICAL ADVISORY NOTE', 240, matrixY + 4)

    let mRowY = matrixY + 18
    const adviceList = [
      { param: 'Alcohol', item: product.safetyAdvice.alcohol },
      { param: 'Pregnancy', item: product.safetyAdvice.pregnancy },
      { param: 'Breastfeeding', item: product.safetyAdvice.breastfeeding },
      { param: 'Driving / Machinery', item: product.safetyAdvice.driving },
      { param: 'Kidney Function', item: product.safetyAdvice.kidney },
      { param: 'Liver Function', item: product.safetyAdvice.liver },
    ]

    adviceList.forEach(({ param, item }, idx) => {
      if (idx % 2 === 1) doc.rect(45, mRowY, 505, 20).fill('#FAFCFB')

      doc.fillColor(TEXT_DARK)
        .font('Helvetica-Bold')
        .fontSize(7.5)
        .text(param, 52, mRowY + 4)

      doc.fillColor(TEAL_600)
        .font('Helvetica-Bold')
        .fontSize(7.5)
        .text(item.rating, 150, mRowY + 4)

      doc.fillColor(TEXT_MUTED)
        .font('Helvetica')
        .fontSize(7)
        .text(item.note, 240, mRowY + 3, { width: 300, height: 16, ellipsis: true })

      mRowY += 20
    })
    doc.y = mRowY + 8
  }

  // Manufacturer / Marketer & External Reference
  doc.moveDown(0.4)
  doc.rect(45, doc.y, 505, 52).strokeColor(LINE_COLOR).stroke()
  const boxTop = doc.y

  doc.fillColor(TEAL_900)
    .font('Helvetica-Bold')
    .fontSize(8)
    .text('Marketed by:', 55, boxTop + 6)
    .text('External Online Monograph Reference:', 300, boxTop + 6)

  doc.fillColor(TEXT_DARK)
    .font('Helvetica')
    .fontSize(7.5)
    .text(`${product.marketer.name}, ${product.marketer.address}`, 55, boxTop + 18, { width: 230 })

  const oneMgUrl = ONE_MG_URLS[product.slug] || product.oneMgUrl || 'https://www.1mg.com'
  doc.fillColor(TEAL_600)
    .font('Helvetica')
    .fontSize(7)
    .text(oneMgUrl, 300, boxTop + 18, { width: 240 })

  doc.fillColor(TEXT_MUTED)
    .font('Helvetica')
    .fontSize(6.5)
    .text('Tata 1mg is a trademark of its respective owner. Avalin Laboratories is not affiliated with Tata 1mg.', 300, boxTop + 34, { width: 240 })
})

// ─── CLOSING PAGE: MEDICAL DISCLAIMER & PV ───────────────────────────────
doc.addPage()
doc.rect(0, 0, doc.page.width, 100).fill(TEAL_900)

doc.fillColor('#FFFFFF')
  .font('Helvetica-Bold')
  .fontSize(18)
  .text('CLINICAL GOVERNANCE & PHARMACOVIGILANCE', 45, 40)

doc.fillColor('#9DD4D5')
  .font('Helvetica')
  .fontSize(10)
  .text('Avalin Laboratories Pvt Ltd — Commitment to Quality and Safety', 45, 66)

doc.y = 125

doc.fillColor(TEAL_900)
  .font('Helvetica-Bold')
  .fontSize(12)
  .text('1. Statutory Medical Information Disclaimer')

doc.moveDown(0.4)
doc.fillColor(TEXT_DARK)
  .font('Helvetica')
  .fontSize(9)
  .text(
    'The product information presented in this formulary is intended solely for registered healthcare professionals and institutional hospital personnel. It is compiled from validated regulatory dossiers and approved product monographs. It is not intended for direct consumer interpretation, nor as a substitute for professional clinical diagnosis, advice, or treatment.',
    { lineGap: 3, width: 500 }
  )
  .moveDown(0.5)
  .text(
    'Prescription-only (Rx) medications must be dispensed and administered strictly in accordance with the written instructions of a registered medical practitioner. Injectable formulations (XLP IV Infusion, Niltaz 4.5 Injection, Nilaxone-S Injection) must be administered by a qualified healthcare professional only under institutional clinical supervision.',
    { lineGap: 3, width: 500 }
  )

doc.moveDown(1)
doc.fillColor(TEAL_900)
  .font('Helvetica-Bold')
  .fontSize(12)
  .text('2. Pharmacovigilance & Adverse Drug Reaction Reporting')

doc.moveDown(0.4)
doc.fillColor(TEXT_DARK)
  .font('Helvetica')
  .fontSize(9)
  .text(
    'Avalin Laboratories maintains a systematic pharmacovigilance program to monitor and evaluate the real-world safety profile of all manufactured and marketed products. Healthcare professionals, clinical investigators, and institutional pharmacists are urged to report any suspected adverse drug reaction, therapeutic failure, or product quality issue immediately to our dedicated Pharmacovigilance Unit.',
    { lineGap: 3, width: 500 }
  )

doc.moveDown(0.8)
doc.rect(45, doc.y, 505, 75).fill(BG_TINT)
const pvBoxY = doc.y

doc.fillColor(TEAL_900)
  .font('Helvetica-Bold')
  .fontSize(10)
  .text('Pharmacovigilance Reporting Channels:', 55, pvBoxY + 10)

doc.fillColor(TEXT_DARK)
  .font('Helvetica')
  .fontSize(8.5)
  .text(`• Dedicated PV Email: ${company.contacts.pvEmail}`, 55, pvBoxY + 28)
  .text(`• Corporate Inquiries: ${company.contacts.email}`, 55, pvBoxY + 42)
  .text(`• Postal Address: Pharmacovigilance Unit, ${company.legalName}, ${company.address.full}`, 55, pvBoxY + 56)

doc.y = pvBoxY + 95

doc.fillColor(TEAL_900)
  .font('Helvetica-Bold')
  .fontSize(12)
  .text('3. Commercial & Institutional Procurement Scope')

doc.moveDown(0.4)
doc.fillColor(TEXT_DARK)
  .font('Helvetica')
  .fontSize(9)
  .text(
    'Avalin Laboratories Pvt Ltd does not sell medications directly to retail consumers, does not publish commercial rate cards or retail pricing within this clinical compendium, and does not operate an online pharmacy. All distribution is conducted strictly through licensed clinical distributors, government and private institutional hospital tenders, and authorized supply chains.',
    { lineGap: 3, width: 500 }
  )

doc.moveDown(2)
doc.rect(45, doc.y, 505, 1).fill(LINE_COLOR)
doc.moveDown(0.5)

doc.fillColor(TEXT_MUTED)
  .font('Helvetica')
  .fontSize(8)
  .text(`Formulary Compendium Issued: September 2026 • Document Ref: AVL-FORM-2026-V1`, 45, doc.y, { align: 'center', width: 505 })

doc.end()

stream.on('finish', () => {
  const stats = fs.statSync(OUT_PATH)
  console.log(`Successfully generated formulary PDF: ${OUT_PATH}`)
  console.log(`File size: ${(stats.size / 1024).toFixed(1)} KB (Budget: < 5000 KB)`)
})
