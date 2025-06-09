/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
colors: {
    gold: '#D4AF37', // for accents
    'neutral-950': '#0a0a0a', // ultra-dark background
  },
  fontFamily: {
    sans: ['Inter', 'sans-serif'],
  },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};

