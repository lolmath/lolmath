import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import "../src/tailwind.css";
import "@lolmath/ui/font/beaufort";
import "@lolmath/ui/font/spiegel";
import "@lolmath/ui/css";

const preview: Preview = {
	parameters: {
		backgrounds: {
			default: "hextech-black",
			values: [
				{
					name: "hextech-black",
					value: "#010A13",
				},
				{
					name: "dark-blue-gradient",
					value: "linear-gradient(180deg, #091428 0%, #0A1428 100%)",
				},
			],
		},
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		docs: {
			theme: themes.dark,
		},
	},
};

export default preview;
