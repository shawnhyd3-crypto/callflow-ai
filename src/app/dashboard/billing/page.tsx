import { stripe, STRIPE_PLANS } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { BillingActions } from '@/components/billing-actions'

export const dynamic = 'force-dynamic'


export default async function BillingPage() {
  const organization = await prisma.organization.findFirst()
  if (!organization) {
    return (
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">Billing</h1>
        <p className="text-slate-400">No organization found.</p>
      </div>
    )
  }

  const [subscription, usageRecord] = await Promise.all([
    prisma.subscription.findUnique({ where: { organizationId: organization.id } }),
    prisma.usageRecord.findFirst({
      where: { organizationId: organization.id },
      orderBy: { billingPeriodStart: 'desc' },
    }),
  ])

  const invoices = subscription?.stripeCustomerId
    ? await stripe.invoices.list({ customer: subscription.stripeCustomerId, limit: 5 })
    : null

  const planKey = (subscription?.plan ?? organization.plan) as keyof typeof STRIPE_PLANS
  const plan = STRIPE_PLANS[planKey] ?? STRIPE_PLANS.starter

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-slate-400">Manage your subscription and usage.</p>
      </div>

      <div className="card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Current Plan</h2>
            <p className="text-slate-400">{plan.name} · ${plan.price}/mo</p>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-300">
            {subscription?.status ?? 'trial'}
          </span>
        </div>

        {usageRecord && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-400">
              <span>Minutes used</span>
              <span>
                {usageRecord.minutesUsed} / {usageRecord.minutesLimit}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800">
              <div
                className="h-2 rounded-full bg-primary-500"
                style={{
                  width: `${Math.min(
                    (usageRecord.minutesUsed / usageRecord.minutesLimit) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Upgrade or Downgrade</h2>
        <BillingActions organizationId={organization.id} currentPlan={subscription?.plan} />
      </div>

      <div className="card space-y-4">
        <h2 className="text-xl font-semibold">Recent Invoices</h2>
        {invoices && invoices.data.length > 0 ? (
          <div className="space-y-3">
            {invoices.data.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between">
                <div>
                  <p className="text-slate-200">{invoice.number ?? invoice.id}</p>
                  <p className="text-sm text-slate-500">
                    {new Date(invoice.created * 1000).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-slate-200">
                    ${(invoice.amount_paid / 100).toFixed(2)} {invoice.currency?.toUpperCase()}
                  </p>
                  {invoice.hosted_invoice_url && (
                    <a
                      href={invoice.hosted_invoice_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-primary-400"
                    >
                      View invoice
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400">No invoices yet.</p>
        )}
      </div>
    </div>
  )
}
