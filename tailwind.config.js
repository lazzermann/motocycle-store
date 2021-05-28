const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    colors: {
      gray: colors.coolGray,
      blue: colors.lightBlue,
      red: colors.rose,
      pink: colors.fuchsia,
      green: colors.cyan,
      purple: colors.purple,
      white: colors.white,
      teal: colors.teal,
      indigo: colors.indigo,
      violet: colors.violet
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
        backgroundImage: theme => ({
            'sign-in-back': "url('/images/loginBack.jpg')",
            }),
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '435': '27rem'
      },
      borderRadius: {
        '4xl': '2rem',
      },
      padding:{
        '5/6': '83.33%'
      }
    }
  },
  plugins:[
    require('@tailwindcss/custom-forms')
  ],
  variants: {
    extend: {
      borderColor: ['focus-visible'],
      opacity: ['disabled'],
    }
  }
}