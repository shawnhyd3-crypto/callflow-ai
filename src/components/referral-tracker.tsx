'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export function ReferralTracker() {
  const params = useSearchParams()
  const code = params.get('ref')

  useEffect(() => {
    if (!code) return

    fetch('/api/referrals/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    }).catch(() => {})
  }, [code])

  return null
}
