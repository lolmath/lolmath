import { ChartLegend } from "@lolmath/charts";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Building Blocks/ChartLegend",
	component: ChartLegend,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Diamond swatches and text in ink. The label never wears the " +
					"series colour: a light teal or gold would not clear contrast as " +
					"text, and the swatch beside it already carries the identity.",
			},
		},
	},
	argTypes: {
		swatch: { control: "inline-radio", options: ["diamond", "square", "line"] },
	},
	args: {
		items: [
			{ key: "1", label: "Physical", color: "var(--lol-chart-series-1)" },
			{ key: "2", label: "Magic", color: "var(--lol-chart-series-2)" },
			{ key: "3", label: "True", color: "var(--lol-chart-series-3)" },
		],
	},
} satisfies Meta<typeof ChartLegend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Diamond: Story = {};

export const Square: Story = {
	args: { swatch: "square" },
};

export const Line: Story = {
	args: { swatch: "line" },
};

/** The full palette, in slot order. */
export const EverySlot: Story = {
	args: {
		items: Array.from({ length: 6 }, (_, index) => ({
			key: String(index + 1),
			label: `Series ${index + 1}`,
			color: `var(--lol-chart-series-${index + 1})`,
		})),
	},
};
