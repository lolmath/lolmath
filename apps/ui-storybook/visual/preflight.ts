import preflight from "tailwindcss/preflight.css?raw";

/**
 * Turn Tailwind's preflight on for the current page (`?preflight=1`).
 *
 * The harness is a bare consumer by default: no CSS reset at all. The parity
 * spec loads the same fixtures again with preflight on and diffs them against
 * the bare baselines, so any rule of ours that silently leans on the reset
 * turns into a pixel diff.
 *
 * `@layer lol` is registered the moment `@lolmath/ui/css` is imported, so the
 * layer-order declaration has to be *prepended* to <head> to land ahead of it
 * in document order. That reproduces the order the readme tells consumers to
 * use, where `lol` outranks `base` and therefore preflight.
 */
export function installPreflight() {
	const order = document.createElement("style");
	order.textContent = "@layer theme, base, components, lol, utilities;";
	document.head.prepend(order);

	const base = document.createElement("style");
	base.textContent = `@layer base {\n${preflight}\n}`;
	document.head.append(base);
}
