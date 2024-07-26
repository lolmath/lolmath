import { lolmathui } from "@lolmath/ui/plugin";
import type { Config } from "tailwindcss";

export default {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@lolmath/ui/src/**/*.{ts,js,jsx,tsx}",
		"./theme.config.tsx",
	],
	theme: {
		extend: {},
	},
	plugins: [lolmathui],
	important: "#__next",
} satisfies Config;
