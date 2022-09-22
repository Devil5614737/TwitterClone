/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'login-bg':"url(https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png)"
      },
      backgroundColor:{
        navbar:'rgba(255, 255, 255, 0.85)',
        overlay:"rgba(0,0,0,.5)"
      },
      translate:{
        center:"(-50%,-50%)"
      }

    },
  },
  plugins: [],
}
