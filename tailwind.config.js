/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F5EF',
        foreground: '#191A17',
        primary: {
          DEFAULT: '#1F6B4F',
          dark: '#16503B',
          light: '#288864',
        },
        accent: {
          DEFAULT: '#E98B4A',
          hover: '#D47A3B',
        },
        secondary: {
          DEFAULT: '#A8C3A0',
          muted: '#8AA682',
        },
        surface: '#FFFFFF',
        border: '#DDE1DA',
      },
      fontFamily: {
        sans: [
          'Inter',
          'Noto Sans',
          'Noto Sans Devanagari',
          'Noto Sans Bengali',
          'Noto Sans Tamil',
          'Noto Sans Telugu',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'sans-serif'
        ],
        heading: [
          'Sora',
          'Noto Sans Devanagari',
          'Noto Sans Bengali',
          'Noto Sans Tamil',
          'Noto Sans Telugu',
          'system-ui',
          '-apple-system',
          'sans-serif'
        ],
      },
      maxWidth: {
        'container': '1120px',
      }
    },
  },
  plugins: [],
}
