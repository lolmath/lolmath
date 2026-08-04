import { Button, type ButtonPreset } from "@lolmath/ui";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { fixtures } from "./fixtures";
import { installPreflight } from "./preflight";
import "@lolmath/ui/font/beaufort";
import "@lolmath/ui/font/spiegel";
import "@lolmath/ui/css";

const params = new URLSearchParams(window.location.search);

if (params.has("preflight")) {
	installPreflight();
}

// Kill transitions/animations so screenshots are deterministic, and the
// hover/active/focus states are captured at their final value.
const noMotion = document.createElement("style");
noMotion.textContent =
	"*, *::before, *::after { transition: none !important; animation: none !important; }";
document.head.appendChild(noMotion);

// Pin the typography a host would decide for itself. Preflight sets a sans
// stack and `line-height: 1.5` on <html>; the UA sets a serif stack and
// `normal`. That difference belongs to the host, not to us, so both variants
// get the same base and the parity spec is left comparing our own elements.
// Unlayered, so it beats preflight either way.
const hostBase = document.createElement("style");
hostBase.textContent =
	"html { font-family: var(--lol-font-family-spiegel), sans-serif; font-size: 16px; line-height: normal; }";
document.head.appendChild(hostBase);

document.body.style.background = "#010A13";
document.body.style.margin = "0";

const fixtureStyle = {
	display: "inline-flex",
	alignItems: "flex-start",
	padding: "10px",
	background: "#010A13",
} as const;

export interface FixtureInfo {
	id: string;
	fullPage: boolean;
}

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error("Missing #root element");
}

function App() {
	const preset = params.get("preset") as ButtonPreset | null;
	const component = params.get("component");

	if (preset) {
		return (
			<>
				<div data-testid={`fixture-${preset}`} style={fixtureStyle}>
					<Button preset={preset}>{preset}</Button>
				</div>
				<div data-testid={`fixture-${preset}-disabled`} style={fixtureStyle}>
					<Button preset={preset} isDisabled>
						{preset}
					</Button>
				</div>
			</>
		);
	}

	const only = params.get("fixture");
	const all = component ? (fixtures[component] ?? []) : [];
	// Expose this component's fixtures so the Playwright specs (which run in Node
	// and cannot import the CSS-laden component modules) can discover them at
	// runtime.
	(window as unknown as { __FIXTURES__: FixtureInfo[] }).__FIXTURES__ = all.map(
		({ id, fullPage }) => ({ id, fullPage: fullPage ?? false }),
	);

	// A single fixture per page for anything portalled: two open popovers on one
	// page would sit on top of each other.
	const componentFixtures = only ? all.filter((f) => f.id === only) : all;
	return (
		<>
			{componentFixtures.map((fixture) => (
				<div
					key={fixture.id}
					data-testid={`fixture-${fixture.id}`}
					style={{ ...fixtureStyle, ...fixture.style }}
				>
					{fixture.node}
				</div>
			))}
		</>
	);
}

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
