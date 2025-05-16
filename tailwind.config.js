/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit',
  darkMode: false,
  theme: {
    fontFamily: {
      display: ['Open Sans', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },
    extend: {
      screens: {
        mf: '990px',
      },
      colors: {
        'primary': '#d1aaff',
        'primary-hover': '#aa66ff',
        'bg-dark': '#10001a',
        'bg-darker': '#190727',
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out',
        'fadeIn': 'fadeIn 0.8s forwards',
        'floatUp': 'floatUp 3s infinite alternate ease-in-out',
        'floatAnimation': 'floatAnimation 4s infinite ease-in-out',
        'floatRotate': 'floatRotate 4s infinite ease-in-out',
      },
      keyframes: {
        'slide-in': {
          '0%': {
            '-webkit-transform': 'translateX(120%)',
            transform: 'translateX(120%)',
          },
          '100%': {
            '-webkit-transform': 'translateX(0%)',
            transform: 'translateX(0%)',
          },
        },
        'fadeIn': {
          'from': {
            'opacity': '0',
            'transform': 'scale(0.95)'
          },
          'to': {
            'opacity': '1',
            'transform': 'scale(1)'
          }
        },
        'floatUp': {
          'from': {
            'transform': 'translateY(0px)'
          },
          'to': {
            'transform': 'translateY(-8px)'
          }
        },
        'floatAnimation': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' }, 
          '100%': { transform: 'translateY(0px)' },
        },
        'floatRotate': { 
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(4deg)' }, 
        },
      },
      boxShadow: {
        'purple': '0px 3px 10px rgba(94, 33, 140, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
