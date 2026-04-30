/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          teal: '#41c3a8',
          darkTeal: '#2b967f',
          darkest: '#0a100d',
          dark: '#111b15',
          card: 'rgba(20, 35, 25, 0.4)',
          border: 'rgba(65, 195, 168, 0.2)',
          text: '#e2e8f0',
          textMuted: '#94a3b8'
        }
      }
    },
  },
  plugins: [],
}
