import path from "node:path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// The storybook reads @lolmath/charts and @lolmath/ui straight from source, so
// a change shows up without a build step in between.
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@lolmath/ui/font/beaufort": path.resolve(
				__dirname,
				"../../packages/ui/public/font/beaufort/beaufort.css",
			),
			"@lolmath/ui/font/spiegel": path.resolve(
				__dirname,
				"../../packages/ui/public/font/spiegel/spiegel.css",
			),
			"@lolmath/ui/css": path.resolve(
				__dirname,
				"../../packages/ui/src/style.css",
			),
			"@lolmath/ui": path.resolve(__dirname, "../../packages/ui/src"),
			"@lolmath/charts/css": path.resolve(
				__dirname,
				"../../packages/charts/src/style.css",
			),
			"@lolmath/charts": path.resolve(__dirname, "../../packages/charts/src"),
		},
	},
});
