import { test } from "@playwright/test";
import { captureComponent, componentNames } from "./harness";

// Each component's fixtures already encode its meaningful states via props
// (e.g. switch off/on/disabled, checkbox unchecked/selected/indeterminate,
// disclosure collapsed/expanded, slider single/range). We capture the
// as-rendered appearance of each fixture. Interaction pseudo-states
// (hover/focus/active) for Button are covered in button.visual.spec.ts, and
// preflight.visual.spec.ts re-renders the same fixtures with a CSS reset.
for (const component of componentNames) {
	test(`${component} visual states`, async ({ page }) => {
		await captureComponent(page, component);
	});
}
