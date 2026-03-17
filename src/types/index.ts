export interface User {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  emailVerified?: Date | null
}

export interface Organization {
  id: string
  name: string
  slug: string
  description?: string | null
  logo?: string | null
  website?: string | null
  ownerId: string
  createdAt: Date
  updatedAt: Date
}

export interface PhoneAgent {
  id: string
  organizationId: string
  name: string
  description?: string | null
  status: 'draft' | 'active' | 'inactive'
  templateId?: string | null
  systemPrompt: string
  voiceId: string
  language: string
  firstMessage: string
  endCallMessage: string
  vapiAssistantId?: string | null
  answerCalls: boolean
  bookAppointments: boolean
  answerFAQs: boolean
  routeUrgent: boolean
  maxCallDuration: number
  allowVoicemail: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CallLog {
  id: string
  organizationId: string
  agentId: string
  phoneNumber: string
  duration: number
  status: 'completed' | 'missed' | 'voicemail'
  outcome?: 'booked' | 'handled' | 'escalated' | 'voicemail' | null
  transcript?: string | null
  recordingUrl?: string | null
  startTime: Date
  endTime: Date
  createdAt: Date
}

export interface Appointment {
  id: string
  organizationId: string
  agentId: string
  clientName: string
  clientPhone: string
  clientEmail?: string | null
  service?: string | null
  appointmentTime: Date
  notes?: string | null
  status: 'confirmed' | 'cancelled' | 'completed' | 'noshow'
  createdAt: Date
  updatedAt: Date
}

export interface Subscription {
  id: string
  organizationId: string
  stripeCustomerId: string
  stripeSubscriptionId?: string | null
  plan: 'starter' | 'pro' | 'business'
  status: 'active' | 'cancelled' | 'past_due'
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelledAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface UsageRecord {
  id: string
  organizationId: string
  minutesUsed: number
  minutesLimit: number
  billingPeriodStart: Date
  billingPeriodEnd: Date
  createdAt: Date
  updatedAt: Date
}

export interface AgentTemplate {
  id: string
  name: string
  industry: string
  description?: string | null
  systemPrompt: string
  greetingScript: string
  faqKnowledgeBase: string
  appointmentBookingLogic: string
  escalationRules: string
  defaultVoiceId: string
  createdAt: Date
  updatedAt: Date
}

export interface DashboardStats {
  totalCalls: number
  avgCallDuration: number
  appointmentsBooked: number
  urgentEscalations: number
  monthlyMinutesUsed: number
  completionRate: number
}
