import axios, { type AxiosInstance } from 'axios'
import crypto from 'crypto'
import { env } from '@/lib/env'

let _vapiClient: AxiosInstance | null = null

function getVapiClient(): AxiosInstance {
  if (!env.VAPI_API_KEY) {
    throw new Error('Vapi is not configured. Set VAPI_API_KEY environment variable.')
  }
  if (!_vapiClient) {
    _vapiClient = axios.create({
      baseURL: 'https://api.vapi.ai',
      headers: {
        'Authorization': `Bearer ${env.VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })
  }
  return _vapiClient
}

const vapiClient = new Proxy({} as AxiosInstance, {
  get(_, prop) {
    return (getVapiClient() as any)[prop]
  },
})

export interface VapiAssistantConfig {
  name: string
  model: {
    provider: 'openai'
    model: 'gpt-3.5-turbo' | 'gpt-4'
    messages: Array<{
      role: 'system' | 'user' | 'assistant'
      content: string
    }>
  }
  voice: {
    provider: 'vapi'
    voiceId: string
  }
  firstMessageMode?: 'speak-first' | 'assistant-speaks-first'
  endCallMessage?: string
  endCallPhrases?: string[]
  maxDurationSeconds?: number
  hipaaEnabled?: boolean
  recordingEnabled?: boolean
  clientMessages?: Array<'hang-up' | 'transcript' | 'tool-calls' | 'function-calls'>
  serverMessages?: Array<'assistant-request' | 'end-of-call-report' | 'hang-up'>
}

export interface VapiPhoneNumberConfig {
  phoneNumber: string
  assistantId: string
  name?: string
  fallbackDestination?: string
  squadId?: string
}

export async function createAssistant(config: VapiAssistantConfig) {
  try {
    const response = await vapiClient.post('/assistant', config)
    return response.data
  } catch (error) {
    console.error('Error creating Vapi assistant:', error)
    throw error
  }
}

export async function updateAssistant(
  assistantId: string,
  config: Partial<VapiAssistantConfig>
) {
  try {
    const response = await vapiClient.patch(`/assistant/${assistantId}`, config)
    return response.data
  } catch (error) {
    console.error('Error updating Vapi assistant:', error)
    throw error
  }
}

export async function deleteAssistant(assistantId: string) {
  try {
    await vapiClient.delete(`/assistant/${assistantId}`)
  } catch (error) {
    console.error('Error deleting Vapi assistant:', error)
    throw error
  }
}

export async function getAssistant(assistantId: string) {
  try {
    const response = await vapiClient.get(`/assistant/${assistantId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching Vapi assistant:', error)
    throw error
  }
}

export async function listAssistants() {
  try {
    const response = await vapiClient.get('/assistant')
    return response.data
  } catch (error) {
    console.error('Error listing Vapi assistants:', error)
    throw error
  }
}

export async function createPhoneNumber(config: VapiPhoneNumberConfig) {
  try {
    const response = await vapiClient.post('/phone-number', config)
    return response.data
  } catch (error) {
    console.error('Error creating Vapi phone number:', error)
    throw error
  }
}

export async function deletePhoneNumber(phoneNumberId: string) {
  try {
    await vapiClient.delete(`/phone-number/${phoneNumberId}`)
  } catch (error) {
    console.error('Error deleting Vapi phone number:', error)
    throw error
  }
}

export async function getPhoneNumber(phoneNumberId: string) {
  try {
    const response = await vapiClient.get(`/phone-number/${phoneNumberId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching Vapi phone number:', error)
    throw error
  }
}

export async function listPhoneNumbers() {
  try {
    const response = await vapiClient.get('/phone-number')
    return response.data
  } catch (error) {
    console.error('Error listing Vapi phone numbers:', error)
    throw error
  }
}

export async function makeCall(phoneNumber: string, assistantId: string) {
  try {
    const response = await vapiClient.post('/call/phone', {
      phoneNumber,
      assistantId,
    })
    return response.data
  } catch (error) {
    console.error('Error making Vapi call:', error)
    throw error
  }
}

export async function getCall(callId: string) {
  try {
    const response = await vapiClient.get(`/call/${callId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching Vapi call:', error)
    throw error
  }
}

export function verifyWebhookSignature(
  signature: string | null,
  body: string,
  secret?: string
): boolean {
  if (!secret) return true
  if (!signature) return false

  const expected = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')

  const normalized = signature.startsWith('sha256=')
    ? signature.replace('sha256=', '')
    : signature

  try {
    return crypto.timingSafeEqual(
      Buffer.from(normalized, 'utf8'),
      Buffer.from(expected, 'utf8')
    )
  } catch {
    return false
  }
}

export const VAPI_VOICES = {
  'aura-asteria-en': 'Asteria (Female, Friendly)',
  'aura-orion-en': 'Orion (Male, Professional)',
  'aura-lora-en': 'Lora (Female, Calm)',
  'aura-shelby-en': 'Shelby (Female, Energetic)',
  'aura-skylar-en': 'Skylar (Female, Warm)',
}
