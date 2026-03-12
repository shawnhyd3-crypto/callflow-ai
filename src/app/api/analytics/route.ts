import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { env } from '@/lib/env'

const DAY_MS = 24 * 60 * 60 * 1000
const DEFAULT_RANGE_DAYS = 30

const POSITIVE_WORDS = ['great', 'good', 'thanks', 'thank you', 'awesome', 'love', 'perfect', 'excellent', 'amazing']
const NEGATIVE_WORDS = ['bad', 'terrible', 'angry', 'frustrated', 'upset', 'cancel', 'worst', 'hate', 'issue']

function parseDate(value: string | null, fallback: Date) {
  if (!value) return fallback
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? fallback : parsed
}

function toDateKey(value: Date) {
  return value.toISOString().slice(0, 10)
}

function sentimentScore(text: string | null | undefined) {
  if (!text) return 0
  const lower = text.toLowerCase()
  let score = 0
  for (const word of POSITIVE_WORDS) {
    if (lower.includes(word)) score += 1
  }
  for (const word of NEGATIVE_WORDS) {
    if (lower.includes(word)) score -= 1
  }
  if (score === 0) return 0
  return Math.max(-1, Math.min(1, score / 5))
}

function toCsv(rows: Array<Record<string, string | number | null>>) {
  if (!rows.length) return ''
  const headers = Object.keys(rows[0])
  const escape = (value: string | number | null) => {
    if (value === null || value === undefined) return ''
    const stringValue = String(value)
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`
    }
    return stringValue
  }

  const lines = [headers.join(',')]
  for (const row of rows) {
    lines.push(headers.map((header) => escape(row[header])).join(','))
  }
  return lines.join('\n')
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const startParam = url.searchParams.get('start')
  const endParam = url.searchParams.get('end')
  const format = url.searchParams.get('format')

  const now = new Date()
  const fallbackStart = new Date(now.getTime() - DEFAULT_RANGE_DAYS * DAY_MS)
  const start = parseDate(startParam, fallbackStart)
  const end = parseDate(endParam, now)

  const organization = await prisma.organization.findFirst()
  if (!organization) {
    return NextResponse.json({ error: 'No organization found.' }, { status: 404 })
  }

  const callLogs = await prisma.callLog.findMany({
    where: {
      organizationId: organization.id,
      startTime: {
        gte: start,
        lte: end,
      },
    },
    orderBy: { startTime: 'asc' },
  })

  if (format === 'csv') {
    const rows = callLogs.map((call) => ({
      startTime: call.startTime.toISOString(),
      endTime: call.endTime.toISOString(),
      durationSeconds: call.duration,
      status: call.status,
      outcome: call.outcome ?? '',
      phoneNumber: call.phoneNumber,
      agentId: call.agentId,
      organizationId: call.organizationId,
    }))

    const csv = toCsv(rows)
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="call-insights-${toDateKey(start)}-${toDateKey(end)}.csv"`,
      },
    })
  }

  const appointmentCount = await prisma.appointment.count({
    where: {
      organizationId: organization.id,
      appointmentTime: {
        gte: start,
        lte: end,
      },
    },
  })

  const totalCalls = callLogs.length
  const answeredCalls = callLogs.filter((call) => call.status === 'completed').length
  const totalDuration = callLogs.reduce((sum, call) => sum + call.duration, 0)
  const avgDuration = totalCalls > 0 ? totalDuration / totalCalls : 0
  const answerRate = totalCalls > 0 ? answeredCalls / totalCalls : 0

  const estimatedValue = env.ESTIMATED_APPOINTMENT_VALUE_CENTS ?? 0
  const revenueSavedCents = appointmentCount * (Number.isNaN(estimatedValue) ? 0 : estimatedValue)

  const outcomes = callLogs.reduce<Record<string, number>>((acc, call) => {
    const key = call.outcome ?? 'unknown'
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  const callsByDate = new Map<string, { count: number; duration: number; sentimentTotal: number }>()
  const heatmap = Array.from({ length: 7 }, () => Array.from({ length: 24 }, () => 0))

  for (const call of callLogs) {
    const dateKey = toDateKey(call.startTime)
    const current = callsByDate.get(dateKey) ?? { count: 0, duration: 0, sentimentTotal: 0 }
    const sentiment = sentimentScore(call.transcript)
    current.count += 1
    current.duration += call.duration
    current.sentimentTotal += sentiment
    callsByDate.set(dateKey, current)

    const day = call.startTime.getDay()
    const hour = call.startTime.getHours()
    heatmap[day][hour] += 1
  }

  const callVolume = Array.from(callsByDate.entries()).map(([date, data]) => ({
    date,
    calls: data.count,
  }))

  const handleTime = Array.from(callsByDate.entries()).map(([date, data]) => ({
    date,
    avgDuration: data.count > 0 ? data.duration / data.count : 0,
  }))

  const sentiment = Array.from(callsByDate.entries()).map(([date, data]) => ({
    date,
    score: data.count > 0 ? Number((data.sentimentTotal / data.count).toFixed(2)) : 0,
  }))

  const peakHours = heatmap.flatMap((row, day) =>
    row.map((count, hour) => ({ day, hour, count }))
  )

  return NextResponse.json({
    range: {
      start: start.toISOString(),
      end: end.toISOString(),
    },
    kpis: {
      totalCalls,
      answerRate,
      avgDuration,
      appointments: appointmentCount,
      revenueSavedCents,
    },
    charts: {
      callVolume,
      outcomes: Object.entries(outcomes).map(([name, value]) => ({ name, value })),
      peakHours,
      sentiment,
      handleTime,
    },
  })
}
