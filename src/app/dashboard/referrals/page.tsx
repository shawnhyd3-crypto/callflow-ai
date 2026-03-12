import { prisma } from '@/lib/prisma'

export default async function ReferralsPage() {
  const organization = await prisma.organization.findFirst({
    include: { referrals: true },
  })

  const referral = organization?.referrals?.[0]
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://callflow-ai-blue.vercel.app'
  const referralUrl = referral ? `${baseUrl}/?ref=${referral.code}` : null

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Referral Program</h1>
        <p className="text-slate-400">Earn a free month for every successful referral.</p>
      </div>

      <div className="card space-y-4">
        <h2 className="text-xl font-semibold">Your referral link</h2>
        {referralUrl ? (
          <div className="space-y-2">
            <p className="text-slate-300">Share this link to invite new customers.</p>
            <div className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-slate-200">
              {referralUrl}
            </div>
          </div>
        ) : (
          <p className="text-slate-400">Referral link will appear once your organization is created.</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="card">
          <p className="text-sm text-slate-400">Clicks</p>
          <p className="text-3xl font-bold text-white">{referral?.clicks ?? 0}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-400">Signups</p>
          <p className="text-3xl font-bold text-white">{referral?.signups ?? 0}</p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-400">Conversions</p>
          <p className="text-3xl font-bold text-white">{referral?.conversions ?? 0}</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-2">Credits</h2>
        <p className="text-slate-300">Available months: {organization?.referralCredits ?? 0}</p>
      </div>
    </div>
  )
}
