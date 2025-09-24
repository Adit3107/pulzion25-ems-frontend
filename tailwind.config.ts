import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ['Montserrat', 'sans-serif'],
        headline: ['Orbitron', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: '#0B0C10', // deep dark background for immersion
        foreground: '#F5F5F5',
        primary: {
          DEFAULT: '#1E40AF', // Persian Blue – core AI gridlock color
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#9333EA', // Veronica – hacker/espionage accent
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: '#FACC15', // Jonquil – highlight/alerts
          foreground: '#000000',
        },
        success: {
          DEFAULT: '#69D84F', // SGBUS Green – decryption/mission success
          foreground: '#000000',
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      gradientColorStops: {
        ai: {
          start: '#1E40AF',
          mid: '#9333EA',
          end: '#FACC15',
        },
      },
      backgroundImage: {
        'ai-grid': 'linear-gradient(135deg, #1E40AF 0%, #9333EA 50%, #FACC15 100%)',
        'hacker-green': 'linear-gradient(135deg, #0B0C10 0%, #69D84F 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        'accordion-up': {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px #9333EA, 0 0 20px #1E40AF' },
          '50%': { boxShadow: '0 0 20px #FACC15, 0 0 40px #69D84F' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-glow': 'pulse-glow 3s infinite ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
