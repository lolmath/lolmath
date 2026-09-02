import { expect, type Locator, test } from "@playwright/test";

// Geometry rather than screenshots, as with button/shape: `text-box: trim-both
// cap alphabetic` moves boxes, it paints nothing, and a screenshot only ever
// sees the few pixels of drift that fall out of it. What the trim promises is
// arithmetic — a box is its caps rather than its line box, and the gap set
// between two boxes is the gap that shows up — so that is what is asserted.

const presets = ["h1", "h2", "h3", "h4", "h5"] as const;

async function boxOf(element: Locator) {
	return await element.evaluate((el) => {
		const style = getComputedStyle(el);
		return {
			height: el.getBoundingClientRect().height,
			fontSize: Number.parseFloat(style.fontSize),
			lineHeight: Number.parseFloat(style.lineHeight),
		};
	});
}

test.describe("text-box", () => {
	test("a heading's box is its caps, not its leading", async ({ page }) => {
		await page.goto("/?component=heading");
		await page.evaluate(() => document.fonts.ready);

		const ratios: number[] = [];
		for (const preset of presets) {
			const box = await boxOf(
				page.getByTestId(`fixture-heading-${preset}`).locator(preset),
			);

			// Every preset asks for more leading than its glyphs need, so a
			// trimmed box is always shorter than the line it came from.
			expect(box.height).toBeLessThan(box.lineHeight);
			ratios.push(box.height / box.fontSize);
		}

		// And what is left is Beaufort's cap height, which belongs to the face:
		// one ratio for all five presets, whatever leading each asked for.
		const [first, ...rest] = ratios;
		for (const ratio of rest) {
			expect(ratio).toBeCloseTo(first, 2);
		}
	});

	test("the progress bar's reading sits its own gap above the bar", async ({
		page,
	}) => {
		await page.goto("/?component=progress-bar");
		await page.evaluate(() => document.fonts.ready);

		const wrapper = page
			.getByTestId("fixture-progress-bar-partial")
			.getByRole("progressbar");
		const row = wrapper.locator("> div").nth(0);

		// The label and the value are the boxes carrying the trim, so the row
		// they share is as tall as their caps — shorter than the type is big,
		// where Beaufort's reserved ascenders and descenders made it 1.27 times
		// taller than that.
		const label = await boxOf(row.locator("> *").first());
		const rowBox = await row.boundingBox();
		expect(label.height).toBeLessThan(label.fontSize);
		expect(rowBox?.height).toBeCloseTo(label.height, 1);

		// Which leaves the wrapper's 0.25rem running from the baseline of the
		// reading to the top of the bar, rather than from wherever the label's
		// descender space happened to end.
		const bar = await wrapper.locator("> div").nth(1).boundingBox();
		expect((bar?.y ?? 0) - ((rowBox?.y ?? 0) + (rowBox?.height ?? 0))).toBe(4);
	});
});
