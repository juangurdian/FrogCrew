/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'tcu-purple': '#4d2e7d',
          'tcu-purple-dark': '#3a225f',
        },
        spacing: {
          '72': '18rem',
          '84': '21rem',
          '96': '24rem',
        },
        borderRadius: {
          'xl': '1rem',
        },
      },
    },
    plugins: [],
  }
  