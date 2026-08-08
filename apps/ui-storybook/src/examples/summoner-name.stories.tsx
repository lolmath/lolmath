import { Group, GroupInput, GroupSeparator, Label } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Examples/Summoner Name",
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A Riot ID is a game name plus a `#`-prefixed tag (e.g. `Faker#KR1`). `Group`
 * merges the two inputs into a single bordered field, while each `GroupInput`
 * keeps its own `aria-label` so screen readers can tell them apart.
 */
export const SummonerName: Story = {
	render: () => (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "0.25rem",
				width: "16rem",
			}}
		>
			<Label id="summoner-name-label">Summoner name</Label>
			<Group aria-labelledby="summoner-name-label">
				<GroupInput
					aria-label="Game name"
					placeholder="Game name"
					maxLength={16}
					style={{ flex: 1 }}
				/>
				<GroupSeparator>#</GroupSeparator>
				<GroupInput
					aria-label="Tag"
					placeholder="TAG"
					maxLength={5}
					style={{ width: "4.5rem", flex: "none" }}
				/>
			</Group>
		</div>
	),
};
