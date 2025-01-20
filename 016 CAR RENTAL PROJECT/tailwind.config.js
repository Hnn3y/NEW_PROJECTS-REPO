/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{html,js}"], 
  theme: {
    extend: {
      fontFamily: {
        'bricolage': ['Bricolage Grotesque', 'sans-serif'],
      },
    },
  },
  plugins: [],
};