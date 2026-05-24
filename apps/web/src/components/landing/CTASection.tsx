'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-24 bg-deep relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/10 blur-[80px] rounded-full" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gold text-xs tracking-[0.2em] uppercase font-medium mb-4">Get started</p>
          <h2 className="text-display text-white mb-6 leading-tight">
            The Bloomberg Terminal for
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #B68A5A 0%, #D4A96A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              luxury textile sourcing.
            </span>
          </h2>
          <p className="text-white/50 mb-10 leading-relaxed max-w-lg mx-auto">
            Join 340+ luxury fashion brands using Nobility to source smarter,
            build stronger supplier relationships, and accelerate production.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="btn-primary px-8 py-4 text-sm gap-2 shadow-gold"
            >
              Explore the Platform
              <ArrowRight size={16} />
            </Link>
            <button className="btn-secondary px-8 py-4 text-sm border-white/20 text-white bg-white/10 hover:bg-white/15">
              Book a Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
