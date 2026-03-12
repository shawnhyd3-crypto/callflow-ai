'use client'

import { useEffect, useState } from 'react'

interface LiveEvent {
  type?: string
  transcript?: string | null
  phoneNumber?: string | null
}

export function DemoCallWidget() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [transcript, setTranscript] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [assistantReady, setAssistantReady] = useState(false)

  useEffect(() => {
    fetch('/api/demo')
      .then((res) => res.json())
      .then((data) => setAssistantReady(Boolean(data.assistantId)))
      .catch(() => setAssistantReady(false))
  }, [])

  useEffect(() => {
    const source = new EventSource('/api/vapi/live')
    source.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as LiveEvent
        if (data?.transcript) {
          setTranscript(data.transcript)
        }
      } catch {
        // ignore
      }
    }

    return () => {
      source.close()
    }
  }, [])

  async function startDemo() {
    if (!phoneNumber) return
    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Unable to start demo call')
      }
      setStatus('Call started. Answer your phone to hear the demo.')
    } catch (error: any) {
      setStatus(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card space-y-4">
      <h3 className="text-xl font-semibold">Try a live demo call</h3>
      <p className="text-slate-400">
        Enter your number to hear CallFlow AI handle a sample call. Limited to 3 demos per day.
      </p>

      {!assistantReady && (
        <p className="text-sm text-amber-400">
          Demo assistant not configured. Set VAPI_DEMO_ASSISTANT_ID to enable.
        </p>
      )}

      <div className="flex flex-col gap-3 md:flex-row">
        <input
          className="input flex-1"
          placeholder="+1 (555) 123-4567"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary"
          disabled={!assistantReady || loading}
          onClick={startDemo}
        >
          {loading ? 'Starting...' : 'Start demo call'}
        </button>
      </div>

      {status && <p className="text-sm text-slate-300">{status}</p>}

      {transcript && (
        <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-200">
          <p className="text-xs uppercase text-slate-500 mb-2">Live transcript</p>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  )
}
