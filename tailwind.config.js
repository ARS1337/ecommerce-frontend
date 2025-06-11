/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // adjust to your project structure
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Core dark theme colors
        background: "#0e0e0e",
        surface: "#1a1a1a",
        card: "#1f1f1f",
        border: "#2c2c2c",

        // Accents
        gold: "#d4af37",
        silver: "#c0c0c0",

        // Text colors
        primaryText: "#f5f5f5",
        secondaryText: "#a0a0a0",

        // Actions
        highlight: "#ffd700",
        danger: "#ff4d4f",
        success: "#4caf50",
      },
      fontFamily: {
        sans: ["'Inter'", "sans-serif"], // Replace with your brand font
        mono: ["'Space Mono'", "monospace"],
      },
      boxShadow: {
        gold: "0 0 10px 2px rgba(212, 175, 55, 0.4)",
        subtle: "0 2px 10px rgba(0, 0, 0, 0.6)",
      },
      borderRadius: {
        xl: "1rem",
        '2xl': "1.5rem",
      },
      spacing: {
        'card': '1.25rem',
      },
    },
  },
  plugins: [],
};
