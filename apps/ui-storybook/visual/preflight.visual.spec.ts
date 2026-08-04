import { test } from "@playwright/test";
import {
	buttonPresets,
	componentNames,
	expectPreflightParity,
	expectPresetPreflightParity,
} from "./harness";

// @lolmath/ui used to lean on Tailwind's preflight without saying so: bare
// <button>s fell back to the UA's `buttonface` slab (grey under
// `color-scheme: dark`), the popover arrow sat on a text baseline and floated
// off the popover, and headings, <hr>s and the breadcrumb <ol> kept their UA
// margins. Every one of those is now set on the library's own elements, inside
// `@layer lol`, so the same fixtures have to render identically either way.
//
// The storybook itself is a bare consumer, so this is the only place the reset
// is ever loaded — which is what keeps the dependency from creeping back in.
for (const component of componentNames) {
	test(`${component} is unchanged by a CSS reset`, async ({ page }) => {
		await expectPreflightParity(page, component);
	});
}

for (const preset of buttonPresets) {
	test(`button/${preset} is unchanged by a CSS reset`, async ({ page }) => {
		await expectPresetPreflightParity(page, preset);
	});
}
