import { expect, type Locator, test } from "@playwright/test";
import { expectPreflightParity } from "./harness";

// Geometry rather than screenshots, as with button/shape: which edge of the
// table carries the hairline is a numeric fact, and asserting it directly is
// immune to the font drift the screenshot specs have to tolerate. A vertical
// table's rule runs down the header column; a horizontal one's runs under the
// header row, and the `isRowHeader` column it also has must stay undecorated.

async function bordersOf(cell: Locator) {
	return await cell.evaluate((el) => {
		const style = getComputedStyle(el);
		return {
			bottomWidth: Number.parseFloat(style.borderBottomWidth),
			bottomColor: style.borderBottomColor,
			endWidth: Number.parseFloat(style.borderInlineEndWidth),
			endColor: style.borderInlineEndColor,
			fontFamily: style.fontFamily,
			textTransform: style.textTransform,
		};
	});
}

test.describe("table/orientation", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/?component=table-orientation");
		await page.evaluate(() => document.fonts.ready);
	});

	test("a vertical table rules the header column, not the header row", async ({
		page,
	}) => {
		const vertical = page.getByTestId("fixture-table-orientation-vertical");
		const horizontal = page.getByTestId("fixture-table-orientation-horizontal");

		const label = await bordersOf(vertical.getByRole("rowheader").first());
		const heading = await bordersOf(
			horizontal.getByRole("columnheader").first(),
		);

		// The same hairline the horizontal table draws under its header, turned
		// on its side.
		expect(label.endWidth).toBe(1);
		expect(label.endColor).toBe(heading.bottomColor);
		expect(label.bottomWidth).toBe(0);

		// And the field names are set like headings rather than like the data.
		expect(label.fontFamily.toLowerCase()).toContain("beaufort");
		expect(label.textTransform).toBe("uppercase");

		// The heading above the header column carries the rule too, so the line is
		// unbroken from the top of the table down.
		const corner = await bordersOf(vertical.getByRole("columnheader").first());
		expect(corner.endWidth).toBe(1);
	});

	test("a horizontal table leaves its row header column alone", async ({
		page,
	}) => {
		const horizontal = page.getByTestId("fixture-table-orientation-horizontal");

		const label = await bordersOf(horizontal.getByRole("rowheader").first());
		expect(label.endWidth).toBe(0);
		expect(label.textTransform).toBe("none");

		const heading = await bordersOf(
			horizontal.getByRole("columnheader").first(),
		);
		expect(heading.bottomWidth).toBe(1);
		expect(heading.endWidth).toBe(0);
	});

	test("a visually hidden header takes no room and stays announced", async ({
		page,
	}) => {
		const hidden = page.getByTestId("fixture-table-orientation-hidden-header");

		// Still in the accessibility tree: the column headers are what name every
		// cell to a screen reader.
		await expect(hidden.getByRole("columnheader")).toHaveCount(2);

		const headerRow = await hidden.locator("thead tr").boundingBox();
		expect(headerRow?.height).toBe(0);

		// So the first field is the top of the table.
		const table = await hidden.locator("table").boundingBox();
		const firstRow = await hidden.locator("tbody tr").first().boundingBox();
		expect(firstRow?.y).toBeCloseTo(table?.y ?? -1, 0);
	});
});

// These fixtures are outside `componentNames`, so the parity spec never reaches
// them — and both the hairline and the clipped header lean on borders and
// display, which is exactly what a reset rewrites.
test("table/orientation is unchanged by a CSS reset", async ({ page }) => {
	await expectPreflightParity(page, "table-orientation");
});
