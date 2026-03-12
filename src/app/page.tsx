import Link from 'next/link'
import { Phone, MessageSquare, Calendar, Zap, Users, TrendingUp } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Phone className="w-6 h-6 text-primary-500" />
            <span className="text-xl font-bold gradient-text">CallFlow AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="btn btn-secondary">
              Dashboard
            </Link>
            <Link href="/auth/signin" className="btn btn-primary">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              AI Phone Agents for{' '}
              <span className="gradient-text">Your Small Business</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Never miss a call again. Deploy an AI agent that answers calls,
              books appointments, answers FAQs, and routes urgent calls—all in
              minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup" className="btn btn-primary text-lg px-8 py-3">
                Start Free Trial
              </Link>
              <button className="btn btn-outline text-lg px-8 py-3">
                Watch Demo
              </button>
            </div>
            <div className="mt-8 flex items-center space-x-6 text-sm text-slate-400">
              <div>✓ No credit card required</div>
              <div>✓ 14-day free trial</div>
              <div>✓ Cancel anytime</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl opacity-20 blur-3xl"></div>
            <div className="relative card border-primary-500/50 shadow-glow">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-slate-800/50 rounded-lg">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">Incoming Call</div>
                    <div className="text-xs text-slate-500">
                      +1 (555) 123-4567
                    </div>
                  </div>
                  <span className="text-xs bg-primary-600 px-2 py-1 rounded text-white">
                    AI Agent
                  </span>
                </div>
                <div className="bg-slate-800/30 p-4 rounded-lg space-y-2">
                  <div className="text-sm text-slate-300">
                    <strong>Agent:</strong> "Hi there! How can I help you today?"
                  </div>
                  <div className="text-sm text-primary-400">
                    <strong>Caller:</strong> "I'd like to book an appointment"
                  </div>
                  <div className="text-sm text-slate-300">
                    <strong>Agent:</strong> "Absolutely! We have openings on..."
                  </div>
                </div>
                <div className="flex space-x-2 pt-4">
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full"
                      style={{ width: '65%' }}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-500">2:34 / 5:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-900/50 py-20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-subtitle">Everything you need to automate customer calls</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Phone,
                title: 'Answer Calls',
                description:
                  'Your AI agent answers every call professionally, 24/7, capturing customer information automatically.',
              },
              {
                icon: Calendar,
                title: 'Book Appointments',
                description:
                  'Customers can book, reschedule, and confirm appointments directly through the call.',
              },
              {
                icon: MessageSquare,
                title: 'Answer FAQs',
                description:
                  'Instantly answer common questions about hours, services, pricing, and policies.',
              },
              {
                icon: TrendingUp,
                title: 'Route Urgent Calls',
                description:
                  'Automatically route complex issues to your team or voicemail if needed.',
              },
              {
                icon: Zap,
                title: 'Instant Setup',
                description:
                  'Get your AI agent running in minutes without coding. Choose your industry template.',
              },
              {
                icon: Users,
                title: 'Smart Analytics',
                description:
                  'Track call metrics, transcripts, and outcomes with detailed dashboards.',
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="card-hover group">
                  <div className="mb-4">
                    <Icon className="w-8 h-8 text-primary-400 group-hover:text-accent-400 transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Industry Templates Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Industry Templates</h2>
            <p className="section-subtitle">Pre-configured agents for your business type</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Plumbing', emoji: '🔧' },
              { name: 'Dentistry', emoji: '🦷' },
              { name: 'Restaurant', emoji: '🍽️' },
              { name: 'Hair Salon', emoji: '✂️' },
              { name: 'Medical Clinic', emoji: '⚕️' },
              { name: 'Auto Repair', emoji: '🚗' },
              { name: 'Real Estate', emoji: '🏠' },
              { name: 'Fitness', emoji: '💪' },
            ].map((template, index) => (
              <div key={index} className="card-hover text-center">
                <div className="text-5xl mb-4">{template.emoji}</div>
                <h3 className="font-semibold">{template.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-slate-900/50 py-20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Simple, Transparent Pricing</h2>
            <p className="section-subtitle">Choose the plan that fits your business</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '$29',
                minutes: '100 minutes/month',
                features: ['1 AI agent', 'Basic call logging', 'Email support'],
                highlight: false,
              },
              {
                name: 'Pro',
                price: '$99',
                minutes: '500 minutes/month',
                features: [
                  'Up to 5 AI agents',
                  'Advanced analytics',
                  'Call transcripts',
                  'Appointment scheduling',
                  'Priority support',
                ],
                highlight: true,
              },
              {
                name: 'Enterprise',
                price: '$299',
                minutes: '2000+ minutes/month',
                features: [
                  'Unlimited AI agents',
                  'Full analytics suite',
                  'Custom integrations',
                  'Dedicated account manager',
                  '24/7 support',
                ],
                highlight: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`card ${plan.highlight ? 'border-accent-500/50 shadow-glow-accent bg-slate-900' : 'border-slate-800'}`}
              >
                {plan.highlight && (
                  <div className="mb-4 inline-block bg-accent-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-slate-400">/month</span>
                </div>
                <div className="text-accent-400 font-semibold mb-6">{plan.minutes}</div>
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <span className="text-primary-400">✓</span>
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/auth/signup"
                  className={`w-full text-center ${
                    plan.highlight ? 'btn-accent' : 'btn-outline'
                  } btn`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Join hundreds of small businesses already using CallFlow AI to handle calls smarter.
          </p>
          <Link href="/auth/signup" className="btn btn-primary text-lg px-8 py-3">
            Start Your Free Trial Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Phone className="w-5 h-5 text-primary-500" />
                <span className="font-bold">CallFlow AI</span>
              </div>
              <p className="text-sm text-slate-400">
                AI phone agents for small businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-primary-400">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-400">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-400">
                    Templates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-primary-400">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-400">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-primary-400">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-400">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
            <p>© 2024 CallFlow AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
