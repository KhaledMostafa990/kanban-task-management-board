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
            lineHeight: '14px',
            letterSpacing: '2px',
          },
        ],
        sm: [
          '15px',
          {
            lineHeight: '22px',
            letterSpacing: '1px',
          },
        ],
        base: [
          '16px',
          {
            lineHeight: '30px',
          },
        ],
        lg: [
          '20px',

          {
            lineHeight: '25px',
            letterSpacing: '2px',
          },
        ],
        xl: [
          '24px',

          {
            lineHeight: '25px',
            letterSpacing: '2px',
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
        base: 'var(--color-text-base)',
        muted: 'var(--color-text-muted)',
        accent : 'var(--color-text-accent)',
      },
      
      backgroundColor: {
        base: 'var(--color-background-base)',
        muted: 'var(--color-background-muted)',
      },

      colors: {
        primary: {
          base: 'var(--color-primary)',
          light: 'var(--color-primary-light)'
        }, 
        secondary: {
          base: 'var(--color-secondary)',
          light: 'var(--color-secondary-light)'
        },
        border: 'var(--color-borde-baser)',
      },
    },
  },
  plugins: [],
};
