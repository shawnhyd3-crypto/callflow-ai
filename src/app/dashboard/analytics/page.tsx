'use client'

import { Fragment, useEffect, useMemo, useState } from 'react'
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from 'recharts'
import { Download, CalendarRange } from 'lucide-react'

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#94a3b8']

function formatDuration(seconds: number) {
  if (!seconds || Number.isNaN(seconds)) return '0m 0s'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}m ${secs}s`
}

function formatDateInput(date: Date) {
  return date.toISOString().slice(0, 10)
}

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`
}

function intensityColor(value: number, max: number) {
  if (max === 0) return 'bg-slate-800'
  const ratio = value / max
  if (ratio > 0.75) return 'bg-primary-500'
  if (ratio > 0.5) return 'bg-primary-400/70'
  if (ratio > 0.25) return 'bg-primary-400/40'
  if (ratio > 0.1) return 'bg-primary-400/20'
  return 'bg-slate-800'
}

type AnalyticsResponse = {
  range: { start: string; end: string }
  kpis: {
    totalCalls: number
    answerRate: number
    avgDuration: number
    appointments: number
    revenueSavedCents: number
  }
  charts: {
    callVolume: Array<{ date: string; calls: number }>
    outcomes: Array<{ name: string; value: number }>
    peakHours: Array<{ day: number; hour: number; count: number }>
    sentiment: Array<{ date: string; score: number }>
    handleTime: Array<{ date: string; avgDuration: number }>
  }
}

export default function AnalyticsPage() {
  const today = useMemo(() => new Date(), [])
  const defaultStart = useMemo(() => new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), [])

  const [startDate, setStartDate] = useState(formatDateInput(defaultStart))
  const [endDate, setEndDate] = useState(formatDateInput(today))
  const [data, setData] = useState<AnalyticsResponse | null>(null)
  const [loading, setLoading] = useState(true)

  const maxHeatmapCount = useMemo(() => {
    if (!data) return 0
    return data.charts.peakHours.reduce((max, cell) => Math.max(max, cell.count), 0)
  }, [data])

  const heatmapMatrix = useMemo(() => {
    if (!data) return [] as Array<Array<number>>
    const matrix = Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => 0))
    data.charts.peakHours.forEach((cell) => {
      matrix[cell.day][cell.hour] = cell.count
    })
    return matrix
  }, [data])

  const loadData = async () => {
    setLoading(true)
    const params = new URLSearchParams({ start: startDate, end: endDate })
    const response = await fetch(`/api/analytics?${params.toString()}`)
    const payload = await response.json()
    setData(payload)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleExport = () => {
    const params = new URLSearchParams({ start: startDate, end: endDate, format: 'csv' })
    window.location.href = `/api/analytics?${params.toString()}`
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-slate-400">Deep insights into call performance, sentiment, and peak activity.</p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2">
            <CalendarRange className="w-4 h-4 text-slate-400" />
            <input
              type="date"
              className="bg-transparent text-sm text-slate-200"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
            <span className="text-slate-500">→</span>
            <input
              type="date"
              className="bg-transparent text-sm text-slate-200"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>
          <button className="btn btn-secondary" onClick={loadData}>
            Apply
          </button>
          <button className="btn btn-primary flex items-center gap-2" onClick={handleExport}>
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {loading || !data ? (
        <div className="card">Loading analytics...</div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="card">
              <p className="text-slate-400 text-sm mb-1">Total Calls</p>
              <p className="text-3xl font-bold">{data.kpis.totalCalls}</p>
            </div>
            <div className="card">
              <p className="text-slate-400 text-sm mb-1">Answer Rate</p>
              <p className="text-3xl font-bold">{formatPercent(data.kpis.answerRate)}</p>
            </div>
            <div className="card">
              <p className="text-slate-400 text-sm mb-1">Avg Duration</p>
              <p className="text-3xl font-bold">{formatDuration(data.kpis.avgDuration)}</p>
            </div>
            <div className="card">
              <p className="text-slate-400 text-sm mb-1">Appointments</p>
              <p className="text-3xl font-bold">{data.kpis.appointments}</p>
            </div>
            <div className="card">
              <p className="text-slate-400 text-sm mb-1">Revenue Saved</p>
              <p className="text-3xl font-bold">
                ${(data.kpis.revenueSavedCents / 100).toFixed(0)}
              </p>
              <p className="text-xs text-slate-500">Set ESTIMATED_APPOINTMENT_VALUE_CENTS to tune.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Call Volume</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.charts.callVolume}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip />
                    <Line type="monotone" dataKey="calls" stroke="#6366f1" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-bold mb-4">Outcomes</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.charts.outcomes} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90}>
                      {data.charts.outcomes.map((entry, index) => (
                        <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Peak Hours Heatmap</h2>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-[repeat(25,minmax(28px,1fr))] gap-1 text-xs text-slate-500">
                  <div></div>
                  {Array.from({ length: 24 }, (_, hour) => (
                    <div key={hour} className="text-center">
                      {hour}
                    </div>
                  ))}
                  {heatmapMatrix.map((row, day) => (
                    <Fragment key={`heatmap-${day}`}>
                      <div className="text-right pr-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day]}
                      </div>
                      {row.map((count, hour) => (
                        <div
                          key={`${day}-${hour}`}
                          className={`h-6 rounded ${intensityColor(count, maxHeatmapCount)}`}
                          title={`${count} calls`}
                        ></div>
                      ))}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-bold mb-4">Sentiment Trend</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.charts.sentiment}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis domain={[-1, 1]} stroke="#94a3b8" />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Handle Time</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.charts.handleTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="date" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip formatter={(value) => formatDuration(Number(value))} />
                  <Bar dataKey="avgDuration" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
