/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        card: '#5F6FFF',
        back: '#FFFFFF',
        picture: '#EAEFFF',
        white: '#FFFFFF',
        hover: '#5F6FFF',
      },
    },
  },
  plugins: [],
};
