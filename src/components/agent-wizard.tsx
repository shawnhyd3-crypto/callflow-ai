'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface TemplateOption {
  id: string
  name: string
  industry: string
  description?: string | null
}

interface PhoneNumberOption {
  id: string
  phoneNumber: string
  displayName?: string | null
}

interface AgentWizardProps {
  templates: TemplateOption[]
  phoneNumbers: PhoneNumberOption[]
}

export function AgentWizard({ templates, phoneNumbers }: AgentWizardProps) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [templateId, setTemplateId] = useState(templates[0]?.id ?? '')
  const [phoneNumberId, setPhoneNumberId] = useState(phoneNumbers[0]?.id ?? '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          templateId: templateId || undefined,
          phoneNumberId: phoneNumberId || undefined,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to create agent')
      }

      const data = await response.json()
      router.push(`/dashboard/agents/${data.agent.id}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Agent name</label>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Example: Main Receptionist"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Template</label>
          <select
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
            value={templateId}
            onChange={(event) => setTemplateId(event.target.value)}
          >
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name} · {template.industry}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-300">Description</label>
        <textarea
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Describe what this agent should handle..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-300">Phone number</label>
        <select
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
          value={phoneNumberId}
          onChange={(event) => setPhoneNumberId(event.target.value)}
        >
          <option value="">Assign later</option>
          {phoneNumbers.map((phone) => (
            <option key={phone.id} value={phone.id}>
              {phone.displayName ?? phone.phoneNumber}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create agent'}
      </button>
    </form>
  )
}
