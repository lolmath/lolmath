import { Button, type ButtonPreset } from "@lolmath/ui";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@lolmath/ui/font/beaufort";
import "@lolmath/ui/font/spiegel";
import "@lolmath/ui/css";

const presets: ButtonPreset[] = [
	"primary",
	"secondary",
	"hextech",
	"dimmed",
	"text",
];

const params = new URLSearchParams(window.location.search);
const requested = params.get("preset") as ButtonPreset | null;
const activePresets = requested ? [requested] : presets;

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
	alignItems: "center",
	padding: "10px",
	background: "#010A13",
} as const;

// Force the LoL dark theme background behind every fixture too, so the
// CSS variables that key off the theme resolve identically to Storybook.
const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error("Missing #root element");
}

createRoot(rootElement).render(
	<StrictMode>
		{activePresets.map((preset) => (
			<div
				key={preset}
				data-testid={`fixture-${preset}`}
				style={{ ...fixtureStyle }}
			>
				<Button preset={preset}>{preset}</Button>
			</div>
		))}
		{activePresets.map((preset) => (
			<div
				key={`${preset}-disabled`}
				data-testid={`fixture-${preset}-disabled`}
				style={{ ...fixtureStyle }}
			>
				<Button preset={preset} isDisabled>
					{preset}
				</Button>
			</div>
		))}
	</StrictMode>,
);
