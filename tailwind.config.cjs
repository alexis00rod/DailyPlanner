/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      './node_modules/tw-elements/dist/js/**/*.js'
    ],
    theme: {
        extend: {
            fontFamily: {
                'pacifico': ['"Pacifico"', 'cursive'],
                'poppins': ['"Poppins"', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('tw-elements/dist/plugin'),
        require('@tailwindcss/line-clamp'),
    ],
}
