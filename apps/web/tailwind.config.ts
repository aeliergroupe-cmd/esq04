import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F3EE',
        espresso: '#1E1B18',
        muted: '#6E6258',
        gold: '#B68A5A',
        'gold-light': '#D4A96A',
        'gold-dark': '#9A7340',
        deep: '#221C17',
        'deep-2': '#2C2419',
        border: 'rgba(0,0,0,0.08)',
        surface: '#FFFFFF',
        'surface-2': '#FAF7F4',
        // Semantic
        background: '#F7F3EE',
        foreground: '#1E1B18',
      },
      fontFamily: {
        editorial: ['var(--font-editorial)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '400' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '400' }],
        'heading-xl': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '500' }],
        'heading-lg': ['1.5rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '500' }],
        'heading': ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'luxury': '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
        'luxury-lg': '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
        'luxury-xl': '0 8px 48px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        'gold': '0 0 0 1px rgba(182,138,90,0.3), 0 4px 16px rgba(182,138,90,0.12)',
        'inner-gold': 'inset 0 1px 0 rgba(182,138,90,0.2)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #B68A5A 0%, #D4A96A 50%, #9A7340 100%)',
        'ivory-gradient': 'linear-gradient(180deg, #F7F3EE 0%, #EDE8E2 100%)',
        'deep-gradient': 'linear-gradient(180deg, #221C17 0%, #1A1410 100%)',
        'wool-texture': "url('/textures/wool.jpg')",
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
