import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { makeCall } from '@/lib/vapi'
import { rateLimit } from '@/lib/rate-limit'

const demoSchema = z.object({
  phoneNumber: z.string().min(7),
})

export async function GET() {
  return NextResponse.json({
    assistantId: process.env.VAPI_DEMO_ASSISTANT_ID ?? null,
  })
}

export async function POST(request: NextRequest) {
  const rateLimited = await rateLimit(request, 'demo')
  if (rateLimited) return rateLimited

  try {
    const { phoneNumber } = demoSchema.parse(await request.json())
    const assistantId = process.env.VAPI_DEMO_ASSISTANT_ID

    if (!assistantId) {
      return NextResponse.json(
        { error: 'Demo assistant not configured.' },
        { status: 400 }
      )
    }

    const call = await makeCall(phoneNumber, assistantId)
    return NextResponse.json({ call })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }
    console.error('Demo call error:', error)
    return NextResponse.json({ error: 'Unable to start demo call' }, { status: 500 })
  }
}
