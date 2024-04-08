/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fea307",
      },
      screens: {
        "3xl": "1600px",
      },
    },
  },
  plugins: [],
};
