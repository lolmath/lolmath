import { defineConfig } from "tsdown";

export default defineConfig({
	entry: {
		index: "src/index.ts",
	},
	format: ["esm"],
	target: "es2022",
	tsconfig: "tsconfig.json",
	sourcemap: true,
	dts: true,
	css: {
		fileName: "index.css",
	},
	copy: [{ from: "public/**/*", to: "dist", flatten: false }],
});
