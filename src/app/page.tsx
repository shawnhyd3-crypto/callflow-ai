import Link from 'next/link'
import { Phone, MessageSquare, Calendar, Zap, Users, TrendingUp, Shield, Clock, ArrowRight, Star, Check } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">CallFlow AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8 text-sm text-slate-400">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#templates" className="hover:text-white transition-colors">Templates</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/auth/signin" className="text-sm text-slate-300 hover:text-white transition-colors px-3 py-2">
                Sign In
              </Link>
              <Link href="/auth/signup" className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-full transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-sm text-blue-300">Now handling 50,000+ calls/month</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                Your AI receptionist.
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Always on call.
                </span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg">
                Deploy an AI phone agent that answers calls, books appointments, and handles FAQs for your business — setup takes 5 minutes, not 5 weeks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/auth/signup" className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium px-8 py-3.5 rounded-full transition-all shadow-lg shadow-blue-600/25">
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button className="inline-flex items-center justify-center space-x-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-medium px-8 py-3.5 rounded-full transition-all">
                  <span>Watch Demo</span>
                </button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-slate-500">
                <div className="flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>No credit card</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>14-day trial</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Hero Card — AI Call Demo */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                {/* Call header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">AI Agent — Active Call</div>
                      <div className="text-xs text-slate-500">+1 (555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                    <span className="text-xs text-emerald-400 font-medium">Live</span>
                  </div>
                </div>

                {/* Chat bubbles */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-start">
                    <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%]">
                      <p className="text-sm text-slate-200">Hi! Thanks for calling Bright Smile Dental. How can I help you today?</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-blue-600 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%]">
                      <p className="text-sm text-white">I need to book a cleaning for next week</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%]">
                      <p className="text-sm text-slate-200">I have openings Tuesday at 2 PM and Thursday at 10 AM. Which works better?</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-blue-600 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%]">
                      <p className="text-sm text-white">Tuesday at 2 works great</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[80%]">
                      <p className="text-sm text-slate-200">You&apos;re all set for Tuesday at 2 PM. We&apos;ll send a confirmation text shortly!</p>
                    </div>
                  </div>
                </div>

                {/* Call duration bar */}
                <div className="flex items-center space-x-3">
                  <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">1:48</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12">
            {[
              { value: '50K+', label: 'Calls handled monthly' },
              { value: '98%', label: 'Customer satisfaction' },
              { value: '< 1s', label: 'Average response time' },
              { value: '500+', label: 'Businesses trust us' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything your front desk does.
              <br className="hidden sm:block" />
              <span className="text-slate-400">Without the front desk.</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Powerful features that handle the complete call lifecycle — from first ring to follow-up.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Phone,
                title: 'Answer Every Call',
                description: 'Your AI agent picks up every call instantly, 24/7. No hold music, no voicemail, no missed opportunities.',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Calendar,
                title: 'Book Appointments',
                description: 'Customers book, reschedule, and confirm appointments naturally during the call. Syncs with your calendar.',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                icon: MessageSquare,
                title: 'Answer FAQs',
                description: 'Handles questions about hours, services, pricing, and policies with accurate, on-brand responses.',
                gradient: 'from-amber-500 to-orange-500',
              },
              {
                icon: TrendingUp,
                title: 'Route Urgent Calls',
                description: 'Intelligently escalates complex issues to your team in real-time. Nothing important gets lost.',
                gradient: 'from-emerald-500 to-teal-500',
              },
              {
                icon: Zap,
                title: '5-Minute Setup',
                description: 'Choose a template, customize your agent, and go live. No coding, no consultants, no lengthy onboarding.',
                gradient: 'from-yellow-500 to-amber-500',
              },
              {
                icon: Users,
                title: 'Deep Analytics',
                description: 'Track every call with transcripts, outcomes, sentiment analysis, and actionable performance dashboards.',
                gradient: 'from-indigo-500 to-blue-500',
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="group bg-slate-900/50 border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 opacity-80 group-hover:opacity-100 transition-opacity`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Live in three steps</h2>
            <p className="text-slate-500">From signup to handling your first call in under 5 minutes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Pick your template',
                description: 'Choose from industry-specific templates designed for your business type.',
              },
              {
                step: '02',
                title: 'Customize your agent',
                description: 'Set your business hours, services, and FAQ answers. Fine-tune the personality.',
              },
              {
                step: '03',
                title: 'Go live',
                description: 'Connect your phone number and start taking calls. Your AI agent handles the rest.',
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-white/5 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Templates */}
      <section id="templates" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Built for your industry</h2>
            <p className="text-slate-500">Pre-trained agents that understand the language of your business from day one.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Plumbing', emoji: '🔧', calls: '4.2K' },
              { name: 'Dentistry', emoji: '🦷', calls: '8.1K' },
              { name: 'Restaurant', emoji: '🍽️', calls: '12K' },
              { name: 'Hair Salon', emoji: '✂️', calls: '6.3K' },
              { name: 'Medical Clinic', emoji: '⚕️', calls: '9.7K' },
              { name: 'Auto Repair', emoji: '🚗', calls: '3.8K' },
              { name: 'Real Estate', emoji: '🏠', calls: '5.5K' },
              { name: 'Fitness', emoji: '💪', calls: '2.9K' },
            ].map((template, index) => (
              <div key={index} className="group bg-slate-900/50 border border-white/5 hover:border-white/10 rounded-xl p-5 text-center transition-all duration-300 cursor-pointer">
                <div className="text-4xl mb-3">{template.emoji}</div>
                <h3 className="font-semibold text-white text-sm mb-1">{template.name}</h3>
                <p className="text-xs text-slate-500">{template.calls} calls handled</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center space-x-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <blockquote className="text-xl sm:text-2xl text-white font-medium leading-relaxed mb-8">
            &ldquo;We were missing 40% of our calls before CallFlow AI. Now every call gets answered instantly, and our bookings went up 3x in the first month.&rdquo;
          </blockquote>
          <div>
            <div className="text-sm font-semibold text-white">Dr. Sarah Chen</div>
            <div className="text-sm text-slate-500">Bright Smile Dental, Portland OR</div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Simple, predictable pricing</h2>
            <p className="text-slate-500">No hidden fees. No per-minute surprises. Just plans that scale with you.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '$49',
                minutes: '100 min/mo',
                features: ['1 AI agent', 'Call logging', 'Basic analytics', 'Email support'],
                highlight: false,
                cta: 'Start Free Trial',
              },
              {
                name: 'Pro',
                price: '$149',
                minutes: '500 min/mo',
                features: ['Up to 5 AI agents', 'Full analytics', 'Call transcripts', 'Appointment booking', 'Priority support'],
                highlight: true,
                cta: 'Start Free Trial',
              },
              {
                name: 'Business',
                price: '$349',
                minutes: '2,000+ min/mo',
                features: ['Unlimited agents', 'Custom integrations', 'Analytics suite', 'Dedicated manager', '24/7 phone support'],
                highlight: false,
                cta: 'Contact Sales',
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 transition-all ${
                  plan.highlight
                    ? 'bg-gradient-to-b from-blue-600/10 to-purple-600/5 border-2 border-blue-500/30 shadow-lg shadow-blue-500/10'
                    : 'bg-slate-900/50 border border-white/5'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                  <div className="text-sm text-slate-500">{plan.minutes}</div>
                </div>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-500">/month</span>
                </div>
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/auth/signup"
                  className={`block w-full text-center text-sm font-medium py-3 rounded-full transition-all ${
                    plan.highlight
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25'
                      : 'border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Stop missing calls. Start growing.
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Join 500+ businesses that trust CallFlow AI to handle their customer calls around the clock.
              </p>
              <Link href="/auth/signup" className="inline-flex items-center space-x-2 bg-white text-slate-900 font-semibold px-8 py-4 rounded-full hover:bg-blue-50 transition-colors shadow-xl">
                <span>Start Your Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-white">CallFlow AI</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                AI-powered phone agents that help small businesses never miss a call again.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><a href="#features" className="hover:text-slate-300 transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-slate-300 transition-colors">Pricing</a></li>
                <li><a href="#templates" className="hover:text-slate-300 transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-slate-300 transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><a href="#" className="hover:text-slate-300 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-slate-300 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-slate-300 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-slate-300 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                <li><a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-slate-300 transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/5 pt-8">
            <p className="text-sm text-slate-600">&copy; 2026 CallFlow AI. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="flex items-center space-x-1.5 text-xs text-slate-600">
                <Shield className="w-3.5 h-3.5" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-slate-600">
                <Clock className="w-3.5 h-3.5" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
