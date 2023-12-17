import { moduleTools, defineConfig } from "@modern-js/module-tools";

export default defineConfig({
  plugins: [moduleTools()],
  buildConfig: [
    {
      format: "cjs",
      target: "esnext",
      buildType: "bundleless",
      outDir: "./dist/lib",
      autoExtension: true,
      sourceMap: true,
    },
    {
      format: "esm",
      target: "esnext",
      buildType: "bundleless",
      outDir: "./dist/es",
      sourceMap: true,
    },
    {
      buildType: "bundleless",
      dts: false,
      input: [],
      copy: {
        patterns: [
          {
            from: "./**/*",
            to: "./",
            context: "./public",
          },
        ],
      },
    },
  ],
});
