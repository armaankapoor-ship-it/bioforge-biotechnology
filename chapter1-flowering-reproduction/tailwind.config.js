export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        petal: '#ec4899',
        pollen: '#f59e0b',
        leaf: '#16a34a',
        ink: '#15231c',
        mint: '#8ef0bd',
        sky: '#38bdf8',
        plum: '#7c3aed',
        cream: '#fff8ed',
      },
      boxShadow: {
        soft: '0 24px 70px rgba(25, 45, 36, .12)',
        glow: '0 0 45px rgba(236, 72, 153, .25)',
      },
    },
  },
  plugins: [],
}
