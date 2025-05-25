import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Product theme colors - easily customizable for different products
        primary: {
          50: "var(--color-primary-50, #FFF9E5)",
          100: "var(--color-primary-100, #FFF0BF)",
          200: "var(--color-primary-200, #FFE180)",
          300: "var(--color-primary-300, #FFD540)",
          400: "var(--color-primary-400, #FFC700)",
          500: "var(--color-primary-500, #E6B000)",
          600: "var(--color-primary-600, #CC9900)",
          700: "var(--color-primary-700, #A37A00)",
          800: "var(--color-primary-800, #7A5C00)",
          900: "var(--color-primary-900, #523D00)",
          DEFAULT: "var(--color-primary-500, #E6B000)",
          dark: "var(--color-primary-600, #CC9900)",
          light: "var(--color-primary-400, #FFC700)",
        },
        // Secondary color palette for accents
        secondary: {
          50: "var(--color-secondary-50, #E6F7FF)",
          100: "var(--color-secondary-100, #BAE7FF)",
          200: "var(--color-secondary-200, #91D5FF)",
          300: "var(--color-secondary-300, #69C0FF)",
          400: "var(--color-secondary-400, #40A9FF)",
          500: "var(--color-secondary-500, #1890FF)",
          600: "var(--color-secondary-600, #096DD9)",
          700: "var(--color-secondary-700, #0050B3)",
          800: "var(--color-secondary-800, #003A8C)",
          900: "var(--color-secondary-900, #002766)",
        },
        // Neutral color palette for text and backgrounds
        neutral: {
          50: "var(--color-neutral-50, #FAFAFA)",
          100: "var(--color-neutral-100, #F5F5F5)",
          200: "var(--color-neutral-200, #E5E5E5)",
          300: "var(--color-neutral-300, #D4D4D4)",
          400: "var(--color-neutral-400, #A3A3A3)",
          500: "var(--color-neutral-500, #737373)",
          600: "var(--color-neutral-600, #525252)",
          700: "var(--color-neutral-700, #404040)",
          800: "var(--color-neutral-800, #262626)",
          900: "var(--color-neutral-900, #171717)",
        },
        // Keep the original gold palette for backward compatibility
        gold: {
          50: "#FFF9E5",
          100: "#FFF0BF",
          200: "#FFE180",
          300: "#FFD540",
          400: "#FFC700",
          500: "#E6B000",
          600: "#CC9900",
          700: "#A37A00",
          800: "#7A5C00",
          900: "#523D00",
        },
      },
      fontFamily: {
        sans: ["Inter var", "Inter", "Helvetica Neue", "sans-serif"],
        display: ["Montserrat", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      maxWidth: {
        "8xl": "90rem",
      },
      boxShadow: {
        "soft-sm": "0 2px 4px rgba(0,0,0,0.05)",
        soft: "0 4px 6px rgba(0,0,0,0.05)",
        "soft-md": "0 6px 10px rgba(0,0,0,0.05)",
        "soft-lg": "0 10px 15px rgba(0,0,0,0.05)",
        highlight: "0 0 15px rgba(255, 199, 0, 0.5)",
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
} satisfies Config;