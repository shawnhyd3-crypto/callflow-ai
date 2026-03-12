import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { updateAssistant, deleteAssistant } from '@/lib/vapi'
import { rateLimit } from '@/lib/rate-limit'
import { enforceCsrf } from '@/lib/security'

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  systemPrompt: z.string().optional(),
  voiceId: z.string().optional(),
  firstMessage: z.string().optional(),
  endCallMessage: z.string().optional(),
})

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const agent = await prisma.phoneAgent.findUnique({
    where: { id: params.id },
    include: { template: true },
  })

  if (!agent) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
  }

  return NextResponse.json({ agent })
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const rateLimited = await rateLimit(request, 'api')
  if (rateLimited) return rateLimited

  const csrf = enforceCsrf(request)
  if (csrf) return csrf

  try {
    const data = updateSchema.parse(await request.json())

    const agent = await prisma.phoneAgent.update({
      where: { id: params.id },
      data,
    })

    if (agent.vapiAssistantId && (data.name || data.systemPrompt || data.voiceId || data.endCallMessage)) {
      await updateAssistant(agent.vapiAssistantId, {
        name: data.name ?? agent.name,
        model: data.systemPrompt
          ? {
              provider: 'openai',
              model: 'gpt-4',
              messages: [{ role: 'system', content: data.systemPrompt }],
            }
          : undefined,
        voice: data.voiceId
          ? { provider: 'vapi', voiceId: data.voiceId }
          : undefined,
        endCallMessage: data.endCallMessage ?? agent.endCallMessage,
      })
    }

    return NextResponse.json({ agent })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }
    console.error('Agent update error:', error)
    return NextResponse.json({ error: 'Unable to update agent' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const rateLimited = await rateLimit(request, 'api')
  if (rateLimited) return rateLimited

  const csrf = enforceCsrf(request)
  if (csrf) return csrf

  const agent = await prisma.phoneAgent.findUnique({ where: { id: params.id } })
  if (!agent) {
    return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
  }

  if (agent.vapiAssistantId) {
    try {
      await deleteAssistant(agent.vapiAssistantId)
    } catch (error) {
      console.warn('Failed to delete Vapi assistant:', error)
    }
  }

  await prisma.phoneAgent.delete({ where: { id: params.id } })
  return NextResponse.json({ status: 'deleted' })
}
