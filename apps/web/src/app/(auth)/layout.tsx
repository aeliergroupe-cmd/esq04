export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ivory flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-deep flex-col justify-between p-12">
        <div>
          <a href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
              <span className="text-white text-xs font-bold tracking-wider">N</span>
            </div>
            <span className="font-editorial text-xl text-white tracking-wide">NOBILITY</span>
          </a>
        </div>

        <div>
          <blockquote className="font-editorial text-3xl leading-snug text-white mb-6">
            "The Bloomberg Terminal for luxury textile sourcing."
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">A</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Alessandro Ricci</p>
              <p className="text-white/50 text-xs">Head of Sourcing, Brunello Cucinelli</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {[
            { value: '$4.82B', label: 'Volume sourced' },
            { value: '1,200+', label: 'Verified mills' },
            { value: '48', label: 'Countries' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-gold text-xl font-semibold">{stat.value}</p>
              <p className="text-white/50 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-7 h-7 rounded-lg bg-gold flex items-center justify-center">
              <span className="text-white text-xs font-bold">N</span>
            </div>
            <span className="font-editorial text-lg text-espresso tracking-wide">NOBILITY</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
