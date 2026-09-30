/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#2563EB",
          blueHover: "#1D4ED8",
          emerald: "#16A34A",
          emeraldHover: "#15803D",
          primary: "#16A34A",
        },
        risk: {
          critical: "#EF4444",
          criticalBg: "#FEE2E2",
          high: "#F97316",
          highBg: "#FFF7ED",
          medium: "#EAB308",
          mediumBg: "#FEFCE8",
          low: "#22C55E",
          lowBg: "#F0FDF4",
        },
        surface: {
          DEFAULT: "#F8FAFC",
          card: "#FFFFFF",
          dark: "#0B132B",
          darkElevated: "#1C2541",
        }
      },
      fontFamily: {
        heading: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
