import { subscribeToLiveCalls } from '@/lib/vapi-live'

export async function GET(request: Request) {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    start(controller) {
      const send = (payload: string) => {
        controller.enqueue(encoder.encode(payload))
      }

      send('event: connected\n')
      send(`data: ${JSON.stringify({ status: 'ok' })}\n\n`)

      const unsubscribe = subscribeToLiveCalls((event) => {
        send(`data: ${JSON.stringify(event)}\n\n`)
      })

      const keepAlive = setInterval(() => {
        send('event: ping\n')
        send(`data: ${Date.now()}\n\n`)
      }, 15000)

      request.signal.addEventListener('abort', () => {
        clearInterval(keepAlive)
        unsubscribe()
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
