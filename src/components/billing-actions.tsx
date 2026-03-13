'use client'

import { useState } from 'react'
import { STRIPE_PLANS } from '@/lib/stripe'

interface BillingActionsProps {
  organizationId: string
  currentPlan?: string | null
}

const planKeys = Object.keys(STRIPE_PLANS) as Array<keyof typeof STRIPE_PLANS>

export function BillingActions({ organizationId, currentPlan }: BillingActionsProps) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

  async function startCheckout(plan: string) {
    setLoadingPlan(plan)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId,
          plan,
          successUrl: `${window.location.origin}/dashboard/billing?status=success`,
          cancelUrl: `${window.location.origin}/dashboard/billing?status=cancel`,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Unable to start checkout')
      }
      window.location.href = data.url
    } catch (error) {
      console.error(error)
      alert('Unable to start checkout. Please try again.')
    } finally {
      setLoadingPlan(null)
    }
  }

  async function openPortal() {
    setLoadingPlan('portal')
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId,
          returnUrl: `${window.location.origin}/dashboard/billing`,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Unable to open portal')
      }
      window.location.href = data.url
    } catch (error) {
      console.error(error)
      alert('Unable to open billing portal.')
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {planKeys.map((key) => (
          <div key={key} className="card border border-slate-800">
            <h3 className="text-lg font-semibold text-white">{STRIPE_PLANS[key].name}</h3>
            <p className="text-slate-400 text-sm">${STRIPE_PLANS[key].price}/mo</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              {STRIPE_PLANS[key].features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
            <button
              type="button"
              className="btn btn-primary mt-4 w-full"
              disabled={loadingPlan !== null}
              onClick={() => startCheckout(key)}
            >
              {currentPlan === key ? 'Current Plan' : `Choose ${STRIPE_PLANS[key].name}`}
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="btn btn-secondary"
        onClick={openPortal}
        disabled={loadingPlan !== null}
      >
        Manage Subscription in Stripe
      </button>
    </div>
  )
}
