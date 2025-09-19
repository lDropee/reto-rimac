/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rimac-bg': '#F8F9FF',
        'rimac-blue': '#1B365D',
        'rimac-green': '#00FF7F',
        'rimac-dark': '#03050F',
        'rimac-purple': '#8B5CF6',
        'rimac-purple-light': '#F3F4F6',
        'rimac-red': '#EF3340',
        'rimac-gray': '#6F7C87',
        'rimac-light-gray': '#F7F8FA',
        'rimac-neutral': '#374151',
        'rimac-neutral-600': '#6B7280',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
