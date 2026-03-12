# Environment Variables

This project validates required runtime configuration in `src/lib/env.ts`.

## Required

| Variable | Purpose | Notes |
| --- | --- | --- |
| `POSTGRES_PRISMA_URL` | Prisma/Postgres connection URL | Required. `DATABASE_URL` is accepted as a fallback. |
| `NEXTAUTH_SECRET` | NextAuth signing secret | Generate with `openssl rand -base64 32`. |
| `NEXTAUTH_URL` | Canonical app URL | Used by NextAuth callbacks. |
| `VAPI_API_KEY` | Vapi API key | Required for assistant provisioning + calls. |
| `STRIPE_SECRET_KEY` | Stripe secret key | Used for billing + webhook handling. |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Client-side billing setup. |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Required for `/api/stripe/webhook`. |

## Optional

| Variable | Purpose | Notes |
| --- | --- | --- |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Only required if Google login is enabled. |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Only required if Google login is enabled. |
| `VAPI_WEBHOOK_SECRET` | Vapi webhook signature secret | If set, webhook requests must include `x-vapi-signature`. |
| `STRIPE_STARTER_PRICE_ID` | Stripe price ID for Starter | Required to sell the plan. |
| `STRIPE_PRO_PRICE_ID` | Stripe price ID for Pro | Required to sell the plan. |
| `STRIPE_BUSINESS_PRICE_ID` | Stripe price ID for Business | Required to sell the plan. |
| `ESTIMATED_APPOINTMENT_VALUE_CENTS` | Analytics revenue estimate | Defaults to `0` when unset. |
| `NEXT_PUBLIC_APP_URL` | App URL for portal return links | Falls back to `NEXTAUTH_URL`. |

## Local Setup

1. Copy `.env.example` to `.env`.
2. Fill in the required variables.
3. Run `npm run dev`.

## Vercel

Set variables in the Vercel dashboard or with the Vercel CLI.
Avoid committing generated `.env.vercel` files to git (they contain secrets).
