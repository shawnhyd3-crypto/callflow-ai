import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const auth = request.headers.get('x-seed-key')
  if (auth !== 'seed-callflow-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check if templates already exist
  const existing = await prisma.agentTemplate.count()
  if (existing > 0) {
    return NextResponse.json({ message: 'Already seeded', count: existing })
  }

  const templates = await Promise.all([
    prisma.agentTemplate.create({
      data: {
        name: 'Plumber', industry: 'plumber',
        description: 'AI receptionist for plumbing services.',
        systemPrompt: 'You are a professional receptionist for a plumbing company. You answer calls, book appointments, and provide basic guidance on plumbing services.',
        greetingScript: 'Thanks for calling! This is your AI assistant. How can I help you today?',
        faqKnowledgeBase: 'Hours: Mon-Fri 8am-6pm. Emergency service available 24/7.',
        appointmentBookingLogic: 'Collect name, phone, address, issue summary. Offer next available window.',
        escalationRules: 'Escalate for burst pipes, flooding, gas smell, or emergency requests.',
        defaultVoiceId: 'aura-asteria-en',
      },
    }),
    prisma.agentTemplate.create({
      data: {
        name: 'Dentist', industry: 'dentist',
        description: 'Dental practice front-desk assistant.',
        systemPrompt: 'You are a professional receptionist for a dental practice. You schedule appointments and answer questions about services.',
        greetingScript: 'Thank you for calling! How can I assist you today?',
        faqKnowledgeBase: 'Hours: Mon-Thu 8am-5pm, Fri 8am-3pm. New patients arrive 15 min early.',
        appointmentBookingLogic: 'Collect patient name, phone, email, reason for visit.',
        escalationRules: 'Escalate for severe pain, swelling, or trauma.',
        defaultVoiceId: 'aura-asteria-en',
      },
    }),
    prisma.agentTemplate.create({
      data: {
        name: 'Salon', industry: 'salon',
        description: 'Hair and beauty salon concierge.',
        systemPrompt: 'You are a friendly receptionist for a salon. You book appointments and answer service questions.',
        greetingScript: 'Hi! Thanks for calling. What can I book for you today?',
        faqKnowledgeBase: 'Hours: Tue-Sat 9am-7pm. 24-hour cancellation policy.',
        appointmentBookingLogic: 'Collect service type, stylist preference, date/time, name, phone.',
        escalationRules: 'Escalate for bridal party bookings or complex color requests.',
        defaultVoiceId: 'aura-asteria-en',
      },
    }),
    prisma.agentTemplate.create({
      data: {
        name: 'Restaurant', industry: 'restaurant',
        description: 'Reservation and guest services.',
        systemPrompt: 'You are a reservation agent for a restaurant. You take reservations and answer menu questions.',
        greetingScript: 'Thanks for calling! Would you like to make a reservation?',
        faqKnowledgeBase: 'Hours vary by location. Reservations recommended for parties of 6+.',
        appointmentBookingLogic: 'Collect party size, date, time, name, phone, dietary restrictions.',
        escalationRules: 'Escalate for large parties (10+) or special events.',
        defaultVoiceId: 'aura-asteria-en',
      },
    }),
    prisma.agentTemplate.create({
      data: {
        name: 'Real Estate', industry: 'real-estate',
        description: 'Real estate office assistant.',
        systemPrompt: 'You are a receptionist for a real estate office. You handle property inquiries and schedule viewings.',
        greetingScript: 'Welcome to our office! How can I help you today?',
        faqKnowledgeBase: 'Office hours: Mon-Fri 9am-6pm, Sat 10am-4pm.',
        appointmentBookingLogic: 'Collect name, phone, property interest, preferred viewing times.',
        escalationRules: 'Escalate for urgent offers or agent-specific requests.',
        defaultVoiceId: 'aura-asteria-en',
      },
    }),
    prisma.agentTemplate.create({
      data: {
        name: 'General', industry: 'other',
        description: 'General-purpose business receptionist.',
        systemPrompt: 'You are a professional AI receptionist. You answer calls, take messages, and help callers with basic inquiries.',
        greetingScript: 'Thank you for calling! How may I direct your call?',
        faqKnowledgeBase: 'Business hours and services vary. Ask the caller how you can help.',
        appointmentBookingLogic: 'Collect name, phone, reason for calling, preferred callback time.',
        escalationRules: 'Escalate for urgent matters or when caller requests a specific person.',
        defaultVoiceId: 'aura-asteria-en',
      },
    }),
  ])

  return NextResponse.json({ success: true, count: templates.length })
}
