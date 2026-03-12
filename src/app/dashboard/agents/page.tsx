'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Play, Square, Settings } from 'lucide-react'

export default function AgentsPage() {
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: 'Main Receptionist',
      status: 'active',
      template: 'General',
      callsThisMonth: 156,
      created: '2024-01-15',
      voiceId: 'aura-asteria-en',
    },
    {
      id: 2,
      name: 'Appointment Scheduler',
      status: 'active',
      template: 'Appointment Booking',
      callsThisMonth: 89,
      created: '2024-02-01',
      voiceId: 'aura-orion-en',
    },
    {
      id: 3,
      name: 'Support Agent',
      status: 'inactive',
      template: 'FAQ Handler',
      callsThisMonth: 0,
      created: '2024-01-20',
      voiceId: 'aura-lora-en',
    },
  ])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Agents</h1>
          <p className="text-slate-400">Manage and configure your AI phone agents.</p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create Agent</span>
        </button>
      </div>

      {/* Agent Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="card hover:border-primary-500/50 transition-colors">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold">{agent.name}</h3>
                <p className="text-sm text-slate-400">{agent.template}</p>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  agent.status === 'active'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-700 text-slate-400'
                }`}
              >
                {agent.status === 'active' ? '🟢 Active' : '⚪ Inactive'}
              </span>
            </div>

            {/* Stats */}
            <div className="space-y-2 mb-6 p-3 bg-slate-800/50 rounded">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Calls this month</span>
                <span className="font-semibold">{agent.callsThisMonth}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Voice</span>
                <span className="font-semibold text-primary-400">{agent.voiceId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Created</span>
                <span className="font-semibold">{agent.created}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 btn btn-secondary text-sm flex items-center justify-center space-x-1">
                {agent.status === 'active' ? (
                  <>
                    <Square className="w-4 h-4" />
                    <span>Stop</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Start</span>
                  </>
                )}
              </button>
              <button className="flex-1 btn btn-outline text-sm flex items-center justify-center space-x-1">
                <Settings className="w-4 h-4" />
                <span>Config</span>
              </button>
              <button className="btn btn-outline text-sm p-2">
                <Edit className="w-4 h-4" />
              </button>
              <button className="btn btn-outline text-sm p-2 text-red-400 hover:text-red-300">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Create New Card */}
        <div className="card border-dashed border-2 border-slate-700 hover:border-primary-600 transition-colors flex items-center justify-center min-h-48 cursor-pointer group">
          <div className="text-center">
            <Plus className="w-10 h-10 text-slate-500 group-hover:text-primary-500 mx-auto mb-3 transition-colors" />
            <p className="font-semibold group-hover:text-primary-400 transition-colors">
              Create New Agent
            </p>
            <p className="text-sm text-slate-500">Or choose from a template</p>
          </div>
        </div>
      </div>

      {/* Templates Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Agent Templates</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Plumber', emoji: '🔧' },
            { name: 'Dentist', emoji: '🦷' },
            { name: 'Restaurant', emoji: '🍽️' },
            { name: 'Salon', emoji: '✂️' },
          ].map((template, index) => (
            <button
              key={index}
              className="card text-center hover:border-primary-500/50 group transition-all"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                {template.emoji}
              </div>
              <p className="font-semibold group-hover:text-primary-400 transition-colors">
                {template.name}
              </p>
              <p className="text-xs text-slate-500 mt-2">Use template</p>
            </button>
          ))}
        </div>
      </div>

      {/* Configuration Help */}
      <div className="card bg-gradient-to-br from-primary-900/20 to-accent-900/20 border-primary-500/30">
        <h3 className="text-lg font-bold mb-2">💡 Quick Tips</h3>
        <ul className="space-y-2 text-sm text-slate-300">
          <li>✓ Choose an industry template to auto-configure your agent</li>
          <li>✓ Customize the system prompt to match your business needs</li>
          <li>✓ Test your agent with a sample call before going live</li>
          <li>✓ Monitor call analytics to improve agent performance</li>
        </ul>
      </div>
    </div>
  )
}
