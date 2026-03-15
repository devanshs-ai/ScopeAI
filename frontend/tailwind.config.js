/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#b38a23',
          light: '#d4a73d',
          dark: '#1a1811',
          muted: '#3d3421',
          accent: '#7b4c2b',
        },
        surface: {
          DEFAULT: '#121212',
          card: '#1a1a1a',
          input: '#242424',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      borderRadius: {
        custom: '4px',
      }
    },
  },
  plugins: [],
}
