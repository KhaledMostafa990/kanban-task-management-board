/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1600px',
      '4xl': '1920px',
    },
    extend: {
      fontFamily: {
        primary: ['var(--font-family-primary)'],
      },

      fontSize: {
        xs: [
          '12px',
          {
            lineHeight: '15px',
            letterSpacing: '2px',
          },
        ],
        sm: [
          '13px',
          {
            lineHeight: '23px',
          },
        ],
        base: [
          '15px',
          {
            lineHeight: '30px',
          },
        ],
        lg: [
          '18px',

          {
            lineHeight: '25px',
            letterSpacing: '2px',
          },
        ],
        xl: [
          '24px',

          {
            fontWeight: '700',
          },
        ],
        '2xl': [
          '28px',
          {
            lineHeight: '36px',
            fontWeight: '500',
          },
        ],
        '3xl': [
          '32px',
          {
            lineHeight: '36px',
            fontWeight: '500',
          },
        ],
        '4xl': [
          '40px',
          {
            lineHeight: '42px',
            letterSpacing: '-.36px',
            fontWeight: '700',
          },
        ],
        '5xl': [
          '50px',
          {
            lineHeight: '41px',
            letterSpacing: '-0.45px',
            fontWeight: '700',
          },
        ],
        '6xl': [],
      },

      textColor : {
        'color-base': 'var(--color-text-base)',
        'color-muted': 'var(--color-text-muted)',
        'color-accent' : 'var(--color-text-accent)',
      },
      
      backgroundColor: {
        primary: 'var(--color-background-primary)',
        secondary: 'var(--color-background-secondary)',
      },

      colors: {
        'primary-base': 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
         
        'secondary-base': 'var(--color-secondary)',
        'secondary-light': 'var(--color-secondary-light)',
        'medium-grey': 'var(--color-medium-grey)',
        border: {
          base: 'var(--color-border-base)'
        },
      },
    },
  },
  plugins: [],
};
