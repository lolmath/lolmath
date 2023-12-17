import { moduleTools, defineConfig } from "@modern-js/module-tools";

export default defineConfig({
  plugins: [moduleTools()],
  buildConfig: [
    {
      format: "cjs",
      target: "es2022",
      buildType: "bundleless",
      outDir: "./dist/lib",
      sourceMap: true,
    },
    {
      format: "esm",
      target: "es2022",
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
        options: {
          enableCopySync: true,
        },
      },
    },
  ],
});
