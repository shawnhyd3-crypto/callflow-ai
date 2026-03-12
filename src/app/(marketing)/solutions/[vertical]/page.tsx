import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Phone, Calendar, MessageSquare, TrendingUp, ShieldCheck, Clock, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'

const verticals = {
  restaurants: {
    name: 'Restaurants',
    hero: 'Fill tables and take every reservation — even after hours.',
    painPoints: [
      'Missed calls during rush hours mean lost reservations.',
      'Staff can’t juggle phones while serving guests.',
      'No-shows and incomplete bookings hurt revenue.',
    ],
    features: [
      'Answer reservation calls instantly and capture party size, time, and special requests.',
      'Send SMS confirmations to reduce no-shows.',
      'Handle menu, hours, and allergy FAQs with consistent answers.',
    ],
    roiStats: [
      { value: '28%', label: 'fewer missed bookings' },
      { value: '3.1x', label: 'more after-hours reservations' },
      { value: '18 hrs', label: 'staff time saved weekly' },
    ],
  },
  medical: {
    name: 'Medical Clinics',
    hero: 'Reduce hold times and keep patient scheduling calm and compliant.',
    painPoints: [
      'High call volume overwhelms front desks.',
      'Patients abandon calls when waits are long.',
      'Repetitive questions drain staff time.',
    ],
    features: [
      'Book, reschedule, and confirm appointments automatically.',
      'Answer insurance, hours, and provider availability questions.',
      'Route urgent calls to a live team member instantly.',
    ],
    roiStats: [
      { value: '42%', label: 'shorter average hold time' },
      { value: '2.4x', label: 'more appointments booked' },
      { value: '65%', label: 'patient calls resolved by AI' },
    ],
  },
  'home-services': {
    name: 'Home Services',
    hero: 'Book more jobs and respond to emergency calls instantly.',
    painPoints: [
      'Voicemails stack up when crews are on-site.',
      'Urgent calls need immediate routing.',
      'Inconsistent quoting creates lost jobs.',
    ],
    features: [
      'Capture job details, location, and availability on every call.',
      'Escalate emergency requests to on-call staff.',
      'Follow up with SMS quotes and confirmations.',
    ],
    roiStats: [
      { value: '34%', label: 'more booked jobs' },
      { value: '15 min', label: 'faster response time' },
      { value: '22%', label: 'increase in close rate' },
    ],
  },
  'real-estate': {
    name: 'Real Estate',
    hero: 'Never miss a buyer or seller lead again.',
    painPoints: [
      'Leads call outside of office hours.',
      'Agents are tied up in showings.',
      'Slow response times reduce conversions.',
    ],
    features: [
      'Capture lead intent, budget, and timeline from every caller.',
      'Route hot leads directly to the right agent.',
      'Schedule showings and send SMS follow-ups automatically.',
    ],
    roiStats: [
      { value: '2.8x', label: 'faster lead response' },
      { value: '31%', label: 'more qualified leads' },
      { value: '12 hrs', label: 'agent time saved weekly' },
    ],
  },
  auto: {
    name: 'Auto Services',
    hero: 'Keep bays full and customers informed without the phone tag.',
    painPoints: [
      'Service advisors can’t answer every call.',
      'Customers abandon calls when placed on hold.',
      'Appointment availability changes quickly.',
    ],
    features: [
      'Book service appointments and capture vehicle details.',
      'Answer pricing, hours, and maintenance FAQs.',
      'Send automated reminders to reduce no-shows.',
    ],
    roiStats: [
      { value: '26%', label: 'more booked services' },
      { value: '19%', label: 'fewer no-shows' },
      { value: '4.6★', label: 'average customer rating' },
    ],
  },
  law: {
    name: 'Law Firms',
    hero: 'Qualify leads, capture intake details, and protect billable hours.',
    painPoints: [
      'Potential clients call outside business hours.',
      'Intake is time-intensive for staff.',
      'Missed calls mean missed cases.',
    ],
    features: [
      'Gather intake details and urgency on every call.',
      'Route qualified leads to the right attorney.',
      'Answer common case-type and scheduling questions.',
    ],
    roiStats: [
      { value: '37%', label: 'increase in qualified leads' },
      { value: '1.9x', label: 'faster intake response' },
      { value: '10 hrs', label: 'staff time saved weekly' },
    ],
  },
  salons: {
    name: 'Salons',
    hero: 'Keep your stylists booked and your phones off the hook.',
    painPoints: [
      'Stylists can’t answer calls while with clients.',
      'Last-minute cancellations hurt revenue.',
      'Scheduling across services is complex.',
    ],
    features: [
      'Book appointments by service, stylist, and time preferences.',
      'Send confirmation and reminder texts automatically.',
      'Answer pricing, availability, and product questions.',
    ],
    roiStats: [
      { value: '29%', label: 'more appointments booked' },
      { value: '23%', label: 'fewer no-shows' },
      { value: '4.8★', label: 'client satisfaction' },
    ],
  },
  'property-management': {
    name: 'Property Management',
    hero: 'Handle tenant calls, maintenance requests, and leasing leads 24/7.',
    painPoints: [
      'Tenants need quick answers for maintenance issues.',
      'Leasing calls arrive after hours.',
      'Staff struggle to triage routine requests.',
    ],
    features: [
      'Log maintenance requests with priority and unit info.',
      'Answer leasing questions and schedule tours.',
      'Escalate urgent issues to on-call teams.',
    ],
    roiStats: [
      { value: '44%', label: 'faster maintenance triage' },
      { value: '2.1x', label: 'more leasing leads' },
      { value: '30%', label: 'lower call backlog' },
    ],
  },
  insurance: {
    name: 'Insurance',
    hero: 'Capture claims fast and keep policyholders informed.',
    painPoints: [
      'Claims spike after hours and on weekends.',
      'Policy questions overwhelm agents.',
      'Slow intake delays customer support.',
    ],
    features: [
      'Collect claim details and route to the right team.',
      'Answer policy, billing, and coverage FAQs.',
      'Send follow-up texts with claim references.',
    ],
    roiStats: [
      { value: '53%', label: 'faster claim intake' },
      { value: '2.6x', label: 'more calls resolved by AI' },
      { value: '24/7', label: 'coverage for policyholders' },
    ],
  },
  fitness: {
    name: 'Fitness',
    hero: 'Book more tours and keep memberships growing.',
    painPoints: [
      'Prospects call after business hours.',
      'Front desk staff are busy with members.',
      'Trial scheduling slips through the cracks.',
    ],
    features: [
      'Schedule tours, trials, and class bookings instantly.',
      'Answer membership pricing and class schedule questions.',
      'Follow up with SMS reminders to boost show rates.',
    ],
    roiStats: [
      { value: '3.4x', label: 'more trial bookings' },
      { value: '27%', label: 'higher tour attendance' },
      { value: '12%', label: 'increase in memberships' },
    ],
  },
} as const

type VerticalKey = keyof typeof verticals

export function generateStaticParams() {
  return Object.keys(verticals).map((vertical) => ({ vertical }))
}

export default function SolutionPage({ params }: { params: { vertical: string } }) {
  const key = params.vertical as VerticalKey
  const data = verticals[key]

  if (!data) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `CallFlow AI for ${data.name}`,
    description: data.hero,
    areaServed: 'US/Canada',
    provider: {
      '@type': 'Organization',
      name: 'CallFlow AI',
      url: 'https://callflow.ai',
    },
    serviceType: 'AI receptionist and phone automation',
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden pt-16 pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-slate-950 to-purple-600/10" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-sm text-blue-300 mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI Receptionist for {data.name}</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">{data.hero}</h1>
              <p className="text-lg text-slate-300 mb-8">
                CallFlow AI answers every call, books appointments, and captures leads for {data.name.toLowerCase()} — so your team can focus on delivering great service.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-full"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-200 px-6 py-3 rounded-full"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
            <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <div className="text-sm text-slate-400">Live call assistant</div>
                  <div className="text-lg font-semibold">{data.name} inbound flow</div>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />Answers every call instantly</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />Captures the right details for your team</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />Sends confirmations and reminders automatically</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8">Pain points we solve</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.painPoints.map((point) => (
              <div key={point} className="bg-slate-900/50 border border-white/5 rounded-xl p-6">
                <p className="text-slate-200">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8">Features built for {data.name}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: MessageSquare, title: 'Conversational AI' },
              { icon: Calendar, title: 'Smart Scheduling' },
              { icon: TrendingUp, title: 'Lead Capture' },
            ].map(({ icon: Icon, title }) => (
              <div key={title} className="bg-slate-900/50 border border-white/5 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-blue-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-sm text-slate-300">{data.features.find((item) => item.toLowerCase().includes(title.split(' ')[0].toLowerCase())) ?? data.features[0]}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {data.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8">Results teams see in the first 30 days</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.roiStats.map((stat) => (
              <div key={stat.label} className="bg-slate-900/50 border border-white/5 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-300 mb-2">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to power your {data.name.toLowerCase()} calls?</h2>
            <p className="text-blue-100 mb-6">Launch in minutes. No hardware. No complicated setup.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-semibold px-6 py-3 rounded-full"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/auth/signin"
                className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-6 py-3 rounded-full"
              >
                Talk to Sales
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-blue-100">
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" />Enterprise-grade security</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" />24/7 coverage</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
