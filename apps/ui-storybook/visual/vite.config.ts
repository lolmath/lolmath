import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// Vite config for the Playwright visual-regression harness.
// It mirrors apps/ui-storybook/vite.config.ts but roots in this directory so
// `index.html` here is served at "/".
export default defineConfig({
	root: __dirname,
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@lolmath/ui/font/beaufort": path.resolve(
				__dirname,
				"../../../packages/ui/public/font/beaufort/beaufort.css",
			),
			"@lolmath/ui/font/spiegel": path.resolve(
				__dirname,
				"../../../packages/ui/public/font/spiegel/spiegel.css",
			),
			"@lolmath/ui/css": path.resolve(
				__dirname,
				"../../../packages/ui/src/style.css",
			),
			"@lolmath/ui": path.resolve(__dirname, "../../../packages/ui/src"),
		},
	},
	server: {
		port: 6007,
		strictPort: true,
		host: "127.0.0.1",
	},
});
