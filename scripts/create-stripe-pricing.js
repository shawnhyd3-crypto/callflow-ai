/* eslint-disable no-console */
const Stripe = require('stripe')

const plans = [
  {
    key: 'starter',
    name: 'CallFlow AI Starter',
    priceCents: 4900,
    includedMinutes: 100,
  },
  {
    key: 'pro',
    name: 'CallFlow AI Growth',
    priceCents: 14900,
    includedMinutes: 500,
  },
  {
    key: 'business',
    name: 'CallFlow AI Scale',
    priceCents: 34900,
    includedMinutes: 2000,
  },
]

async function main() {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const meteredRateCents = Number(process.env.STRIPE_METERED_RATE_CENTS)

  if (!secretKey) {
    throw new Error('Missing STRIPE_SECRET_KEY')
  }

  if (!meteredRateCents || Number.isNaN(meteredRateCents)) {
    throw new Error('Missing STRIPE_METERED_RATE_CENTS (per-minute overage rate in cents)')
  }

  const stripe = new Stripe(secretKey, { apiVersion: '2023-10-16' })

  const results = []

  for (const plan of plans) {
    const product = await stripe.products.create({
      name: plan.name,
      metadata: {
        plan: plan.key,
        includedMinutes: String(plan.includedMinutes),
      },
    })

    const basePrice = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.priceCents,
      currency: 'usd',
      recurring: { interval: 'month' },
      metadata: {
        plan: plan.key,
        type: 'base',
      },
    })

    const meteredPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: meteredRateCents,
      currency: 'usd',
      recurring: {
        interval: 'month',
        usage_type: 'metered',
        aggregate_usage: 'sum',
      },
      billing_scheme: 'per_unit',
      metadata: {
        plan: plan.key,
        type: 'metered',
      },
    })

    results.push({
      key: plan.key,
      basePrice: basePrice.id,
      meteredPrice: meteredPrice.id,
    })
  }

  console.log('\nStripe prices created. Add these to your env:')
  for (const result of results) {
    const upper = result.key.toUpperCase()
    console.log(`STRIPE_${upper}_PRICE_ID=${result.basePrice}`)
    console.log(`STRIPE_${upper}_METERED_PRICE_ID=${result.meteredPrice}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
