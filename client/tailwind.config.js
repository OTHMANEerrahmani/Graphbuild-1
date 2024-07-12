/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light Theme Colors
        lightPrimary: "#FEFAF6",
        lightSecondary: "#F6F5F2",
        lightBackground: "#FFF7F1",

        // Dark Theme Colors
        darkPrimary: "#41444B",
        darkSecondary: "#52575D",
        darkBackground: "#52575D",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
