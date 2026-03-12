import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
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
    name: 'Pro',
    price: 149,
    minutesPerMonth: 500,
    agents: 5,
    features: [
      '500 minutes per month',
      'Up to 5 AI agents',
      'Advanced analytics',
      'Call transcripts',
      'Appointment scheduling',
      'Priority email support',
    ],
  },
  business: {
    name: 'Business',
    price: 349,
    minutesPerMonth: 2000,
    agents: 'Unlimited',
    features: [
      '2000+ minutes per month',
      'Unlimited AI agents',
      'Full analytics suite',
      'Custom integrations',
      'Dedicated account manager',
      '24/7 phone support',
    ],
  },
}

export const STRIPE_PLAN_PRICE_IDS = {
  starter: process.env.STRIPE_STARTER_PRICE_ID,
  pro: process.env.STRIPE_PRO_PRICE_ID,
  business: process.env.STRIPE_BUSINESS_PRICE_ID,
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
}: {
  organizationId: string
  customerId: string
  plan: 'starter' | 'pro' | 'business'
  successUrl: string
  cancelUrl: string
}) {
  const priceId = STRIPE_PLAN_PRICE_IDS[plan]

  if (!priceId) {
    throw new Error(`Missing Stripe price ID for plan: ${plan}`)
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      organizationId,
      plan,
    },
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
