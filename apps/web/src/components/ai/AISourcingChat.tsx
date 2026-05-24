'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, Building2, Layers, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  matches?: Array<{
    type: 'supplier' | 'fabric'
    name: string
    detail: string
    score: number
  }>
}

const EXAMPLE_QUERIES = [
  'Find Italian mills producing lightweight wool-silk-linen blends under $42/m with MOQ below 500m',
  'Show sustainable cashmere alternatives from South America with GOTS certification',
  'Which Tier 1 suppliers in Japan can deliver selvedge denim within 45 days?',
  'Recommend mills for SS26 resort collection using natural fibres under $30/m',
]

const MOCK_RESPONSES: Record<string, Message> = {
  default: {
    id: 'r1',
    role: 'assistant',
    content: `Based on your criteria, I found **3 matching suppliers** and **5 fabrics** that match your sourcing requirements. Here are my top recommendations:`,
    matches: [
      { type: 'supplier', name: 'Vitale Barberis Canonico', detail: 'Italy · Wool-Silk blends · €28–85/m · MOQ 300m', score: 97 },
      { type: 'supplier', name: 'Bouchier Textiles', detail: 'France · Silk-Wool Jersey · €22–65/m · MOQ 200m', score: 91 },
      { type: 'fabric', name: 'Silk-Wool Jersey 180gsm', detail: 'Bouchier Textiles · 60% Wool / 40% Silk · €38/m', score: 95 },
      { type: 'fabric', name: 'Superfine Merino Suiting', detail: 'VBC · 100% Merino · €52/m · MOQ 300m', score: 88 },
    ],
  },
}

export function AISourcingChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello, I'm your AI sourcing assistant. I can help you find suppliers, discover fabrics, and analyze market conditions across our global network.\n\nTry asking me something like: *"Find Italian mills producing lightweight wool-silk blends under $42/m"*`,
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (query: string) => {
    if (!query.trim()) return

    const userMsg: Message = {
      id: `u${Date.now()}`,
      role: 'user',
      content: query,
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    await new Promise((r) => setTimeout(r, 1200))

    const response: Message = {
      ...MOCK_RESPONSES.default,
      id: `a${Date.now()}`,
    }

    setMessages((prev) => [...prev, response])
    setLoading(false)
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className={cn('flex gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-gold-gradient flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles size={14} className="text-white" />
                </div>
              )}

              <div className={cn(
                'max-w-[80%] rounded-2xl px-5 py-4',
                message.role === 'user'
                  ? 'bg-espresso text-white rounded-tr-sm'
                  : 'bg-white border border-black/[0.06] shadow-luxury rounded-tl-sm'
              )}>
                <p className={cn(
                  'text-sm leading-relaxed whitespace-pre-line',
                  message.role === 'user' ? 'text-white' : 'text-espresso'
                )}>
                  {message.content}
                </p>

                {/* Matches */}
                {message.matches && message.matches.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {message.matches.map((match, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-ivory border border-black/[0.05] cursor-pointer hover:border-gold/30 hover:bg-gold/5 transition-all"
                      >
                        <div className={cn(
                          'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0',
                          match.type === 'supplier' ? 'bg-blue-50 text-blue-600' : 'bg-violet-50 text-violet-600'
                        )}>
                          {match.type === 'supplier' ? <Building2 size={13} /> : <Layers size={13} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-espresso truncate">{match.name}</p>
                          <p className="text-[10px] text-muted truncate">{match.detail}</p>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span className="text-[10px] font-semibold text-gold">{match.score}%</span>
                          <ArrowRight size={11} className="text-muted/50" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-gold-gradient flex items-center justify-center flex-shrink-0">
                <Sparkles size={14} className="text-white" />
              </div>
              <div className="bg-white border border-black/[0.06] shadow-luxury rounded-2xl rounded-tl-sm px-5 py-4">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-gold/60 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Example queries */}
      {messages.length <= 1 && (
        <div className="px-6 pb-4">
          <p className="text-xs text-muted mb-3">Try these examples:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {EXAMPLE_QUERIES.map((query) => (
              <button
                key={query}
                onClick={() => sendMessage(query)}
                className="text-left px-4 py-3 rounded-xl bg-white border border-black/[0.06] text-xs text-muted hover:border-gold/30 hover:text-espresso hover:bg-gold/5 transition-all"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-6 pb-6 pt-2 border-t border-black/[0.06]">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
            placeholder="Describe what you're sourcing…"
            className="flex-1 px-5 py-3.5 rounded-2xl border border-black/10 bg-white text-sm text-espresso placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/30 transition-all"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className={cn(
              'w-12 h-12 rounded-2xl flex items-center justify-center transition-all',
              input.trim() && !loading
                ? 'bg-gold text-white hover:bg-gold-dark active:scale-95'
                : 'bg-black/5 text-muted cursor-not-allowed'
            )}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
