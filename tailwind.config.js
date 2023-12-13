/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'bg-klasna': "url('/src/p.jpg')"
      })
    },
  },
  plugins: [],
}