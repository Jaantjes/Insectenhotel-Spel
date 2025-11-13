import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Dutch Harbor Theme Colors
        sea: {
          blue: "hsl(var(--sea-blue))",
          deep: "hsl(var(--sea-deep))",
          light: "hsl(var(--sea-light))",
        },
        wood: {
          light: "hsl(var(--wood-light))",
          medium: "hsl(var(--wood-medium))",
          dark: "hsl(var(--wood-dark))",
          border: "hsl(var(--wood-border))",
        },
        goods: {
          cheese: "hsl(var(--cheese-yellow))",
          butter: "hsl(var(--butter-cream))",
          egg: "hsl(var(--egg-brown))",
          tulip: "hsl(var(--tulip-red))",
          chocolate: "hsl(var(--chocolate-brown))",
          diamond: "hsl(var(--diamond-blue))",
          beer: "hsl(var(--beer-gold))",
          steel: "hsl(var(--steel-gray))",
        },
        glow: {
          dutch: "hsl(var(--dutch-glow))",
          belgian: "hsl(var(--belgian-glow))",
        },
        player: {
          dutch: "hsl(var(--player-dutch))",
          belgian: "hsl(var(--player-belgian))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "slide-piece": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        "highlight": {
          "0%": { backgroundColor: "hsl(var(--sea-light))", opacity: "0.3" },
          "100%": { backgroundColor: "hsl(var(--sea-blue))", opacity: "0.6" },
        },
        "ship-load": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-piece": "slide-piece 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "highlight": "highlight 0.3s ease-in-out infinite alternate",
        "ship-load": "ship-load 0.6s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
