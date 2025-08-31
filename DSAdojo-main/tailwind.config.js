/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#495867', // Muted Slate Blue
          dark: '#dbe3ec', // Misty Light Blue (for readability)
        },
        secondary: {
          light: '#577399', // Soft Steel Blue
          dark: '#3a4554', // Muted steel blue
        },
        accent: {
          light: '#fe5f55', // Warm Coral Red
          dark: '#ff6f64', // Slightly softer version of coral
        },
        accentLight: {
          light: '#bdd5ea', // Powdery Sky Blue
          dark: '#2c3442', // Slate Gray
        },
        background: {
          light: '#f7f7ff', // Almost White
          dark: '#1b1f2a', // Deep Charcoal
        },
        surface: {
          dark: '#2c3442', // Slate Gray
        },
        border: {
          dark: '#3a4554', // Muted steel blue
        },
        text: {
          primary: {
            light: '#495867',
            dark: '#dbe3ec',
          },
          secondary: {
            light: '#577399',
            dark: '#a8b6c8',
          },
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#0a0a0a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale': 'scale 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scale: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      gridTemplateColumns: {
        '53': 'repeat(53, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
};