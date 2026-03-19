import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, X, ArrowRight } from 'lucide-react'

interface ComparisonData {
  name: string
  tagline: string
  pricing: string
  strengths: string[]
  weaknesses: string[]
  verdict: string
  comparisonTableData: {
    dimension: string
    callflow: string
    competitor: string
  }[]
}

const competitors: Record<string, ComparisonData> = {
  'smith-ai': {
    name: 'Smith.ai',
    tagline: 'Virtual receptionist service',
    pricing: '$600-1000+/mo (human + AI hybrid)',
    strengths: [
      'Human agents available for complex conversations',
      'Established brand in virtual receptionist space',
      'Multi-channel support (phone, chat, SMS)',
    ],
    weaknesses: [
      'High pricing due to human team',
      'Less flexibility for custom integrations',
      'Setup and onboarding time-intensive',
      'No true self-service scheduling for small businesses',
    ],
    verdict:
      'Smith.ai is best for large law firms and medical practices needing premium human support. For small restaurants, salons, and service businesses, CallFlow AI offers better value with full automation.',
    comparisonTableData: [
      { dimension: 'Starting Price', callflow: '$49/month', competitor: '$600/month' },
      { dimension: 'AI Automation', callflow: '100% self-service', competitor: 'Hybrid (human + AI)' },
      { dimension: 'Setup Time', callflow: '<5 minutes', competitor: '2-3 weeks' },
      { dimension: 'Custom Integrations', callflow: 'API access', competitor: 'Limited' },
      { dimension: 'Best For', callflow: 'SMB & scaling', competitor: 'Enterprise' },
    ],
  },
  ruby: {
    name: 'Ruby',
    tagline: 'Virtual receptionist (human-powered)',
    pricing: '$600-1200/mo (humans only, no AI)',
    strengths: [
      'Real human receptionists for personalized touch',
      'Excellent for complex negotiations',
      'Long track record in hospitality',
      'Phone call quality and tone control',
    ],
    weaknesses: [
      'No AI, purely human (expensive and slow)',
      'No 24/7 automation for simple tasks',
      'Not scalable for high-volume calls',
      'Difficulty with technical integrations',
    ],
    verdict:
      'Ruby is a traditional virtual receptionist for premium brands wanting human touch. If you need instant 24/7 automation, call volume handling, and affordability, CallFlow AI wins decisively.',
    comparisonTableData: [
      { dimension: 'Price Point', callflow: '$49-349/mo', competitor: '$600-1200/mo' },
      { dimension: 'Technology', callflow: 'AI-powered', competitor: 'Human only' },
      { dimension: 'Call Volume Capacity', callflow: 'Unlimited', competitor: '100-200/month' },
      { dimension: 'Setup Speed', callflow: '<5 minutes', competitor: '4+ weeks' },
      { dimension: 'Scalability', callflow: 'Instant', competitor: 'Slow, team-dependent' },
    ],
  },
  dialpad: {
    name: 'Dialpad',
    tagline: 'VoIP phone system with AI add-on',
    pricing: '$30/user/mo + AI features ($50-200/mo extra)',
    strengths: [
      'Full VoIP phone system replacement',
      'AI transcription and call recording',
      'CRM integrations (Salesforce, HubSpot)',
      'Multi-location management',
    ],
    weaknesses: [
      'Requires replacing entire phone infrastructure',
      'AI receptionist is bolt-on, not core feature',
      'Complex pricing structure (per-user + features)',
      'Steep learning curve for small teams',
      'Overkill for businesses just needing call answering',
    ],
    verdict:
      'Dialpad is a full phone system for enterprises. CallFlow AI is purpose-built for small-to-mid businesses that only need AI-powered call answering at a fraction of the cost.',
    comparisonTableData: [
      { dimension: 'Core Purpose', callflow: 'AI call answering', competitor: 'Full VoIP system' },
      { dimension: 'Cost to Start', callflow: '$49/mo', competitor: '$30+/user + features' },
      { dimension: 'Setup Complexity', callflow: 'Minutes', competitor: 'Days/weeks' },
      { dimension: 'Call Answering Focus', callflow: 'Specialized', competitor: 'Secondary feature' },
      { dimension: 'SMB-Friendly', callflow: 'Yes', competitor: 'Designed for enterprise' },
    ],
  },
  goodcall: {
    name: 'Goodcall',
    tagline: 'AI phone agent platform',
    pricing: '$0 (freemium) to $500+/mo',
    strengths: [
      'Free tier available for testing',
      'Flexible pricing based on usage',
      'Built for outbound calling',
      'API-first architecture',
    ],
    weaknesses: [
      'Primarily outbound-focused, weak inbound',
      'Free tier is feature-limited',
      'Less intuitive UI than CallFlow',
      'Smaller community and fewer templates',
      'Not optimized for service businesses',
    ],
    verdict:
      'Goodcall excels at outbound campaigns. CallFlow AI is built specifically for inbound call answering, lead capture, and scheduling—with simpler setup and better results for small businesses.',
    comparisonTableData: [
      { dimension: 'Best For', callflow: 'Inbound answering', competitor: 'Outbound campaigns' },
      { dimension: 'Setup Speed', callflow: '<5 minutes', competitor: '1-2 hours' },
      { dimension: 'UI Complexity', callflow: 'Simple & intuitive', competitor: 'Advanced/developer-focused' },
      { dimension: 'Industry Templates', callflow: '10+ verticals', competitor: 'Generic' },
      { dimension: 'SMB Optimization', callflow: 'Native', competitor: 'Requires customization' },
    ],
  },
  'bland-ai': {
    name: 'Bland AI',
    tagline: 'Open-source AI phone agent',
    pricing: '$0.50-2.00 per minute (pay-as-you-go)',
    strengths: [
      'Very low per-minute pricing model',
      'Highly customizable via API',
      'Good for developers and technical users',
      'Simple phone calling functionality',
    ],
    weaknesses: [
      'No user interface, API-only',
      'Requires technical knowledge to set up',
      'No built-in scheduling or CRM features',
      'Unpredictable costs (pay-per-minute)',
      'No inbound answering, only outbound',
      'Minimal customer support',
    ],
    verdict:
      'Bland AI is a developer tool for building custom call agents. If you want a ready-to-use product with scheduling, analytics, and beautiful UI, CallFlow AI is infinitely easier and includes all features at predictable pricing.',
    comparisonTableData: [
      { dimension: 'Setup Required', callflow: 'No coding', competitor: 'Requires API integration' },
      { dimension: 'Pricing Model', callflow: 'Flat monthly', competitor: 'Pay-per-minute' },
      { dimension: 'Inbound Answering', callflow: 'Native', competitor: 'Not supported' },
      { dimension: 'Scheduling/Integration', callflow: 'Built-in', competitor: 'DIY' },
      { dimension: 'Customer Support', callflow: '24/7', competitor: 'Community only' },
    ],
  },
  'rosie-ai': {
    name: 'Rosie AI',
    tagline: 'AI receptionist for service businesses',
    pricing: '$99-500/mo (tiered)',
    strengths: [
      'Purpose-built for service industry (HVAC, plumbing, etc.)',
      'Appointment scheduling integration',
      'Mobile app for technicians',
      'Lead qualification built-in',
    ],
    weaknesses: [
      'Higher starting price than CallFlow',
      'Limited industry verticals (mainly trades)',
      'Fewer integrations than CallFlow',
      'Smaller feature set for support',
      'Less sophisticated analytics',
    ],
    verdict:
      'Rosie AI is solid for HVAC and trade services but limited in scope. CallFlow AI covers 10+ industries, has richer analytics, deeper integrations, and starts at $49/month—better value across the board.',
    comparisonTableData: [
      { dimension: 'Starting Price', callflow: '$49/mo', competitor: '$99/mo' },
      { dimension: 'Industries Served', callflow: '10+', competitor: '3-4 (trades)' },
      { dimension: 'Analytics Depth', callflow: 'Advanced', competitor: 'Basic' },
      { dimension: 'Third-party Integrations', callflow: '50+', competitor: '10-15' },
      { dimension: 'Feature Completeness', callflow: 'Comprehensive', competitor: 'Niche' },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(competitors).map((competitor) => ({
    competitor,
  }))
}

export function generateMetadata({ params }: { params: { competitor: string } }): Metadata {
  const comp = competitors[params.competitor]

  if (!comp) {
    return {
      title: 'Comparison Not Found',
    }
  }

  return {
    title: `CallFlow AI vs ${comp.name} | Detailed Comparison`,
    description: `Compare CallFlow AI with ${comp.name}. See pricing, features, and which is best for your business.`,
    openGraph: {
      title: `CallFlow AI vs ${comp.name} | Detailed Comparison`,
      description: `Compare CallFlow AI with ${comp.name}. See pricing, features, and which is best for your business.`,
      type: 'website',
    },
  }
}

export default function ComparePage({ params }: { params: { competitor: string } }) {
  const comp = competitors[params.competitor]

  if (!comp) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-blue-400 mb-2">CallFlow AI</h1>
              <p className="text-slate-400">AI phone agents for small businesses</p>
            </div>
            <ArrowRight className="w-8 h-8 text-slate-600" />
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-400 mb-2">{comp.name}</h1>
              <p className="text-slate-400">{comp.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing Comparison</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-gradient-to-br from-blue-600/20 to-blue-600/10 border-2 border-blue-500/50 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">CallFlow AI</h3>
              <p className="text-4xl font-bold text-white mb-2">$49/mo</p>
              <p className="text-slate-300">Starting price for full features</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>100 min/month included</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>1 AI agent</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Call logging & transcripts</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Email support</span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-slate-800/50 border border-slate-700 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">{comp.name}</h3>
              <p className="text-4xl font-bold text-slate-300 mb-2">{comp.pricing}</p>
              <p className="text-slate-400">Variable pricing structure</p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-400">Limited features at entry level</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-400">Often requires higher tier for essentials</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-400">Setup fees may apply</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-400">Unpredictable total cost</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths & Weaknesses */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{comp.name}: Strengths & Weaknesses</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-green-400 mb-6">Strengths</h3>
              <ul className="space-y-4">
                {comp.strengths.map((strength, idx) => (
                  <li key={idx} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-red-400 mb-6">Weaknesses</h3>
              <ul className="space-y-4">
                {comp.weaknesses.map((weakness, idx) => (
                  <li key={idx} className="flex gap-3">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 font-semibold text-slate-200">Feature</th>
                  <th className="text-left py-4 px-4 font-semibold text-blue-400">CallFlow AI</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-400">{comp.name}</th>
                </tr>
              </thead>
              <tbody>
                {comp.comparisonTableData.map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800/30">
                    <td className="py-4 px-4 text-slate-300 font-medium">{row.dimension}</td>
                    <td className="py-4 px-4 text-slate-200">{row.callflow}</td>
                    <td className="py-4 px-4 text-slate-400">{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Verdict */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">The Verdict</h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              {comp.verdict}
            </p>
            <p className="text-slate-400 italic">
              Ready to see how CallFlow AI can serve your business?
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Try CallFlow AI Today</h2>
          <p className="text-slate-300 mb-8">
            Get started in under 5 minutes. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition"
            >
              Start Free Trial
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-3 border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-900 transition"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
