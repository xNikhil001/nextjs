module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'sans' : ['Josefin Sans','sans-serif']
      },
      boxShadow: {
        '3xl': 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
        '4xl': 'rgba(0, 0, 0, 0.18) 0px 2px 4px',
        '5xl': 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
        '6xl': 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;'
      }
    },
  },
  plugins: [],
}