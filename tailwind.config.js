/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",        // your App Router pages/components
    "./src/components/**/*.{js,ts,jsx,tsx}", // any shared components
  ],
  plugins: [
    require("daisyui"),                      // ← make sure this line is here
    // ...other plugins
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],    // pick whatever themes you like
  },
};
