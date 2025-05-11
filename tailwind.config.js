/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 10px 2px rgba(6, 182, 212, 0.4)",
          },
          "50%": {
            boxShadow: "0 0 20px 4px rgba(6, 182, 212, 0.6)",
          },
        },
      },
      animation: {
        glow: "glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
