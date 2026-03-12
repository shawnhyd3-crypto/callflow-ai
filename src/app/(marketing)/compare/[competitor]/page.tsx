import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react'

const competitors = {
  'smith-ai': {
    name: 'Smith.ai',
    tagline: 'Per-call AI receptionist with live agent fallback.',
    pricing: 'From ~$95/mo (per-call bundles); live agent add-on ~$3/call.',
    strengths: ['Strong lead intake workflows', 'Live agent handoff available', 'CRM integrations'],
    weaknesses: ['Per-call pricing can spike with volume', 'Less flexibility in voice customization'],
    verdict:
      'Great for low-to-mid volume teams who want live backup. CallFlow wins on automation depth and usage-based scalability.',
  },
  ruby: {
    name: 'Ruby Receptionists',
    tagline: 'Premium live receptionist service.',
    pricing: 'From ~$250/mo for 50 minutes (~$5/min).',
    strengths: ['Human experience', '24/7 coverage', 'Bilingual support'],
    weaknesses: ['High cost per minute', 'Limited automation and analytics'],
    verdict:
      'Ruby is ideal for white-glove human service. CallFlow delivers similar coverage at a fraction of the cost with automation.',
  },
  dialpad: {
    name: 'Dialpad AI',
    tagline: 'Unified communications with AI summaries.',
    pricing: 'Bundled with UCaaS plans; AI features vary by tier.',
    strengths: ['All-in-one phone system', 'Good call summaries', 'Team collaboration'],
    weaknesses: ['Not built for vertical-specific intake', 'Limited appointment automation'],
    verdict:
      'Dialpad is strong for internal phone systems. CallFlow is purpose-built for inbound lead capture and booking.',
  },
  'bland-ai': {
    name: 'Bland AI',
    tagline: 'Enterprise AI voice agent platform.',
    pricing: 'Custom/enterprise pricing (no public page).',
    strengths: ['Highly customizable AI flows', 'Enterprise-grade capabilities'],
    weaknesses: ['Pricing opacity', 'Complex setup for SMBs'],
    verdict:
      'Bland is powerful for enterprises; CallFlow focuses on quick SMB setup and ROI clarity.',
  },
  vapi: {
    name: 'Vapi',
    tagline: 'Developer-friendly voice AI APIs.',
    pricing: 'Usage-based (API + telephony).',
    strengths: ['Flexible developer tooling', 'Voice model choice'],
    weaknesses: ['DIY implementation required', 'No out-of-box receptionist UX'],
    verdict:
      'Vapi is a great building block. CallFlow delivers a complete receptionist product without engineering overhead.',
  },
} as const

type CompetitorKey = keyof typeof competitors

const callflowHighlights = [
  '24/7 AI receptionist with smart escalation',
  'Appointment booking + SMS confirmations',
  'Industry-specific intake flows',
  'Usage-based pricing with clear ROI',
  'Dashboard analytics and call logs',
]

const featureComparison = [
  { feature: '24/7 call answering', callflow: true, competitor: true },
  { feature: 'Appointment booking', callflow: true, competitor: false },
  { feature: 'Vertical-specific scripts', callflow: true, competitor: false },
  { feature: 'Usage-based pricing clarity', callflow: true, competitor: false },
  { feature: 'Live agent handoff', callflow: true, competitor: false },
]

export function generateStaticParams() {
  return Object.keys(competitors).map((competitor) => ({ competitor }))
}

export default function ComparePage({ params }: { params: { competitor: string } }) {
  const competitorKey = params.competitor as CompetitorKey
  const data = competitors[competitorKey]

  if (!data) {
    notFound()
  }

  return (
    <div className="space-y-12">
      <section className="card">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-primary-400">Comparison</p>
          <h1 className="text-3xl md:text-4xl font-bold">CallFlow AI vs {data.name}</h1>
          <p className="text-lg text-slate-300">{data.tagline}</p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-400">
            <span className="rounded-full border border-slate-700 px-3 py-1">{data.pricing}</span>
            <span className="rounded-full border border-slate-700 px-3 py-1">AI receptionist for SMBs</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn btn-primary">Get a live demo</Link>
            <Link href="/pricing" className="btn btn-secondary">View pricing</Link>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-6">
        <div className="card space-y-4">
          <h2 className="text-xl font-semibold">Why teams choose CallFlow</h2>
          <ul className="space-y-3">
            {callflowHighlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card space-y-4">
          <h2 className="text-xl font-semibold">{data.name} strengths</h2>
          <ul className="space-y-3">
            {data.strengths.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="h-5 w-5 text-primary-400 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold pt-2">Where CallFlow wins</h3>
          <ul className="space-y-3">
            {data.weaknesses.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-300">
                <XCircle className="h-5 w-5 text-rose-400 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-semibold mb-4">Feature comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-400">
              <tr>
                <th className="py-2">Feature</th>
                <th className="py-2">CallFlow AI</th>
                <th className="py-2">{data.name}</th>
              </tr>
            </thead>
            <tbody className="text-slate-200">
              {featureComparison.map((row) => (
                <tr key={row.feature} className="border-t border-slate-800">
                  <td className="py-3 pr-4">{row.feature}</td>
                  <td className="py-3">
                    {row.callflow ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : '—'}
                  </td>
                  <td className="py-3">
                    {row.competitor ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-6">
        <div className="card space-y-3">
          <h2 className="text-xl font-semibold">Pricing & value</h2>
          <p className="text-slate-300">{data.pricing}</p>
          <p className="text-slate-400">
            CallFlow delivers transparent usage-based pricing with more automation and less overhead.
          </p>
        </div>
        <div className="card space-y-3">
          <h2 className="text-xl font-semibold">Verdict</h2>
          <p className="text-slate-300">{data.verdict}</p>
        </div>
      </section>

      <section className="card flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Switch to CallFlow AI</h2>
          <p className="text-slate-400">Launch your AI receptionist in minutes.</p>
        </div>
        <Link href="/contact" className="btn btn-primary inline-flex items-center gap-2">
          Book a demo <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}
