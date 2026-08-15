import { Text, VerticalTable, type VerticalTableField } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

interface Player {
	id: number;
	summoner: string;
	tier: string;
	lp: number;
	wins: number;
	losses: number;
}

const topSoloDuoPlayers: Player[] = [
	{
		id: 1,
		summoner: "Faker",
		tier: "Challenger",
		lp: 1842,
		wins: 312,
		losses: 214,
	},
	{
		id: 2,
		summoner: "Chovy",
		tier: "Challenger",
		lp: 1735,
		wins: 288,
		losses: 199,
	},
	{
		id: 3,
		summoner: "Ruler",
		tier: "Grandmaster",
		lp: 1204,
		wins: 231,
		losses: 188,
	},
	{ id: 4, summoner: "Deft", tier: "Master", lp: 892, wins: 198, losses: 176 },
];

const winRate = (player: Player) =>
	`${Math.round((player.wins / (player.wins + player.losses)) * 100)}%`;

const playerFields: VerticalTableField<Player>[] = [
	{ id: "tier", name: "Tier", value: (player) => player.tier },
	{ id: "lp", name: "LP", value: (player) => player.lp },
	{ id: "wins", name: "W", value: (player) => player.wins },
	{ id: "losses", name: "L", value: (player) => player.losses },
	{ id: "winrate", name: "Win rate", value: winRate },
];

const meta: Meta<typeof VerticalTable<Player>> = {
	title: "Data Display/Vertical Table",
	component: VerticalTable,
	tags: ["autodocs"],
	argTypes: {
		align: {
			control: { type: "select" },
			options: ["start", "center", "end"],
		},
	},
	args: {
		"aria-label": "Top Solo/Duo players compared",
		align: "end",
		fields: playerFields,
		recordHeader: (player) => player.summoner,
		recordKey: (player) => player.id,
		records: topSoloDuoPlayers,
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The table read down rather than across: a row per field, a column per record.
 * The data goes in the way it comes — one object per record — and the component
 * does the flip, so nothing has to be pivoted by hand to lay it out this way.
 *
 * This is a `<table>` and no more. `Table` is React Aria's grid, whose rows can
 * be selected, sorted, resized and dragged; those all act on rows, and a row
 * here is a *field*, so they would act on the wrong axis. Reach for `Table`
 * the moment the rows have to be interacted with.
 */
export const Primary: Story = {};

/**
 * Leave `recordHeader` out and there is no header row: with one record there is
 * nothing to call its column, and the field names already head their own rows,
 * so nothing goes unnamed by dropping it. What is left is the stat card that is
 * a table underneath.
 */
export const StatCard: Story = {
	args: {
		"aria-label": "Faker",
		recordHeader: undefined,
		records: topSoloDuoPlayers.slice(0, 1),
	},
};

/**
 * `align` places the values and the record names alike — `"end"` for the
 * columns of numbers a comparison usually is. A field that reads differently
 * from the rest overrides it for its own row.
 */
export const Alignment: Story = {
	args: {
		align: "end",
		fields: [
			{
				id: "tier",
				name: "Tier",
				value: (player) => player.tier,
				align: "start",
			},
			{ id: "lp", name: "LP", value: (player) => player.lp },
			{ id: "winrate", name: "Win rate", value: winRate, align: "center" },
		],
	},
};

/**
 * A field's `value` returns a node, not just text, so a cell holds whatever the
 * field is best shown as.
 */
export const RichValues: Story = {
	args: {
		fields: [
			{
				id: "tier",
				name: "Tier",
				value: (player) => <Text color="gold100">{player.tier}</Text>,
			},
			{ id: "lp", name: "LP", value: (player) => player.lp },
			{
				id: "record",
				name: "Record",
				value: (player) => (
					<Text color="grey150">
						{player.wins}W {player.losses}L
					</Text>
				),
			},
		],
	},
};
