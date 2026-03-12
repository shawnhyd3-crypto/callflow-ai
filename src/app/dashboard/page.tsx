import { Phone, Clock, TrendingUp, AlertCircle } from 'lucide-react'
import { prisma } from '@/lib/prisma'

function formatDuration(seconds: number) {
  if (!seconds || Number.isNaN(seconds)) return '0m 0s'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}m ${secs}s`
}

function timeAgo(date: Date) {
  const diffMs = Date.now() - date.getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

export default async function DashboardPage() {
  const org = await prisma.organization.findFirst()
  if (!org) {
    return (
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-400">No organization found. Complete onboarding to see live metrics.</p>
      </div>
    )
  }

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const [
    totalCalls,
    avgDuration,
    appointmentsBooked,
    urgentEscalations,
    recentCallLogs,
    agentsList,
    usageRecord,
    callsTodayLogs,
  ] = await Promise.all([
    prisma.callLog.count({
      where: { organizationId: org.id, startTime: { gte: startOfMonth } },
    }),
    prisma.callLog.aggregate({
      where: { organizationId: org.id, startTime: { gte: startOfMonth } },
      _avg: { duration: true },
    }),
    prisma.appointment.count({
      where: { organizationId: org.id, createdAt: { gte: startOfMonth } },
    }),
    prisma.callLog.count({
      where: { organizationId: org.id, outcome: 'escalated', startTime: { gte: startOfMonth } },
    }),
    prisma.callLog.findMany({
      where: { organizationId: org.id },
      orderBy: { startTime: 'desc' },
      take: 5,
    }),
    prisma.phoneAgent.findMany({
      where: { organizationId: org.id },
      orderBy: { createdAt: 'asc' },
      take: 5,
    }),
    prisma.usageRecord.findFirst({
      where: { organizationId: org.id },
      orderBy: { billingPeriodStart: 'desc' },
    }),
    prisma.callLog.findMany({
      where: { organizationId: org.id, startTime: { gte: startOfDay } },
      select: { agentId: true },
    }),
  ])

  const callsTodayByAgent = callsTodayLogs.reduce<Record<string, number>>((acc, call) => {
    acc[call.agentId] = (acc[call.agentId] || 0) + 1
    return acc
  }, {})

  const stats = [
    {
      label: 'Total Calls This Month',
      value: totalCalls.toString(),
      change: '',
      icon: Phone,
    },
    {
      label: 'Average Call Duration',
      value: formatDuration(avgDuration._avg.duration || 0),
      change: '',
      icon: Clock,
    },
    {
      label: 'Appointments Booked',
      value: appointmentsBooked.toString(),
      change: '',
      icon: TrendingUp,
    },
    {
      label: 'Urgent Escalations',
      value: urgentEscalations.toString(),
      change: '',
      icon: AlertCircle,
    },
  ]

  const recentCalls = recentCallLogs.map((call) => ({
    id: call.id,
    caller: call.phoneNumber,
    duration: formatDuration(call.duration),
    status: call.status,
    outcome: call.outcome ?? 'handled',
    time: timeAgo(call.startTime),
  }))

  const agents = agentsList.map((agent) => ({
    id: agent.id,
    name: agent.name,
    status: agent.status,
    callsToday: callsTodayByAgent[agent.id] || 0,
    template: agent.templateId ? 'Template' : 'Custom',
  }))

  const minutesUsed = usageRecord?.minutesUsed ?? 0
  const minutesLimit = usageRecord?.minutesLimit ?? 0
  const minutesRemaining = Math.max(minutesLimit - minutesUsed, 0)
  const usagePercent = minutesLimit > 0 ? Math.min((minutesUsed / minutesLimit) * 100, 100) : 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-slate-400">Welcome back! Here's your call activity overview.</p>
        </div>
        <button className="btn btn-primary">
          Create New Agent
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <Icon className="w-8 h-8 text-primary-500 opacity-50" />
              </div>
              {stat.change ? (
                <div className="text-sm text-emerald-400">{stat.change} from last month</div>
              ) : (
                <div className="text-sm text-slate-500">Updated just now</div>
              )}
            </div>
          )
        })}
      </div>

      {/* Two Column Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Calls */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Calls</h2>
              <a href="/dashboard/calls" className="text-primary-400 hover:text-primary-300 text-sm">
                View all →
              </a>
            </div>

            <div className="space-y-4">
              {recentCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold">{call.caller}</p>
                    <p className="text-sm text-slate-400">{call.time}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold">{call.duration}</p>
                      <p className="text-xs text-slate-400">
                        {call.outcome === 'booked' && '📅 Booked'}
                        {call.outcome === 'handled' && '✓ Handled'}
                        {call.outcome === 'escalated' && '🔄 Escalated'}
                        {call.outcome === 'voicemail' && '📬 Voicemail'}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        call.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {call.status === 'completed' ? 'Completed' : 'Missed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Agents */}
        <div>
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Active Agents</h2>

            <div className="space-y-4">
              {agents.map((agent) => (
                <div key={agent.id} className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{agent.name}</h3>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        agent.status === 'active' ? 'bg-emerald-500' : 'bg-slate-500'
                      }`}
                    ></span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{agent.template}</p>
                  <p className="text-sm font-semibold text-primary-400">
                    {agent.callsToday} calls today
                  </p>
                </div>
              ))}
            </div>

            <button className="w-full btn btn-secondary mt-6">
              Manage Agents
            </button>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Monthly Usage</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-400">Minutes Used</span>
              <span className="font-semibold">
                {minutesLimit > 0 ? `${minutesUsed} / ${minutesLimit} minutes` : `${minutesUsed} minutes`}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-600 to-accent-600 rounded-full"
                style={{ width: `${usagePercent}%` }}
              ></div>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            {minutesLimit > 0
              ? `You have ${minutesRemaining} minutes remaining.`
              : 'Set a usage limit in your billing settings to see remaining minutes.'}
          </p>
        </div>
      </div>
    </div>
  )
}
