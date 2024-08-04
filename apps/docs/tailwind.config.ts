import { lolmathui } from "@lolmath/ui/plugin";
import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx,css}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@lolmath/ui/src/**/*.{ts,js,jsx,tsx}",
		"./theme.config.tsx",
	],
	theme: {
		extend: {},
	},
	plugins: [lolmathui],
} satisfies Config;
