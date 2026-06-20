import { Button, type ButtonPreset } from "@lolmath/ui";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { fixtures } from "./fixtures";
import "@lolmath/ui/font/beaufort";
import "@lolmath/ui/font/spiegel";
import "@lolmath/ui/css";

// Kill transitions/animations so screenshots are deterministic, and the
// hover/active/focus states are captured at their final value.
const noMotion = document.createElement("style");
noMotion.textContent =
	"*, *::before, *::after { transition: none !important; animation: none !important; }";
document.head.appendChild(noMotion);

document.body.style.background = "#010A13";
document.body.style.margin = "0";

const fixtureStyle = {
	display: "inline-flex",
	alignItems: "flex-start",
	padding: "10px",
	background: "#010A13",
} as const;

const params = new URLSearchParams(window.location.search);

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

	const componentFixtures = component ? fixtures[component] : [];
	// Expose the fixture ids for this component so the Playwright spec (which
	// runs in Node and cannot import the CSS-laden component modules) can
	// discover them at runtime.
	(window as unknown as { __FIXTURE_IDS__: string[] }).__FIXTURE_IDS__ =
		componentFixtures.map((f) => f.id);
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
