'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
  })

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1400))
    setIsLoading(false)
    setStep('success')
  }

  if (step === 'success') {
    return (
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-5">
          <Check size={24} className="text-emerald-500" />
        </div>
        <h2 className="font-editorial text-2xl text-espresso mb-2">You&apos;re on the list</h2>
        <p className="text-sm text-muted mb-6">
          We&apos;ll review your request and reach out to <strong className="text-espresso">{form.email}</strong> within 24 hours with your workspace credentials.
        </p>
        <Link href="/login" className="btn-primary inline-flex">
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-editorial text-3xl text-espresso mb-2">Request access</h1>
      <p className="text-sm text-muted mb-8">
        Join 340+ luxury brands sourcing smarter.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-espresso mb-1.5">
              Full name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              placeholder="Alessandro Ricci"
              required
              className="input-luxury w-full"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-espresso mb-1.5">
              Company
            </label>
            <input
              type="text"
              value={form.company}
              onChange={handleChange('company')}
              placeholder="Brunello Cucinelli"
              required
              className="input-luxury w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-espresso mb-1.5">
            Work email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            placeholder="you@brand.com"
            required
            className="input-luxury w-full"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-espresso mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange('password')}
              placeholder="Min. 8 characters"
              required
              minLength={8}
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
              Creating account…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Request access <ArrowRight size={14} />
            </span>
          )}
        </button>
      </form>

      <p className="text-xs text-center text-muted mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-gold hover:underline">
          Sign in
        </Link>
      </p>

      <p className="text-[10px] text-center text-muted/50 mt-4">
        By requesting access you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  )
}
