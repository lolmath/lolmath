import { defineConfig, devices } from "@playwright/test";

// Visual regression tests for @lolmath/ui. Runs a Vite app (visual/) that
// renders real components from the package and screenshots every component
// in each interaction state.
export default defineConfig({
	testDir: "./visual",
	outputDir: "./test-results",
	snapshotPathTemplate: "{testDir}/__screenshots__/{arg}{ext}",
	fullyParallel: true,
	retries: 0,
	workers: 1,
	reporter: [["list"]],
	expect: {
		// SVG icon + font anti-aliasing can shift a few sub-pixels between runs.
		toHaveScreenshot: {
			maxDiffPixelRatio: 0.01,
			animations: "disabled",
		},
	},
	use: {
		baseURL: "http://127.0.0.1:6007",
		viewport: { width: 400, height: 400 },
		colorScheme: "dark",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
	webServer: {
		command: "npx vite --config visual/vite.config.ts",
		url: "http://127.0.0.1:6007",
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
		cwd: import.meta.dirname,
	},
});
