import { NextResponse } from 'next/server'

export function enforceCsrf(req: Request) {
  const origin = req.headers.get('origin')
  const host = req.headers.get('host')
  const allowedOrigin = process.env.NEXT_PUBLIC_APP_URL

  if (!origin) {
    return null
  }

  if (allowedOrigin && origin.startsWith(allowedOrigin)) {
    return null
  }

  if (host && origin.includes(host)) {
    return null
  }

  return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 })
}
