import { Download, Search } from 'lucide-react'
import { prisma } from '@/lib/prisma'

const PAGE_SIZE = 20

function formatDuration(seconds: number) {
  if (!seconds || Number.isNaN(seconds)) return '0m 0s'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}m ${secs}s`
}

function formatDateTime(date: Date) {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function parseDate(value?: string, endOfDay = false) {
  if (!value) return null
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return null
  if (endOfDay) {
    parsed.setHours(23, 59, 59, 999)
  } else {
    parsed.setHours(0, 0, 0, 0)
  }
  return parsed
}

export default async function CallsPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const org = await prisma.organization.findFirst()
  if (!org) {
    return (
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">Call Logs</h1>
        <p className="text-slate-400">No organization found. Complete onboarding to see call logs.</p>
      </div>
    )
  }

  const query = typeof searchParams?.q === 'string' ? searchParams.q.trim() : ''
  const status = typeof searchParams?.status === 'string' ? searchParams.status : 'all'
  const from = typeof searchParams?.from === 'string' ? searchParams.from : ''
  const to = typeof searchParams?.to === 'string' ? searchParams.to : ''
  const pageRaw = typeof searchParams?.page === 'string' ? searchParams.page : '1'
  const page = Math.max(Number.parseInt(pageRaw, 10) || 1, 1)

  const startTimeFilter: { gte?: Date; lte?: Date } = {}
  const fromDate = parseDate(from)
  const toDate = parseDate(to, true)
  if (fromDate) startTimeFilter.gte = fromDate
  if (toDate) startTimeFilter.lte = toDate

  const where: any = {
    organizationId: org.id,
  }

  if (Object.keys(startTimeFilter).length > 0) {
    where.startTime = startTimeFilter
  }

  if (status && status !== 'all') {
    where.status = status
  }

  if (query) {
    where.OR = [
      { phoneNumber: { contains: query, mode: 'insensitive' } },
      { agent: { name: { contains: query, mode: 'insensitive' } } },
    ]
  }

  const skip = (page - 1) * PAGE_SIZE

  const [callLogs, totalCount, avgDurationAgg, completedCount] = await Promise.all([
    prisma.callLog.findMany({
      where,
      include: { agent: true },
      orderBy: { startTime: 'desc' },
      take: PAGE_SIZE,
      skip,
    }),
    prisma.callLog.count({ where }),
    prisma.callLog.aggregate({ where, _avg: { duration: true } }),
    prisma.callLog.count({ where: { ...where, status: 'completed' } }),
  ])

  const totalPages = Math.max(Math.ceil(totalCount / PAGE_SIZE), 1)

  const calls = callLogs.map((call) => ({
    id: call.id,
    caller: call.phoneNumber,
    agent: call.agent?.name ?? 'Unknown',
    duration: formatDuration(call.duration),
    status: call.status,
    outcome: call.outcome ?? 'handled',
    date: formatDateTime(call.startTime),
  }))

  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const buildQuery = (overrides: Record<string, string | null>) => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (status && status !== 'all') params.set('status', status)
    if (from) params.set('from', from)
    if (to) params.set('to', to)
    params.set('page', page.toString())

    Object.entries(overrides).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key)
        return
      }
      params.set(key, value)
    })

    const paramString = params.toString()
    return paramString ? `?${paramString}` : ''
  }

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
        <form className="grid md:grid-cols-5 gap-4" method="get">
          <input type="hidden" name="page" value="1" />
          <div className="md:col-span-2">
            <label className="label">Search</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                name="q"
                placeholder="Search by phone number or agent name..."
                defaultValue={query}
                className="input pl-10"
              />
            </div>
          </div>

          <div>
            <label className="label">Status</label>
            <select name="status" defaultValue={status} className="input">
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="missed">Missed</option>
              <option value="voicemail">Voicemail</option>
            </select>
          </div>

          <div>
            <label className="label">From</label>
            <input type="date" name="from" defaultValue={from} className="input" />
          </div>

          <div>
            <label className="label">To</label>
            <input type="date" name="to" defaultValue={to} className="input" />
          </div>

          <div className="md:col-span-5 flex justify-end gap-3">
            <a href="/dashboard/calls" className="btn btn-secondary">
              Clear
            </a>
            <button type="submit" className="btn btn-primary">
              Apply Filters
            </button>
          </div>
        </form>
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
              {calls.map((call) => (
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
                      {call.status === 'completed' ? 'Completed' : call.status === 'missed' ? 'Missed' : 'Voicemail'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {call.outcome === 'booked' && '📅 Booked'}
                    {call.outcome === 'handled' && '✓ Handled'}
                    {call.outcome === 'escalated' && '🔄 Escalated'}
                    {call.outcome === 'voicemail' && '📬 Voicemail'}
                    {!['booked', 'handled', 'escalated', 'voicemail'].includes(call.outcome) && call.outcome}
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

        {calls.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No calls found matching your filters.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800">
            <p className="text-sm text-slate-400">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <a
                href={buildQuery({ page: String(Math.max(page - 1, 1)) })}
                className={`btn btn-secondary ${page === 1 ? 'pointer-events-none opacity-50' : ''}`}
              >
                Previous
              </a>
              <a
                href={buildQuery({ page: String(Math.min(page + 1, totalPages)) })}
                className={`btn btn-secondary ${page === totalPages ? 'pointer-events-none opacity-50' : ''}`}
              >
                Next
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Analytics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-slate-400 text-sm mb-2">Total Calls</h3>
          <p className="text-3xl font-bold">{totalCount}</p>
          <p className="text-sm text-emerald-400 mt-2">Matching filters</p>
        </div>
        <div className="card">
          <h3 className="text-slate-400 text-sm mb-2">Avg. Duration</h3>
          <p className="text-3xl font-bold">
            {formatDuration(avgDurationAgg._avg.duration ?? 0)}
          </p>
          <p className="text-sm text-slate-500 mt-2">Matching filters</p>
        </div>
        <div className="card">
          <h3 className="text-slate-400 text-sm mb-2">Completion Rate</h3>
          <p className="text-3xl font-bold">{completionRate}%</p>
          <p className="text-sm text-slate-500 mt-2">Matching filters</p>
        </div>
      </div>
    </div>
  )
}
