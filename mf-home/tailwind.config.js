/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rimac-bg': '#F8F9FF',
        'rimac-green': '#00FF7F',
        'rimac-dark': '#03050F',
        'rimac-blue': '#1B365D',
        'rimac-red': '#EF3340',
        'rimac-gray': '#6F7C87',
        'rimac-light-gray': '#F7F8FA',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'rimac': '0 25px 50px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
