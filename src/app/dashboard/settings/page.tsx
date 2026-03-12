'use client'

import { useEffect, useMemo, useState } from 'react'
import { Save, AlertCircle, CheckCircle } from 'lucide-react'

type SettingsResponse = {
  organization: {
    id: string
    name: string
    slug: string
    description: string | null
    website: string | null
    logo: string | null
    ownerId: string
    ownerEmail: string | null
  }
  subscription: {
    id: string
    organizationId: string
    stripeCustomerId: string
    stripeSubscriptionId: string | null
    plan: string
    status: string
    currentPeriodStart: string
    currentPeriodEnd: string
    cancelledAt: string | null
  } | null
  usageRecord: {
    id: string
    minutesUsed: number
    minutesLimit: number
    billingPeriodStart: string
    billingPeriodEnd: string
  } | null
  usageAlert: {
    level: 'info' | 'warning' | 'critical' | 'limit'
    percent: number
    threshold: number
    message: string
  } | null
}

const PLAN_LABELS: Record<string, string> = {
  starter: 'Starter',
  pro: 'Growth',
  business: 'Scale',
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [saveStatus, setSaveStatus] = useState<null | 'success' | 'error'>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [settings, setSettings] = useState<SettingsResponse | null>(null)
  const [form, setForm] = useState({
    name: '',
    website: '',
    description: '',
  })

  const tabs = ['general', 'notifications', 'billing', 'api']

  useEffect(() => {
    let isMounted = true

    const loadSettings = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/settings')
        if (!response.ok) {
          throw new Error('Failed to load settings')
        }
        const data = (await response.json()) as SettingsResponse
        if (!isMounted) return
        setSettings(data)
        setForm({
          name: data.organization.name ?? '',
          website: data.organization.website ?? '',
          description: data.organization.description ?? '',
        })
        setError(null)
      } catch (err) {
        if (!isMounted) return
        setError(err instanceof Error ? err.message : 'Unable to load settings')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadSettings()

    return () => {
      isMounted = false
    }
  }, [])

  const usageStats = useMemo(() => {
    const usage = settings?.usageRecord
    if (!usage) return null
    const minutesUsed = usage.minutesUsed ?? 0
    const minutesLimit = usage.minutesLimit ?? 0
    const usagePercent = minutesLimit > 0 ? Math.min((minutesUsed / minutesLimit) * 100, 100) : 0
    return { minutesUsed, minutesLimit, usagePercent }
  }, [settings])

  const usageAlert = settings?.usageAlert ?? null

  const usageAlertStyles = usageAlert
    ? usageAlert.level === 'limit'
      ? 'border-rose-500/60 bg-rose-500/10 text-rose-100'
      : usageAlert.level === 'critical'
        ? 'border-amber-500/60 bg-amber-500/10 text-amber-100'
        : usageAlert.level === 'warning'
          ? 'border-yellow-500/60 bg-yellow-500/10 text-yellow-100'
          : 'border-blue-500/60 bg-blue-500/10 text-blue-100'
    : ''

  const handleSave = async () => {
    if (!settings) return
    setIsSaving(true)
    setSaveStatus(null)

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          website: form.website,
          description: form.description,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save settings')
      }

      const data = (await response.json()) as { organization: SettingsResponse['organization'] }
      setSettings((prev) => (prev ? { ...prev, organization: { ...prev.organization, ...data.organization } } : prev))
      setSaveStatus('success')
      setTimeout(() => setSaveStatus(null), 3000)
    } catch (err) {
      setSaveStatus('error')
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="card">
        <p className="text-slate-400">Loading settings...</p>
      </div>
    )
  }

  if (error || !settings) {
    return (
      <div className="card">
        <p className="text-red-400">{error ?? 'Unable to load settings.'}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-slate-400">Manage your account, billing, and integrations.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 rounded font-medium transition-colors capitalize ${
              activeTab === tab
                ? 'bg-primary-600 text-white'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-6">General Information</h2>

            <div className="space-y-4">
              <div>
                <label className="label">Company Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="input"
                />
              </div>

              <div>
                <label className="label">Website</label>
                <input
                  type="url"
                  value={form.website}
                  onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
                  className="input"
                />
              </div>

              <div>
                <label className="label">Description</label>
                <textarea
                  value={form.description}
                  onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                  rows={4}
                  className="input"
                ></textarea>
              </div>

              {saveStatus === 'success' && (
                <div className="flex items-center space-x-2 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400">Settings saved successfully</span>
                </div>
              )}

              {saveStatus === 'error' && (
                <div className="flex items-center space-x-2 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400">Unable to save settings. Try again.</span>
                </div>
              )}

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="btn btn-primary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>

          <div className="card border-red-500/30 bg-red-500/5">
            <h2 className="text-xl font-bold mb-4 text-red-400">Danger Zone</h2>
            <p className="text-slate-400 mb-4">
              Permanently delete your account and all associated data.
            </p>
            <button className="btn bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/50">
              Delete Account
            </button>
          </div>
        </div>
      )}

      {/* Notifications Settings */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="label">Primary Notification Email</label>
                <input
                  type="email"
                  value={settings.organization.ownerEmail ?? ''}
                  readOnly
                  className="input bg-slate-900/60"
                />
                <p className="text-xs text-slate-500 mt-2">
                  This is the owner email on file and will receive account alerts.
                </p>
              </div>
              <div>
                <label className="label">Organization Slug</label>
                <input
                  type="text"
                  value={settings.organization.slug}
                  readOnly
                  className="input bg-slate-900/60"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Used for internal routing and notifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Billing Settings */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Current Plan</h2>

            {settings.subscription ? (
              <div className="p-4 bg-gradient-to-r from-primary-600/20 to-accent-600/20 border border-primary-600/50 rounded-lg mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold mb-1">
                      {PLAN_LABELS[settings.subscription.plan] ?? settings.subscription.plan} Plan
                    </h3>
                    <p className="text-slate-400">Status: {settings.subscription.status}</p>
                    <p className="text-sm text-slate-500 mt-2">
                      Renews on {new Date(settings.subscription.currentPeriodEnd).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                    {settings.subscription.status}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-4 border border-slate-800 rounded-lg mb-6">
                <p className="text-slate-400">No active subscription found.</p>
              </div>
            )}

            {usageAlert && (
              <div className={`mb-6 rounded-lg border px-4 py-3 ${usageAlertStyles}`}>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 mt-0.5" />
                  <div>
                    <p className="font-semibold">Usage alert ({usageAlert.percent}%)</p>
                    <p className="text-sm opacity-80">{usageAlert.message}</p>
                  </div>
                </div>
              </div>
            )}

            {usageStats && (
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-400">Minutes used this period</span>
                  <span className="font-semibold">
                    {usageStats.minutesUsed} / {usageStats.minutesLimit}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-full"
                    style={{ width: `${usageStats.usagePercent}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <button className="btn btn-secondary">Upgrade Plan</button>
              <button className="btn btn-outline">Manage Subscription</button>
            </div>

            {usageAlert && (
              <p className="text-sm text-slate-400 mt-4">
                Need more minutes? Upgrade anytime to unlock higher limits and additional agents.
              </p>
            )}
          </div>

          {settings.subscription && (
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Subscription Details</h2>
              <div className="space-y-2 text-sm text-slate-400">
                <p>
                  Stripe Customer ID: <span className="text-slate-200">{settings.subscription.stripeCustomerId}</span>
                </p>
                <p>
                  Stripe Subscription ID:{' '}
                  <span className="text-slate-200">{settings.subscription.stripeSubscriptionId ?? '—'}</span>
                </p>
                <p>
                  Billing Period:{' '}
                  <span className="text-slate-200">
                    {new Date(settings.subscription.currentPeriodStart).toLocaleDateString()} -{' '}
                    {new Date(settings.subscription.currentPeriodEnd).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* API Settings */}
      {activeTab === 'api' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-6">API Access</h2>

            <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg mb-6">
              <p className="text-sm text-slate-400">
                Use the organization identifiers below when integrating with CallFlow AI.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">Organization ID</label>
                <input
                  type="text"
                  value={settings.organization.id}
                  readOnly
                  className="input bg-slate-900/60"
                />
              </div>

              <div>
                <label className="label">Organization Slug</label>
                <input
                  type="text"
                  value={settings.organization.slug}
                  readOnly
                  className="input bg-slate-900/60"
                />
              </div>

              {settings.subscription?.stripeCustomerId && (
                <div>
                  <label className="label">Stripe Customer ID</label>
                  <input
                    type="text"
                    value={settings.subscription.stripeCustomerId}
                    readOnly
                    className="input bg-slate-900/60"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
