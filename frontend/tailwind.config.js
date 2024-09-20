/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        darkPurple: '#22082b' /* #1f0f24 */,
        lightPurple: '#260033',
        darkOrange: '#e65c00',
        lightOrange: '#ff751a',
      },
    },
  },
  plugins: [],
};