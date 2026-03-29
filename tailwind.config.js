/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adding a custom color for your "DeltaH" branding
        premium: '#00f2ff', // A bright cyan/electric blue
      }
    },
  },
  plugins: [],
}