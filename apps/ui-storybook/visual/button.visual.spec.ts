import type { ButtonPreset } from "@lolmath/ui";
import { expect, type Locator, test } from "@playwright/test";

const presets: ButtonPreset[] = [
	"primary",
	"secondary",
	"hextech",
	"dimmed",
	"text",
];

// Each preset is rendered in isolation via ?preset=… so that keyboard
// navigation (Tab) lands deterministically on the single enabled button, and
// so each screenshot is a clean capture of one component.
for (const preset of presets) {
	test.describe(`button/${preset}`, () => {
		test.beforeEach(async ({ page }) => {
			await page.goto(`/?preset=${preset}`);
			await page.evaluate(() => document.fonts.ready);
		});

		test("default", async ({ page }) => {
			const { fixture } = await target(page, preset);
			await expect(fixture).toHaveScreenshot(`${preset}-default.png`);
		});

		test("hover", async ({ page }) => {
			const { fixture, button } = await target(page, preset);
			await button.hover();
			await expect(fixture).toHaveScreenshot(`${preset}-hover.png`);
		});

		test("focus-visible", async ({ page }) => {
			const { fixture } = await target(page, preset);
			// Only the enabled button is focusable, so Tab focuses it and
			// triggers :focus-visible.
			await page.keyboard.press("Tab");
			await expect(fixture).toHaveScreenshot(`${preset}-focus.png`);
		});

		test("active", async ({ page }) => {
			const { fixture, button } = await target(page, preset);
			await holdActive(page, button);
			await expect(fixture).toHaveScreenshot(`${preset}-active.png`);
		});

		test("disabled", async ({ page }) => {
			const fixture = page.getByTestId(`fixture-${preset}-disabled`);
			await expect(fixture).toHaveScreenshot(`${preset}-disabled.png`);
		});
	});
}

async function target(page: import("@playwright/test").Page, preset: string) {
	const fixture = page.getByTestId(`fixture-${preset}`);
	const button = fixture.getByRole("button");
	return { fixture, button };
}

async function holdActive(
	page: import("@playwright/test").Page,
	button: Locator,
) {
	const box = await button.boundingBox();
	if (!box) throw new Error("button has no box");
	await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
	await page.mouse.down();
}
