import { expect, type Page, test } from "@playwright/test";

// Component names are plain strings so this spec (which runs in Node and
// therefore cannot import the component modules that pull in CSS) stays free
// of any @lolmath/ui import. Fixture ids are discovered at runtime via
// window.__FIXTURE_IDS__ exposed by the harness.
const componentNames = [
	"breadcrumbs",
	"button-link",
	"checkbox",
	"disclosure",
	"divider",
	"number-field",
	"progress-bar",
	"radio-group",
	"search-field",
	"select",
	"slider",
	"spinner",
	"switch",
	"table",
	"tabs",
	"tag-group",
	"text-area",
	"text-field",
	"toggle-button",
	"tree",
];

async function fixtureIds(page: Page): Promise<string[]> {
	return await page.evaluate(
		() =>
			(
				window as unknown as {
					__FIXTURE_IDS__: string[];
				}
			).__FIXTURE_IDS__,
	);
}

// Each component's fixtures already encode its meaningful states via props
// (e.g. switch off/on/disabled, checkbox unchecked/selected/indeterminate,
// disclosure collapsed/expanded, slider single/range). We capture the
// as-rendered appearance of each fixture. Interaction pseudo-states
// (hover/focus/active) for Button are covered in button.visual.spec.ts.
for (const component of componentNames) {
	test(`${component} visual states`, async ({ page }) => {
		await page.goto(`/?component=${component}`);
		// Wait for fonts and all image assets (checkbox icons, radio/slider
		// backgrounds, breadcrumb dividers are PNGs) so screenshots are
		// deterministic.
		await page.evaluate(async () => {
			await document.fonts.ready;
			await Promise.all(
				Array.from(document.images).map((img) =>
					img.complete
						? null
						: new Promise((resolve) => {
								img.onload = () => resolve(null);
								img.onerror = () => resolve(null);
							}),
				),
			);
		});
		await page.waitForLoadState("networkidle");

		for (const id of await fixtureIds(page)) {
			await expect(page.getByTestId(`fixture-${id}`)).toHaveScreenshot(
				`${id}.png`,
			);
		}
	});
}
