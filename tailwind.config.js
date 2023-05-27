const { typewindTransforms } = require("typewind/transform");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    transform: typewindTransforms,
  },
  theme: {
    extend: {
      aria: {
        invalid: 'invalid="true"',
        disabled: 'disabled="true"',
      },
    },
  },
  daisyui: {
    //themes: ["light", "dark"],
  },
  plugins: [require("daisyui")],
};
