const mockCreate = jest.fn()
const mockUpdate = jest.fn()
const mockDelete = jest.fn()
const mockFindUnique = jest.fn()

jest.mock('@/lib/prisma', () => ({
  prisma: {
    phoneAgent: {
      create: (...args: unknown[]) => mockCreate(...args),
      update: (...args: unknown[]) => mockUpdate(...args),
      delete: (...args: unknown[]) => mockDelete(...args),
      findUnique: (...args: unknown[]) => mockFindUnique(...args),
    },
  },
}))

import {
  createPhoneAgent,
  updatePhoneAgent,
  deletePhoneAgent,
  getPhoneAgent,
} from '@/lib/agents'

describe('phone agent CRUD', () => {
  it('creates an agent', async () => {
    mockCreate.mockResolvedValueOnce({ id: 'agent_1' })

    const agent = await createPhoneAgent({
      organizationId: 'org_1',
      name: 'New Agent',
      systemPrompt: 'Hello',
    })

    expect(agent).toEqual({ id: 'agent_1' })
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          organizationId: 'org_1',
          name: 'New Agent',
        }),
      })
    )
  })

  it('updates and deletes an agent', async () => {
    mockUpdate.mockResolvedValueOnce({ id: 'agent_1', name: 'Updated' })
    mockDelete.mockResolvedValueOnce({ id: 'agent_1' })

    const updated = await updatePhoneAgent('agent_1', { name: 'Updated' })
    const deleted = await deletePhoneAgent('agent_1')

    expect(updated).toEqual({ id: 'agent_1', name: 'Updated' })
    expect(deleted).toEqual({ id: 'agent_1' })
  })

  it('fetches an agent', async () => {
    mockFindUnique.mockResolvedValueOnce({ id: 'agent_1' })

    const agent = await getPhoneAgent('agent_1')
    expect(agent).toEqual({ id: 'agent_1' })
  })
})
