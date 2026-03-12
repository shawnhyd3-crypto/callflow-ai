'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { signIn } from 'next-auth/react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/dashboard',
    })

    if (result?.error) {
      setError('Invalid email or password.')
    }

    if (result?.ok) {
      window.location.href = '/dashboard'
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-2xl font-bold gradient-text">CallFlow AI</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card space-y-4">
          {/* Email */}
          <div>
            <label className="label">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-10"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="label">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-10"
                required
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-primary-600"
              />
              <span className="text-slate-400">Remember me</span>
            </label>
            <a href="#" className="text-primary-400 hover:text-primary-300">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn btn-primary flex items-center justify-center space-x-2 mt-6"
          >
            <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full btn btn-secondary"
          >
            Continue with Google
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-slate-400">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-primary-400 hover:text-primary-300 font-semibold">
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-slate-800/50 rounded-lg text-center text-sm text-slate-400 border border-slate-700">
          <p className="mb-2">Demo Credentials</p>
          <p>Email: demo@example.com</p>
          <p>Password: demo123</p>
        </div>
      </div>
    </div>
  )
}
