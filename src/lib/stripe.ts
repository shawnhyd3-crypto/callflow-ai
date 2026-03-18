import Stripe from 'stripe'
import { env } from '@/lib/env'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe is not configured. Set STRIPE_SECRET_KEY environment variable.')
  }
  if (!_stripe) {
    _stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
      typescript: true,
    })
  }
  return _stripe
}

// Keep backward compat — but will throw if Stripe not configured
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as any)[prop]
  },
})

export const STRIPE_PLANS = {
  starter: {
    name: 'Starter',
    price: 49,
    minutesPerMonth: 100,
    agents: 1,
    features: [
      '100 minutes per month',
      '1 AI agent',
      'Basic call logging',
      'Email support',
    ],
  },
  pro: {
    name: 'Growth',
    price: 149,
    minutesPerMonth: 500,
    agents: 3,
    features: [
      '500 minutes per month',
      'Up to 3 AI agents',
      'Advanced analytics',
      'Call transcripts',
      'Appointment scheduling',
      'Priority email support',
    ],
  },
  business: {
    name: 'Scale',
    price: 349,
    minutesPerMonth: 2000,
    agents: 10,
    features: [
      '2000 minutes per month',
      'Up to 10 AI agents',
      'Full analytics suite',
      'Custom integrations',
      'Dedicated account manager',
      '24/7 phone support',
    ],
  },
} as const

export type StripePlan = keyof typeof STRIPE_PLANS


export function getPlanMinutesLimit(plan: string): number {
  switch (plan) {
    case 'starter': return 100
    case 'pro': return 500
    case 'business': return 2000
    default: return 100
  }
}

export function getPlanFromPriceId(priceId: string): string | null {
  const env = process.env
  if (priceId === env.STRIPE_STARTER_PRICE_ID) return 'starter'
  if (priceId === env.STRIPE_PRO_PRICE_ID) return 'pro'
  if (priceId === env.STRIPE_BUSINESS_PRICE_ID) return 'business'
  return null
}


export async function createCheckoutSession({
  customerId,
  priceId,
  successUrl,
  cancelUrl,
  trialDays,
}: {
  customerId: string
  priceId: string
  successUrl: string
  cancelUrl: string
  trialDays?: number
}) {
  const s = getStripe()
  const session = await s.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    ...(trialDays ? { subscription_data: { trial_period_days: trialDays } } : {}),
  })
  return session
}
