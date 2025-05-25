import type {Config} from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Sugar Shane gold theme colors
        gold: {
          50: '#FFF9E5',
          100: '#FFF0BF',
          200: '#FFE180',
          300: '#FFD540',
          400: '#E5C158',
          500: '#D4AF37',
          600: '#BF9B2F',
          700: '#A37A00',
          800: '#7A5C00',
          900: '#523D00',
        },
        primary: {
          50: '#FFF9E5',
          100: '#FFF0BF',
          200: '#FFE180',
          300: '#FFD540',
          400: '#FFC700',
          500: '#E6B000',
          600: '#CC9900',
          700: '#A37A00',
          800: '#7A5C00',
          900: '#523D00',
        },
        gray: {
          950: '#0F0F0F',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
      },
      keyframes: {
        pulse: {
          '0%, 100%': {opacity: '1'},
          '50%': {opacity: '0.5'},
        },
        fadeIn: {
          '0%': {opacity: '0'},
          '100%': {opacity: '1'},
        },
        slideUp: {
          '0%': {transform: 'translateY(20px)', opacity: '0'},
          '100%': {transform: 'translateY(0)', opacity: '1'},
        },
        slideDown: {
          '0%': {transform: 'translateY(-20px)', opacity: '0'},
          '100%': {transform: 'translateY(0)', opacity: '1'},
        },
        slideInRight: {
          '0%': {transform: 'translateX(-20px)', opacity: '0'},
          '100%': {transform: 'translateX(0)', opacity: '1'},
        },
        slideInLeft: {
          '0%': {transform: 'translateX(20px)', opacity: '0'},
          '100%': {transform: 'translateX(0)', opacity: '1'},
        },
      },
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      boxShadow: {
        'soft-sm': '0 2px 4px rgba(0,0,0,0.05)',
        soft: '0 4px 6px rgba(0,0,0,0.05)',
        'soft-md': '0 6px 10px rgba(0,0,0,0.05)',
        'soft-lg': '0 10px 15px rgba(0,0,0,0.05)',
        highlight: '0 0 15px rgba(255, 199, 0, 0.5)',
        glow: '0 4px 20px rgba(212, 175, 55, 0.25)',
      },
    },
  },
  plugins: [],
} satisfies Config;