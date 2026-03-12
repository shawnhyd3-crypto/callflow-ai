import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import { STRIPE_PLANS } from '@/lib/stripe'

const PLAN_LABELS = {
  starter: 'Starter',
  pro: 'Growth',
  business: 'Scale',
} as const

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

async function impersonate(formData: FormData) {
  'use server'
  const orgId = formData.get('organizationId')?.toString()
  if (!orgId) return

  cookies().set('impersonateOrgId', orgId, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
  })

  redirect('/dashboard')
}

export default async function AdminCustomerDetail({ params }: { params: { id: string } }) {
  const org = await prisma.organization.findUnique({
    where: { id: params.id },
    include: {
      subscriptions: { orderBy: { createdAt: 'desc' }, take: 1 },
      usageRecords: { orderBy: { billingPeriodStart: 'desc' }, take: 3 },
      phoneAgents: { orderBy: { createdAt: 'desc' } },
      callLogs: { orderBy: { startTime: 'desc' }, take: 10 },
      appointments: { orderBy: { createdAt: 'desc' }, take: 10 },
    },
  })

  const [totalCalls, totalAppointments] = org
    ? await Promise.all([
        prisma.callLog.count({ where: { organizationId: org.id } }),
        prisma.appointment.count({ where: { organizationId: org.id } }),
      ])
    : [0, 0]

  if (!org) {
    return (
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">Customer not found</h1>
        <Link href="/admin" className="text-primary-400">
          Back to admin
        </Link>
      </div>
    )
  }

  const subscription = org.subscriptions[0]
  const planKey = subscription?.plan as keyof typeof PLAN_LABELS | undefined
  const planLabel = planKey ? PLAN_LABELS[planKey] : 'None'
  const planPrice = planKey ? STRIPE_PLANS[planKey].price : 0

  const latestUsage = org.usageRecords[0]
  const minutesUsed = latestUsage?.minutesUsed ?? 0
  const minutesLimit = latestUsage?.minutesLimit ?? 0
  const usagePercent = minutesLimit > 0 ? Math.min((minutesUsed / minutesLimit) * 100, 100) : 0

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <Link href="/admin" className="text-sm text-primary-400">
            ← Back to admin
          </Link>
          <h1 className="text-3xl font-bold mt-2">{org.name}</h1>
          <p className="text-slate-400">Customer profile and activity overview.</p>
        </div>
        <form action={impersonate}>
          <input type="hidden" name="organizationId" value={org.id} />
          <button className="btn btn-primary">Impersonate Customer</button>
        </form>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <p className="text-slate-400 text-sm mb-1">Plan</p>
          <p className="text-2xl font-bold">{planLabel}</p>
          <p className="text-sm text-slate-500 mt-1">
            {planPrice > 0 ? `${formatCurrency(planPrice)}/mo` : 'No active subscription'}
          </p>
        </div>
        <div className="card">
          <p className="text-slate-400 text-sm mb-1">Agents</p>
          <p className="text-2xl font-bold">{org.phoneAgents.length}</p>
          <p className="text-sm text-slate-500 mt-1">Active AI agents</p>
        </div>
        <div className="card">
          <p className="text-slate-400 text-sm mb-1">Calls (All Time)</p>
          <p className="text-2xl font-bold">{totalCalls}</p>
          <p className="text-sm text-slate-500 mt-1">Most recent 10 shown below</p>
        </div>
        <div className="card">
          <p className="text-slate-400 text-sm mb-1">Appointments</p>
          <p className="text-2xl font-bold">{totalAppointments}</p>
          <p className="text-sm text-slate-500 mt-1">Most recent 10 shown below</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Usage</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Minutes used</span>
            <span className="font-semibold">
              {minutesLimit > 0 ? `${minutesUsed} / ${minutesLimit}` : `${minutesUsed}`} min
            </span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-600 to-accent-600"
              style={{ width: `${usagePercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Agents</h2>
          <div className="space-y-3">
            {org.phoneAgents.map((agent) => (
              <div key={agent.id} className="p-3 bg-slate-800/50 rounded">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{agent.name}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      agent.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {agent.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{agent.language}</p>
              </div>
            ))}
            {org.phoneAgents.length === 0 && (
              <p className="text-sm text-slate-500">No agents configured yet.</p>
            )}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Recent Calls</h2>
          <div className="space-y-3">
            {org.callLogs.map((call) => (
              <div key={call.id} className="p-3 bg-slate-800/50 rounded">
                <div className="flex justify-between">
                  <span className="font-semibold">{call.phoneNumber}</span>
                  <span className="text-xs text-slate-500">
                    {call.startTime.toLocaleString('en-US')}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Status: {call.status} · Outcome: {call.outcome ?? 'handled'}
                </p>
              </div>
            ))}
            {org.callLogs.length === 0 && (
              <p className="text-sm text-slate-500">No calls yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Recent Appointments</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="px-4 py-3 text-left text-slate-400">Client</th>
                <th className="px-4 py-3 text-left text-slate-400">Service</th>
                <th className="px-4 py-3 text-left text-slate-400">Time</th>
                <th className="px-4 py-3 text-left text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {org.appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-slate-800">
                  <td className="px-4 py-3 font-semibold">{appointment.clientName}</td>
                  <td className="px-4 py-3 text-slate-300">{appointment.service ?? '—'}</td>
                  <td className="px-4 py-3 text-slate-300">
                    {appointment.appointmentTime.toLocaleString('en-US')}
                  </td>
                  <td className="px-4 py-3 text-slate-300 capitalize">{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {org.appointments.length === 0 && (
            <div className="text-center py-6 text-slate-500">No appointments yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}
