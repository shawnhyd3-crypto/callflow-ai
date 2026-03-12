'use client'

import { BarChart3, Phone, Clock, TrendingUp, AlertCircle } from 'lucide-react'

export default function DashboardPage() {
  // Mock data
  const stats = [
    {
      label: 'Total Calls This Month',
      value: '324',
      change: '+12%',
      icon: Phone,
    },
    {
      label: 'Average Call Duration',
      value: '3m 24s',
      change: '+5%',
      icon: Clock,
    },
    {
      label: 'Appointments Booked',
      value: '47',
      change: '+23%',
      icon: TrendingUp,
    },
    {
      label: 'Urgent Escalations',
      value: '12',
      change: '-8%',
      icon: AlertCircle,
    },
  ]

  const recentCalls = [
    {
      id: 1,
      caller: '+1 (555) 123-4567',
      duration: '4m 32s',
      status: 'completed',
      outcome: 'booked',
      time: '2 hours ago',
    },
    {
      id: 2,
      caller: '+1 (555) 234-5678',
      duration: '2m 15s',
      status: 'completed',
      outcome: 'handled',
      time: '3 hours ago',
    },
    {
      id: 3,
      caller: '+1 (555) 345-6789',
      duration: '5m 12s',
      status: 'completed',
      outcome: 'escalated',
      time: '4 hours ago',
    },
    {
      id: 4,
      caller: '+1 (555) 456-7890',
      duration: '1m 45s',
      status: 'missed',
      outcome: 'voicemail',
      time: '5 hours ago',
    },
  ]

  const agents = [
    {
      id: 1,
      name: 'Main Receptionist',
      status: 'active',
      callsToday: 45,
      template: 'General',
    },
    {
      id: 2,
      name: 'Appointment Scheduler',
      status: 'active',
      callsToday: 28,
      template: 'Appointment Booking',
    },
    {
      id: 3,
      name: 'Support Agent',
      status: 'inactive',
      callsToday: 0,
      template: 'FAQ Handler',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-slate-400">Welcome back! Here's your call activity overview.</p>
        </div>
        <button className="btn btn-primary">
          Create New Agent
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <Icon className="w-8 h-8 text-primary-500 opacity-50" />
              </div>
              <div className="text-sm text-emerald-400">{stat.change} from last month</div>
            </div>
          )
        })}
      </div>

      {/* Two Column Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Calls */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Calls</h2>
              <a href="/dashboard/calls" className="text-primary-400 hover:text-primary-300 text-sm">
                View all →
              </a>
            </div>

            <div className="space-y-4">
              {recentCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold">{call.caller}</p>
                    <p className="text-sm text-slate-400">{call.time}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold">{call.duration}</p>
                      <p className="text-xs text-slate-400">
                        {call.outcome === 'booked' && '📅 Booked'}
                        {call.outcome === 'handled' && '✓ Handled'}
                        {call.outcome === 'escalated' && '🔄 Escalated'}
                        {call.outcome === 'voicemail' && '📬 Voicemail'}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        call.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {call.status === 'completed' ? 'Completed' : 'Missed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Agents */}
        <div>
          <div className="card">
            <h2 className="text-xl font-bold mb-6">Active Agents</h2>

            <div className="space-y-4">
              {agents.map((agent) => (
                <div key={agent.id} className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{agent.name}</h3>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        agent.status === 'active' ? 'bg-emerald-500' : 'bg-slate-500'
                      }`}
                    ></span>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{agent.template}</p>
                  <p className="text-sm font-semibold text-primary-400">
                    {agent.callsToday} calls today
                  </p>
                </div>
              ))}
            </div>

            <button className="w-full btn btn-secondary mt-6">
              Manage Agents
            </button>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="card">
        <h2 className="text-xl font-bold mb-6">Monthly Usage</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-400">Minutes Used</span>
              <span className="font-semibold">234 / 500 minutes</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-600 to-accent-600 rounded-full"
                style={{ width: '47%' }}
              ></div>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            You have 266 minutes remaining. Upgrade to Pro for 500 minutes/month.
          </p>
        </div>
      </div>
    </div>
  )
}
