'use client'

import { motion } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote: 'Nobility transformed how we source fabrics. What used to take weeks of emails and spreadsheets now takes hours.',
    author: 'Creative Director',
    company: 'Luxury Fashion House, Milan',
    initials: 'CF',
  },
  {
    quote: 'The AI sourcing assistant is extraordinary. I described what I needed and it surfaced mills I\'d never found before.',
    author: 'Head of Sourcing',
    company: 'European Fashion Group, Paris',
    initials: 'HS',
  },
  {
    quote: 'Finally, a platform that feels as premium as the fabrics we source. Our team adopted it immediately.',
    author: 'Procurement Director',
    company: 'Global Textile Trader, London',
    initials: 'PD',
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-surface-2">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-[0.2em] uppercase font-medium mb-3">
            Testimonials
          </p>
          <h2 className="text-display text-espresso">
            Trusted by the world's{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #B68A5A 0%, #D4A96A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              finest brands.
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-luxury p-8"
            >
              <div className="text-gold text-4xl font-editorial leading-none mb-4">&ldquo;</div>
              <p className="text-espresso text-sm leading-relaxed mb-6 italic">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center text-white text-xs font-semibold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-espresso text-sm font-medium">{t.author}</p>
                  <p className="text-muted text-xs">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
