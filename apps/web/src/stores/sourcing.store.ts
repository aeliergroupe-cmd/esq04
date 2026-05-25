import { create } from 'zustand'

interface SourcingMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  matches?: SourcingMatch[]
}

interface SourcingMatch {
  id: string
  name: string
  type: 'supplier' | 'fabric'
  country?: string
  confidence: number
  reason: string
  specs?: string
}

interface SourcingState {
  messages: SourcingMessage[]
  isLoading: boolean
  sessionId: string | null

  sendMessage: (content: string) => Promise<void>
  clearSession: () => void
  startNewSession: () => void
}

const MOCK_RESPONSES: Record<string, { content: string; matches?: SourcingMatch[] }> = {
  default: {
    content: "I've analyzed your request against our verified supplier network. Here are the best matches based on quality credentials, capacity, and your sourcing history:",
    matches: [
      {
        id: 'sup_01',
        name: 'Vitale Barberis Canonico',
        type: 'supplier',
        country: 'Italy',
        confidence: 97,
        reason: 'World-renowned for superfine wools, Tier 1 certified, proven delivery record',
        specs: 'Specialties: Wool, Cashmere · MOQ: 200m · Lead: 45 days',
      },
      {
        id: 'sup_02',
        name: 'Loro Piana',
        type: 'supplier',
        country: 'Italy',
        confidence: 91,
        reason: 'Unmatched baby cashmere and fine wool expertise, vertically integrated supply chain',
        specs: 'Specialties: Cashmere, Vicuña · MOQ: 500m · Lead: 60 days',
      },
      {
        id: 'sup_08',
        name: 'Incatops SA',
        type: 'supplier',
        country: 'Peru',
        confidence: 84,
        reason: 'Premier source for Baby Alpaca, GOTS certified, competitive MOQ for specialty fibers',
        specs: 'Specialties: Alpaca, Pima Cotton · MOQ: 100m · Lead: 55 days',
      },
    ],
  },
}

export const useSourcingStore = create<SourcingState>((set, get) => ({
  messages: [],
  isLoading: false,
  sessionId: null,

  sendMessage: async (content: string) => {
    const userMessage: SourcingMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    }

    set((state) => ({
      messages: [...state.messages, userMessage],
      isLoading: true,
      sessionId: state.sessionId ?? `session_${Date.now()}`,
    }))

    await new Promise((r) => setTimeout(r, 1400 + Math.random() * 800))

    const response = MOCK_RESPONSES['default']
    const assistantMessage: SourcingMessage = {
      id: `msg_${Date.now() + 1}`,
      role: 'assistant',
      content: response.content,
      timestamp: new Date().toISOString(),
      matches: response.matches,
    }

    set((state) => ({
      messages: [...state.messages, assistantMessage],
      isLoading: false,
    }))
  },

  clearSession: () =>
    set({ messages: [], sessionId: null, isLoading: false }),

  startNewSession: () =>
    set({ messages: [], sessionId: `session_${Date.now()}`, isLoading: false }),
}))
