// tailwind.config.js
module.exports = {
  // … content/plugins …
  daisyui: {
    themes: [
      {
        redlight: {              // your new theme
          primary: "#f59e0b",    // amber-500
          "primary-content": "#1f2937",
          secondary: "#10b981",  // emerald-500
          accent: "#6366f1",     // indigo-500
          neutral: "#111827",
          "base-100": "#f3f4f6",
          info: "#3b82f6",
          success: "#22c55e",
          warning: "#f97316",
          error: "#ef4444",
        },
      },
      "dark",
      "cupcake",
    ],
  },
};
