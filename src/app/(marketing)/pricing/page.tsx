'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, X } from 'lucide-react'

const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 49,
    annualPrice: 470,
    description: 'Perfect for getting started',
    minutes: '100 min/month',
    agents: '1 AI agent',
    features: [
      'Basic call logging',
      'Email support',
      'Simple integrations',
      'Call transcripts',
    ],
    notIncluded: [
      'Analytics dashboard',
      'Custom workflows',
      'Priority support',
      'Dedicated manager',
    ],
    cta: 'Start Free Trial',
  },
  {
    id: 'growth',
    name: 'Growth',
    monthlyPrice: 149,
    annualPrice: 1430,
    description: 'Most popular',
    minutes: '500 min/month',
    agents: '3 AI agents',
    highlighted: true,
    features: [
      'Advanced analytics',
      'Call transcripts',
      'Priority email & chat support',
      'Scheduling integrations',
      'Appointment reminders',
      'Custom workflows',
      '3 API keys',
    ],
    notIncluded: [
      'Dedicated account manager',
      '24/7 phone support',
      'White-label solution',
    ],
    cta: 'Start Free Trial',
  },
  {
    id: 'scale',
    name: 'Scale',
    monthlyPrice: 349,
    annualPrice: 3350,
    description: 'For high-volume operations',
    minutes: '2000 min/month',
    agents: '10 AI agents',
    features: [
      'Full analytics suite',
      'Advanced integrations',
      'Scheduling & CRM sync',
      'Call routing & IVR',
      'Custom training',
      'Priority phone support',
      'Dedicated account manager',
      '24/7 support available',
      'Unlimited API keys',
      'White-label options',
    ],
    notIncluded: [],
    cta: 'Schedule Demo',
  },
]

interface PricingPlan {
  id: string
  name: string
  monthlyPrice: number
  annualPrice: number
  description: string
  minutes: string
  agents: string
  highlighted?: boolean
  features: string[]
  notIncluded: string[]
  cta: string
}

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  const annualSavings = (plan: PricingPlan) => {
    const monthlyCost = plan.monthlyPrice * 12
    const savings = monthlyCost - plan.annualPrice
    return Math.round((savings / monthlyCost) * 100)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Choose the plan that fits your business. Scale as you grow.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 bg-slate-900/50 border border-slate-700 rounded-lg p-2 w-fit mx-auto">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-md font-semibold transition ${
                !isAnnual
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-md font-semibold transition ${
                isAnnual
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Annual
            </button>
            {isAnnual && (
              <div className="ml-2 px-3 py-1 bg-green-600/20 border border-green-600 rounded text-green-400 text-sm font-semibold">
                Save 20%
              </div>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl transition ${
                plan.highlighted
                  ? 'md:scale-105 ring-2 ring-blue-500'
                  : 'border border-slate-700'
              } ${
                plan.highlighted ? 'bg-gradient-to-br from-blue-950/50 to-slate-900/50' : 'bg-slate-900/50'
              } p-8`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}

              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <p className="text-slate-400 mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                <div className="text-5xl font-bold text-white mb-2">
                  ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                </div>
                <div className="text-slate-400">
                  {isAnnual ? '/year' : '/month'}
                </div>
                {isAnnual && (
                  <div className="mt-2 text-green-400 text-sm font-semibold">
                    Save ${plan.monthlyPrice * 12 - plan.annualPrice}/year
                  </div>
                )}
              </div>

              {/* Quotas */}
              <div className="mb-6 pb-6 border-b border-slate-700">
                <div className="flex items-center gap-2 mb-3 text-slate-200">
                  <span className="font-semibold">{plan.minutes}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <span className="font-semibold">{plan.agents}</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href="/auth/signup"
                className={`block w-full py-3 rounded-lg font-semibold text-center mb-8 transition ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/50'
                    : 'border border-slate-600 text-white hover:border-blue-500 hover:text-blue-400'
                }`}
              >
                {plan.cta}
              </Link>

              {/* Features */}
              <div className="space-y-4 mb-6">
                <p className="text-sm font-semibold text-slate-300 uppercase">Included</p>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Not Included */}
              {plan.notIncluded.length > 0 && (
                <div className="space-y-4 border-t border-slate-700 pt-6">
                  <p className="text-sm font-semibold text-slate-400 uppercase">
                    Not included
                  </p>
                  {plan.notIncluded.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-500">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Full Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-700">
                  <th className="text-left py-4 px-4 font-semibold text-slate-300">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-blue-400">
                    Starter
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-blue-400">
                    Growth
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-blue-400">
                    Scale
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: 'Monthly Minutes',
                    starter: '100',
                    growth: '500',
                    scale: '2000',
                  },
                  {
                    feature: 'AI Agents',
                    starter: '1',
                    growth: '3',
                    scale: '10',
                  },
                  {
                    feature: 'Call Logging',
                    starter: true,
                    growth: true,
                    scale: true,
                  },
                  {
                    feature: 'Transcripts',
                    starter: true,
                    growth: true,
                    scale: true,
                  },
                  {
                    feature: 'Analytics',
                    starter: false,
                    growth: true,
                    scale: true,
                  },
                  {
                    feature: 'Scheduling Integration',
                    starter: false,
                    growth: true,
                    scale: true,
                  },
                  {
                    feature: 'Custom Workflows',
                    starter: false,
                    growth: true,
                    scale: true,
                  },
                  {
                    feature: 'Call Routing & IVR',
                    starter: false,
                    growth: false,
                    scale: true,
                  },
                  {
                    feature: 'Email Support',
                    starter: true,
                    growth: true,
                    scale: true,
                  },
                  {
                    feature: 'Priority Support',
                    starter: false,
                    growth: true,
                    scale: true,
                  },
                  {
                    feature: '24/7 Phone Support',
                    starter: false,
                    growth: false,
                    scale: true,
                  },
                  {
                    feature: 'Dedicated Manager',
                    starter: false,
                    growth: false,
                    scale: true,
                  },
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-800 hover:bg-slate-800/30"
                  >
                    <td className="py-4 px-4 text-slate-300 font-medium">
                      {row.feature}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-slate-200">{row.starter}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof row.growth === 'boolean' ? (
                        row.growth ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-slate-200">{row.growth}</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {typeof row.scale === 'boolean' ? (
                        row.scale ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-slate-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-slate-200">{row.scale}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'Can I switch plans anytime?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.',
              },
              {
                q: 'What happens if I exceed my monthly minutes?',
                a: 'You\'ll be notified when you\'re approaching your limit. Additional minutes are charged at $0.50/min. You can upgrade to a higher plan anytime to get more included minutes.',
              },
              {
                q: 'Is there a setup fee?',
                a: 'No setup fees. Just sign up, configure your AI agent in minutes, and start taking calls.',
              },
              {
                q: 'Do you offer discounts for annual billing?',
                a: 'Yes, save 20% when you pay annually. That\'s like getting 2.4 months free!',
              },
              {
                q: 'What integrations are included?',
                a: 'All plans include integrations with Calendly, Google Calendar, Zapier, and more. Scale plan includes advanced integrations like Salesforce and HubSpot.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Absolutely. Monthly plans can be cancelled anytime with no penalty. Annual plans can be cancelled, and we\'ll refund your remaining balance.',
              },
              {
                q: 'Do you offer a free trial?',
                a: 'Yes! Start with a 14-day free trial on any plan. No credit card required to get started.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, Mastercard, American Express). Annual plans can also be paid via invoice for enterprise customers.',
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-blue-500/50 transition"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {faq.q}
                </h3>
                <p className="text-slate-300">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Join hundreds of businesses already using CallFlow AI to answer every call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition"
            >
              Start Free Trial
            </Link>
            <Link
              href="/help/getting-started"
              className="px-8 py-3 border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-900 transition"
            >
              Learn More
            </Link>
          </div>
          <p className="text-slate-400 text-sm mt-6">
            No credit card required. Get started in under 5 minutes.
          </p>
        </div>
      </section>
    </div>
  )
}
