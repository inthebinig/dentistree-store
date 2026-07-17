/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F7F2E7",
        "canvas-soft": "#EDE3CF",
        pine: {
          DEFAULT: "#1E4640",
          ink: "#12302B",
          50: "#EAF0EE",
        },
        steel: "#5B6B66",
        signal: {
          DEFAULT: "#C65B36",
          dark: "#A84A2B",
          light: "#F0DCCF",
        },
        line: "#CFE0C9",
        ink: "#241F1A",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["'Work Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(18,48,43,0.06), 0 8px 24px rgba(18,48,43,0.06)",
        "card-hover": "0 4px 8px rgba(18,48,43,0.08), 0 16px 32px rgba(18,48,43,0.10)",
      },
      keyframes: {
        draw: {
          to: { strokeDashoffset: 0 },
        },
        "fade-up": {
          from: { opacity: 0, transform: "translateY(10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        draw: "draw 900ms ease-out forwards",
        "fade-up": "fade-up 500ms ease-out forwards",
      },
    },
  },
  plugins: [],
};
