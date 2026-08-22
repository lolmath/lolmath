import { BarChart } from "@lolmath/charts";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	formatPercent,
	patchWinRates,
	type RoleRow,
	roleEconomy,
} from "./data";

const meta = {
	title: "Charts/BarChart",
	component: BarChart<RoleRow>,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"Columns over categories. Neighbouring bars are separated by a gap " +
					"in the surface rather than by an outline — a stroke around a bar " +
					"is ink that carries no data.",
			},
		},
	},
	argTypes: {
		layout: { control: "inline-radio", options: ["grouped", "stacked"] },
		normalize: { control: "boolean" },
		radius: { control: { type: "range", min: 0, max: 8, step: 1 } },
		maxThickness: { control: { type: "range", min: 8, max: 64, step: 4 } },
		height: { control: { type: "range", min: 160, max: 520, step: 20 } },
	},
	args: {
		title: "Economy by role",
		subtitle: "Per minute, averaged over the game",
		data: roleEconomy,
		x: (row: RoleRow) => row.role,
		series: [
			{ key: "gold", label: "Gold / min", value: (row) => row.gold },
			{ key: "xp", label: "XP / min", value: (row) => row.experience },
		],
		xLabel: "Role",
		yLabel: "Per minute",
	},
	render: (args) => (
		<div style={{ maxWidth: "40rem" }}>
			<BarChart {...args} />
		</div>
	),
} satisfies Meta<typeof BarChart<RoleRow>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Grouped: Story = {};

export const Stacked: Story = {
	args: { layout: "stacked" },
};

export const Normalized: Story = {
	args: { layout: "stacked", normalize: true, yLabel: "Share" },
};

/** One series, no legend — the title carries the identity. */
export const SingleSeries: Story = {
	args: {
		title: "Gold per minute",
		subtitle: undefined,
		series: [{ key: "gold", label: "Gold / min", value: (row) => row.gold }],
		yLabel: "Gold / min",
	},
};

/**
 * Rounded ends are available but off by default: Hextech geometry is square
 * and chamfered, and the square is what sits things on the grid.
 */
export const Rounded: Story = {
	args: { radius: 4 },
};

/** A series that *means* something wears a reserved colour rather than a slot. */
export const StatusColored: Story = {
	render: () => (
		<div style={{ maxWidth: "40rem" }}>
			<BarChart
				title="Win rate against 50%"
				subtitle="Above and below even, by patch"
				data={patchWinRates}
				x={(row) => row.patch}
				series={[
					{
						key: "delta",
						label: "Win rate delta",
						value: (row) => row.winRate - 0.5,
						color: "var(--lol-chart-positive)",
					},
				]}
				xLabel="Patch"
				yLabel="Delta"
				formatY={formatPercent}
			/>
		</div>
	),
};
