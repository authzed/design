import type { Config } from 'tailwindcss';

// Sandworm palette ramps — every stop resolves to the HSL vars in globals.css.
// Without these, raw classes like `bg-stone-950` silently fall through to
// Tailwind's BUILT-IN stone (a warm gray — the exact wash the spec bans).
const STOPS = ['025', '050', '100', '150', '200', '300', '400', '500', '600', '700', '800', '850', '900', '950', '975'] as const;
const ramp = (family: string) =>
  Object.fromEntries(STOPS.map((s) => [s, `hsl(var(--${family}-${s}))`]));

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sandworm family ramps (override Tailwind defaults — see note above)
        stone: ramp('stone'),
        magenta: ramp('magenta'),
        sand: ramp('sand'),
        teal: ramp('teal'),
        red: ramp('red'),
        violet: ramp('violet'),
        blue: ramp('blue'),
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        error: {
          DEFAULT: 'hsl(var(--error))',
          foreground: 'hsl(var(--error-foreground))',
        },
        creative: {
          DEFAULT: 'hsl(var(--creative))',
          foreground: 'hsl(var(--creative-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        glow: {
          '0%': { 
            filter: 'brightness(100%) blur(0px)',
            boxShadow: '0 0 0 0 rgba(255,255,255,0)'
          },
          '50%': { 
            filter: 'brightness(150%) blur(1px)',
            boxShadow: '0 0 20px 2px rgba(255,255,255,0.3)'
          },
          '100%': { 
            filter: 'brightness(100%) blur(0px)',
            boxShadow: '0 0 0 0 rgba(255,255,255,0)'
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow": "glow 2s ease-in-out infinite"
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;