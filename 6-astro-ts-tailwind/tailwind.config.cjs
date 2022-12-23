/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,astro,html,md}"],
  theme: {
    extend: {
      fontFamily:{
        sans:["Inter","Helvetica","Arial","sans-serif"]
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
