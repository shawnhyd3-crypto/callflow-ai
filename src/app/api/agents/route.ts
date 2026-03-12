import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { createAssistant } from '@/lib/vapi'
import { rateLimit } from '@/lib/rate-limit'
import { enforceCsrf } from '@/lib/security'

const createSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  templateId: z.string().optional(),
  voiceId: z.string().optional(),
  systemPrompt: z.string().optional(),
  firstMessage: z.string().optional(),
  endCallMessage: z.string().optional(),
  phoneNumberId: z.string().optional(),
})

export async function GET() {
  const organization = await prisma.organization.findFirst()
  if (!organization) {
    return NextResponse.json({ agents: [] })
  }

  const agents = await prisma.phoneAgent.findMany({
    where: { organizationId: organization.id },
    include: { template: true },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ agents })
}

export async function POST(request: NextRequest) {
  const rateLimited = await rateLimit(request, 'api')
  if (rateLimited) return rateLimited

  const csrf = enforceCsrf(request)
  if (csrf) return csrf

  try {
    const data = createSchema.parse(await request.json())
    const organization = await prisma.organization.findFirst()

    if (!organization) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 })
    }

    const template = data.templateId
      ? await prisma.agentTemplate.findUnique({ where: { id: data.templateId } })
      : null

    const systemPrompt = data.systemPrompt || template?.systemPrompt || 'You are a helpful AI receptionist.'
    const voiceId = data.voiceId || template?.defaultVoiceId || 'aura-asteria-en'
    const firstMessage = data.firstMessage || 'Hi there! How can I help you today?'
    const endCallMessage = data.endCallMessage || 'Thank you for calling. Goodbye!'

    const agent = await prisma.phoneAgent.create({
      data: {
        organizationId: organization.id,
        name: data.name,
        description: data.description,
        templateId: data.templateId,
        systemPrompt,
        voiceId,
        firstMessage,
        endCallMessage,
        status: 'draft',
      },
    })

    let vapiAssistantId: string | null = null
    try {
      const assistant = await createAssistant({
        name: agent.name,
        model: {
          provider: 'openai',
          model: 'gpt-4',
          messages: [{ role: 'system', content: systemPrompt }],
        },
        voice: {
          provider: 'vapi',
          voiceId,
        },
        firstMessageMode: 'assistant-speaks-first',
        endCallMessage,
        maxDurationSeconds: agent.maxCallDuration,
      })
      vapiAssistantId = assistant?.id ?? null
    } catch (error) {
      console.error('Vapi assistant creation failed:', error)
    }

    const updatedAgent = await prisma.phoneAgent.update({
      where: { id: agent.id },
      data: {
        vapiAssistantId,
        status: vapiAssistantId ? 'active' : 'draft',
      },
    })

    if (data.phoneNumberId && vapiAssistantId) {
      await prisma.phoneNumber.update({
        where: { id: data.phoneNumberId },
        data: {
          status: 'active',
        },
      })
    }

    return NextResponse.json({ agent: updatedAgent })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }
    console.error('Agent creation error:', error)
    return NextResponse.json({ error: 'Unable to create agent' }, { status: 500 })
  }
}
