import crypto from 'crypto'

export function generateReferralCode() {
  return crypto.randomBytes(4).toString('hex').toUpperCase()
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}
