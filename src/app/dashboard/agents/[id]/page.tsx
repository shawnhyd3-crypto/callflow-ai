import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function AgentDetailPage({ params }: { params: { id: string } }) {
  const agent = await prisma.phoneAgent.findUnique({
    where: { id: params.id },
    include: { template: true },
  })

  if (!agent) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{agent.name}</h1>
          <p className="text-slate-400">{agent.description || 'No description yet.'}</p>
        </div>
        <Link href="/dashboard/agents" className="btn btn-secondary">Back to agents</Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card space-y-3">
          <h2 className="text-lg font-semibold">Status</h2>
          <p className="text-slate-300 capitalize">{agent.status}</p>
          <p className="text-slate-500 text-sm">Vapi ID: {agent.vapiAssistantId || 'Not deployed'}</p>
        </div>

        <div className="card space-y-3">
          <h2 className="text-lg font-semibold">Template</h2>
          <p className="text-slate-300">{agent.template?.name ?? 'Custom'}</p>
          <p className="text-slate-500 text-sm">Industry: {agent.template?.industry ?? '—'}</p>
        </div>

        <div className="card space-y-3">
          <h2 className="text-lg font-semibold">Configuration</h2>
          <p className="text-slate-300">Voice: {agent.voiceId}</p>
          <p className="text-slate-500 text-sm">Language: {agent.language}</p>
        </div>
      </div>

      <div className="card space-y-4">
        <h2 className="text-xl font-semibold">System prompt</h2>
        <pre className="whitespace-pre-wrap text-sm text-slate-300 bg-slate-900/60 rounded-lg p-4">
          {agent.systemPrompt}
        </pre>
      </div>
    </div>
  )
}
