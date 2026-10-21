/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#05070c',
          900: '#090d16',
          850: '#0e1320',
          800: '#141c2e',
          700: '#1e293b',
          600: '#334155',
        },
        brand: {
          cyan: '#06b6d4',
          indigo: '#6366f1',
          purple: '#8b5cf6',
          violet: '#7c3aed',
          pink: '#ec4899',
          emerald: '#10b981',
          amber: '#f59e0b',
          gold: '#fbbf24',
          coral: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.45)',
        'glow-amber': '0 0 35px -5px rgba(245, 158, 11, 0.45)',
        'glow-purple': '0 0 35px -5px rgba(139, 92, 246, 0.4)',
        'glow-emerald': '0 0 35px -5px rgba(16, 185, 129, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 7s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'shimmer': 'shimmer 2.5s infinite linear',
        'ray': 'ray 10s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(0.5deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(10px) rotate(-0.5deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        ray: {
          '0%': { transform: 'rotate(-5deg) scale(0.95)', opacity: '0.4' },
          '100%': { transform: 'rotate(5deg) scale(1.05)', opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
