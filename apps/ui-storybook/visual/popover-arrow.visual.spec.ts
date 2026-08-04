import { expect, type Page, test } from "@playwright/test";

// Geometry rather than screenshots, for the same reason as
// button-shape.visual.spec.ts: the arrow's position is a numeric fact, and
// asserting it directly is immune to the font/anti-aliasing drift a screenshot
// has to tolerate.
//
// React aria wraps the arrow in a div it positions with `<placement>: 100%`, so
// the wrapper's box has to *be* the glyph. Left inline, the svg sat on a text
// baseline: the wrapper grew to a line-height and the arrow floated off the
// popover by the difference — invisible in an app with Tailwind's preflight
// (which blocks every svg) and broken everywhere else.
const placements = ["bottom", "top", "left", "right"] as const;

/** The declared size of the arrow svg in popover.tsx. */
const glyph = { width: 20, height: 10 };

async function arrowGeometry(page: Page) {
	return await page.evaluate(() => {
		const svg = document.querySelector<SVGSVGElement>(
			"svg[viewBox='0 0 12 6']",
		);
		if (!svg) throw new Error("popover arrow not rendered");
		const wrapper = svg.parentElement;
		const popover = wrapper?.parentElement;
		if (!wrapper || !popover) throw new Error("arrow is not inside a popover");
		const rect = popover.getBoundingClientRect();
		const style = getComputedStyle(popover);
		const border = (side: string) =>
			Number.parseFloat(style.getPropertyValue(`border-${side}-width`));
		return {
			// Layout box, so the placement transforms on the svg do not confuse it.
			wrapper: { width: wrapper.offsetWidth, height: wrapper.offsetHeight },
			glyphRect: svg.getBoundingClientRect().toJSON(),
			// `<placement>: 100%` resolves against the padding box, which the
			// popover's 2px gradient border insets from its border box.
			popoverPaddingBox: {
				top: rect.top + border("top"),
				bottom: rect.bottom - border("bottom"),
				left: rect.left + border("left"),
				right: rect.right - border("right"),
			},
			display: getComputedStyle(svg).display,
		};
	});
}

for (const placement of placements) {
	test(`the ${placement} arrow's box is the arrow, not a line box`, async ({
		page,
	}) => {
		await page.goto(`/?component=popover&fixture=popover-${placement}`);
		await page.evaluate(() => document.fonts.ready);

		const { wrapper, display } = await arrowGeometry(page);

		expect(display).toBe("block");
		expect(wrapper).toEqual(glyph);
	});
}

// Only the vertical placements: the horizontal ones are rotated a quarter turn
// by our own transform, so their rect deliberately sits off the popover's edge.
for (const [placement, arrowEdge, popoverEdge] of [
	["bottom", "bottom", "top"],
	["top", "top", "bottom"],
] as const) {
	test(`the ${placement} arrow sits flush against the popover`, async ({
		page,
	}) => {
		await page.goto(`/?component=popover&fixture=popover-${placement}`);
		await page.evaluate(() => document.fonts.ready);

		const { glyphRect, popoverPaddingBox } = await arrowGeometry(page);

		// The glyph, not its wrapper: an inline svg leaves the wrapper flush
		// against the popover and floats the arrow up inside it.
		expect(glyphRect[arrowEdge]).toBeCloseTo(popoverPaddingBox[popoverEdge], 1);
	});
}
