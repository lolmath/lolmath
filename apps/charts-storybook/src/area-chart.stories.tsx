import { AreaChart } from "@lolmath/charts";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	type DamageMinute,
	damageComposition,
	formatMinute,
	formatShortGold,
	goldTimeline,
} from "./data";

const meta = {
	title: "Charts/AreaChart",
	component: AreaChart<DamageMinute>,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Filled areas, for a composition over time. Stack when the parts " +
					"genuinely sum to something; overlay only two or three series, " +
					"because the ones behind stop being readable past that.",
			},
		},
	},
	argTypes: {
		curve: { control: "inline-radio", options: ["linear", "smooth", "step"] },
		stacked: { control: "boolean" },
		normalize: { control: "boolean" },
		stroke: { control: "boolean" },
		crosshair: { control: "boolean" },
		height: { control: { type: "range", min: 160, max: 520, step: 20 } },
	},
	args: {
		title: "Damage to champions",
		subtitle: "By damage type",
		data: damageComposition,
		x: (row: DamageMinute) => row.minute,
		series: [
			{ key: "physical", label: "Physical", value: (row) => row.physical },
			{ key: "magic", label: "Magic", value: (row) => row.magic },
			{ key: "true", label: "True", value: (row) => row.trueDamage },
		],
		xLabel: "Minute",
		yLabel: "Damage",
		formatX: formatMinute,
		formatY: formatShortGold,
		stacked: true,
	},
	render: (args) => (
		<div style={{ maxWidth: "44rem" }}>
			<AreaChart {...args} />
		</div>
	),
} satisfies Meta<typeof AreaChart<DamageMinute>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Stacked: Story = {};

/** Shares of the total rather than absolute damage. */
export const Normalized: Story = {
	args: { normalize: true, yLabel: "Share of damage", formatY: undefined },
};

export const Smooth: Story = {
	args: { curve: "smooth" },
};

/**
 * Overlaid rather than stacked: each area is a wash under a full-weight line,
 * so a series behind another is still readable.
 */
export const Overlaid: Story = {
	render: () => (
		<div style={{ maxWidth: "44rem" }}>
			<AreaChart
				title="Team gold"
				subtitle="Both sides, overlaid"
				data={goldTimeline}
				x={(row) => row.minute}
				series={[
					{ key: "blue", label: "Blue side", value: (row) => row.blue },
					{ key: "red", label: "Red side", value: (row) => row.red },
				]}
				xLabel="Minute"
				yLabel="Gold"
				formatX={formatMinute}
				formatY={formatShortGold}
			/>
		</div>
	),
};

/** One series, read as volume rather than as a trace. */
export const SingleSeries: Story = {
	render: () => (
		<div style={{ maxWidth: "44rem" }}>
			<AreaChart
				title="True damage"
				data={damageComposition}
				x={(row) => row.minute}
				series={[
					{ key: "true", label: "True", value: (row) => row.trueDamage },
				]}
				xLabel="Minute"
				yLabel="Damage"
				formatX={formatMinute}
				formatY={formatShortGold}
			/>
		</div>
	),
};
