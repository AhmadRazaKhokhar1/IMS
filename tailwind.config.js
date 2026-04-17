/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['League Spartan', 'sans-serif'],
        body: ['Nunito Sans', 'sans-serif']
      },
      keyframes: {
        slideRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        slideRight: 'slideRight 1.5s ease-out',
      },
      colors: {
        primary: {
          dark: '#000000',
          light: '#FFFFFF',
        },
        purple: {
          900: '#2A0944',
          800: '#3B185F',
          700: '#4C2A7A',
          600: '#5D3B95',
          accent: '#6E4CB0',
        },
        border: '#2D2D2D',
        hover: '#1A1A1A',
      },
      backgroundColor: {
        primary: '#000000',
        secondary: '#1A1A1A',
        accent: '#6E4CB0',
      },
      textColor: {
        primary: '#FFFFFF',
        secondary: '#E0E0E0',
        accent: '#6E4CB0',
      },
    },
  },
  plugins: [],
};


