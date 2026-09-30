import Link from 'next/link'
import type { ManufacturerInfo, MarketerInfo } from '@/content/types'
import { company } from '@/content/company'

interface Props {
  marketer: MarketerInfo
  manufacturer?: ManufacturerInfo
}

export function ManufacturerBlock({ marketer, manufacturer }: Props) {
  return (
    <div className="rounded-card border border-border bg-surface-alt p-5 sm:p-6">
      <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">
        Manufacturer &amp; Marketer Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-text-secondary mb-1">Marketed by</p>
          <p className="text-sm font-medium text-text-primary">{marketer.name}</p>
          <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{marketer.address}</p>
          <p className="text-xs text-text-tertiary mt-1.5 font-mono">
            FSSAI Reg. No.: <span className="text-text-secondary font-medium">{company.legal.fssaiLicence}</span>
          </p>
        </div>
        {manufacturer && (
          <div>
            <p className="text-xs font-semibold text-text-secondary mb-1">Manufactured by</p>
            <p className="text-sm font-medium text-text-primary">{manufacturer.name}</p>
            <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{manufacturer.address}</p>
          </div>
        )}
      </div>

      <div className="mt-5 border-t border-border pt-4 space-y-2">
        <p className="text-xs text-text-tertiary leading-relaxed">
          <strong className="text-text-secondary font-medium">Medical Disclaimer:</strong> The product information presented on this page is intended solely for healthcare professionals and patients under qualified medical supervision. It is not a substitute for professional clinical advice, diagnosis, or treatment. Prescription formulations must be used strictly in accordance with the direction of a licensed medical practitioner.
        </p>
        <p className="text-xs text-text-tertiary leading-relaxed">
          <strong className="text-text-secondary font-medium">Adverse Event Reporting:</strong> If you suspect an adverse drug reaction or patient safety event related to this product, contact our pharmacovigilance unit at{' '}
          <a href={`mailto:${company.contacts.pvEmail}`} className="text-primary-600 font-semibold hover:underline">
            {company.contacts.pvEmail}
          </a>{' '}
          or access our dedicated{' '}
          <Link href="/pharmacovigilance" className="text-primary-600 font-semibold hover:underline">
            Pharmacovigilance Reporting Page
          </Link>
          .
        </p>
      </div>
    </div>
  )
}


