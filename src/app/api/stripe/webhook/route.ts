import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

/**
 * Stripe Webhook Handler
 * Handles Stripe events: checkout.session.completed, customer.subscription.updated, etc.
 */
export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Missing signature or webhook secret' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session
        )
        break

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionEvent(
          event.data.object as Stripe.Subscription
        )
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription
        )
        break

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(
          event.data.object as Stripe.Invoice
        )
        break

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(
          event.data.object as Stripe.Invoice
        )
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Stripe webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  try {
    if (session.metadata?.organizationId && session.customer) {
      const organizationId = session.metadata.organizationId
      const customerId = typeof session.customer === 'string'
        ? session.customer
        : session.customer.id

      // Get subscription ID from session
      const subscription = await stripe.subscriptions.list({
        customer: customerId,
        limit: 1,
      })

      const plan = session.metadata.plan || 'starter'

      if (subscription.data.length > 0) {
        const sub = subscription.data[0]

        // Update or create subscription record
        await prisma.subscription.upsert({
          where: { organizationId },
          update: {
            stripeSubscriptionId: sub.id,
            plan: plan as 'starter' | 'pro' | 'enterprise',
            status: sub.status as any,
            currentPeriodStart: new Date(sub.current_period_start * 1000),
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
            cancelledAt: sub.cancel_at
              ? new Date(sub.cancel_at * 1000)
              : null,
          },
          create: {
            organizationId,
            stripeCustomerId: customerId,
            stripeSubscriptionId: sub.id,
            plan: plan as 'starter' | 'pro' | 'enterprise',
            status: sub.status as any,
            currentPeriodStart: new Date(sub.current_period_start * 1000),
            currentPeriodEnd: new Date(sub.current_period_end * 1000),
          },
        })

        console.log(
          `Subscription created/updated for org ${organizationId}: ${sub.id}`
        )
      }
    }
  } catch (error) {
    console.error('Error handling checkout session:', error)
    throw error
  }
}

async function handleSubscriptionEvent(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string

    // Find the organization with this customer ID
    const org = await prisma.subscription.findFirst({
      where: { stripeCustomerId: customerId },
      include: { organization: true },
    })

    if (org) {
      // Determine plan from subscription items
      let plan: 'starter' | 'pro' | 'enterprise' = 'starter'
      // In production, map price IDs to plans

      await prisma.subscription.update({
        where: { organizationId: org.organizationId },
        data: {
          stripeSubscriptionId: subscription.id,
          status: subscription.status as any,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          cancelledAt: subscription.cancel_at
            ? new Date(subscription.cancel_at * 1000)
            : null,
          plan,
        },
      })

      console.log(
        `Subscription updated for org ${org.organizationId}: status=${subscription.status}`
      )
    }
  } catch (error) {
    console.error('Error handling subscription event:', error)
    throw error
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string

    const org = await prisma.subscription.findFirst({
      where: { stripeCustomerId: customerId },
    })

    if (org) {
      await prisma.subscription.update({
        where: { organizationId: org.organizationId },
        data: {
          status: 'cancelled',
          cancelledAt: new Date(),
        },
      })

      console.log(`Subscription cancelled for org ${org.organizationId}`)
    }
  } catch (error) {
    console.error('Error handling subscription deletion:', error)
    throw error
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    console.log(`Invoice payment succeeded: ${invoice.id}`)
    // Could send confirmation email here
  } catch (error) {
    console.error('Error handling invoice payment succeeded:', error)
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  try {
    console.log(`Invoice payment failed: ${invoice.id}`)
    // Could send retry reminder or dunning email here
  } catch (error) {
    console.error('Error handling invoice payment failed:', error)
  }
}
