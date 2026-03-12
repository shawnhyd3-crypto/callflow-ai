import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { env } from '@/lib/env'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { organizationId, returnUrl } = body

    if (!organizationId) {
      return NextResponse.json(
        { error: 'Missing organizationId' },
        { status: 400 }
      )
    }

    const subscription = await prisma.subscription.findUnique({
      where: { organizationId },
    })

    if (!subscription?.stripeCustomerId) {
      return NextResponse.json(
        { error: 'Stripe customer not found for organization' },
        { status: 404 }
      )
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url:
        returnUrl || env.NEXT_PUBLIC_APP_URL || 'https://callflow-ai-blue.vercel.app',
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    console.error('Stripe portal error:', error)
    return NextResponse.json(
      { error: 'Unable to create portal session' },
      { status: 500 }
    )
  }
}
