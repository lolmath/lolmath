import { lolmathui } from "@lolmath/ui/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@lolmath/ui/src/**/*.{ts,js,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [lolmathui],
};
