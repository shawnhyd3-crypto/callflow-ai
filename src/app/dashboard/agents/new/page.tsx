import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { AgentWizard } from '@/components/agent-wizard'

export default async function NewAgentPage() {
  const organization = await prisma.organization.findFirst()
  const templates = await prisma.agentTemplate.findMany({
    orderBy: { name: 'asc' },
  })
  const phoneNumbers = organization
    ? await prisma.phoneNumber.findMany({ where: { organizationId: organization.id } })
    : []

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Create a new agent</h1>
          <p className="text-slate-400">Launch a phone agent in minutes.</p>
        </div>
        <Link href="/dashboard/agents" className="btn btn-secondary">Back to agents</Link>
      </div>

      <div className="card">
        <AgentWizard
          templates={templates.map((template) => ({
            id: template.id,
            name: template.name,
            industry: template.industry,
            description: template.description,
          }))}
          phoneNumbers={phoneNumbers.map((phone) => ({
            id: phone.id,
            phoneNumber: phone.phoneNumber,
            displayName: phone.displayName,
          }))}
        />
      </div>
    </div>
  )
}
