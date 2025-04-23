/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(0, 0%, 10%)",
        dark: {
          background: "hsl(0, 0%, 10%)",
          foreground: "hsl(0, 0%, 100%)",
        },
      },
    },
  },
  plugins: [],
}
