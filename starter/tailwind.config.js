/** @type {import('tailwindcss').Config} */

const upmindTheme = require('./tailwind-themes/upmind.js');

module.exports = {
  content: [],
  theme: {
    extend: {
      ...upmindTheme
    }
  },
  plugins: [],
}
