import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  VAPI_API_KEY: z.string().optional().default(''),
  VAPI_WEBHOOK_SECRET: z.string().optional(),
  VAPI_DEMO_ASSISTANT_ID: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional().default(''),
  STRIPE_PUBLISHABLE_KEY: z.string().optional().default(''),
  STRIPE_WEBHOOK_SECRET: z.string().optional().default(''),
  STRIPE_STARTER_PRICE_ID: z.string().optional(),
  STRIPE_PRO_PRICE_ID: z.string().optional(),
  STRIPE_BUSINESS_PRICE_ID: z.string().optional(),
  STRIPE_STARTER_METERED_PRICE_ID: z.string().optional(),
  STRIPE_PRO_METERED_PRICE_ID: z.string().optional(),
  STRIPE_BUSINESS_METERED_PRICE_ID: z.string().optional(),
  STRIPE_METERED_RATE_CENTS: z.coerce.number().optional(),
  STRIPE_TRIAL_DAYS: z.coerce.number().optional(),
  POSTGRES_PRISMA_URL: z.string().min(1),
  ESTIMATED_APPOINTMENT_VALUE_CENTS: z.coerce.number().optional().default(0),
})

type Env = z.infer<typeof envSchema>

const rawEnv: Record<string, string | undefined> = {
  ...process.env,
  POSTGRES_PRISMA_URL:
    process.env.POSTGRES_PRISMA_URL ?? process.env.DATABASE_URL,
  NEXT_PUBLIC_APP_URL:
    process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXTAUTH_URL,
}

export const env: Env = envSchema.parse(rawEnv)
