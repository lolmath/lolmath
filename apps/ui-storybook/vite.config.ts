import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
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
		},
	},
});
