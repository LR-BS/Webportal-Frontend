/** @type {import('tailwindcss').Config} */

const tailwindCssConfig = {
  content: {
    relative: true,
    files: ['./src/**/*.{js,ts,jsx,tsx}'],
  },
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#034fff',
          700: '#033aaa',
        },
        gray: {
          50: '#F7F8FB',
        },
      },
      screens: {
        '2xs': { max: '360px' },
        xs: { max: '480px' },
        sm: { max: '576px' },
        rg: { max: '672px' },
        md: { max: '768px' },
        lg: { max: '992px' },
        xl: { max: '1076px' },
        '2xl': { max: '1200px' },
        '3xl': { max: '1376px' },
        '4xl': { max: '1440px' },
        '5xl': { max: '1576px' },
      },
      borderWidth: {
        1: '1px',
      },
      zIndex: {
        1: '1',
        2: '2',
      },
      transitionDuration: {
        250: '250ms',
      },
      minWidth: {
        24: '6rem',
      },
    },
  },
  plugins: [],
};

export default tailwindCssConfig;
