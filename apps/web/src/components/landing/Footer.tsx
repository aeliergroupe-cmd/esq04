export function Footer() {
  return (
    <footer className="bg-deep border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gold-gradient flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <span className="text-white font-semibold text-sm tracking-[0.08em] uppercase">Nobility</span>
              <span className="text-white/30 text-[10px] block tracking-[0.1em] uppercase -mt-0.5">Textile Platform</span>
            </div>
          </div>

          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Nobility. All rights reserved.
          </p>

          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <a key={link} href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
