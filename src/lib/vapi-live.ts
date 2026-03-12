export type LiveCallEvent = {
  type: string
  callId?: string | null
  phoneNumber?: string | null
  transcript?: string | null
  sentiment?: string | null
  durationSeconds?: number | null
  startedAt?: string | null
  receivedAt: string
}

type Subscriber = (event: LiveCallEvent) => void

const subscribers = new Set<Subscriber>()

export function subscribeToLiveCalls(callback: Subscriber) {
  subscribers.add(callback)
  return () => {
    subscribers.delete(callback)
  }
}

export function publishLiveCallEvent(event: LiveCallEvent) {
  for (const subscriber of subscribers) {
    subscriber(event)
  }
}
