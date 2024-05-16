/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#983ce4",
        secondary: "#18141c",
        tertiary: "#100c0c",
        quaternary: "#222222",
        quinary: "#383434",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      "2xs": "320px",
      xs: "480px",
      sm: "620px",
      md: "768px",
      lg: "1060px",
      xl: "1200px",
      "2xl": "1700px",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
