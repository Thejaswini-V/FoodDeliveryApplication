

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF5722', // Swiggy-like orange
        secondary: '#00E676', // Complementary green
        swiggyOrange: '#FA541C',
      swiggyGreen: '#36B37E',
      backgroundGray: '#F6F6F6',
      },
      boxShadow: {
        neumorphic: '8px 8px 16px #c5c5c5, -8px -8px 16px #ffffff',
        
      custom: '0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        neumorphic: '12px',
        'xl': '1rem',
      },
    },
  },
  plugins: [],
}
