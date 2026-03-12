import { NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export type RateLimitType = 'auth' | 'api' | 'webhook' | 'demo'

const redis = process.env.UPSTASH_REDIS_REST_URL ? Redis.fromEnv() : null

const limiters: Record<RateLimitType, Ratelimit> | null = redis
  ? {
      auth: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '1 m'),
        analytics: true,
      }),
      api: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(60, '1 m'),
        analytics: true,
      }),
      webhook: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(100, '1 m'),
        analytics: true,
      }),
      demo: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, '1 d'),
        analytics: true,
      }),
    }
  : null

function getClientKey(req: Request) {
  const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const ip = forwarded || req.headers.get('x-real-ip') || 'unknown'
  return ip
}

export async function rateLimit(req: Request, type: RateLimitType) {
  if (!limiters) {
    return null
  }

  const key = `${type}:${getClientKey(req)}`
  const { success, remaining, reset } = await limiters[type].limit(key)

  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000)
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
        },
      }
    )
  }

  return null
}
