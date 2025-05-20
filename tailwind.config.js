// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // make sure your paths include all your components/pages
  ],
  theme: {
    extend: {
      // any custom theming here
    },
  },
  plugins: [
    require("daisyui"),
    // ...other plugins if you have them
  ],

  // (optional) customize daisyUI themes or settings:
  daisyui: {
    themes: ["light", "dark", "cupcake"], // or your own theme names
    // base: true,              // applies base styles (normalized)
    // styled: true,
    // utils: true,
    // logs: false,
  },
};
