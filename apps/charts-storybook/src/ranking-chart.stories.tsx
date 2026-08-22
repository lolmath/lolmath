import { RankingChart } from "@lolmath/charts";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ChampionDamage, formatShortGold, scoreboard } from "./data";

const meta = {
	title: "Charts/RankingChart",
	component: RankingChart<ChampionDamage>,
	tags: ["autodocs"],
	parameters: {
		docs: {
			description: {
				component:
					"The leaderboard shape: horizontal bars, longest on top, every " +
					"value written at its tip. Every bar wears the same hue on " +
					"purpose — colour follows the entity, never its rank, so a filter " +
					"that drops a row never repaints the survivors.",
			},
		},
	},
	argTypes: {
		order: {
			control: "inline-radio",
			options: ["descending", "ascending", "input"],
		},
		showValues: { control: "boolean" },
		axis: { control: "boolean" },
		limit: { control: { type: "range", min: 3, max: 8, step: 1 } },
	},
	args: {
		title: "Damage to champions",
		subtitle: "Post-game scoreboard",
		data: scoreboard,
		label: (row: ChampionDamage) => row.champion,
		value: (row: ChampionDamage) => row.damage,
		formatValue: formatShortGold,
		valueLabel: "Damage",
	},
	render: (args) => (
		<div style={{ maxWidth: "34rem" }}>
			<RankingChart {...args} />
		</div>
	),
} satisfies Meta<typeof RankingChart<ChampionDamage>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TopFive: Story = {
	args: { limit: 5 },
};

export const Ascending: Story = {
	args: { order: "ascending" },
};

/** With the measure axis and its grid turned on. */
export const WithAxis: Story = {
	args: { axis: true },
};

/**
 * A colour callback is for rows that *mean* something — the pick you are
 * highlighting, a positive against a negative delta — not for the ranking
 * itself.
 */
export const Highlighted: Story = {
	args: {
		subtitle: "Your champion picked out",
		color: (row: ChampionDamage) =>
			row.champion === "Camille"
				? "var(--lol-chart-series-2)"
				: "var(--lol-chart-series-1)",
	},
};

export const Unframed: Story = {
	args: { frame: false, title: undefined, subtitle: undefined },
};
