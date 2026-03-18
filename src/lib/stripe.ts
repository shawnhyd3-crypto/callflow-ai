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
