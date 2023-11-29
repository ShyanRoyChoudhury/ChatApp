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
      },
      myColor: {
        "50": "#e6ffe7",
        "100": "#ccffce",
        "200": "#99ff9d",
        "300": "#66ff6c",
        "400": "#33ff3b",
        "500": "#00ff0a",
        "600": "#00cc08",
        "700": "#009906",
        "800": "#006604",
        "900": "#003302"
      }
    },
    extend: {},
  },
  plugins: [
    
  ],
});

