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
        'body-xs': [
          '12px',
          {
            lineHeight: '15px',
            fontWeight: 700
          },
        ],
        'body-sm': [
          '13px',
          {
            lineHeight: '23px',
            fontWeight: 500
          },
        ],
        sm: [
          '12px',
          {
            lineHeight: '15px',            
            letterSpacing: '2.4px'
          },
        ],
        base: [
          '15px',
          {
            lineHeight: '19px',
            fontWeight: '700',
          },
        ],
        lg: [
          '18px',

          {
            lineHeight: '23px',
          },
        ],
        xl: [        
          '24px',
          {
            lineHeight: '30px',
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
      },
      
      backgroundColor: {
      },
      
      colors: {
        opacity: {
          '25': '0.25'
        },
        text: {
         base: 'var(--color-text-base)',
         muted: 'var(--color-text-muted)',
         accent: 'var(--color-text-accent)',
        },

        background:{
          primary: 'var(--color-background-primary)',
          secondary: 'var(--color-background-secondary)',
        },

        primary: {
          base: 'rgb(var(--color-primary))',
          '25': 'rgb(var(--color-primary) , 25%)',
          '75': 'rgb(var(--color-primary) , 75%)'
        },
        'primary-light': 'var(--color-primary-light)',
         
        'secondary-base': 'rgb(var(--color-secondary))',
        'secondary-light': 'var(--color-secondary-light)',
        'medium-grey': 'var(--color-medium-grey)',
        'danger': 'rgb(var(--color-secondary))',

        'btn-primary': 'var(--color-btn-primary)',
        'btn-primary-hover': 'var(--color-btn-primary-hover)',
        'btn-secondary': 'var(--color-btn-secondary)',
        'btn-secondary-hover': 'var(--color-btn-secondary-hover)',
        'btn-danger': 'var(--color-btn-danger)',
        'btn-danger-hover': 'var(--color-btn-danger-hover)',

        border: {
          base: 'var(--color-border-base)',
          input: 'var(--color-border-input)'
        },

      },
    },
  },
  plugins: [],
};
