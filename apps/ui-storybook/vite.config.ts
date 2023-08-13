import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
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
      "@lolmath/ui": path.resolve(__dirname, "../../packages/ui/src"),
    },
  },
});
