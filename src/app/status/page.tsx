import { Suspense } from 'react'

async function getHealth() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? ''}/api/health`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      return { ok: false, status: res.status, body: await res.json().catch(() => null) }
    }
    return { ok: true, status: res.status, body: await res.json() }
  } catch (error) {
    return { ok: false, status: 500, body: { error: error instanceof Error ? error.message : 'Unknown error' } }
  }
}

async function StatusContent() {
  const health = await getHealth()

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold">System Status</h1>
      <p className="mt-2 text-sm text-slate-600">Live health check from /api/health.</p>
      <div className="mt-6 rounded border p-4">
        <div className="flex items-center gap-2">
          <span
            className={`h-3 w-3 rounded-full ${health.ok ? 'bg-emerald-500' : 'bg-red-500'}`}
          />
          <span className="font-medium">{health.ok ? 'Operational' : 'Degraded'}</span>
          <span className="text-xs text-slate-500">HTTP {health.status}</span>
        </div>
        <pre className="mt-4 overflow-x-auto rounded bg-slate-50 p-3 text-xs">
          {JSON.stringify(health.body, null, 2)}
        </pre>
      </div>
      <p className="mt-4 text-xs text-slate-500">
        Tip: configure UptimeRobot to monitor /api/health and alert on 5xx/timeout.
      </p>
    </div>
  )
}

export default function StatusPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading status…</div>}>
      <StatusContent />
    </Suspense>
  )
}
