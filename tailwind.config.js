tailwind.config = {
  theme: {
    extend: {
      colors: {
        'bright-gray': '#e6f0f8',
        'dark-blue': '#0b1318',
        primary: '#96b8d3',
        secondary: '#2b5c85',
        accent: '#559cd6',
        selection: '#5637EE'
      },
      keyframes: {
        fade: {
          from: {
            opacity: 0
          },
          to: {
            opacity: 1
          }
        }
      },
      animation: {
        fade: 'fade 1s ease-in'
      }
    }
  }
};
