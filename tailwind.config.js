module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'Poppins': ['Poppins', 'sans-serif'],
      'Samarkan':['samarkan']
    },
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    // colors:{
    //   // brandColor:"#001529",
    //   // acentColor:"#5CACE1",
    //   // fontColor:"#414042",
    //   // bgColor:"#001529"
    // },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}


//   // "@craco/craco": "^5.5.0", 