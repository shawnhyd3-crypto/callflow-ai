'use client'

import { Activity, BadgeCheck, PhoneCall, Timer } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

type LiveCallEvent = {
  type: string
  callId?: string | null
  phoneNumber?: string | null
  transcript?: string | null
  sentiment?: string | null
  durationSeconds?: number | null
  startedAt?: string | null
  receivedAt: string
}

type LiveCallState = {
  id: string
  phoneNumber?: string | null
  transcript: string
  sentiment?: string | null
  startedAt?: string | null
  durationSeconds?: number | null
  status: 'active' | 'ended' | 'unknown'
  lastUpdate: string
}

function formatDuration(totalSeconds: number) {
  const safeSeconds = Math.max(totalSeconds, 0)
  const mins = Math.floor(safeSeconds / 60)
  const secs = safeSeconds % 60
  return `${mins}m ${secs}s`
}

function formatTimestamp(value?: string | null) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  })
}

export default function LiveCallsPage() {
  const [calls, setCalls] = useState<Record<string, LiveCallState>>({})
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'live' | 'offline'>(
    'connecting'
  )
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const source = new EventSource('/api/vapi/live')

    source.onopen = () => {
      setConnectionStatus('live')
    }

    source.onerror = () => {
      setConnectionStatus('offline')
    }

    source.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as LiveCallEvent
        if (!payload?.callId) return

        setCalls((prev) => {
          const existing = prev[payload.callId] ?? {
            id: payload.callId as string,
            phoneNumber: payload.phoneNumber ?? null,
            transcript: '',
            sentiment: payload.sentiment ?? null,
            startedAt: payload.startedAt ?? null,
            durationSeconds: payload.durationSeconds ?? null,
            status: 'unknown' as const,
            lastUpdate: payload.receivedAt,
          }

          const status: LiveCallState['status'] =
            payload.type === 'call-started'
              ? 'active'
              : payload.type === 'call-ended'
                ? 'ended'
                : existing.status

          const transcript = payload.transcript
            ? existing.transcript
              ? `${existing.transcript}\n${payload.transcript}`
              : payload.transcript
            : existing.transcript

          return {
            ...prev,
            [payload.callId]: {
              ...existing,
              phoneNumber: payload.phoneNumber ?? existing.phoneNumber,
              transcript,
              sentiment: payload.sentiment ?? existing.sentiment,
              durationSeconds: payload.durationSeconds ?? existing.durationSeconds,
              startedAt: payload.startedAt ?? existing.startedAt,
              status,
              lastUpdate: payload.receivedAt,
            },
          }
        })
      } catch (error) {
        console.warn('Failed to parse live call event', error)
      }
    }

    return () => {
      source.close()
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setTick((value) => value + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  const sortedCalls = useMemo(() => {
    const values = Object.values(calls)
    return values.sort((a, b) => {
      if (a.status === 'active' && b.status !== 'active') return -1
      if (b.status === 'active' && a.status !== 'active') return 1
      return a.lastUpdate < b.lastUpdate ? 1 : -1
    })
  }, [calls])

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Live Call Monitoring</h1>
          <p className="text-slate-400 max-w-2xl">
            Real-time view of active calls, live transcripts, and customer sentiment powered by
            Vapi webhook streaming.
          </p>
        </div>
        <div className="card flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/10">
            <BadgeCheck className="h-5 w-5 text-primary-400" />
          </div>
          <div>
            <p className="text-sm text-slate-400">Growth/Scale Plan Feature</p>
            <p className="font-semibold text-white">Premium differentiator</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="card">
          <p className="text-sm text-slate-400">Connection</p>
          <div className="mt-2 flex items-center gap-2 text-lg font-semibold">
            <Activity
              className={`h-4 w-4 ${
                connectionStatus === 'live'
                  ? 'text-emerald-400'
                  : connectionStatus === 'connecting'
                    ? 'text-yellow-400'
                    : 'text-rose-400'
              }`}
            />
            {connectionStatus === 'live'
              ? 'Streaming'
              : connectionStatus === 'connecting'
                ? 'Connecting'
                : 'Offline'}
          </div>
        </div>
        <div className="card">
          <p className="text-sm text-slate-400">Active Calls</p>
          <p className="mt-2 text-3xl font-bold">
            {sortedCalls.filter((call) => call.status === 'active').length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-slate-400">Total Streaming Calls</p>
          <p className="mt-2 text-3xl font-bold">{sortedCalls.length}</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {sortedCalls.length === 0 && (
          <div className="card xl:col-span-2">
            <p className="text-slate-400">Waiting for live call events from Vapi...</p>
          </div>
        )}
        {sortedCalls.map((call) => {
          const startedAt = call.startedAt ? new Date(call.startedAt) : null
          const duration = startedAt
            ? Math.floor((Date.now() - startedAt.getTime()) / 1000)
            : call.durationSeconds ?? 0

          return (
            <div key={call.id} className="card space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">Call</p>
                  <h3 className="text-lg font-semibold">
                    {call.phoneNumber || 'Unknown caller'}
                  </h3>
                  <p className="text-xs text-slate-500">ID: {call.id}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    call.status === 'active'
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : call.status === 'ended'
                        ? 'bg-slate-700 text-slate-300'
                        : 'bg-yellow-500/15 text-yellow-400'
                  }`}
                >
                  {call.status === 'active' ? 'Live' : call.status === 'ended' ? 'Ended' : 'Updating'}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <PhoneCall className="h-4 w-4 text-primary-300" />
                  <span>Started {formatTimestamp(call.startedAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Timer className="h-4 w-4 text-primary-300" />
                  <span>Duration {formatDuration(duration)}</span>
                </div>
                <div className="text-sm text-slate-300">
                  Sentiment: <span className="font-semibold text-white">{call.sentiment ?? '—'}</span>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Live Transcript</p>
                <div className="mt-2 rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-sm text-slate-200 whitespace-pre-wrap min-h-[120px]">
                  {call.transcript || 'Waiting for transcript updates...'}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Last update {formatTimestamp(call.lastUpdate)}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
