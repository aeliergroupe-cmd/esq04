'use client'

import { motion } from 'framer-motion'
import {
  Building2, Layers, Kanban, FileText,
  ShoppingBag, Ship, BarChart3, Sparkles,
} from 'lucide-react'

const FEATURES = [
  {
    icon: Building2,
    title: 'Supplier Intelligence',
    description: 'Comprehensive profiles for every mill, factory, and trader in your network. Tier ratings, certifications, capacity data.',
    tag: 'Directory',
  },
  {
    icon: Layers,
    title: 'Fabric Catalog',
    description: 'Search 50,000+ fabrics by composition, weight, certifications, and sustainability. AI-powered semantic search.',
    tag: 'Catalog',
  },
  {
    icon: Kanban,
    title: 'Sourcing CRM',
    description: 'Visual Kanban pipeline from Discovery to Delivered. Track every opportunity, contact, and relationship.',
    tag: 'CRM',
  },
  {
    icon: FileText,
    title: 'Quote Management',
    description: 'Issue RFQs, compare supplier quotes side-by-side, track approvals and negotiate terms in one place.',
    tag: 'Quotes',
  },
  {
    icon: ShoppingBag,
    title: 'Order Lifecycle',
    description: 'From sample to delivery. Real-time production status, QC checkpoints, and milestone tracking.',
    tag: 'Orders',
  },
  {
    icon: Ship,
    title: 'Logistics Visibility',
    description: 'Full shipment tracking with carrier integrations. Monitor ETA, customs clearance, and delivery events.',
    tag: 'Logistics',
  },
  {
    icon: BarChart3,
    title: 'Sourcing Analytics',
    description: 'Pipeline velocity, supplier performance, pricing trends, and regional sourcing intelligence dashboards.',
    tag: 'Analytics',
  },
  {
    icon: Sparkles,
    title: 'AI Sourcing Assistant',
    description: '"Find Italian mills producing lightweight wool-silk-linen under $42/m, MOQ below 500m." Natural language sourcing.',
    tag: 'AI',
  },
]

export function Features() {
  return (
    <section id="platform" className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-[0.2em] uppercase font-medium mb-3">
            Platform
          </p>
          <h2 className="text-display text-espresso mb-4">
            Everything you need to source
            <span className="block">at the highest level.</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto leading-relaxed">
            A complete operating system for luxury textile sourcing — from first supplier contact
            to fabric in your studio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="card-luxury-hover p-6 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors">
                  <Icon size={18} className="text-gold" />
                </div>
                <span className="badge-gold mb-3">{feature.tag}</span>
                <h3 className="font-medium text-espresso text-sm mb-2">{feature.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
