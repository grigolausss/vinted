/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        vinted: {
          teal: '#32b8c6',
          dark: '#1F2121',
          gray: {
            light: '#f5f5f5',
            medium: '#626C6C',
            dark: '#2D3535',
          },
          red: '#ff5459',
          green: '#22c55e',
          blue: '#3b82f6',
        }
      },
      fontFamily: {
        sans: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'apple': '8px',
        'apple-lg': '12px',
      },
      boxShadow: {
        'apple': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'apple-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}
