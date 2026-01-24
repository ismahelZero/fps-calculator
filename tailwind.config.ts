import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Config>{
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      // 1. BRAND COLORS (Matches your Logo)
      colors: {
        primary: {
          DEFAULT: '#22D3EE', // Cyan-400 (The Logo Glow)
          dim: '#06B6D4', // Cyan-500 (Hover state)
          glow: 'rgba(34, 211, 238, 0.5)' // For box-shadows
        },
        secondary: {
          DEFAULT: '#6366F1', // Indigo-500 (The Logo Start)
          dim: '#4F46E5' // Indigo-600
        },
        // 2. BACKGROUNDS (Deep Space Theme)
        dark: {
          950: '#020617', // The Deepest Void
          900: '#0F172A', // Slate-900 (Your Logo BG)
          800: '#1E293B', // Slate-800 (Cards / Dropdowns)
          700: '#334155' // Borders
        },
        // 3. STATUS COLORS (Neon/Vibrant for Dark Mode)
        success: '#4ADE80', // Neon Green
        warning: '#FACC15', // Bright Yellow
        error: '#F472B6', // Neon Pink/Red (Cyberpunk style)
        info: '#60A5FA' // Sky Blue
      },
      // 4. TYPOGRAPHY
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Outfit', ...defaultTheme.fontFamily.sans]
      },
      // 5. CUSTOM SHADOWS (Neon Glows)
      boxShadow: {
        'neon-primary': '0 0 20px rgba(34, 211, 238, 0.3)',
        'neon-secondary': '0 0 20px rgba(99, 102, 241, 0.3)'
      }
    }
  }
}
