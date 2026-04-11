/** @type {import('tailwindcss').Config} */
export default {
<<<<<<< HEAD
  darkMode: ["class"],
=======
  darkMode: "class",
>>>>>>> main
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
<<<<<<< HEAD
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
=======
        "on-tertiary-fixed": "#351000",
        "on-error": "#690005",
        "inverse-primary": "#494bd6",
        "surface-container-highest": "#31353b",
        "outline-variant": "#464555",
        "inverse-on-surface": "#2d3136",
        "surface-container-low": "#181c21",
        "secondary-container": "#00a2e6",
        "secondary": "#89ceff",
        "surface-bright": "#36393f",
        "on-primary": "#1000a9",
        "primary-fixed-dim": "#c0c1ff",
        "primary": "#c0c1ff",
        "surface-container": "#1c2025",
        "surface-tint": "#c0c1ff",
        "tertiary-fixed-dim": "#ffb695",
        "secondary-fixed": "#c9e6ff",
        "surface-dim": "#101419",
        "inverse-surface": "#e0e2ea",
        "surface-container-high": "#262a30",
        "on-secondary-fixed-variant": "#004c6e",
        "on-primary-fixed-variant": "#2f2ebe",
        "background": "#101419",
        "surface": "#101419",
        "secondary-fixed-dim": "#89ceff",
        "on-tertiary-fixed-variant": "#7b2f00",
        "on-error-container": "#ffdad6",
        "on-background": "#e0e2ea",
        "error-container": "#93000a",
        "tertiary-fixed": "#ffdbcc",
        "tertiary-container": "#a44100",
        "primary-container": "#4b4dd8",
        "outline": "#918fa1",
        "tertiary": "#ffb695",
        "surface-container-lowest": "#0a0e13",
        "on-secondary-fixed": "#001e2f",
        "error": "#ffb4ab",
        "on-secondary-container": "#00344e",
        "on-tertiary-container": "#ffd2be",
        "surface-variant": "#31353b",
        "on-surface-variant": "#c7c4d8",
        "primary-fixed": "#e1e0ff",
        "on-primary-container": "#d9d8ff",
        "on-tertiary": "#571f00",
        "on-surface": "#e0e2ea",
        "on-secondary": "#00344d",
        "on-primary-fixed": "#07006c"
      },
      fontFamily: {
        "headline": ["Inter"],
        "body": ["Inter"],
        "label": ["Inter"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem", 
        "lg": "0.5rem", 
        "xl": "0.75rem", 
        "full": "9999px"
      },
    },
  },
  plugins: [],
>>>>>>> main
}
