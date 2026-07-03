/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5faff',
          100: '#e0f4ff',
          200: '#b8e6ff',
          300: '#80d1ff',
          400: '#33b8ff',
          500: '#0099ff',
          600: '#007acc',
          700: '#005fa3',
          800: '#004680',
          900: '#003366',
        },
        gray: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e5e5e6',
          300: '#d4d4d5',
          400: '#a1a1a3',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
      },
    },
  },
  plugins: [],
};
