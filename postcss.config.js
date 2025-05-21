// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},  // use the standalone PostCSS plugin
    autoprefixer: {},            // Next.js needs this for vendor prefixes
  },
}
