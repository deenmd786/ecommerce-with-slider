/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-right': '-10px 0px 15px -3px rgba(75, 85, 99, 0.3)', // Left shadow
        'custom-bottom': '0px -10px 15px -3px rgba(0, 0, 0, 0.1)', // Left shadow
      },
    },
  },
  plugins: [],
}
