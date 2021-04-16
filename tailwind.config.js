const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.js'],
  darkMode: false,
  theme: {
    screens:{
      sm: '600px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      'sans': ['Ubuntu', 'sans-serif'],
      'serif': ['ui-serif'],
      'mono': ['ui-monospace'],
      'display': ['Ubuntu', 'sans-serif'],
      'body': ['Ubuntu', 'sans-serif'],
     },
    colors: {
      primary: colors.red,
      secondary: colors.black,
      white: colors.white,
      black: colors.black,
      green: colors.green,
      transparent: 'transparent',
    },
    divideColors: {
      primary: colors.red,
      black: colors.black,
      grey: colors.grey,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
