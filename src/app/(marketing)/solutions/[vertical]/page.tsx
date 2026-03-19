'use client'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  CheckCircle2,
  TrendingUp,
  PhoneIcon,
  Clock,
  BarChart3,
  Users,
  Zap,
} from 'lucide-react'

interface SolutionData {
  name: string
  description: string
  heroTagline: string
  heroSubtitle: string
  painPoints: {
    icon: React.ReactNode
    title: string
    description: string
  }[]
  features: {
    icon: React.ReactNode
    title: string
    description: string
  }[]
  roiStats: {
    metric: string
    value: string
    description: string
  }[]
  cta: {
    primary: string
    secondary: string
  }
}

const solutions: Record<string, SolutionData> = {
  restaurants: {
    name: 'Restaurants',
    description: 'AI-powered phone agents for restaurants',
    heroTagline: 'Never Miss a Reservation Again',
    heroSubtitle:
      'AI phone agents that handle reservations, takeout orders, and customer inquiries 24/7',
    painPoints: [
      {
        icon: <PhoneIcon className="w-6 h-6" />,
        title: 'Missed Calls & Reservations',
        description:
          'Customers hang up after 3 rings. You lose bookings and revenue.',
      },
      {
        icon: <Clock className="w-6 h-6" />,
        title: 'Staff Overwhelmed',
        description:
          'Staff spend 40% of shifts answering phones instead of serving.',
      },
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: 'No Data on Call Patterns',
        description:
          'Blind spot on peak hours, customer preferences, and repeat callers.',
      },
    ],
    features: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: 'Instant Reservation Booking',
        description:
          'AI answers calls, checks availability, and confirms reservations in real-time.',
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: 'Order Aggregation',
        description:
          'Handles takeout and delivery orders, syncs with kitchen systems.',
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: 'Call Analytics',
        description:
          'Track peak hours, customer trends, and reservation patterns.',
      },
    ],
    roiStats: [
      {
        metric: 'Reservation Capture',
        value: '+35%',
        description: 'More bookings from after-hours calls',
      },
      {
        metric: 'Staff Efficiency',
        value: '+28%',
        description: 'Hours freed per week for customer service',
      },
      {
        metric: 'Revenue Growth',
        value: '+$4.2K',
        description: 'Average monthly revenue increase per location',
      },
    ],
    cta: {
      primary: 'Start Your Free Trial',
      secondary: 'See It In Action',
    },
  },
  medical: {
    name: 'Medical Practices',
    description: 'HIPAA-compliant AI phone agents for healthcare',
    heroTagline: 'Reduce No-Shows. Improve Patient Care.',
    heroSubtitle:
      'HIPAA-compliant AI agents that handle appointment scheduling, patient inquiries, and prescription refill requests.',
    painPoints: [
      {
        icon: <PhoneIcon className="w-6 h-6" />,
        title: 'Phone Volume Overload',
        description:
          'Staff spend 6+ hours daily on scheduling calls, taking time from patient care.',
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: 'High No-Show Rates',
        description:
          '25-30% of appointments missed, reducing revenue and clinic efficiency.',
      },
      {
        icon: <Clock className="w-6 h-6" />,
        title: 'After-Hours Accessibility',
        description:
          'Patients can\'t reach practice after 5 PM, turning to urgent care or ER.',
      },
    ],
    features: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: 'Smart Scheduling',
        description:
          'AI checks availability, schedules appointments, sends confirmations automatically.',
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: 'Reminder & No-Show Prevention',
        description:
          'Automated reminders reduce no-shows by up to 40%.',
      },
      {
        icon: <CheckCircle2 className="w-6 h-6" />,
        title: 'HIPAA Compliant',
        description:
          'All calls encrypted, HIPAA-audited, patient privacy guaranteed.',
      },
    ],
    roiStats: [
      {
        metric: 'No-Show Reduction',
        value: '-38%',
        description: 'Fewer missed appointments, predictable revenue',
      },
      {
        metric: 'Admin Time Saved',
        value: '15 hrs/week',
        description: 'Per practice staff reassigned to patient care',
      },
      {
        metric: 'Revenue Protected',
        value: '+$8.5K/mo',
        description: 'From eliminated no-shows per practice',
      },
    ],
    cta: {
      primary: 'Schedule a Demo',
      secondary: 'Learn About Compliance',
    },
  },
  dental: {
    name: 'Dental Practices',
    description: 'AI phone agents built for dental offices',
    heroTagline: 'Answer Every Call. Fill Every Chair.',
    heroSubtitle:
      'AI agents that manage appointment scheduling, insurance questions, and emergency inquiries around the clock.',
    painPoints: [
      {
        icon: <PhoneIcon className="w-6 h-6" />,
        title: 'Ringing Phones, Lost Patients',
        description:
          'Patients abandon calls after 2-3 rings, choosing competitors instead.',
      },
      {
        icon: <Clock className="w-6 h-6" />,
        title: 'Front Desk Bottleneck',
        description:
          'Hygienists and dentists interrupt patients to answer phones.',
      },
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: 'Insurance Questions Delay Bookings',
        description:
          'Callers need to know coverage before committing to appointments.',
      },
    ],
    features: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: 'Instant Appointment Booking',
        description:
          'AI schedules cleanings, checkups, and emergency slots instantly.',
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: 'Insurance Info Lookup',
        description:
          'AI retrieves patient insurance details and answers coverage questions.',
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: 'Emergency Triage',
        description:
          'Routes emergency calls to on-call dentist, prevents ER visits.',
      },
    ],
    roiStats: [
      {
        metric: 'Call Pickup Rate',
        value: '99%',
        description: 'Every patient call answered within seconds',
      },
      {
        metric: 'Schedule Fill Rate',
        value: '+32%',
        description: 'More appointments booked per month',
      },
      {
        metric: 'No-Show Reduction',
        value: '-45%',
        description: 'Via automated confirmations and reminders',
      },
    ],
    cta: {
      primary: 'Get Started',
      secondary: 'View Demo',
    },
  },
  salon: {
    name: 'Salons & Spas',
    description: 'AI phone agents for beauty & wellness businesses',
    heroTagline: 'Book Every Slot. Delight Every Guest.',
    heroSubtitle:
      'AI agents that handle appointment bookings, upsell services, and manage waitlists automatically.',
    painPoints: [
      {
        icon: <PhoneIcon className="w-6 h-6" />,
        title: 'Missed Calls = Missed Revenue',
        description:
          'Busy stylists can\'t answer every call; customers book elsewhere.',
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: 'Offline Booking Limits',
        description:
          'Clients can\'t book after hours or when staff is with customers.',
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: 'No Upsell Opportunities',
        description:
          'Staff too busy to suggest add-on services (extensions, nails, facials).',
      },
    ],
    features: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: '24/7 Booking',
        description:
          'AI schedules appointments, cross-sells services, and manages waitlists.',
      },
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: 'Service Upselling',
        description:
          'AI suggests add-ons based on booking history and preferences.',
      },
      {
        icon: <Clock className="w-6 h-6" />,
        title: 'Loyalty & Reminders',
        description:
          'Automated reminders boost attendance; loyalty tracking increases repeat bookings.',
      },
    ],
    roiStats: [
      {
        metric: 'Slot Utilization',
        value: '+40%',
        description: 'More bookings per day, higher chair usage',
      },
      {
        metric: 'No-Show Rate',
        value: '-50%',
        description: 'Via reminder texts and confirmations',
      },
      {
        metric: 'Average Ticket Size',
        value: '+$18',
        description: 'From AI-driven upsell suggestions',
      },
    ],
    cta: {
      primary: 'Try Free For 14 Days',
      secondary: 'Schedule a Call',
    },
  },
  hvac: {
    name: 'HVAC Services',
    description: 'AI phone agents for heating & cooling contractors',
    heroTagline: 'Never Miss a Service Call',
    heroSubtitle:
      'AI agents that dispatch emergency calls, qualify leads, and schedule maintenance appointments.',
    painPoints: [
      {
        icon: <PhoneIcon className="w-6 h-6" />,
        title: 'After-Hours Emergency Calls Drop',
        description:
          'Customers call competitors when they can\'t reach you at midnight.',
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: 'Unqualified Leads Waste Time',
        description:
          'Dispatchers book calls without verifying if customer is actually in service area.',
      },
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: 'Seasonal Demand Spikes',
        description:
          'Summer AC failures and winter heating emergencies overwhelm staff.',
      },
    ],
    features: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: 'Emergency Dispatch',
        description:
          'AI triages emergency calls, confirms service area, auto-dispatches to nearest technician.',
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: 'Lead Qualification',
        description:
          'AI asks qualifying questions: budget, symptoms, timeline—before routing to sales.',
      },
      {
        icon: <Clock className="w-6 h-6" />,
        title: 'Maintenance Scheduling',
        description:
          'AI proactively books preventive maintenance, reducing emergency callbacks.',
      },
    ],
    roiStats: [
      {
        metric: 'After-Hours Calls Captured',
        value: '+90%',
        description: 'Revenue-generating calls that would be lost',
      },
      {
        metric: 'Dispatch Efficiency',
        value: '+35%',
        description: 'Faster response times, higher customer satisfaction',
      },
      {
        metric: 'Lead Quality Score',
        value: '+2.8x',
        description: 'Qualified leads vs unqualified cold calls',
      },
    ],
    cta: {
      primary: 'See How It Works',
      secondary: 'Get Started Today',
    },
  },
  legal: {
    name: 'Law Firms',
    description: 'AI phone agents for legal practices',
    heroTagline: 'Capture Every Lead. Answer Every Question.',
    heroSubtitle:
      'AI agents that qualify leads, schedule consultations, and handle routine client inquiries securely.',
    painPoints: [
      {
        icon: <PhoneIcon className="w-6 h-6" />,
        title: 'Lost Lead Generation',
        description:
          'After-hours calls go unanswered. Prospective clients hire competitors.',
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: 'Paralegal Overload',
        description:
          'Paralegals spend hours on intake calls instead of case work.',
      },
      {
        icon: <Clock className="w-6 h-6" />,
        title: 'Vague Client Inquiries',
        description:
          'Calls lack detail. Partners waste time on unqualified prospects.',
      },
    ],
    features: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: 'Lead Intake & Qualification',
        description:
          'AI gathers case details, assesses fit, schedules qualified consultations.',
      },
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: 'Client Service Requests',
        description:
          'AI handles routine inquiries, document requests, billing questions.',
      },
      {
        icon: <CheckCircle2 className="w-6 h-6" />,
        title: 'Secure & Confidential',
        description:
          'Encrypted calls, no client data stored, fully compliant with bar requirements.',
      },
    ],
    roiStats: [
      {
        metric: 'Lead Capture',
        value: '+60%',
        description: 'After-hours + weekend leads converted to consultations',
      },
      {
        metric: 'Billable Hours Saved',
        value: '12 hrs/week',
        description: 'Per firm partner, per paralegal reallocated to cases',
      },
      {
        metric: 'Consultation Rate',
        value: '+73%',
        description: 'Qualified leads convert at 3x the rate of cold calls',
      },
    ],
    cta: {
      primary: 'Request a Demo',
      secondary: 'Learn More',
    },
  },
  'home-services': {
    name: 'Home Services',
    description: 'AI phone agents for home improvement & repair',
    heroTagline: 'Every Call is a Lead',
    heroSubtitle:
      'AI agents that qualify jobs, schedule estimates, and dispatch technicians 24/7.',
    painPoints: [
      {
        icon: <PhoneIcon className="w-6 h-6" />,
        title: 'Lost Weekend & Evening Calls',
        description:
          'Homeowners call on weekends and evenings. You miss half your leads.',
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: 'Unqualified Estimates Waste Time',
        description:
          'Dispatch sends technicians to tire-kickers and small jobs.',
      },
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: 'No Service Area Verification',
        description:
          'Customers outside your area take dispatch time and resources.',
      },
    ],
    features: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: 'Smart Qualification',
        description:
          'AI asks: scope, budget, timeline. Dispatches only qualified leads.',
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: 'Service Area Verification',
        description:
          'AI confirms address is in your service area before booking.',
      },
      {
        icon: <Clock className="w-6 h-6" />,
        title: 'Mobile-Friendly Scheduling',
        description:
          'AI books estimates and dispatches to crew phones instantly.',
      },
    ],
    roiStats: [
      {
        metric: 'Call Conversion Rate',
        value: '+45%',
        description: 'More leads turn into jobs with pre-qualification',
      },
      {
        metric: 'Dispatch Efficiency',
        value: '+38%',
        description: 'No wasted trips to out-of-area or unqualified calls',
      },
      {
        metric: 'Revenue Per Call',
        value: '+$650',
        description: 'Average job size increases with better qualification',
      },
    ],
    cta: {
      primary: 'Get Started Today',
      secondary: 'See the Difference',
    },
  },
  'real-estate': {
    name: 'Real Estate Agents',
    description: 'AI phone agents for real estate professionals',
    heroTagline: 'Never Miss a Buyer or Seller',
    heroSubtitle:
      'AI agents that qualify leads, schedule showings, and nurture prospects on autopilot.',
    painPoints: [
      {
        icon: <PhoneIcon className="w-6 h-6" />,
        title: 'Missed Seller Calls',
        description:
          'Agents on showings miss calls from sellers wanting to list. Leads go cold.',
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: 'Unqualified Buyer Inquiries',
        description:
          'Time spent on tire-kickers who aren\'t actually ready to buy.',
      },
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: 'After-Hours Prospect Abandonment',
        description:
          'Prospects browse listings at 9 PM. Can\'t reach you. Buy with another agent.',
      },
    ],
    features: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: 'Instant Showing Scheduler',
        description:
          'AI books property showings, confirms buyer info, sends directions.',
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: 'Buyer & Seller Qualification',
        description:
          'AI asks timeline, budget, motivation. Only routes serious leads.',
      },
      {
        icon: <Clock className="w-6 h-6" />,
        title: '24/7 Lead Capture',
        description:
          'Every after-hours inquiry captured, qualified, and ready for follow-up.',
      },
    ],
    roiStats: [
      {
        metric: 'Lead Capture Rate',
        value: '+85%',
        description: 'After-hours and weekend leads now converted',
      },
      {
        metric: 'Showings Per Month',
        value: '+28%',
        description: 'From 24/7 availability and better scheduling',
      },
      {
        metric: 'Time Saved',
        value: '15 hrs/week',
        description: 'Per agent, freed from intake and scheduling calls',
      },
    ],
    cta: {
      primary: 'Start Your Free Trial',
      secondary: 'Schedule a Demo',
    },
  },
  'property-management': {
    name: 'Property Management',
    description: 'AI phone agents for property managers',
    heroTagline: 'Handle Tenant Calls Without the Headache',
    heroSubtitle:
      'AI agents that triage maintenance requests, collect rent inquiries, and handle tenant services.',
    painPoints: [
      {
        icon: <PhoneIcon className="w-6 h-6" />,
        title: 'Maintenance Requests Pile Up',
        description:
          'Tenants call with urgent issues. You can\'t answer in time. Rent withholding lawsuits follow.',
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: 'Admin Drowns in Calls',
        description:
          'Staff answers 50+ tenant calls per day. Nothing else gets done.',
      },
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: 'No Proper Documentation',
        description:
          'Maintenance requests aren\'t logged. Disputes arise. No record of response.',
      },
    ],
    features: [
      {
        icon: <Zap className="w-6 h-6" />,
        title: 'Maintenance Triage',
        description:
          'AI logs requests, prioritizes emergencies, auto-dispatches to contractors.',
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: 'Rent & Payment Processing',
        description:
          'AI handles rent inquiries, payment reminders, late notice automation.',
      },
      {
        icon: <Clock className="w-6 h-6" />,
        title: 'Tenant Communication',
        description:
          'AI answers lease questions, processing inquiries, handles common requests.',
      },
    ],
    roiStats: [
      {
        metric: 'Response Time',
        value: '-60%',
        description: 'Tenant emergency calls answered in seconds, not hours',
      },
      {
        metric: 'Admin Hours Saved',
        value: '25 hrs/week',
        description: 'Per manager, reallocated from calls to strategic work',
      },
      {
        metric: 'Dispute Prevention',
        value: '-72%',
        description: 'Via documentation and instant response logging',
      },
    ],
    cta: {
      primary: 'See A Live Demo',
      secondary: 'Get Started',
    },
  },
}

export async function generateStaticParams() {
  return Object.keys(solutions).map((vertical) => ({
    vertical,
  }))
}

export function generateMetadata({ params }: { params: { vertical: string } }): Metadata {
  const solution = solutions[params.vertical]

  if (!solution) {
    return {
      title: 'Solution Not Found',
    }
  }

  return {
    title: `${solution.name} AI Phone Agents | CallFlow AI`,
    description: solution.heroSubtitle,
    openGraph: {
      title: `${solution.name} AI Phone Agents | CallFlow AI`,
      description: solution.heroSubtitle,
      type: 'website',
    },
  }
}

export default function SolutionPage({ params }: { params: { vertical: string } }) {
  const solution = solutions[params.vertical]

  if (!solution) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {solution.heroTagline}
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            {solution.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition"
            >
              {solution.cta.primary}
            </Link>
            <Link
              href="/compare/bland-ai"
              className="px-8 py-3 border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-900 transition"
            >
              {solution.cta.secondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Challenges {solution.name} Face
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {solution.painPoints.map((point, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-purple-500/50 transition"
              >
                <div className="text-purple-400 mb-4">{point.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
                <p className="text-slate-300">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How CallFlow AI Solves This
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {solution.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/20 rounded-xl hover:border-blue-500/50 transition"
              >
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Real Results
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {solution.roiStats.map((stat, idx) => (
              <div
                key={idx}
                className="p-8 bg-slate-800/50 border border-slate-700 rounded-xl text-center hover:border-purple-500/50 transition"
              >
                <div className="text-4xl sm:text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-3">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-slate-200 mb-2">
                  {stat.metric}
                </div>
                <p className="text-slate-400">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-purple-500/30 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to transform your {solution.name.toLowerCase()} business?
          </h2>
          <p className="text-slate-300 mb-6 text-lg">
            Join hundreds of {solution.name.toLowerCase()} across the nation using CallFlow AI.
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  )
}
