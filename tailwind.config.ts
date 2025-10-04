import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette militar - extraída del theme.js original
        primary: {
          DEFAULT: '#2C3E2D', // Verde militar oscuro
          light: '#506C2C',    // Verde militar
          dark: '#1B2A1C',     // Verde muy oscuro
          blue: '#1d4ed8',
        },
        secondary: {
          DEFAULT: '#AFBD77', // Verde militar claro
          light: '#C8D591',
          dark: '#8FA055',
          blue: '#163ca3',
        },
        accent: {
          gold: '#D4AF37',    // Dorado militar
          bronze: '#CD7F32',
          beige: '#D2B48C',
        },
        military: {
          green: {
            50: '#f0f3e9',
            100: '#dde3cd',
            200: '#C8D591',
            300: '#AFBD77',
            400: '#8FA055',
            500: '#506C2C',
            600: '#2C3E2D',
            700: '#1B2A1C',
            800: '#141f15',
            900: '#0a120b',
          }
        }
      },
      fontFamily: {
        sans: ['"Roboto"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'hero-mobile': ['2.2rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        'military': '12px',
      },
      boxShadow: {
        'military': '0 4px 20px rgba(0,0,0,0.08)',
        'military-hover': '0 12px 40px rgba(0,0,0,0.15)',
        'military-strong': '0 8px 32px rgba(175, 189, 119, 0.4)',
      },
      backgroundImage: {
        'gradient-military': 'linear-gradient(135deg, #2C3E2D 0%, #1B2A1C 100%)',
        'gradient-military-light': 'linear-gradient(135deg, rgba(44, 62, 45, 0.95) 0%, rgba(80, 108, 44, 0.9) 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #AFBD77 0%, #8FA055 100%)',
        'gradient-overlay': 'linear-gradient(135deg, rgba(44, 62, 45, 0.7) 0%, rgba(27, 42, 28, 0.4) 100%)',
        'camo-pattern': 'var(--military-camo)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'fade-in-left': 'fadeInLeft 0.6s ease-out',
        'fade-in-right': 'fadeInRight 0.6s ease-out',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'glow': 'glow 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      backdropBlur: {
        'military': '20px',
      },
    },
  },
  plugins: [],
}

export default config
