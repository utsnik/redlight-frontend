// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},  // ← correct standalone plugin
    autoprefixer: {},     // ← Next.js needs this
  },
};
