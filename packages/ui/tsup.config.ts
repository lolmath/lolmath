import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    plugin: "src/plugin.ts",
  },
  sourcemap: true,
  clean: true,
  dts: true,
  format: ["esm", "cjs"],
  publicDir: "public",
});
