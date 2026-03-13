import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { stripe, createCheckoutSession } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rate-limit'
import { enforceCsrf } from '@/lib/security'

const checkoutSchema = z.object({
  organizationId: z.string().min(1),
  plan: z.enum(['starter', 'pro', 'business']),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
})

export async function POST(request: NextRequest) {
  const rateLimited = await rateLimit(request, 'api')
  if (rateLimited) return rateLimited

  const csrf = enforceCsrf(request)
  if (csrf) return csrf

  try {
    const body = checkoutSchema.parse(await request.json())
    const { organizationId, plan, successUrl, cancelUrl } = body

    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
    })

    if (!organization) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      )
    }

    const existingSubscription = await prisma.subscription.findUnique({
      where: { organizationId },
    })

    let customerId = existingSubscription?.stripeCustomerId

    if (!customerId) {
      const customer = await stripe.customers.create({
        name: organization.name,
        metadata: { organizationId },
      })
      customerId = customer.id
    }

    const trialDays = !existingSubscription
      ? Number(process.env.STRIPE_TRIAL_DAYS ?? 14)
      : undefined

    const session = await createCheckoutSession({
      organizationId,
      customerId,
      plan,
      successUrl,
      cancelUrl,
      trialDays,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 })
    }
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Unable to create checkout session' },
      { status: 500 }
    )
  }
}
