import { expect, test } from "@playwright/test";

// Geometry rather than a screenshot: the icon is a flex item, so a container
// too narrow for its label used to shrink the icon's width while its fixed
// height held still, squishing the glyph. flex-shrink: 0 keeps the icon's box
// fixed no matter how little room its label leaves.
test.describe("checkbox/shape", () => {
	test("icon keeps its box in a container too narrow for its label", async ({
		page,
	}) => {
		await page.goto("/?component=checkbox-shape");
		await page.evaluate(() => document.fonts.ready);

		const icon = page
			.getByTestId("fixture-checkbox-shape-cramped")
			.locator("img");

		const box = await icon.boundingBox();
		if (!box) throw new Error("icon has no box");

		expect(box.width).toBeCloseTo(14, 0);
		expect(box.height).toBeCloseTo(14, 0);
	});
});
