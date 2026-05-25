import { Header } from '@/components/layout/Header'
import { AISourcingChat } from '@/components/ai/AISourcingChat'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'AI Sourcing' }

export default function AISourcingPage() {
  return (
    <div className="flex flex-col h-full">
      <Header
        title="AI Sourcing Assistant"
        subtitle="Natural language sourcing — find the perfect fabric or supplier in seconds."
      />
      <div className="flex-1 overflow-hidden">
        <AISourcingChat />
      </div>
    </div>
  )
}
