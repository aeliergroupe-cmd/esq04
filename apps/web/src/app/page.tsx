import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { Stats } from '@/components/landing/Stats'
import { Testimonials } from '@/components/landing/Testimonials'
import { CTASection } from '@/components/landing/CTASection'
import { LandingNav } from '@/components/landing/LandingNav'
import { Footer } from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <LandingNav />
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  )
}
