import { defineConfig, moduleTools } from "@modern-js/module-tools";

export default defineConfig({
	plugins: [moduleTools()],
	buildConfig: [
		{
			format: "cjs",
			target: "es2022",
			buildType: "bundle",
			outDir: "./dist/lib",
			sourceMap: true,
			input: ["./src/index.ts", "./src/plugin.ts"],
		},
		{
			format: "esm",
			target: "es2022",
			buildType: "bundle",
			outDir: "./dist/es",
			sourceMap: true,
			input: ["./src/index.ts", "./src/plugin.ts"],
		},
		{
			input: [],
			copy: {
				patterns: [
					{
						from: "./**/*",
						to: "./",
						context: "./public",
					},
				],
				options: {
					enableCopySync: true,
				},
			},
		},
	],
});
