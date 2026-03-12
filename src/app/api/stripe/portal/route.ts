import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rate-limit'
import { enforceCsrf } from '@/lib/security'

const portalSchema = z.object({
  organizationId: z.string().min(1),
  returnUrl: z.string().url().optional(),
})

export async function POST(request: NextRequest) {
  const rateLimited = await rateLimit(request, 'api')
  if (rateLimited) return rateLimited

  const csrf = enforceCsrf(request)
  if (csrf) return csrf

  try {
    const body = portalSchema.parse(await request.json())
    const { organizationId, returnUrl } = body

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
      return_url: returnUrl || process.env.NEXT_PUBLIC_APP_URL || 'https://callflow-ai-blue.vercel.app',
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 })
    }
    console.error('Stripe portal error:', error)
    return NextResponse.json(
      { error: 'Unable to create portal session' },
      { status: 500 }
    )
  }
}
