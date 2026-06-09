/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'flick-bg':        '#0A0A0C',
        'flick-surface':   '#141416',
        'flick-elevated':  '#1E1E22',
        'flick-accent':    '#F5A623',
        'flick-accent-dim':'#C4841B',
        'flick-muted':     '#9CA3AF',
        'flick-dim':       '#6B7280',
        'rating-high':     '#22C55E',
        'rating-mid':      '#F59E0B',
        'rating-low':      '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
