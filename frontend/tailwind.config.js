/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
  ],
  theme: {
    extend: {
      screens: {
        'mp': '280px',
      },
    },
  },
  plugins: [],
}

