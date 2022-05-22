module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        shopifygreen: "rgb(30, 75, 64)",
        shopifylgreen: "rgb(53, 123, 95)",
        shopifysand: "rgb(250, 247, 238)",
        shopifywhite:"rgb(240, 240, 240)",
        shopifygray: "rgb(30, 30, 30)",
        shopifyslate: "rgb(40, 40, 40)"
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
