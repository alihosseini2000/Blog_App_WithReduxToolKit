/** @type {import('tailwindcss').Config} */
// import forms from '@tailwindcss/forms'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'mobile': '320px' ,
      'tablet': '995px' ,
      'desktop': '1280px'
    }
  },
  plugins: [
    // forms
  ],
}

