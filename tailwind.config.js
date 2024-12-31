/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"], // Example: all HTML and JS files in the src folder
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        "nunito-sans": ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
