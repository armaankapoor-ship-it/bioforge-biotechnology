/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular'],
      },
      colors: {
        ink: '#10231c',
        leaf: '#166b4f',
        mint: '#b8f2dc',
        lime: '#d9f99d',
        coral: '#ff7f66',
        sky: '#8ed7ee',
      },
      boxShadow: {
        soft: '0 24px 70px rgba(21, 74, 57, 0.10)',
        glow: '0 0 60px rgba(56, 189, 148, 0.24)',
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        drift: 'drift 10s ease-in-out infinite',
        pulseSoft: 'pulseSoft 2.8s ease-in-out infinite',
      },
      keyframes: {
        float: {'0%,100%': {transform: 'translateY(0)'}, '50%': {transform: 'translateY(-12px)'}},
        drift: {'0%,100%': {transform: 'translate(0,0) rotate(0deg)'}, '50%': {transform: 'translate(12px,-18px) rotate(4deg)'}},
        pulseSoft: {'0%,100%': {opacity: '.55'}, '50%': {opacity: '1'}},
      },
    },
  },
  plugins: [],
}
