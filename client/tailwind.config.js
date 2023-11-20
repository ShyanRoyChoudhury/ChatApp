/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports=withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      red: {
        600: "#e53935",
        700: "#d32f2f"
      }
    },
    extend: {},
  },
  plugins: [
    
  ],
});

