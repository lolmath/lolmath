import { LineChart } from "@lolmath/charts";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	formatGold,
	formatMinute,
	formatPercent,
	formatShortGold,
	type GoldMinute,
	goldTimeline,
	patchWinRates,
} from "./data";

const meta = {
	title: "Charts/LineChart",
	component: LineChart<GoldMinute>,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Lines over time. Every series at the hovered x is shown at once, " +
					"because the reason to draw two gold curves is to compare them.",
			},
		},
	},
	argTypes: {
		curve: {
			control: "inline-radio",
			options: ["linear", "smooth", "step"],
			description: "How the line travels between points.",
		},
		points: { control: "boolean" },
		area: { control: "boolean" },
		crosshair: { control: "boolean" },
		grid: { control: "boolean" },
		frame: { control: "boolean" },
		glow: { control: "boolean" },
		height: { control: { type: "range", min: 160, max: 520, step: 20 } },
	},
	args: {
		title: "Team gold",
		subtitle: "Ranked solo queue · patch 14.7",
		data: goldTimeline,
		x: (row: GoldMinute) => row.minute,
		series: [
			{ key: "blue", label: "Blue side", value: (row) => row.blue },
			{ key: "red", label: "Red side", value: (row) => row.red },
		],
		xLabel: "Minute",
		yLabel: "Gold",
		formatX: formatMinute,
		formatY: formatShortGold,
	},
	render: (args) => (
		<div style={{ maxWidth: "44rem" }}>
			<LineChart {...args} />
		</div>
	),
} satisfies Meta<typeof LineChart<GoldMinute>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Smooth: Story = {
	args: { curve: "smooth" },
};

export const Stepped: Story = {
	args: { curve: "step" },
};

export const WithPoints: Story = {
	args: { points: true },
};

export const WithArea: Story = {
	args: { area: true },
};

/** One series needs no legend: the title already says what is plotted. */
export const SingleSeries: Story = {
	args: {
		title: "Gold lead",
		subtitle: "Blue side, relative to red",
		series: [
			{
				key: "lead",
				label: "Gold lead",
				value: (row) => row.blue - row.red,
			},
		],
		yLabel: "Gold difference",
		formatY: formatGold,
	},
};

/** Unframed, for a chart that already sits inside a panel of its own. */
export const Unframed: Story = {
	args: { frame: false, title: undefined, subtitle: undefined },
};

export const NoGrid: Story = {
	args: { grid: false },
};

/**
 * A categorical x and a measure that is not gold. `formatY` reaches the axis,
 * the crosshair and the tooltip from one place.
 */
export const CategoricalX: Story = {
	render: () => (
		<div style={{ maxWidth: "44rem" }}>
			<LineChart
				title="Win rate"
				subtitle="Last seven patches"
				data={patchWinRates}
				x={(row) => row.patch}
				series={[
					{ key: "winRate", label: "Win rate", value: (row) => row.winRate },
					{ key: "pickRate", label: "Pick rate", value: (row) => row.pickRate },
				]}
				xLabel="Patch"
				yLabel="Rate"
				formatY={formatPercent}
				points
			/>
		</div>
	),
};
