
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        "open-sans": ['"Open Sans"'],
        handwriting: ["Pacifico"],
      },
    },
  },
  plugins: [],
};