'use client'

/**
 * ContactForm — native accessible commercial inquiry form — Avalin Laboratories
 *
 * Replaces unbranded Google Forms iframe (Resolves C1, H5).
 * Features:
 *   - Client-side validation with real-time field error indicators
 *   - Accessible FormField, Input, Textarea, and Select primitives
 *   - Bot protection (hidden honeypot)
 *   - High-contrast confirmation state with reference tracking ID
 *   - Fallback direct email link if transmission fails
 */

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { FormField, Input, Textarea, Select } from '@/components/ui/FormField'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { contacts } from '@/lib/site-config'

export const INQUIRY_CATEGORIES = [
  'Commercial Supply & Product Pricing',
  'Hospital / Institutional Tenders',
  'Distributor & Stockist Opportunities',
  'Pharmacovigilance / Adverse Event Reporting',
  'General Corporate Inquiry',
] as const

export type InquiryCategory = typeof INQUIRY_CATEGORIES[number]

interface FormState {
  name: string
  email: string
  phone: string
  organization: string
  inquiryType: InquiryCategory
  subject: string
  message: string
  consent: boolean
  hp_company: string
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  phone: '',
  organization: '',
  inquiryType: 'Commercial Supply & Product Pricing',
  subject: '',
  message: '',
  consent: false,
  hp_company: '',
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>(INITIAL_STATE)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [successInfo, setSuccessInfo] = useState<{ referenceId: string; message: string } | null>(null)

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormState, string>> = {}

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your full name (minimum 2 characters).'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.'
    }

    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (!formData.phone.trim() || phoneDigits.length < 7) {
      errs.phone = 'Please provide a valid phone number (minimum 7 digits).'
    }

    if (!formData.organization.trim() || formData.organization.trim().length < 2) {
      errs.organization = 'Please provide your organization or practice name.'
    }

    if (!formData.inquiryType.trim()) {
      errs.inquiryType = 'Please select an inquiry category.'
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errs.subject = 'Subject must be at least 3 characters.'
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide details of your inquiry (minimum 10 characters).'
    }

    if (!formData.consent) {
      errs.consent = 'Consent is required to submit this form.'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // Clear field-specific error as user types
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError(null)

    if (!validate()) return

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        if (data.fieldErrors) {
          const mapped: Partial<Record<keyof FormState, string>> = {}
          Object.keys(data.fieldErrors).forEach((key) => {
            mapped[key as keyof FormState] = data.fieldErrors[key][0]
          })
          setErrors(mapped)
        }
        setServerError(data.error || 'Submission failed. Please try again.')
        setIsSubmitting(false)
        return
      }

      // Success
      setSuccessInfo({
        referenceId: data.referenceId,
        message: data.message,
      })
      setFormData(INITIAL_STATE)
      setErrors({})
    } catch {
      setServerError('Network communication error. Please check your connection or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ─── SUCCESS SCREEN ───────────────────────────────────────────────────────
  if (successInfo) {
    return (
      <Card className="p-8 sm:p-10 bg-surface-alt border border-border shadow-card text-center">
        <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-6 border border-brand-200">
          <Icon name="check" size={32} aria-hidden="true" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 mb-4 inline-block">
          Inquiry Logged Successfully
        </span>

        <h2 className="font-heading text-2xl font-bold text-primary-900 mb-3">
          Thank you for reaching out
        </h2>

        <p className="text-sm text-text-secondary max-w-lg mx-auto leading-relaxed mb-6">
          {successInfo.message}
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border text-xs mb-8">
          <span className="text-text-tertiary">Reference ID:</span>
          <span className="font-mono font-bold text-primary-900">{successInfo.referenceId}</span>
        </div>

        <div>
          <Button
            variant="secondary"
            size="md"
            onClick={() => setSuccessInfo(null)}
          >
            Submit Another Inquiry
          </Button>
        </div>
      </Card>
    )
  }

  // ─── FORM SCREEN ──────────────────────────────────────────────────────────
  return (
    <Card className="p-6 sm:p-9 bg-surface-alt border border-brand-200/80 shadow-card">
      <div className="mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-950 mb-2">
          Send an Inquiry
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          Please provide your details below. For direct telephone inquiries, reach our desk at{' '}
          <a href={`tel:${contacts.phoneRaw}`} className="text-brand-700 font-semibold hover:underline font-mono">
            {contacts.phone}
          </a>
          . For urgent pharmacovigilance reports, you may email{' '}
          <a href={`mailto:${contacts.pvEmail}`} className="text-brand-700 font-medium hover:underline">
            {contacts.pvEmail}
          </a>.
        </p>
      </div>

      {serverError && (
        <div
          role="alert"
          className="mb-6 rounded-lg bg-safety-unsafe-bg border border-safety-unsafe-DEFAULT/30 p-4 text-xs text-safety-unsafe-text flex items-start gap-2.5"
        >
          <Icon name="warning" size={16} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1">
            <p className="font-semibold">{serverError}</p>
            <p className="mt-1">
              You can also email your inquiry directly to{' '}
              <a href={`mailto:${contacts.email}`} className="underline font-bold">
                {contacts.email}
              </a>.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Hidden Honeypot Field */}
        <input
          type="text"
          name="hp_company"
          value={formData.hp_company}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <FormField
            id="name"
            label="Full Name"
            required
            error={errors.name}
          >
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Dr. Rajesh Baruah"
              hasError={!!errors.name}
              autoComplete="name"
              disabled={isSubmitting}
            />
          </FormField>

          {/* Email Address */}
          <FormField
            id="email"
            label="Email Address"
            required
            error={errors.email}
          >
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@clinic.in"
              hasError={!!errors.email}
              autoComplete="email"
              disabled={isSubmitting}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Phone */}
          <FormField
            id="phone"
            label="Phone Number"
            required
            error={errors.phone}
          >
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              hasError={!!errors.phone}
              autoComplete="tel"
              disabled={isSubmitting}
            />
          </FormField>

          {/* Organization */}
          <FormField
            id="organization"
            label="Organization / Practice"
            required
            error={errors.organization}
          >
            <Input
              id="organization"
              name="organization"
              required
              value={formData.organization}
              onChange={handleChange}
              placeholder="Apollo Clinic / Medico Dist"
              hasError={!!errors.organization}
              disabled={isSubmitting}
            />
          </FormField>
        </div>

        {/* Inquiry Type Dropdown */}
        <FormField
          id="inquiryType"
          label="Inquiry Category"
          required
          error={errors.inquiryType}
        >
          <div className="relative">
            <Select
              id="inquiryType"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              hasError={!!errors.inquiryType}
              disabled={isSubmitting}
            >
              {INQUIRY_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-text-tertiary">
              <Icon name="chevron-down" size={14} aria-hidden="true" />
            </div>
          </div>
        </FormField>

        {/* Subject */}
        <FormField
          id="subject"
          label="Subject"
          required
          error={errors.subject}
        >
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Institutional quotation for Lisium tablets"
            hasError={!!errors.subject}
            disabled={isSubmitting}
          />
        </FormField>

        {/* Message */}
        <FormField
          id="message"
          label="Message"
          required
          error={errors.message}
          hint="Please specify products of interest, expected quantities, or reporting details."
        >
          <Textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Please detail your inquiry here..."
            hasError={!!errors.message}
            disabled={isSubmitting}
          />
        </FormField>

        {/* DPDP Data Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              disabled={isSubmitting}
              className="mt-1 h-4 w-4 rounded border-border text-primary-600 focus:ring-primary-600"
            />
            <span className="text-xs text-text-secondary leading-normal">
              I consent to Avalin Laboratories storing and processing the submitted details to respond
              to this inquiry in accordance with the{' '}
              <a href="/privacy-policy" target="_blank" className="text-primary-600 underline">
                Privacy Policy
              </a>.
            </span>
          </label>
          {errors.consent && (
            <p className="mt-1 text-xs font-medium text-safety-unsafe-DEFAULT">
              {errors.consent}
            </p>
          )}
        </div>

        {/* Submit Action */}
        <div className="pt-4 border-t border-border">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto min-w-[200px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <Icon name="loader" size={16} className="animate-spin" />
                <span>Transmitting...</span>
              </span>
            ) : (
              'Submit Inquiry'
            )}
          </Button>
        </div>
      </form>

      <div className="mt-5 pt-4 border-t border-brand-200/60 text-center">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScJ2P-GjA7uwRSZqH3WQsQELDTFb4d0FbznfEfD_MUPIL3Ngg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-text-tertiary hover:text-brand-700 underline underline-offset-2 transition-colors inline-flex items-center gap-1.5"
        >
          <span>Form not loading or prefer Google Forms directly? Open external form</span>
          <Icon name="external" size={12} aria-hidden="true" />
        </a>
      </div>
    </Card>
  )
}
