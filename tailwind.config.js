const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: false,
    content: ['./src/**/*.js'],
  },
  darkMode: false,
  theme: {
    screens:{
      sm: '600px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px'
    },
    fontFamily: {
      'sans': ['Barlow', 'sans-serif'],
      'serif': ['ui-serif'],
      'mono': ['ui-monospace'],
      'display': ['Barlow', 'sans-serif'],
      'body': ['Barlow', 'sans-serif'],
     },
    colors: {
      primary: colors.red,
      secondary: colors.black,
      white: colors.white,
      gray: colors.gray,
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
