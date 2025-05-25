import type {Config} from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)',
        },
        // Legacy gold colors for backwards compatibility
        gold: {
          400: '#E5C158',
          500: '#D4AF37',
          600: '#BF9B2F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'},
        },
        slideUp: {
          '0%': {opacity: '0', transform: 'translateY(30px)'},
          '100%': {opacity: '1', transform: 'translateY(0)'},
        },
        scaleIn: {
          '0%': {opacity: '0', transform: 'scale(0.9)'},
          '100%': {opacity: '1', transform: 'scale(1)'},
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} satisfies Config;