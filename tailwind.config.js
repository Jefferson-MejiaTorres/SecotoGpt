module.exports = {
  content: [
    "./secotogpt.html",
    "./src/**/*.{html,js}",
    "./src/paginas/**/*.html",
    "./src/componentes/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'se': '#a8edea',
        'co': '#fed6e3', 
        'to': '#fcb69f',
        'gpt': '#cfd9df',
        'bg-light': '#f8fafc',
        'bg-dark': '#22223b',
        'text-light': '#22223b',
        'text-dark': '#f8fafc'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) both',
        'slide-in-left': 'slideInFromLeft 0.8s cubic-bezier(0.23, 1, 0.32, 1) both',
        'slide-in-right': 'slideInFromRight 0.8s cubic-bezier(0.23, 1, 0.32, 1) both',
        'floating': 'floating 1s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        slideInFromLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-100px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        slideInFromRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(100px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        floating: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        }
      }
    }
  },
  plugins: []
}
