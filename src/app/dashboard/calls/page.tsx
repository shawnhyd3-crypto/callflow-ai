'use client'

import { useState } from 'react'
import { Search, Download, Filter } from 'lucide-react'

export default function CallsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const calls = [
    {
      id: 1,
      caller: '+1 (555) 123-4567',
      agent: 'Main Receptionist',
      duration: '4m 32s',
      status: 'completed',
      outcome: 'booked',
      date: '2024-03-12 14:32',
      transcript:
        'Customer called to book an appointment for next Tuesday. Agent confirmed time slot.',
    },
    {
      id: 2,
      caller: '+1 (555) 234-5678',
      agent: 'Support Agent',
      duration: '2m 15s',
      status: 'completed',
      outcome: 'handled',
      date: '2024-03-12 13:15',
      transcript:
        'Customer asked about business hours. Agent provided information and directed to website.',
    },
    {
      id: 3,
      caller: '+1 (555) 345-6789',
      agent: 'Main Receptionist',
      duration: '5m 12s',
      status: 'completed',
      outcome: 'escalated',
      date: '2024-03-12 11:45',
      transcript:
        'Complex billing inquiry. Agent escalated to human support team.',
    },
    {
      id: 4,
      caller: '+1 (555) 456-7890',
      agent: 'Appointment Scheduler',
      duration: '1m 45s',
      status: 'missed',
      outcome: 'voicemail',
      date: '2024-03-11 18:20',
      transcript: 'Customer left voicemail requesting callback.',
    },
    {
      id: 5,
      caller: '+1 (555) 567-8901',
      agent: 'Main Receptionist',
      duration: '3m 28s',
      status: 'completed',
      outcome: 'booked',
      date: '2024-03-11 16:05',
      transcript:
        'Appointment booking for Friday at 2 PM. Confirmed customer details.',
    },
  ]

  const filteredCalls = calls.filter((call) => {
    const matchesSearch =
      call.caller.includes(searchTerm) ||
      call.agent.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || call.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Call Logs</h1>
          <p className="text-slate-400">View and analyze all incoming calls.</p>
        </div>
        <button className="btn btn-primary flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="label">Search</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search by phone number or agent name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="label">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="missed">Missed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Calls Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">
                  Caller
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">
                  Agent
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">
                  Outcome
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCalls.map((call) => (
                <tr
                  key={call.id}
                  className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold">{call.caller}</td>
                  <td className="px-6 py-4 text-slate-300">{call.agent}</td>
                  <td className="px-6 py-4 text-slate-300 text-sm">{call.date}</td>
                  <td className="px-6 py-4 font-semibold">{call.duration}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        call.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {call.status === 'completed' ? 'Completed' : 'Missed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {call.outcome === 'booked' && '📅 Booked'}
                    {call.outcome === 'handled' && '✓ Handled'}
                    {call.outcome === 'escalated' && '🔄 Escalated'}
                    {call.outcome === 'voicemail' && '📬 Voicemail'}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-primary-400 hover:text-primary-300 text-sm font-semibold">
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCalls.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No calls found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Analytics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-slate-400 text-sm mb-2">Total Calls</h3>
          <p className="text-3xl font-bold">
            {calls.length}
          </p>
          <p className="text-sm text-emerald-400 mt-2">This month</p>
        </div>
        <div className="card">
          <h3 className="text-slate-400 text-sm mb-2">Avg. Duration</h3>
          <p className="text-3xl font-bold">3m 46s</p>
          <p className="text-sm text-slate-500 mt-2">All calls</p>
        </div>
        <div className="card">
          <h3 className="text-slate-400 text-sm mb-2">Completion Rate</h3>
          <p className="text-3xl font-bold">80%</p>
          <p className="text-sm text-slate-500 mt-2">Successful calls</p>
        </div>
      </div>
    </div>
  )
}
