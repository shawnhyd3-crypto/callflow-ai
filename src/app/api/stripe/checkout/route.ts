import { NextRequest, NextResponse } from 'next/server'
import { stripe, createCheckoutSession } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { organizationId, plan, successUrl, cancelUrl } = body

    if (!organizationId || !plan || !successUrl || !cancelUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!['starter', 'pro', 'business'].includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      )
    }

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

    const session = await createCheckoutSession({
      organizationId,
      customerId,
      plan,
      successUrl,
      cancelUrl,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Unable to create checkout session' },
      { status: 500 }
    )
  }
}
