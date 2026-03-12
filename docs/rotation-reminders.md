# Secrets Rotation Reminders

These credentials were previously committed and should be rotated immediately:

- Vapi API key (`VAPI_API_KEY`)
- Stripe secret key + webhook secret (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`)
- Postgres credentials in `POSTGRES_PRISMA_URL`
- NextAuth secret (`NEXTAUTH_SECRET`)

## Suggested cadence

- Stripe + Vapi keys: every 90 days
- Postgres credentials: every 90–180 days
- NextAuth secret: every 180 days (or after any suspected exposure)

## Action checklist

1. Rotate the provider secret in the vendor dashboard.
2. Update Vercel project environment variables.
3. Update local `.env` for development.
4. Redeploy.
5. Verify login + billing + webhooks.
