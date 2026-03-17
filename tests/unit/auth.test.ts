const mockFindUnique = jest.fn()
const mockCompare = jest.fn()

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: (...args: unknown[]) => mockFindUnique(...args),
    },
  },
}))

jest.mock('bcryptjs', () => ({
  compare: (...args: unknown[]) => mockCompare(...args),
}))

import { authOptions } from '@/lib/auth'

describe('auth credentials authorize', () => {
  const provider = authOptions.providers.find((p) => p.id === 'credentials')

  if (!provider || typeof provider.authorize !== 'function') {
    throw new Error('Credentials provider not found')
  }

  it('returns user when credentials are valid', async () => {
    mockFindUnique.mockResolvedValueOnce({
      id: 'user_1',
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashed',
      image: null,
    })
    mockCompare.mockResolvedValueOnce(true)

    const result = await provider.authorize({
      email: 'test@example.com',
      password: 'password',
    })

    expect(result).toEqual({
      id: 'user_1',
      name: 'Test User',
      email: 'test@example.com',
      image: null,
    })
  })

  it('returns null when credentials are invalid', async () => {
    mockFindUnique.mockResolvedValueOnce(null)

    const result = await provider.authorize({
      email: 'missing@example.com',
      password: 'password',
    })

    expect(result).toBeNull()
  })
})
