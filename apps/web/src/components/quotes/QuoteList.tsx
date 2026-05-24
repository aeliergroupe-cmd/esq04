'use client'

import { motion } from 'framer-motion'
import { FileText, Clock, CheckCircle, XCircle, Send, AlertCircle } from 'lucide-react'
import { formatCurrency, formatDate, COUNTRY_FLAGS } from '@/lib/utils'
import { cn } from '@/lib/utils'

const MOCK_QUOTES = [
  {
    id: 'quo_01',
    referenceNo: 'RFQ-2025-0089',
    title: 'FW25 Suiting Fabrics — Lot 1',
    supplierName: 'Vitale Barberis Canonico',
    supplierCountry: 'Italy',
    status: 'RECEIVED',
    totalValue: 156000,
    currency: 'EUR',
    validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    items: 4,
  },
  {
    id: 'quo_02',
    referenceNo: 'RFQ-2025-0085',
    title: 'Como Silk Jacquard SS25',
    supplierName: 'Milan Collection Srl',
    supplierCountry: 'Italy',
    status: 'ACCEPTED',
    totalValue: 87000,
    currency: 'EUR',
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    items: 3,
  },
  {
    id: 'quo_03',
    referenceNo: 'RFQ-2025-0078',
    title: 'Baby Alpaca Resort Collection',
    supplierName: 'Incatops SA',
    supplierCountry: 'Peru',
    status: 'SENT',
    totalValue: undefined,
    currency: 'USD',
    validUntil: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    items: 2,
  },
  {
    id: 'quo_04',
    referenceNo: 'RFQ-2025-0071',
    title: 'Yorkshire Worsted Tweed FW25',
    supplierName: 'GB Textiles Ltd',
    supplierCountry: 'UK',
    status: 'DRAFT',
    totalValue: undefined,
    currency: 'GBP',
    validUntil: undefined,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    items: 6,
  },
  {
    id: 'quo_05',
    referenceNo: 'RFQ-2025-0060',
    title: 'Egyptian Cotton Shirting Core Program',
    supplierName: 'Albaz Fabric House',
    supplierCountry: 'Turkey',
    status: 'EXPIRED',
    totalValue: 18000,
    currency: 'USD',
    validUntil: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    items: 5,
  },
]

const STATUS_CONFIG = {
  DRAFT: { label: 'Draft', icon: FileText, badge: 'badge-slate' },
  SENT: { label: 'Sent', icon: Send, badge: 'badge-blue' },
  RECEIVED: { label: 'Received', icon: Clock, badge: 'badge-amber' },
  ACCEPTED: { label: 'Accepted', icon: CheckCircle, badge: 'badge-green' },
  REJECTED: { label: 'Rejected', icon: XCircle, badge: 'badge-red' },
  EXPIRED: { label: 'Expired', icon: AlertCircle, badge: 'badge-slate' },
}

export function QuoteList() {
  return (
    <div className="space-y-3">
      {MOCK_QUOTES.map((quote, i) => {
        const config = STATUS_CONFIG[quote.status as keyof typeof STATUS_CONFIG]
        const Icon = config?.icon || FileText
        const flag = COUNTRY_FLAGS[quote.supplierCountry] || '🌐'

        return (
          <motion.div
            key={quote.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
          >
            <div className="card-luxury p-5 hover:shadow-luxury-lg transition-all hover:-translate-y-0.5 cursor-pointer group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-ivory flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-muted" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono text-[11px] text-muted">{quote.referenceNo}</span>
                        <span className={cn('badge text-[10px]', config?.badge)}>
                          {config?.label}
                        </span>
                      </div>
                      <h3 className="font-semibold text-espresso text-sm group-hover:text-gold transition-colors">
                        {quote.title}
                      </h3>
                      <p className="text-xs text-muted mt-0.5">
                        {flag} {quote.supplierName} · {quote.items} items
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {quote.totalValue ? (
                        <p className="text-sm font-semibold text-espresso">
                          {formatCurrency(quote.totalValue, quote.currency, true)}
                        </p>
                      ) : (
                        <p className="text-sm text-muted">—</p>
                      )}
                      {quote.validUntil && (
                        <p className="text-[10px] text-muted mt-0.5">
                          Valid until {formatDate(quote.validUntil, 'MMM d')}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-[10px] text-muted/60 mt-1">
                    Created {formatDate(quote.createdAt, 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
