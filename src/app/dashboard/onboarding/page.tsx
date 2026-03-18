'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/toast';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Wrench,
  Utensils,
  Stethoscope,
  Home,
  Briefcase,
  TreePine,
  Users,
  MoreHorizontal,
} from 'lucide-react';

const INDUSTRIES = [
  { id: 'plumber', label: 'Plumber', icon: Wrench },
  { id: 'dentist', label: 'Dentist', icon: Stethoscope },
  { id: 'restaurant', label: 'Restaurant', icon: Utensils },
  { id: 'salon', label: 'Salon', icon: Users },
  { id: 'real-estate', label: 'Real Estate', icon: Home },
  { id: 'landscaping', label: 'Landscaping', icon: TreePine },
  { id: 'coaching', label: 'Coaching', icon: Briefcase },
  { id: 'other', label: 'Other', icon: MoreHorizontal },
];

const AGENT_TEMPLATES = [
  {
    id: 'appointment-booking',
    name: 'Appointment Booking',
    description: 'Schedule and manage client appointments',
    industry: 'dentist',
  },
  {
    id: 'lead-capture',
    name: 'Lead Capture',
    description: 'Collect customer information and qualify leads',
    industry: 'real-estate',
  },
  {
    id: 'customer-support',
    name: 'Customer Support',
    description: 'Answer FAQs and route to human support',
    industry: 'restaurant',
  },
  {
    id: 'appointment-reminder',
    name: 'Appointment Reminder',
    description: 'Send reminders and collect rescheduling requests',
    industry: 'salon',
  },
  {
    id: 'quote-request',
    name: 'Quote Request',
    description: 'Gather project details and provide estimates',
    industry: 'plumber',
  },
  {
    id: 'booking-assistant',
    name: 'Booking Assistant',
    description: 'Full booking and rescheduling system',
    industry: 'coaching',
  },
];

const VOICE_OPTIONS = [
  { id: 'emma', label: 'Emma (Female, Professional)' },
  { id: 'james', label: 'James (Male, Friendly)' },
  { id: 'olivia', label: 'Olivia (Female, Warm)' },
  { id: 'michael', label: 'Michael (Male, Professional)' },
];

interface WizardData {
  businessName: string;
  industry: string;
  businessPhone: string;
  templateId: string;
  agentName: string;
  greeting: string;
  voice: string;
  answerCalls: boolean;
  bookAppointments: boolean;
  faq: boolean;
  urgentRouting: boolean;
}

const STEPS = [
  { id: 1, label: 'Business Info' },
  { id: 2, label: 'Choose Template' },
  { id: 3, label: 'Customize Agent' },
  { id: 4, label: 'Phone Setup' },
  { id: 5, label: 'Launch' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<WizardData>({
    businessName: '',
    industry: '',
    businessPhone: '',
    templateId: '',
    agentName: '',
    greeting: 'Hello! How can I help you today?',
    voice: 'emma',
    answerCalls: true,
    bookAppointments: true,
    faq: true,
    urgentRouting: false,
  });

  const updateData = (updates: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!data.businessName || !data.industry || !data.templateId || !data.agentName) {
      addToast('Please fill in all required fields', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to complete onboarding');
      }

      addToast('Agent created and activated!', 'success');
      router.push('/dashboard');
    } catch (error) {
      addToast(
        error instanceof Error ? error.message : 'Failed to complete onboarding',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden lg:flex w-64 border-r border-slate-800 bg-slate-900/50 flex-col p-8">
        <h2 className="text-lg font-semibold text-slate-100 mb-8">Setup Wizard</h2>
        <div className="space-y-4">
          {STEPS.map((step, idx) => {
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;

            return (
              <div
                key={step.id}
                className={`flex items-start gap-3 ${isActive ? 'text-primary-400' : isCompleted ? 'text-slate-400' : 'text-slate-500'}`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                    isCompleted
                      ? 'bg-primary-500/20 text-primary-400'
                      : isActive
                        ? 'bg-primary-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="h-5 w-5" /> : step.id}
                </div>
                <div>
                  <p className="text-sm font-medium">{step.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto p-8">
          {/* Mobile progress */}
          <div className="lg:hidden mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-400">
                Step {currentStep} of {STEPS.length}
              </span>
              <span className="text-sm font-medium text-slate-400">
                {STEPS[currentStep - 1].label}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 transition-all duration-300"
                style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Step content */}
          <div className="card border border-slate-800 p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-2">
                    Business Information
                  </h2>
                  <p className="text-slate-400">
                    Tell us about your business so we can tailor CallFlow AI for you.
                  </p>
                </div>

                <div>
                  <label className="label">Business Name</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Your business name"
                    value={data.businessName}
                    onChange={(e) => updateData({ businessName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="label">Industry</label>
                  <div className="grid grid-cols-2 gap-3">
                    {INDUSTRIES.map((industry) => {
                      const Icon = industry.icon;
                      return (
                        <button
                          key={industry.id}
                          onClick={() => updateData({ industry: industry.id })}
                          className={`p-4 rounded-lg border-2 transition-colors text-left flex items-center gap-3 ${
                            data.industry === industry.id
                              ? 'border-primary-500 bg-primary-500/10'
                              : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                          }`}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          <span className="text-sm font-medium">{industry.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="label">Business Phone (Optional)</label>
                  <input
                    type="tel"
                    className="input w-full"
                    placeholder="+1 (555) 000-0000"
                    value={data.businessPhone}
                    onChange={(e) => updateData({ businessPhone: e.target.value })}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-2">
                    Choose a Template
                  </h2>
                  <p className="text-slate-400">
                    Select a template that matches your needs. You can customize it next.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {AGENT_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => updateData({ templateId: template.id })}
                      className={`p-4 rounded-lg border-2 text-left transition-colors ${
                        data.templateId === template.id
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                      }`}
                    >
                      <h3 className="font-semibold text-slate-100 mb-1">
                        {template.name}
                      </h3>
                      <p className="text-sm text-slate-400">{template.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-2">
                    Customize Your Agent
                  </h2>
                  <p className="text-slate-400">
                    Set up your agent's personality and capabilities.
                  </p>
                </div>

                <div>
                  <label className="label">Agent Name</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="e.g., Assistant, Alex, etc."
                    value={data.agentName}
                    onChange={(e) => updateData({ agentName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="label">Greeting Message</label>
                  <textarea
                    className="input w-full resize-none"
                    rows={3}
                    placeholder="What should the agent say when answering calls?"
                    value={data.greeting}
                    onChange={(e) => updateData({ greeting: e.target.value })}
                  />
                </div>

                <div>
                  <label className="label">Voice</label>
                  <select
                    className="input w-full"
                    value={data.voice}
                    onChange={(e) => updateData({ voice: e.target.value })}
                  >
                    {VOICE_OPTIONS.map((voice) => (
                      <option key={voice.id} value={voice.id}>
                        {voice.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="label block">Capabilities</label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.answerCalls}
                      onChange={(e) => updateData({ answerCalls: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-slate-300">Answer incoming calls</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.bookAppointments}
                      onChange={(e) =>
                        updateData({ bookAppointments: e.target.checked })
                      }
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-slate-300">
                      Book appointments
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.faq}
                      onChange={(e) => updateData({ faq: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-slate-300">Answer FAQ</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.urgentRouting}
                      onChange={(e) =>
                        updateData({ urgentRouting: e.target.checked })
                      }
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-slate-300">
                      Route urgent calls to human
                    </span>
                  </label>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-2">
                    Phone Setup
                  </h2>
                  <p className="text-slate-400">
                    Your agent will be assigned a dedicated phone number.
                  </p>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                  <div className="text-sm text-slate-400 mb-2">Your Phone Number</div>
                  <div className="text-3xl font-bold text-primary-400 font-mono">
                    +1 (555) 123-4567
                  </div>
                  <p className="text-sm text-slate-400 mt-4">
                    This number is ready to receive calls immediately after activation.
                    Your agent will handle incoming calls according to your settings.
                  </p>
                </div>

                <div className="bg-accent-500/10 border border-accent-500/30 rounded-lg p-6">
                  <h3 className="font-semibold text-accent-400 mb-2">
                    How it works
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex gap-2">
                      <span className="text-accent-400">1.</span>
                      <span>Calls to your number route to your agent</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-400">2.</span>
                      <span>Agent answers with your custom greeting</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-400">3.</span>
                      <span>Agent handles calls based on your capabilities</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent-400">4.</span>
                      <span>Call logs and recordings available in your dashboard</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100 mb-2">
                    Ready to Launch!
                  </h2>
                  <p className="text-slate-400">
                    Review your settings and activate your agent.
                  </p>
                </div>

                <div className="space-y-4 bg-slate-800/50 rounded-lg p-6">
                  <div className="border-b border-slate-700 pb-4">
                    <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                      Business
                    </p>
                    <p className="text-slate-100 font-medium">{data.businessName}</p>
                    <p className="text-sm text-slate-400">{data.industry}</p>
                  </div>

                  <div className="border-b border-slate-700 pb-4">
                    <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">
                      Agent Configuration
                    </p>
                    <p className="text-slate-100 font-medium">{data.agentName}</p>
                    <p className="text-sm text-slate-400">
                      Template:{' '}
                      {AGENT_TEMPLATES.find((t) => t.id === data.templateId)?.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">
                      Capabilities
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {data.answerCalls && (
                        <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs">
                          Answer Calls
                        </span>
                      )}
                      {data.bookAppointments && (
                        <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs">
                          Book Appointments
                        </span>
                      )}
                      {data.faq && (
                        <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs">
                          Answer FAQ
                        </span>
                      )}
                      {data.urgentRouting && (
                        <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs">
                          Urgent Routing
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
                  <p className="text-sm text-green-400">
                    Once activated, your agent will immediately begin handling incoming calls.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              onClick={handleBack}
              disabled={currentStep === 1 || isLoading}
              className="btn btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>

            <div className="flex-1 flex gap-2 justify-center">
              {STEPS.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`h-2 rounded-full transition-all ${
                    step.id === currentStep
                      ? 'w-8 bg-primary-500'
                      : step.id < currentStep
                        ? 'w-2 bg-primary-500/50'
                        : 'w-2 bg-slate-700'
                  }`}
                  aria-label={`Go to step ${step.id}`}
                />
              ))}
            </div>

            {currentStep === STEPS.length ? (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="btn btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Activating...' : 'Activate Agent'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={isLoading}
                className="btn btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
