/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          fg: 'hsl(var(--primary-fg))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          fg: 'hsl(var(--secondary-fg))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          fg: 'hsl(var(--destructive-fg))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          fg: 'hsl(var(--muted-fg))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          fg: 'hsl(var(--accent-fg))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          fg: 'hsl(var(--popover-fg))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          fg: 'hsl(var(--card-fg))',
        },
        glass: 'rgba(255, 255, 255, 0.1)',
        glassDark: 'rgba(0, 0, 0, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        '3d': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      animation: {
        'tilt-3d': 'tilt-3d 0.5s ease-in-out',
        shine: 'shine 0.5s ease-in-out',
      },
      keyframes: {
        'tilt-3d': {
          '0%, 100%': { transform: 'rotateX(0deg) rotateY(0deg)' },
          '50%': { transform: 'rotateX(5deg) rotateY(5deg)' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

