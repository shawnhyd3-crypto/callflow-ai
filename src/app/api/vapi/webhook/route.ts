import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stripe, getPlanMinutesLimit } from '@/lib/stripe'
import { getUsageAlert } from '@/lib/usage'
import { verifyWebhookSignature } from '@/lib/vapi'
import { env } from '@/lib/env'
import { publishLiveCallEvent } from '@/lib/vapi-live'

/**
 * Vapi Webhook Handler
 * Handles call events from Vapi (start, end, transcript, etc.)
 */
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()

    const signature = request.headers.get('x-vapi-signature')
    const secret = env.VAPI_WEBHOOK_SECRET

    if (secret) {
      const isValid = verifyWebhookSignature(signature, rawBody, secret)
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const body = JSON.parse(rawBody)
    const { message, call, phoneNumber, transcript } = body

    console.log('Vapi webhook event:', {
      message,
      callId: call?.id,
      phoneNumber: call?.phoneNumber,
    })

    publishLiveCallEvent({
      type: message?.type ?? 'unknown',
      callId: call?.id ?? null,
      phoneNumber: call?.phoneNumber ?? phoneNumber ?? null,
      transcript: message?.transcript ?? transcript ?? null,
      sentiment: message?.sentiment ?? null,
      durationSeconds: typeof call?.duration === 'number' ? call.duration : null,
      startedAt: call?.startedAtTime ?? null,
      receivedAt: new Date().toISOString(),
    })

    // Handle different message types
    switch (message?.type) {
      case 'call-started':
        await handleCallStarted(call)
        break

      case 'call-ended':
        await handleCallEnded(call, transcript)
        break

      case 'speech-update':
        await handleSpeechUpdate(call)
        break

      case 'function-calls':
        await handleFunctionCalls(call, message.functionCalls)
        break

      default:
        console.log('Unknown message type:', message?.type)
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Vapi webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function handleCallStarted(call: any) {
  try {
    console.log('Call started:', call.id)
    // Could create a temporary call log entry here if needed
  } catch (error) {
    console.error('Error handling call start:', error)
  }
}

async function handleCallEnded(call: any, transcript: string) {
  try {
    if (!call.assistantId || !call.phoneNumber) {
      console.warn('Missing assistantId or phoneNumber in call data')
      return
    }

    // Find the agent by Vapi assistant ID
    const agent = await prisma.phoneAgent.findFirst({
      where: {
        vapiAssistantId: call.assistantId,
      },
      include: {
        organization: true,
      },
    })

    if (!agent) {
      console.warn(`Agent not found for Vapi assistant: ${call.assistantId}`)
      return
    }

    // Determine outcome from transcript or call metadata
    const outcome = determineOutcome(transcript, call)

    // Create call log entry
    const callLog = await prisma.callLog.create({
      data: {
        organizationId: agent.organizationId,
        agentId: agent.id,
        phoneNumber: call.phoneNumber,
        duration: Math.floor(call.duration || 0),
        status: 'completed',
        outcome,
        transcript,
        recordingUrl: call.recordingUrl,
        startTime: new Date(call.startedAtTime),
        endTime: new Date(),
      },
    })

    // If an appointment was booked, create an appointment record
    if (outcome === 'booked') {
      const appointmentData = extractAppointmentData(transcript)
      if (appointmentData) {
        await prisma.appointment.create({
          data: {
            organizationId: agent.organizationId,
            agentId: agent.id,
            clientName: appointmentData.clientName || 'Unknown',
            clientPhone: call.phoneNumber,
            clientEmail: appointmentData.clientEmail,
            service: appointmentData.service,
            appointmentTime: appointmentData.appointmentTime || new Date(),
            notes: `Booked via AI agent. Transcript:\n${transcript}`,
            status: 'confirmed',
          },
        })
      }
    }

    // Update usage record
    const minutes = Math.ceil(callLog.duration / 60)
    const today = new Date()
    const billingStart = new Date(today.getFullYear(), today.getMonth(), 1)
    const billingEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    const subscription = await prisma.subscription.findUnique({
      where: { organizationId: agent.organizationId },
    })

    const plan =
      subscription?.plan === 'business'
        ? 'business'
        : subscription?.plan === 'pro'
          ? 'pro'
          : 'starter'

    const minutesLimit = getPlanMinutesLimit(plan)

    const usageRecord = await prisma.usageRecord.upsert({
      where: {
        organizationId_billingPeriodStart: {
          organizationId: agent.organizationId,
          billingPeriodStart: billingStart,
        },
      },
      update: {
        minutesUsed: {
          increment: minutes,
        },
        minutesLimit,
      },
      create: {
        organizationId: agent.organizationId,
        minutesUsed: minutes,
        minutesLimit,
        billingPeriodStart: billingStart,
        billingPeriodEnd: billingEnd,
      },
    })

    const usageAlert = getUsageAlert(usageRecord.minutesUsed, usageRecord.minutesLimit)
    if (usageAlert) {
      console.warn('Usage alert triggered', {
        organizationId: agent.organizationId,
        level: usageAlert.level,
        percent: usageAlert.percent,
        threshold: usageAlert.threshold,
      })
    }

    if (subscription?.stripeSubscriptionId) {
      try {
        const stripeSubscription = await stripe.subscriptions.retrieve(
          subscription.stripeSubscriptionId,
          { expand: ['items.data.price'] }
        )
        const subscriptionItem =
          stripeSubscription.items.data.find(
            (item) => item.price.recurring?.usage_type === 'metered'
          ) || stripeSubscription.items.data[0]

        if (subscriptionItem) {
          await stripe.subscriptionItems.createUsageRecord(
            subscriptionItem.id,
            {
              quantity: minutes,
              timestamp: Math.floor(Date.now() / 1000),
              action: 'increment',
            }
          )
        }
      } catch (error) {
        console.error('Error reporting Stripe usage:', error)
      }
    }

    console.log(`Call logged: ${callLog.id}, outcome: ${outcome}`)
  } catch (error) {
    console.error('Error handling call end:', error)
  }
}

async function handleSpeechUpdate(call: any) {
  try {
    // Handle real-time speech updates if needed
    console.log('Speech update for call:', call.id)
  } catch (error) {
    console.error('Error handling speech update:', error)
  }
}

async function handleFunctionCalls(call: any, functionCalls: any[]) {
  try {
    // Handle function calls from the agent (e.g., booking appointment)
    console.log('Function calls:', functionCalls)
  } catch (error) {
    console.error('Error handling function calls:', error)
  }
}

function determineOutcome(
  transcript: string,
  call: any
): 'booked' | 'handled' | 'escalated' | 'voicemail' {
  const lower = transcript.toLowerCase()

  // Simple heuristic - in production, use more sophisticated NLP
  if (lower.includes('book') || lower.includes('appointment') || lower.includes('schedule')) {
    return 'booked'
  }

  if (lower.includes('escalat') || lower.includes('transfer') || lower.includes('human')) {
    return 'escalated'
  }

  if (lower.includes('voicemail')) {
    return 'voicemail'
  }

  return 'handled'
}

function extractAppointmentData(transcript: string): Partial<{
  clientName: string
  clientEmail: string
  service: string
  appointmentTime: Date
}> | null {
  // Simple extraction - in production, use NLP/LLM for better extraction
  const lines = transcript.split('\n')
  let data: Partial<{
    clientName: string
    clientEmail: string
    service: string
    appointmentTime: Date
  }> = {}

  for (const line of lines) {
    if (line.includes('name') || line.includes('Name')) {
      // Try to extract name
      const match = line.match(/(?:name|Name)[:\s]+([A-Za-z\s]+)/i)
      if (match) data.clientName = match[1].trim()
    }

    if (line.includes('email') || line.includes('Email')) {
      const match = line.match(/(?:email|Email)[:\s]+(\S+@\S+)/i)
      if (match) data.clientEmail = match[1]
    }

    if (line.includes('service') || line.includes('Service')) {
      const match = line.match(/(?:service|Service)[:\s]+([^,\n]+)/i)
      if (match) data.service = match[1].trim()
    }
  }

  return Object.keys(data).length > 0 ? data : null
}
