/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0F',
        surface: '#111118',
        border: '#1E1E2E',
        accent: '#6C63FF',
        'accent-glow': 'rgba(108,99,255,0.2)',
        success: '#22D3A5',
        warning: '#F5A623',
        danger: '#FF4D6D',
        text: '#E8E8F0',
        muted: '#6B6B80',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'accent-glow': '0 0 20px rgba(108,99,255,0.2)',
        'danger-glow': '0 0 20px rgba(255,77,109,0.2)',
      },
      animation: {
        'spin-slow': 'spin 1.5s linear infinite',
      },
    },
  },
  plugins: [],
};
