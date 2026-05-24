'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Globe, Shield, Zap } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ivory">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #1E1B18 0px,
            #1E1B18 1px,
            transparent 1px,
            transparent 8px
          )`,
        }}
      />

      {/* Warm gradient orb */}
      <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] rounded-full bg-gold/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Trusted by leading fashion brands worldwide
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-display-lg text-espresso leading-[1.08] tracking-tight mb-6"
            >
              Your global
              <span className="block">sourcing</span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #B68A5A 0%, #D4A96A 50%, #9A7340 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                partner.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted leading-relaxed mb-10 max-w-lg"
            >
              Manage supplier relationships, track opportunities, and close
              sourcing deals seamlessly across the global textile ecosystem.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <Link
                href="/dashboard"
                className="btn-primary text-sm px-7 py-3.5 gap-2"
              >
                Explore the Platform
                <ArrowRight size={16} />
              </Link>
              <Link
                href="#platform"
                className="btn-secondary text-sm px-7 py-3.5"
              >
                Watch Demo
              </Link>
            </motion.div>

            {/* Feature list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-3"
            >
              {[
                { icon: Globe, text: 'Sourcing without borders' },
                { icon: Zap, text: 'Real-time updates' },
                { icon: Shield, text: 'Build stronger relationships' },
                { icon: ArrowRight, text: 'Track every opportunity' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-muted">
                  <Icon size={14} className="text-gold flex-shrink-0" />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gold/10 blur-[60px] rounded-full scale-75" />

            {/* Phone shell */}
            <div className="relative w-[280px] sm:w-[320px] rounded-[44px] bg-deep shadow-luxury-xl border border-white/10 overflow-hidden">
              {/* Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10" />

              {/* Screen */}
              <div className="pt-12 pb-8 px-5">
                {/* Status bar */}
                <div className="flex justify-between items-center mb-4 text-white/40 text-[10px]">
                  <span>9:41</span>
                  <span>●●●</span>
                </div>

                {/* App header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-white/50 text-[10px] mb-0.5">Welcome back</p>
                    <h3 className="text-white font-semibold text-sm">CRM Overview</h3>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-gold-gradient flex items-center justify-center text-white text-[10px] font-bold">
                    MF
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-5 bg-white/5 rounded-xl p-1">
                  {['Overview', 'Pipeline', 'Activity'].map((tab, i) => (
                    <button
                      key={tab}
                      className={`flex-1 text-[9px] py-1.5 rounded-lg font-medium transition-all ${
                        i === 0 ? 'bg-white/15 text-white' : 'text-white/40'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Pipeline summary */}
                <div className="mb-4">
                  <div className="flex justify-between text-[9px] text-white/40 mb-2">
                    <span>Pipeline Summary</span>
                    <span>This Quarter</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[
                      { label: 'Total Deals', value: '32' },
                      { label: 'In Progress', value: '18' },
                      { label: 'Negotiation', value: '7' },
                      { label: 'Closed Won', value: '5' },
                    ].map(({ label, value }) => (
                      <div key={label} className="text-center">
                        <p className="text-white text-sm font-semibold">{value}</p>
                        <p className="text-white/30 text-[8px] leading-tight">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-white/40 text-[9px] mb-0.5">Total Value</p>
                    <p className="text-gold text-base font-semibold">$3.62M</p>
                    <p className="text-emerald-400 text-[9px] mt-0.5">↑ 24% vs last quarter</p>
                  </div>
                </div>

                {/* Recent opportunities */}
                <div>
                  <div className="flex justify-between text-[9px] text-white/40 mb-2">
                    <span>Recent Opportunities</span>
                    <span className="text-gold">View All</span>
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { name: 'Italian Luxury Collection', company: 'Vitale Barberis Canonico', stage: 'Negotiation', value: '$320K' },
                      { name: 'Premium Worsted Program', company: 'Ross-Simons', stage: 'In Progress', value: '$140K' },
                      { name: 'Spring Summer 2025', company: 'MacArthur Wool Manufacturing', stage: 'In Progress', value: '$125K' },
                    ].map((opp) => (
                      <div key={opp.name} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                        <div className="w-6 h-6 rounded-lg bg-gold/20 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-[9px] font-medium truncate">{opp.name}</p>
                          <p className="text-white/40 text-[8px] truncate">{opp.stage}</p>
                        </div>
                        <span className="text-white/70 text-[9px] font-medium">{opp.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom nav */}
              <div className="flex justify-around px-4 pb-6 pt-2 border-t border-white/5">
                {['Dashboard', 'Contacts', 'Pipeline', 'Quotes', 'More'].map((tab, i) => (
                  <div key={tab} className="flex flex-col items-center gap-0.5">
                    <div className={`w-4 h-4 rounded ${i === 0 ? 'bg-gold' : 'bg-white/20'}`} />
                    <span className={`text-[7px] ${i === 0 ? 'text-gold' : 'text-white/30'}`}>{tab}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-ivory to-transparent pointer-events-none" />
    </section>
  )
}
