import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import { STRIPE_PLANS } from '@/lib/stripe'
import { getImpersonatedOrganization } from '@/lib/organizations'

export const dynamic = 'force-dynamic'


const PLAN_ORDER = ['starter', 'pro', 'business'] as const

type PlanKey = (typeof PLAN_ORDER)[number]

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

async function clearImpersonation() {
  'use server'
  cookies().delete('impersonateOrgId')
  redirect('/admin')
}

export default async function AdminPage() {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const [totalCustomers, subscriptions, activeAgents, callsLast30, organizations, impersonatedOrg] =
    await Promise.all([
      prisma.organization.count(),
      prisma.subscription.findMany(),
      prisma.phoneAgent.count({ where: { status: 'active' } }),
      prisma.callLog.count({ where: { startTime: { gte: thirtyDaysAgo } } }),
      prisma.organization.findMany({
        include: {
          subscriptions: { orderBy: { createdAt: 'desc' }, take: 1 },
          usageRecords: { orderBy: { billingPeriodStart: 'desc' }, take: 1 },
        },
        orderBy: { createdAt: 'desc' },
      }),
      getImpersonatedOrganization(),
    ])

  const activeSubscriptions = subscriptions.filter((sub) => sub.status === 'active')
  const mrr = activeSubscriptions.reduce((total, sub) => {
    const plan = sub.plan as PlanKey | undefined
    if (!plan || !(plan in STRIPE_PLANS)) return total
    return total + STRIPE_PLANS[plan].price
  }, 0)

  const churnedLast30 = subscriptions.filter(
    (sub) => sub.status === 'cancelled' && sub.cancelledAt && sub.cancelledAt >= thirtyDaysAgo
  ).length
  const churnRate = totalCustomers > 0 ? Math.round((churnedLast30 / totalCustomers) * 100) : 0

  const planRevenue = PLAN_ORDER.map((plan) => {
    const activeCount = activeSubscriptions.filter((sub) => sub.plan === plan).length
    const revenue = activeCount * STRIPE_PLANS[plan].price
    return {
      plan,
      label: STRIPE_PLANS[plan].name,
      revenue,
      count: activeCount,
    }
  })
  const maxRevenue = Math.max(1, ...planRevenue.map((item) => item.revenue))

  const customers = organizations.map((org) => {
    const subscription = org.subscriptions[0]
    const plan = subscription?.plan as PlanKey | undefined
    const usage = org.usageRecords[0]
    const revenue = plan ? STRIPE_PLANS[plan].price : 0

    return {
      id: org.id,
      name: org.name,
      plan: plan ?? 'none',
      status: subscription?.status ?? 'inactive',
      minutesUsed: usage?.minutesUsed ?? 0,
      minutesLimit: usage?.minutesLimit ?? 0,
      revenue,
      createdAt: org.createdAt,
    }
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">Monitor customers, revenue, and platform usage.</p>
        </div>
        {impersonatedOrg && (
          <form action={clearImpersonation}>
            <button className="btn btn-outline">Stop impersonating {impersonatedOrg.name}</button>
          </form>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { label: 'Total Customers', value: totalCustomers },
          { label: 'MRR', value: formatCurrency(mrr) },
          { label: 'Churn (30d)', value: `${churnRate}%` },
          { label: 'Active Agents', value: activeAgents },
          { label: 'Calls (30d)', value: callsLast30 },
        ].map((stat) => (
          <div key={stat.label} className="card">
            <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 card">
          <h2 className="text-xl font-bold mb-4">Revenue by Plan</h2>
          <div className="space-y-3">
            {planRevenue.map((item) => (
              <div key={item.plan}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="font-semibold">{formatCurrency(item.revenue)}</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-600 to-accent-600"
                    style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">{item.count} active</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Customers</h2>
            <span className="text-sm text-slate-500">{customers.length} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="px-4 py-3 text-left text-slate-400">Customer</th>
                  <th className="px-4 py-3 text-left text-slate-400">Plan</th>
                  <th className="px-4 py-3 text-left text-slate-400">Usage</th>
                  <th className="px-4 py-3 text-left text-slate-400">Revenue</th>
                  <th className="px-4 py-3 text-left text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-slate-800">
                    <td className="px-4 py-3">
                      <div className="font-semibold">{customer.name}</div>
                      <div className="text-xs text-slate-500">
                        Created {customer.createdAt.toLocaleDateString('en-US')}
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize">{customer.plan}</td>
                    <td className="px-4 py-3">
                      {customer.minutesLimit > 0
                        ? `${customer.minutesUsed}/${customer.minutesLimit} min`
                        : `${customer.minutesUsed} min`}
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      {customer.revenue > 0 ? formatCurrency(customer.revenue) : '—'}
                    </td>
                    <td className="px-4 py-3 flex flex-wrap gap-2">
                      <Link href={`/admin/customers/${customer.id}`} className="text-primary-400">
                        View
                      </Link>
                      <form action={impersonate}>
                        <input type="hidden" name="organizationId" value={customer.id} />
                        <button className="text-sm text-slate-300 hover:text-white">Impersonate</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {customers.length === 0 && (
              <div className="text-center py-8 text-slate-500">No customers yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
