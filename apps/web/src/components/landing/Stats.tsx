'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

function CountUp({ end, prefix = '', suffix = '', decimals = 0 }: {
  end: number
  prefix?: string
  suffix?: string
  decimals?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const increment = end / steps
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + increment, end)
      setCount(current)
      if (current >= end) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, end])

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}
    </span>
  )
}

const STATS = [
  { value: 4.82, prefix: '$', suffix: 'B+', decimals: 2, label: 'Sourced annually', description: 'Total textile volume managed' },
  { value: 1200, suffix: '+', label: 'Global mills', description: 'Verified supplier network' },
  { value: 48, suffix: '', label: 'Countries', description: 'Cross-border trade coverage' },
  { value: 340, suffix: '+', label: 'Brands', description: 'Luxury fashion houses served' },
]

export function Stats() {
  return (
    <section className="py-20 bg-deep relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-3">The numbers</p>
          <h2 className="text-heading-xl text-white">
            The global standard for{' '}
            <span style={{
              background: 'linear-gradient(135deg, #B68A5A 0%, #D4A96A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>luxury sourcing</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-display text-white font-light mb-1" style={{
                background: 'linear-gradient(135deg, #B68A5A 0%, #D4A96A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                <CountUp
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>
              <p className="text-white/80 font-medium text-sm mb-1">{stat.label}</p>
              <p className="text-white/30 text-xs">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
