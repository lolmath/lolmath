import { expect, type Locator, test } from "@playwright/test";

// Geometry rather than screenshots: a shape regression is a numeric fact (the
// radius collapses to 0, or the box stops being 1:1), and asserting it
// directly is immune to the font/anti-aliasing drift the screenshot specs have
// to tolerate. `.round` used to be authored before `.button` at equal
// specificity, so the base `border-radius: 0px` won and round buttons rendered
// square.
const sizes = ["small", "medium", "large"] as const;

async function radiusOf(button: Locator) {
	return await button.evaluate(
		(el) => Number.parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0,
	);
}

async function boxOf(button: Locator) {
	const box = await button.boundingBox();
	if (!box) throw new Error("button has no box");
	return box;
}

test.describe("button/shape", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/?component=button-shape");
		await page.evaluate(() => document.fonts.ready);
	});

	for (const size of sizes) {
		test(`round ${size} is a circle`, async ({ page }) => {
			const button = page
				.getByTestId(`fixture-button-shape-round-${size}`)
				.getByRole("button");

			const box = await boxOf(button);

			// A pill radius resolves to half the shorter side; anything less means
			// the corners are visibly cut.
			expect(await radiusOf(button)).toBeGreaterThanOrEqual(
				Math.min(box.width, box.height) / 2,
			);
			expect(box.width).toBeCloseTo(box.height, 0);
		});

		test(`square ${size} is a square with no radius`, async ({ page }) => {
			const button = page
				.getByTestId(`fixture-button-shape-square-${size}`)
				.getByRole("button");

			const box = await boxOf(button);

			expect(await radiusOf(button)).toBe(0);
			expect(box.width).toBeCloseTo(box.height, 0);
		});
	}

	test("shaped buttons drop the base padding and use the heavier weight", async ({
		page,
	}) => {
		for (const shape of ["round", "square"] as const) {
			const button = page
				.getByTestId(`fixture-button-shape-${shape}-medium`)
				.getByRole("button");

			const { padding, fontWeight } = await button.evaluate((el) => {
				const style = getComputedStyle(el);
				return {
					padding: [
						style.paddingTop,
						style.paddingRight,
						style.paddingBottom,
						style.paddingLeft,
					],
					fontWeight: style.fontWeight,
				};
			});

			expect(padding).toEqual(["0px", "0px", "0px", "0px"]);
			expect(fontWeight).toBe("900");
		}
	});

	test("normal keeps square corners and horizontal padding", async ({
		page,
	}) => {
		const button = page
			.getByTestId("fixture-button-shape-normal")
			.getByRole("button");

		const { radius, paddingLeft, fontWeight } = await button.evaluate((el) => {
			const style = getComputedStyle(el);
			return {
				radius: style.borderTopLeftRadius,
				paddingLeft: style.paddingLeft,
				fontWeight: style.fontWeight,
			};
		});

		expect(radius).toBe("0px");
		expect(paddingLeft).not.toBe("0px");
		expect(fontWeight).toBe("700");
	});
});
