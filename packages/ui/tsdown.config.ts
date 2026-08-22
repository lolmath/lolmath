import postcssUrl from "postcss-url";
import { defineConfig } from "tsdown";

export default defineConfig({
	entry: {
		index: "src/index.ts",
		// `@lolmath/ui/charts` is its own entry so that TanStack Charts — an
		// optional peer — is only ever pulled in by the consumers who import it.
		charts: "src/charts/index.ts",
	},
	format: ["esm"],
	target: "es2022",
	tsconfig: "tsconfig.json",
	sourcemap: true,
	dts: true,
	loader: {
		".png": "dataurl",
		".svg": "dataurl",
	},
	css: {
		fileName: "index.css",
		transformer: "postcss",
		postcss: {
			plugins: [
				postcssUrl({
					url: "inline",
				}),
			],
		},
	},
	copy: [{ from: "public/**/*", to: "dist", flatten: false }],
});
