const mockCreateSession = jest.fn()
const mockListSubscriptions = jest.fn()
const mockCancelSubscription = jest.fn()

jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    checkout: {
      sessions: {
        create: mockCreateSession,
      },
    },
    subscriptions: {
      list: mockListSubscriptions,
      cancel: mockCancelSubscription,
    },
  }))
})

import {
  createCheckoutSession,
  getCustomerSubscriptions,
  cancelSubscription,
  getPlanFromPriceId,
} from '@/lib/stripe'

describe('stripe billing flow', () => {
  it('creates a checkout session', async () => {
    mockCreateSession.mockResolvedValueOnce({ id: 'sess_123' })

    const session = await createCheckoutSession({
      organizationId: 'org_1',
      customerId: 'cust_1',
      plan: 'starter',
      successUrl: 'https://example.com/success',
      cancelUrl: 'https://example.com/cancel',
    })

    expect(session).toEqual({ id: 'sess_123' })
    expect(mockCreateSession).toHaveBeenCalledWith(
      expect.objectContaining({
        customer: 'cust_1',
        mode: 'subscription',
      })
    )
  })

  it('maps price ids to plans', () => {
    expect(getPlanFromPriceId('price_starter')).toBe('starter')
    expect(getPlanFromPriceId('unknown')).toBeNull()
  })

  it('lists and cancels subscriptions', async () => {
    mockListSubscriptions.mockResolvedValueOnce({ data: [] })
    mockCancelSubscription.mockResolvedValueOnce({ id: 'sub_1', status: 'canceled' })

    const subscriptions = await getCustomerSubscriptions('cust_1')
    const canceled = await cancelSubscription('sub_1')

    expect(subscriptions).toEqual([])
    expect(canceled).toEqual({ id: 'sub_1', status: 'canceled' })
  })
})
