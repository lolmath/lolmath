import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		includeSource: ["src/**/*.spec.{js,ts}"],
		globals: true,
	},
});
