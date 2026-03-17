# Monitoring & Alerts

## Health check endpoint
- `GET /api/health` (returns 200 when DB OK, 503 otherwise)
- Status page: `/status`

## UptimeRobot
1. Create an UptimeRobot HTTP(S) monitor pointing to:
   - `https://<your-domain>/api/health`
2. Set timeout to 5–10 seconds.
3. Alerting:
   - Enable email/SMS/Slack notifications.
   - Set alert on 5xx or timeout.
4. Optional: create a second monitor for `/status` (page availability).

## Sentry
1. Create a Sentry project (Next.js).
2. Add environment variables:
   - `SENTRY_DSN` (server)
   - `NEXT_PUBLIC_SENTRY_DSN` (client)
3. Optional for source maps:
   - `SENTRY_AUTH_TOKEN`
   - `SENTRY_ORG`
   - `SENTRY_PROJECT`
4. Configure alerts in Sentry:
   - Errors: notify on new issues or spikes.
   - Performance: alert on p95 latency > 2s (or your baseline).

## Status page
- `/status` shows the live `/api/health` payload.
- For public sharing, add a link from marketing pages if desired.
