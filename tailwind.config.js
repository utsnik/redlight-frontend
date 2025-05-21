// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        redlight: {
          primary:         "#f59e0b",
          "primary-content":"#1f2937",
          secondary:       "#10b981",
          accent:          "#6366f1",
          neutral:         "#111827",
          "base-100":      "#f3f4f6",
          info:            "#3b82f6",
          success:         "#22c55e",
          warning:         "#f97316",
          error:           "#ef4444",
        },
      },
      "dark",
      "cupcake",
    ],
  },
};
