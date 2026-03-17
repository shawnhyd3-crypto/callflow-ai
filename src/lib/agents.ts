import { prisma } from '@/lib/prisma'

export interface CreatePhoneAgentInput {
  organizationId: string
  name: string
  systemPrompt: string
  description?: string | null
  templateId?: string | null
  voiceId?: string
}

export async function createPhoneAgent(input: CreatePhoneAgentInput) {
  return prisma.phoneAgent.create({
    data: {
      organizationId: input.organizationId,
      name: input.name,
      systemPrompt: input.systemPrompt,
      description: input.description ?? null,
      templateId: input.templateId ?? null,
      voiceId: input.voiceId ?? 'aura-asteria-en',
    },
  })
}

export async function updatePhoneAgent(agentId: string, updates: Partial<CreatePhoneAgentInput>) {
  return prisma.phoneAgent.update({
    where: { id: agentId },
    data: {
      name: updates.name,
      systemPrompt: updates.systemPrompt,
      description: updates.description ?? undefined,
      templateId: updates.templateId ?? undefined,
      voiceId: updates.voiceId ?? undefined,
    },
  })
}

export async function deletePhoneAgent(agentId: string) {
  return prisma.phoneAgent.delete({ where: { id: agentId } })
}

export async function getPhoneAgent(agentId: string) {
  return prisma.phoneAgent.findUnique({ where: { id: agentId } })
}
