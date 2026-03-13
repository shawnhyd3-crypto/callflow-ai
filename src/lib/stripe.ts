import Stripe from 'stripe'
import { env } from '@/lib/env'

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
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
}

export const STRIPE_PLAN_PRICE_IDS = {
  starter: env.STRIPE_STARTER_PRICE_ID,
  pro: env.STRIPE_PRO_PRICE_ID,
  business: env.STRIPE_BUSINESS_PRICE_ID,
}

export const STRIPE_PLAN_METERED_PRICE_IDS = {
  starter: env.STRIPE_STARTER_METERED_PRICE_ID,
  pro: env.STRIPE_PRO_METERED_PRICE_ID,
  business: env.STRIPE_BUSINESS_METERED_PRICE_ID,
}

export function getPlanFromPriceId(priceId?: string | null) {
  if (!priceId) return null

  const entries = Object.entries(STRIPE_PLAN_PRICE_IDS) as Array<[
    'starter' | 'pro' | 'business',
    string | undefined
  ]>

  const match = entries.find(([, id]) => id === priceId)
  return match ? match[0] : null
}

export function getPlanMinutesLimit(plan: 'starter' | 'pro' | 'business') {
  return STRIPE_PLANS[plan].minutesPerMonth
}

export async function createCheckoutSession({
  organizationId,
  customerId,
  plan,
  successUrl,
  cancelUrl,
  trialDays,
}: {
  organizationId: string
  customerId: string
  plan: 'starter' | 'pro' | 'business'
  successUrl: string
  cancelUrl: string
  trialDays?: number
}) {
  const priceId = STRIPE_PLAN_PRICE_IDS[plan]

  if (!priceId) {
    throw new Error(`Missing Stripe price ID for plan: ${plan}`)
  }

  const meteredPriceId = STRIPE_PLAN_METERED_PRICE_IDS[plan]

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      price: priceId,
      quantity: 1,
    },
  ]

  if (meteredPriceId) {
    lineItems.push({
      price: meteredPriceId,
    })
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: lineItems,
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      organizationId,
      plan,
    },
    subscription_data: trialDays
      ? {
          trial_period_days: trialDays,
        }
      : undefined,
  })

  return session
}

export async function getCustomerSubscriptions(customerId: string) {
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    limit: 100,
  })

  return subscriptions.data
}

export async function cancelSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.cancel(subscriptionId)
  return subscription
}
