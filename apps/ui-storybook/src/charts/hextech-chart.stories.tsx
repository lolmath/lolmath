import {
	barY,
	ChartFrame,
	defineChart,
	dot,
	HextechChart,
	lineY,
	ruleY,
	scaleBand,
	scaleLinear,
	scalePoint,
	tooltip,
} from "@lolmath/ui/charts";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { formatShortGold, goldTimeline, scoreboard } from "./data";

/** The plainest definition there is, used as the default args below. */
const blueGoldChart = defineChart({
	marks: [
		lineY(goldTimeline, {
			x: (row) => row.minute,
			y: (row) => row.blue,
			stroke: "var(--lol-chart-series-1)",
			strokeWidth: 2,
		}),
	],
	x: { scale: scaleLinear, nice: true, axis: { label: "Minute" } },
	y: {
		scale: scaleLinear,
		nice: true,
		grid: true,
		axis: { label: "Gold", ticks: { format: formatShortGold } },
	},
	tooltip,
});

const meta = {
	title: "Charts/Building Blocks/HextechChart",
	component: HextechChart,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"The escape hatch. Write a `defineChart` definition against the " +
					"TanStack Charts grammar and `HextechChart` merges the Hextech " +
					"theme into it, so a chart shape the library does not ship still " +
					"looks like the ones it does. Anything the definition sets for " +
					"itself wins.",
			},
		},
	},
	argTypes: {
		glow: { control: "boolean" },
		height: { control: { type: "range", min: 160, max: 520, step: 20 } },
	},
	args: {
		definition: blueGoldChart,
		height: 240,
		ariaLabel: "Blue side gold by minute",
	},
	render: (args) => (
		<div style={{ maxWidth: "40rem" }}>
			<HextechChart {...args} />
		</div>
	),
} satisfies Meta<typeof HextechChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A definition of your own, themed but unframed. */
export const Default: Story = {};

/**
 * A diverging bar chart, which the library ships no component for. The gold
 * lead swings either side of a zero rule, and each bar wears a reserved status
 * colour because the sign is the whole point.
 */
export const DivergingBars: Story = {
	render: () => {
		const rows = goldTimeline.map((row) => ({
			minute: row.minute,
			lead: row.blue - row.red,
		}));

		const chart = defineChart({
			marks: [
				barY(rows, {
					x: (row) => row.minute,
					y: (row) => row.lead,
					fill: (row) =>
						row.lead >= 0
							? "var(--lol-chart-positive)"
							: "var(--lol-chart-negative)",
					inset: 1,
					maxThickness: 24,
				}),
				ruleY([0], {
					stroke: "var(--lol-chart-frame-accent)",
					strokeOpacity: 0.5,
				}),
			],
			x: {
				scale: () =>
					scaleBand<number>()
						.domain(rows.map((row) => row.minute))
						.padding(0.24),
				axis: { label: "Minute" },
			},
			y: {
				scale: scaleLinear,
				nice: true,
				grid: true,
				axis: { label: "Gold lead", ticks: { format: formatShortGold } },
			},
			tooltip,
		});

		return (
			<div style={{ maxWidth: "44rem" }}>
				<ChartFrame title="Gold lead" subtitle="Blue side, relative to red">
					<HextechChart
						definition={chart}
						height={260}
						ariaLabel="Gold lead by minute"
					/>
				</ChartFrame>
			</div>
		);
	},
};

/**
 * A lollipop, from the TanStack "bars and rankings" catalogue: a thin rule out
 * to a dot, which reads cleaner than a bar when the categories are few and the
 * values are what matter.
 */
export const Lollipop: Story = {
	render: () => {
		const rows = [...scoreboard]
			.sort((a, b) => b.damage - a.damage)
			.slice(0, 5);

		const chart = defineChart({
			marks: [
				lineY(
					rows.flatMap((row) => [
						{ champion: row.champion, damage: 0 },
						{ champion: row.champion, damage: row.damage },
					]),
					{
						x: (row) => row.champion,
						y: (row) => row.damage,
						z: (row) => row.champion,
						stroke: "var(--lol-chart-series-1)",
						strokeOpacity: 0.55,
						strokeWidth: 2,
					},
				),
				dot(rows, {
					x: (row) => row.champion,
					y: (row) => row.damage,
					r: 5,
					fill: "var(--lol-chart-series-1)",
					stroke: "var(--lol-chart-surface)",
					strokeWidth: 2,
				}),
			],
			x: {
				scale: () =>
					scalePoint<string>()
						.domain(rows.map((row) => row.champion))
						.padding(0.5),
				axis: { label: "Champion" },
			},
			y: {
				scale: scaleLinear,
				nice: true,
				grid: true,
				axis: { label: "Damage", ticks: { format: formatShortGold } },
			},
			tooltip,
		});

		return (
			<div style={{ maxWidth: "40rem" }}>
				<ChartFrame title="Damage to champions" subtitle="Top five">
					<HextechChart
						definition={chart}
						height={260}
						ariaLabel="Damage to champions by champion"
					/>
				</ChartFrame>
			</div>
		);
	},
};

/** The bloom turned off, for a chart dense enough that it would read as haze. */
export const WithoutGlow: Story = {
	args: { glow: false },
};
