const mockPost = jest.fn()
const mockGet = jest.fn()
const mockPatch = jest.fn()
const mockDelete = jest.fn()

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    post: mockPost,
    get: mockGet,
    patch: mockPatch,
    delete: mockDelete,
  })),
}))

describe('vapi client', () => {
  beforeEach(() => {
    jest.resetModules()
    mockPost.mockReset()
    mockGet.mockReset()
    mockPatch.mockReset()
    mockDelete.mockReset()
  })

  it('creates an assistant', async () => {
    mockPost.mockResolvedValueOnce({ data: { id: 'assistant_1' } })

    const { createAssistant } = await import('@/lib/vapi')

    const result = await createAssistant({
      name: 'Test Assistant',
      model: {
        provider: 'openai',
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'Hello' }],
      },
      voice: {
        provider: 'vapi',
        voiceId: 'aura-asteria-en',
      },
    })

    expect(result).toEqual({ id: 'assistant_1' })
    expect(mockPost).toHaveBeenCalledWith('/assistant', expect.any(Object))
  })
})
