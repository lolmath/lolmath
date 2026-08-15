import { expect, type Locator, test } from "@playwright/test";
import { expectPreflightParity } from "./harness";

// Geometry rather than screenshots, as with button/shape: which edge of the
// table carries the hairline is a numeric fact, and asserting it directly is
// immune to the font drift the screenshot specs have to tolerate. What makes
// this table vertical is that the rule runs down the field names rather than
// under a header row — and that those names are real `<th scope="row">`s,
// which is the part React Aria's table cannot express at all.

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

test.describe("vertical-table", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/?component=vertical-table");
		await page.evaluate(() => document.fonts.ready);
	});

	test("the hairline runs down the field names", async ({ page }) => {
		const compared = page.getByTestId("fixture-vertical-table-compared");

		const field = await bordersOf(compared.getByRole("rowheader").first());
		expect(field.endWidth).toBe(1);
		expect(field.bottomWidth).toBe(0);

		// The record names are separated the other way, and the blank corner over
		// the field names carries both, so the two lines meet.
		const record = await bordersOf(compared.getByRole("columnheader").first());
		expect(record.bottomWidth).toBe(1);
		expect(record.endWidth).toBe(0);
		expect(record.bottomColor).toBe(field.endColor);

		const corner = await bordersOf(compared.locator("thead td"));
		expect(corner.bottomWidth).toBe(1);
		expect(corner.endWidth).toBe(1);

		// Both headings are set as headings, against the data beside them.
		expect(field.fontFamily.toLowerCase()).toContain("beaufort");
		expect(field.textTransform).toBe("uppercase");
		const value = await bordersOf(compared.getByRole("cell").first());
		expect(value.fontFamily.toLowerCase()).not.toContain("beaufort");
	});

	test("the field names are scoped row headers", async ({ page }) => {
		const compared = page.getByTestId("fixture-vertical-table-compared");

		// A row per field, a column per record — the transposition itself.
		await expect(compared.getByRole("rowheader")).toHaveCount(2);
		await expect(compared.getByRole("columnheader")).toHaveCount(3);

		// Real scoped <th>s, which is what ties every value to both its field and
		// its record without an `aria-*` in sight.
		expect(
			await compared
				.locator("tbody th")
				.first()
				.evaluate((el) => [el.tagName, el.getAttribute("scope")]),
		).toEqual(["TH", "row"]);
		expect(
			await compared
				.locator("thead th")
				.first()
				.evaluate((el) => [el.tagName, el.getAttribute("scope")]),
		).toEqual(["TH", "col"]);

		// The corner is a <td>: an empty <th> is a heading announced as blank.
		await expect(compared.locator("thead td")).toHaveCount(1);
	});

	test("a stat card has no header row at all", async ({ page }) => {
		const card = page.getByTestId("fixture-vertical-table-stat-card");

		await expect(card.locator("thead")).toHaveCount(0);
		// Nothing goes unnamed by dropping it: the field names still head the rows.
		await expect(card.getByRole("rowheader")).toHaveCount(2);

		const table = await card.locator("table").boundingBox();
		const firstRow = await card.locator("tbody tr").first().boundingBox();
		expect(firstRow?.y).toBeCloseTo(table?.y ?? -1, 0);
	});
});

// These fixtures are outside `componentNames`, so the parity spec never reaches
// them — and the hairlines lean on borders, which is exactly what a reset
// rewrites.
test("vertical-table is unchanged by a CSS reset", async ({ page }) => {
	await expectPreflightParity(page, "vertical-table");
});
