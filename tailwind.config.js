/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1A2744",
          light: "#243460",
          dark: "#111B33",
        },
        orange: {
          brand: "#F47920",
          light: "#FF9A45",
          dark: "#D4660E",
        },
        silver: {
          DEFAULT: "#8E9BB0",
          light: "#C8D0DC",
          lightest: "#F0F3F7",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
