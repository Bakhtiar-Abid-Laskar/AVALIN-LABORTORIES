import { NextResponse } from 'next/server'
import { z } from 'zod'

// ─── Rate Limiter (In-Memory) ───────────────────────────────────────────────
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5
const ipRequestMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = ipRequestMap.get(ip)

  if (!record || now > record.resetAt) {
    ipRequestMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }

  record.count += 1
  return false
}

// ─── Google Form Mapping & Configuration ────────────────────────────────────
// Form URL: https://forms.gle/sqr9ghGHuaNNK6iS8
// Form ID: 1FAIpQLScBGYlTBTtOCbwJeCz95rRk8Bhw_DKCuyI-CCenv3Uy5X_5dQ
const GOOGLE_FORM_ID =
  process.env.GOOGLE_FORM_ID || '1FAIpQLScBGYlTBTtOCbwJeCz95rRk8Bhw_DKCuyI-CCenv3Uy5X_5dQ'

const GOOGLE_ENTRIES = {
  name: process.env.GOOGLE_ENTRY_NAME || 'entry.1075633969',
  email: process.env.GOOGLE_ENTRY_EMAIL || 'entry.1078567489',
  phone: process.env.GOOGLE_ENTRY_PHONE || 'entry.402683547',
  organization: process.env.GOOGLE_ENTRY_ORG || 'entry.680423976',
  inquiryType: process.env.GOOGLE_ENTRY_TYPE || 'entry.24088896',
  subject: process.env.GOOGLE_ENTRY_SUBJECT || 'entry.87647776',
  message: process.env.GOOGLE_ENTRY_MESSAGE || 'entry.1192160198',
} as const

export const INQUIRY_CATEGORIES = [
  'Commercial Supply & Product Pricing',
  'Hospital / Institutional Tenders',
  'Distributor & Stockist Opportunities',
  'Pharmacovigilance / Adverse Event Reporting',
  'General Corporate Inquiry',
] as const

const CATEGORY_MAP: Record<string, string> = {
  commercial: 'Commercial Supply & Product Pricing',
  hospital: 'Hospital / Institutional Tenders',
  distribution: 'Distributor & Stockist Opportunities',
  pv: 'Pharmacovigilance / Adverse Event Reporting',
  general: 'General Corporate Inquiry',
}

function resolveCategory(val: string): string {
  return CATEGORY_MAP[val] || val
}

// ─── Validation Schema — All Fields Compulsory ──────────────────────────────
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please provide your full name (minimum 2 characters).')
    .max(100, 'Name must not exceed 100 characters.'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .max(120, 'Email must not exceed 120 characters.'),
  phone: z
    .string()
    .trim()
    .min(7, 'Please provide a valid phone number (minimum 7 digits).')
    .max(25, 'Phone number is too long.'),
  organization: z
    .string()
    .trim()
    .min(2, 'Please provide your organization or practice name.')
    .max(120, 'Organization name is too long.'),
  inquiryType: z
    .string()
    .trim()
    .min(1, 'Please select an inquiry category.')
    .refine(
      (val) =>
        INQUIRY_CATEGORIES.includes(val as (typeof INQUIRY_CATEGORIES)[number]) ||
        val in CATEGORY_MAP,
      'Please select a valid inquiry category.',
    ),
  subject: z
    .string()
    .trim()
    .min(3, 'Subject must be at least 3 characters.')
    .max(150, 'Subject must not exceed 150 characters.'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters.')
    .max(3000, 'Message must not exceed 3000 characters.'),
  consent: z
    .boolean()
    .refine((val) => val === true, 'You must consent to proceed with your inquiry.'),
  // Honeypot field — bots fill this, humans do not
  hp_company: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    // 1. Client IP for Rate Limiting
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many submissions. Please wait a few minutes before trying again.',
        },
        { status: 429 },
      )
    }

    // 2. Parse and Validate Request Payload
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      return NextResponse.json(
        {
          success: false,
          error: 'Please verify the highlighted fields.',
          fieldErrors,
        },
        { status: 400 },
      )
    }

    const data = result.data

    // 3. Honeypot Check (Silently drop bot submissions)
    if (data.hp_company && data.hp_company.trim().length > 0) {
      return NextResponse.json({
        success: true,
        referenceId: `AV-${Date.now().toString(36).toUpperCase()}`,
        message: 'Your inquiry has been received.',
      })
    }

    // 4. Generate Unique Inquiry Reference
    const referenceId = `AV-${Date.now().toString(36).toUpperCase()}`

    // 5. Server-to-Server Google Form Dispatch
    const resolvedCategory = resolveCategory(data.inquiryType)

    try {
      const googleParams = new URLSearchParams()
      googleParams.append(GOOGLE_ENTRIES.name, data.name)
      googleParams.append(GOOGLE_ENTRIES.email, data.email)
      googleParams.append(GOOGLE_ENTRIES.phone, data.phone)
      googleParams.append(GOOGLE_ENTRIES.organization, data.organization)
      googleParams.append(GOOGLE_ENTRIES.inquiryType, resolvedCategory)
      googleParams.append(GOOGLE_ENTRIES.subject, data.subject)
      googleParams.append(GOOGLE_ENTRIES.message, data.message)

      const googleRes = await fetch(
        `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: googleParams.toString(),
        },
      )

      if (googleRes.ok || googleRes.status === 302) {
        console.log(`[Google Form Dispatch] Successfully posted response to ${GOOGLE_FORM_ID}`)
      } else {
        console.warn(`[Google Form Dispatch] Google Form responded with status: ${googleRes.status}`)
      }
    } catch (err) {
      console.error('[Google Form Dispatch] Failed to forward submission:', err)
      // Non-blocking: Still return success to user with their referenceId
    }

    // Log safely for operational visibility
    console.log(`[Contact Submission] Reference: ${referenceId} | Category: ${resolvedCategory} | Email: ${data.email.slice(0, 3)}***`)

    return NextResponse.json({
      success: true,
      referenceId,
      message: 'Inquiry successfully received. Our team will review and respond within 1–2 business days.',
    })
  } catch (err) {
    console.error('Contact API Error:', err)
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while transmitting your inquiry. Please try again or email us directly.',
      },
      { status: 500 },
    )
  }
}
