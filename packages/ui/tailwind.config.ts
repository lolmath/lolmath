import type { Config } from "tailwindcss";
import { lolmathui } from "./src/plugin";

export default {
	content: [],
	theme: {
		extend: {},
	},
	plugins: [lolmathui],
} satisfies Config;
