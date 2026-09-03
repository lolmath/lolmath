import type { Preview } from "@storybook/react-vite";
import { themes } from "storybook/theming";
import "../src/stories.css";
import "@lolmath/ui/font/beaufort";
import "@lolmath/ui/font/spiegel";
import "@lolmath/ui/css";

const preview: Preview = {
	parameters: {
		backgrounds: {
			options: {
				hextechBlack: { name: "Hextech Black", value: "#010A13" },
				darkBlueGradient: {
					name: "Dark Blue Gradient",
					value: "linear-gradient(180deg, #091428 0%, #0A1428 100%)",
				},
				dark: { name: "Dark", value: "#333" },
				light: { name: "Light", value: "#F7F9F2" },
			},
		},
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		tags: ["autodocs"],

		docs: {
			theme: themes.dark,
		},
		options: {
			storySort: {
				order: [
					"Foundations",
					"Inputs",
					"Buttons",
					"Navigation",
					"Overlays",
					"Feedback",
					"Data Display",
					"Charts",
					"Typography",
					"Layout",
					"Examples",
				],
			},
		},
	},
	initialGlobals: {
		backgrounds: { value: "hextechBlack" },
	},
};

export default preview;
