// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},      // ← *this* is the correct key
    autoprefixer: {},     // ← Next.js needs this
  },
};
