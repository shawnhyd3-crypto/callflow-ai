'use client'

import { useState } from 'react'
import { Save, AlertCircle, CheckCircle } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account')
  const [saveStatus, setSaveStatus] = useState<null | 'success' | 'error'>(null)

  const tabs = ['account', 'billing', 'phone-numbers', 'api']

  const handleSave = () => {
    setSaveStatus('success')
    setTimeout(() => setSaveStatus(null), 3000)
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

      {/* Account Settings */}
      {activeTab === 'account' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Account Information</h2>

            <div className="space-y-4">
              <div>
                <label className="label">Company Name</label>
                <input
                  type="text"
                  defaultValue="Acme Services"
                  className="input"
                />
              </div>

              <div>
                <label className="label">Email Address</label>
                <input
                  type="email"
                  defaultValue="owner@acmeservices.com"
                  className="input"
                />
              </div>

              <div>
                <label className="label">Website</label>
                <input
                  type="url"
                  defaultValue="https://acmeservices.com"
                  className="input"
                />
              </div>

              <div>
                <label className="label">Description</label>
                <textarea
                  defaultValue="Professional plumbing services for residential and commercial customers"
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

              <button
                onClick={handleSave}
                className="btn btn-primary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
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

      {/* Billing Settings */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Current Plan</h2>

            <div className="p-4 bg-gradient-to-r from-primary-600/20 to-accent-600/20 border border-primary-600/50 rounded-lg mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold mb-1">Pro Plan</h3>
                  <p className="text-slate-400">$99/month</p>
                  <p className="text-sm text-slate-500 mt-2">500 minutes per month</p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-semibold">
                  Active
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-400">Minutes used this month</span>
                <span className="font-semibold">234 / 500</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 rounded-full"
                  style={{ width: '47%' }}
                ></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <button className="btn btn-secondary">
                Upgrade Plan
              </button>
              <button className="btn btn-outline">
                Cancel Subscription
              </button>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-6">Billing History</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="px-4 py-3 text-left text-slate-400">Date</th>
                    <th className="px-4 py-3 text-left text-slate-400">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-slate-400">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-slate-400">
                      Invoice
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      date: '2024-03-01',
                      amount: '$99.00',
                      status: 'paid',
                    },
                    {
                      date: '2024-02-01',
                      amount: '$99.00',
                      status: 'paid',
                    },
                    {
                      date: '2024-01-01',
                      amount: '$29.00',
                      status: 'paid',
                    },
                  ].map((invoice, idx) => (
                    <tr key={idx} className="border-b border-slate-800">
                      <td className="px-4 py-3">{invoice.date}</td>
                      <td className="px-4 py-3 font-semibold">
                        {invoice.amount}
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-semibold">
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-primary-400 hover:text-primary-300">
                          Download →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Phone Numbers */}
      {activeTab === 'phone-numbers' && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Phone Numbers</h2>
              <button className="btn btn-primary">Add Number</button>
            </div>

            <div className="space-y-4">
              {[
                {
                  number: '+1 (555) 123-4567',
                  assigned: 'Main Receptionist',
                  status: 'active',
                },
                {
                  number: '+1 (555) 234-5678',
                  assigned: 'Appointment Scheduler',
                  status: 'active',
                },
              ].map((phone, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{phone.number}</p>
                    <p className="text-sm text-slate-400">
                      Assigned to: {phone.assigned}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
                      Active
                    </span>
                    <button className="text-slate-400 hover:text-slate-300">
                      ⋮
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card bg-blue-500/5 border-blue-500/30">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-400 mb-1">
                  Get More Phone Numbers
                </h3>
                <p className="text-sm text-slate-400">
                  Upgrade to Pro or Enterprise to add more phone numbers.
                  Each number can be assigned to a different agent.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Settings */}
      {activeTab === 'api' && (
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-6">API Keys</h2>

            <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg mb-6">
              <p className="text-sm text-slate-400">
                Use these keys to integrate CallFlow AI with your own applications.
                Keep your keys secure and never share them publicly.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">API Key</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="password"
                    value="••••••••••••••••••••••••••••"
                    readOnly
                    className="input flex-1"
                  />
                  <button className="btn btn-secondary">Copy</button>
                </div>
              </div>

              <div>
                <label className="label">API Secret</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="password"
                    value="••••••••••••••••••••••••••••"
                    readOnly
                    className="input flex-1"
                  />
                  <button className="btn btn-secondary">Copy</button>
                </div>
              </div>

              <button className="btn btn-outline w-full">
                Regenerate Keys
              </button>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Webhook URL</h2>
            <p className="text-slate-400 text-sm mb-4">
              Receive real-time notifications about call events
            </p>
            <input
              type="url"
              placeholder="https://your-app.com/webhooks/calls"
              className="input"
            />
            <button
              onClick={handleSave}
              className="btn btn-primary w-full mt-4"
            >
              Save Webhook URL
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
