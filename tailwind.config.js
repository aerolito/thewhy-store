module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            hr: {
              borderColor: theme('colors.gray.200'),
              borderTopWidth: '1px',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            'ol > li::before': {
              color: theme('colors.gray.900'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.900'),
            },
          },
        },
      }),
    },
    letterSpacing: {
      1: '0.55rem',
    },
    screens: {
      lg: '1525px',
      md: '1280px',
      xs: '380px',
    },
    fontSize: {
      bigTitle: '6rem',
      title: '3rem',
      subtitle: '2rem',
      subtitleMobile: '2rem',
      smallTitle: '1.5rem',
      highlighted: '1.375rem',
      small: '1.25rem',
      text: '1rem',
      smallText: '0.875rem',
    },
    colors: {
      principal: '#000000',
      hovered: '#6C6C6C',
      white: '#ffffff',
      greywhite: '#FAFAFA',
      black: '#000000',
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
