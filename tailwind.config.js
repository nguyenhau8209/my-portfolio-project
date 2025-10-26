/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        },
        secondary: '#64748b',
        accent: '#f59e0b',
        background: '#ffffff',
        surface: '#f8fafc',
        'text-primary': '#1e293b',
        'text-secondary': '#64748b',
        border: '#e2e8f0',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
      },
      fontFamily: {
        primary: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
