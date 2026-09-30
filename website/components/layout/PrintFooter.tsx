'use client'

import { useState, useEffect } from 'react'

export function PrintFooter() {
  const [printDate, setPrintDate] = useState('')

  useEffect(() => {
    // Client-side date generation (no server mismatch)
    const now = new Date()
    setPrintDate(
      now.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    )
  }, [])

  return (
    <div className="hidden print:block fixed bottom-0 left-0 right-0 border-t border-gray-300 pt-2 text-[10px] text-gray-500 bg-white">
      <div className="flex items-center justify-between">
        <span>Avalin Laboratories Pvt Ltd — https://avalinlaboratories.com</span>
        {printDate && <span>Printed on {printDate}</span>}
      </div>
    </div>
  )
}
