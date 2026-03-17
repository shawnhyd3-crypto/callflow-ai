import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev -- --hostname 127.0.0.1 --port 3000',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      VAPI_API_KEY: 'test-vapi-key',
      STRIPE_SECRET_KEY: 'sk_test_123',
      STRIPE_STARTER_PRICE_ID: 'price_starter',
      STRIPE_PRO_PRICE_ID: 'price_pro',
      STRIPE_BUSINESS_PRICE_ID: 'price_business',
      GOOGLE_CLIENT_ID: 'test-google-client',
      GOOGLE_CLIENT_SECRET: 'test-google-secret',
    },
  },
})
