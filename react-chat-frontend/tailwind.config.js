/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/ui-kit/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'text-color': 'var(--text-color)',
        'text-secondary-color': 'var(--text-secondary-color)',
        'background-color': 'var(--background-color)',
        'active-item-color': 'var(--active-item-color)',
        'icon-color': 'var(--icon-color)',
        'icon-hover-color': 'var(--icon-hover-color)',
        'border-color': 'var(--border-color)',
        'chat-hover-color': 'var(--chat-hover-color)',
        'chat-message-color': 'var(--chat-message-color)',
        'chat-message-own-color': 'var(--chat-message-own-color)',
        'chat-message-meta-color': 'var(--chat-message-meta-color)',
        'chat-message-own-meta-color': 'var(--chat-message-own-meta-color)',
        'chat-box-background-color': 'var(--chat-box-background-color)',
        'input-color': 'var(--input-color)',
        'input-secondary-color': 'var(--input-secondary-color)',
        'badge-color': 'var(--badge-color)',
        'badge-background-color': 'var(--badge-background-color)',
        'patern-color': 'var(--patern-color)',
        'modal-background': 'var(--modal-background)',
      },

      keyframes: {
        'toast-slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'toast-slide-bottom': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'toast-slide-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'toast-slide-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'toast-up': 'toast-slide-up 0.3s',
        'toast-bottom': 'toast-slide-bottom 0.3s',
        'toast-left': 'toast-slide-left 0.3s',
        'toast-right': 'toast-slide-right 0.3s',
      },
    },
  },
  plugins: [],
}
