import '@testing-library/jest-dom'

process.env.VAPI_API_KEY = process.env.VAPI_API_KEY ?? 'test-vapi-key'
process.env.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? 'sk_test_123'
process.env.STRIPE_STARTER_PRICE_ID = process.env.STRIPE_STARTER_PRICE_ID ?? 'price_starter'
process.env.STRIPE_PRO_PRICE_ID = process.env.STRIPE_PRO_PRICE_ID ?? 'price_pro'
process.env.STRIPE_BUSINESS_PRICE_ID = process.env.STRIPE_BUSINESS_PRICE_ID ?? 'price_business'
process.env.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? 'test-google-client'
process.env.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? 'test-google-secret'
