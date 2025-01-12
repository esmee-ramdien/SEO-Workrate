/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,vue}",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
]
}

