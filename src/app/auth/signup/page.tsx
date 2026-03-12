'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Mail, Lock, User, Building, ArrowRight } from 'lucide-react'
import { signIn } from 'next-auth/react'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    referralCode: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) return

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        company: formData.company,
        referralCode: formData.referralCode || undefined,
      }),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error ?? 'Unable to create account.')
      setIsLoading(false)
      return
    }

    await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      callbackUrl: '/dashboard',
    })

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-bold gradient-text">CallFlow AI</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Get Started Free</h1>
          <p className="text-slate-400">Start your 14-day trial. No credit card required.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card space-y-4">
          {/* Name */}
          <div>
            <label className="label">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="input pl-10"
                required
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="label">Company Name</label>
            <div className="relative">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                name="company"
                placeholder="Acme Services"
                value={formData.company}
                onChange={handleChange}
                className="input pl-10"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="label">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                name="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                className="input pl-10"
                required
              />
            </div>
          </div>

          {/* Referral Code */}
          <div>
            <label className="label">Referral Code (optional)</label>
            <input
              type="text"
              name="referralCode"
              placeholder="FRIEND123"
              value={formData.referralCode}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Password */}
          <div>
            <label className="label">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="input pl-10"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="label">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input pl-10"
                required
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          {/* Terms */}
          <label className="flex items-start space-x-3 text-sm">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-primary-600 mt-1"
              required
            />
            <span className="text-slate-400">
              I agree to the{' '}
              <a href="#" className="text-primary-400 hover:text-primary-300">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-400 hover:text-primary-300">
                Privacy Policy
              </a>
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !agreed}
            className="w-full btn btn-primary flex items-center justify-center space-x-2 mt-6"
          >
            <span>{isLoading ? 'Creating account...' : 'Create Account'}</span>
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-slate-400">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-primary-400 hover:text-primary-300 font-semibold">
              Sign in
            </Link>
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-8 space-y-3 text-sm text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="text-primary-400">✓</span>
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-primary-400">✓</span>
            <span>100 minutes included</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-primary-400">✓</span>
            <span>No credit card required</span>
          </div>
        </div>
      </div>
    </div>
  )
}
