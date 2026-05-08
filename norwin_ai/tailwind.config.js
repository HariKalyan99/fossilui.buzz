import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0B0F',
        surface: '#121217',
        surface2: '#17171F',
        border: '#23232C',
        text: '#E5E7EB',
        muted: '#9CA3AF',
        primary: {
          DEFAULT: '#6366F1',
          50: '#EEF0FF',
          100: '#E0E4FF',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
        },
        secondary: {
          DEFAULT: '#06B6D4',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        container: '1280px',
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #6366F1 0%, #06B6D4 100%)',
        'grad-soft': 'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(6,182,212,0.18) 100%)',
        'grid-faint':
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(99,102,241,0.45)',
        'glow-cyan': '0 0 40px -10px rgba(6,182,212,0.45)',
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 10px 30px -15px rgba(0,0,0,0.6)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(99,102,241,0.35)' },
          '50%': { boxShadow: '0 0 0 12px rgba(99,102,241,0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s linear infinite',
        float: 'float 5s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.2s ease-out infinite',
      },
    },
  },
  plugins: [forms, typography],
};
