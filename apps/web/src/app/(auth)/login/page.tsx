'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Metadata } from 'next'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    window.location.href = '/dashboard'
  }

  return (
    <div>
      <h1 className="font-editorial text-3xl text-espresso mb-2">Welcome back</h1>
      <p className="text-sm text-muted mb-8">
        Sign in to your Nobility workspace.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-espresso mb-1.5">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@brand.com"
            required
            className="input-luxury w-full"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-espresso">
              Password
            </label>
            <a href="#" className="text-xs text-gold hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="input-luxury w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-espresso transition-colors"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full justify-center mt-2"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Sign in <ArrowRight size={14} />
            </span>
          )}
        </button>
      </form>

      <p className="text-xs text-center text-muted mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-gold hover:underline">
          Request access
        </Link>
      </p>

      <div className="mt-8 pt-6 border-t border-black/[0.06]">
        <p className="text-[10px] text-center text-muted/50">
          Demo credentials: demo@nobility.io / demo1234
        </p>
      </div>
    </div>
  )
}
