import { expect, type Page, test } from "@playwright/test";

/** Mirrors the `Fixture` metadata `main.tsx` publishes on `window`. */
export interface FixtureInfo {
	id: string;
	fullPage: boolean;
}

/**
 * Every component with fixtures in `fixtures.tsx`, as plain strings: these specs
 * run in Node and so cannot import the component modules, which pull in CSS.
 */
export const componentNames = [
	"breadcrumbs",
	"button-link",
	"checkbox",
	"disclosure",
	"divider",
	"heading",
	"menu",
	"modal",
	"multiple-select",
	"number-field",
	"popover",
	"progress-bar",
	"radio-group",
	"search-field",
	"select",
	"slider",
	"sonner",
	"spinner",
	"switch",
	"table",
	"tabs",
	"tag-group",
	"text",
	"text-area",
	"text-field",
	"toggle-button",
	"toggle-button-group",
	"toolbar",
	"tree",
];

/** Button presets, which get a `?preset=` page each rather than a fixture. */
export const buttonPresets = [
	"primary",
	"secondary",
	"hextech",
	"dimmed",
	"text",
];

/** Wait for the fonts and PNG assets that would otherwise land mid-screenshot. */
async function settle(page: Page) {
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
}

async function open(page: Page, params: Record<string, string>) {
	await page.goto(`/?${new URLSearchParams(params)}`);
	await settle(page);
}

async function fixturesOf(page: Page, component: string) {
	await open(page, { component });
	const fixtures = await page.evaluate(
		() => (window as unknown as { __FIXTURES__: FixtureInfo[] }).__FIXTURES__,
	);
	expect(
		fixtures,
		`no fixtures registered for "${component}"`,
	).not.toHaveLength(0);
	return fixtures;
}

/**
 * Portalled overlays (popover, menu, modal, toast) render on `document.body`, so
 * they are not inside the fixture box at all — and where they land relative to
 * the trigger is exactly what a regression breaks. Those take the viewport.
 */
async function shoot(page: Page, fixture: FixtureInfo) {
	return fixture.fullPage
		? await page.screenshot()
		: await page.getByTestId(`fixture-${fixture.id}`).screenshot();
}

/** Screenshot every fixture of a component against the committed baselines. */
export async function captureComponent(page: Page, component: string) {
	// One fixture per page: two open popovers would sit on top of each other.
	for (const fixture of await fixturesOf(page, component)) {
		await open(page, { component, fixture: fixture.id });
		const name = `${fixture.id}.png`;
		if (fixture.fullPage) {
			await expect(page).toHaveScreenshot(name);
		} else {
			await expect(page.getByTestId(`fixture-${fixture.id}`)).toHaveScreenshot(
				name,
			);
		}
	}
}

/**
 * Assert a component looks the same with and without a CSS reset.
 *
 * The two shots are compared to each other rather than to a committed PNG: the
 * same fixture rendered twice in one browser is deterministic, so they have to
 * match byte for byte, and the check stays independent of how the machine
 * running it rasterises fonts.
 */
export async function expectPreflightParity(page: Page, component: string) {
	for (const fixture of await fixturesOf(page, component)) {
		await open(page, { component, fixture: fixture.id });
		const bare = await shoot(page, fixture);

		await open(page, { component, fixture: fixture.id, preflight: "1" });
		const reset = await shoot(page, fixture);

		await expectSamePixels(fixture.id, bare, reset);
	}
}

/** As `expectPreflightParity`, for a button preset's own page. */
export async function expectPresetPreflightParity(page: Page, preset: string) {
	for (const id of [preset, `${preset}-disabled`]) {
		await open(page, { preset });
		const bare = await page.getByTestId(`fixture-${id}`).screenshot();

		await open(page, { preset, preflight: "1" });
		const reset = await page.getByTestId(`fixture-${id}`).screenshot();

		await expectSamePixels(id, bare, reset);
	}
}

async function expectSamePixels(name: string, bare: Buffer, reset: Buffer) {
	const same = reset.equals(bare);
	if (!same) {
		// Attach both so the diff is inspectable from the report.
		await test
			.info()
			.attach(`${name}-bare.png`, { body: bare, contentType: "image/png" });
		await test.info().attach(`${name}-preflight.png`, {
			body: reset,
			contentType: "image/png",
		});
	}
	expect(
		same,
		`${name} renders differently once Tailwind's preflight is applied`,
	).toBe(true);
}
