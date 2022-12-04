/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#FFC914",
          300: "#F9AA61",
          200: "#FFB501",
          400: "#FFCECE",
          500: "#FFB4C1",
          600: "#997070",
          700: "#775454",
          800: "#893f0b",
          900: "#5a2907",
        },
        kggrey: {
          100: "#F2F2F2",
          200: "#9999A5",
          300: "#636363",
          400: "#3D3D3D",
          500: "#1A1A1A",
        },
      },
      fontFamily: {
        poppins: "Poppins, sans-serif",
        soulmaze: "MADE Soulmaze, Poppins",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
    },
  },
  plugins: [],
};
