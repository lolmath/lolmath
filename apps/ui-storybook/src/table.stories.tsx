import {
	Button,
	ResizableTableContainer,
	type SortDescriptor,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableColumnResizer,
	TableFooter,
	TableHeader,
	TableRow,
	TextField,
} from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";

interface Player {
	id: number;
	rank: number;
	summoner: string;
	tier: string;
	lp: number;
	wins: number;
	losses: number;
}

const topSoloDuoPlayers: Player[] = [
	{
		id: 1,
		rank: 1,
		summoner: "Faker",
		tier: "Challenger",
		lp: 1842,
		wins: 312,
		losses: 214,
	},
	{
		id: 2,
		rank: 2,
		summoner: "Chovy",
		tier: "Challenger",
		lp: 1735,
		wins: 288,
		losses: 199,
	},
	{
		id: 3,
		rank: 3,
		summoner: "Showmaker",
		tier: "Challenger",
		lp: 1690,
		wins: 274,
		losses: 205,
	},
	{
		id: 4,
		rank: 4,
		summoner: "Ruler",
		tier: "Grandmaster",
		lp: 1204,
		wins: 231,
		losses: 188,
	},
	{
		id: 5,
		rank: 5,
		summoner: "Keria",
		tier: "Grandmaster",
		lp: 1147,
		wins: 219,
		losses: 181,
	},
	{
		id: 6,
		rank: 6,
		summoner: "Deft",
		tier: "Master",
		lp: 892,
		wins: 198,
		losses: 176,
	},
];

const meta: Meta<typeof Table> = {
	title: "Data Display/Table",
	component: Table,
	tags: ["autodocs"],
	argTypes: {
		selectionMode: {
			control: { type: "select" },
			options: ["none", "single", "multiple"],
		},
		selectionBehavior: {
			control: { type: "select" },
			options: ["toggle", "replace"],
		},
	},
	args: {
		selectionMode: "none",
	},
	render: (args) => (
		<Table {...args} aria-label="Top Solo/Duo players">
			<TableHeader>
				<TableColumn id="rank" align="center">
					#
				</TableColumn>
				<TableColumn id="summoner" isRowHeader>
					Summoner
				</TableColumn>
				<TableColumn id="tier">Tier</TableColumn>
				<TableColumn id="lp" align="end">
					LP
				</TableColumn>
				<TableColumn id="wins" align="end">
					W
				</TableColumn>
				<TableColumn id="losses" align="end">
					L
				</TableColumn>
			</TableHeader>
			<TableBody items={topSoloDuoPlayers}>
				{(player) => (
					<TableRow>
						<TableCell align="center">{player.rank}</TableCell>
						<TableCell>{player.summoner}</TableCell>
						<TableCell>{player.tier}</TableCell>
						<TableCell align="end">{player.lp}</TableCell>
						<TableCell align="end">{player.wins}</TableCell>
						<TableCell align="end">{player.losses}</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: {} };

export const SingleSelection: Story = {
	args: { selectionMode: "single", defaultSelectedKeys: [3] },
};

export const MultipleSelection: Story = {
	args: { selectionMode: "multiple", defaultSelectedKeys: [1, 4] },
};

/** `selectionBehavior="replace"` swaps the checkbox column for row clicks. */
export const HighlightSelection: Story = {
	args: {
		selectionMode: "multiple",
		selectionBehavior: "replace",
		defaultSelectedKeys: [2],
	},
};

export const DisabledRows: Story = {
	args: { selectionMode: "multiple", disabledKeys: [2, 5] },
};

export const Sorting: Story = {
	render: (args) => {
		const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
			column: "lp",
			direction: "descending",
		});

		const items = useMemo(() => {
			const column = sortDescriptor.column as keyof Player;
			return [...topSoloDuoPlayers].sort((a, b) => {
				const first = a[column];
				const second = b[column];
				const compared =
					typeof first === "number" && typeof second === "number"
						? first - second
						: String(first).localeCompare(String(second));
				return sortDescriptor.direction === "descending" ? -compared : compared;
			});
		}, [sortDescriptor]);

		return (
			<Table
				{...args}
				aria-label="Top Solo/Duo players"
				sortDescriptor={sortDescriptor}
				onSortChange={setSortDescriptor}
			>
				<TableHeader>
					<TableColumn id="rank" align="center" allowsSorting>
						#
					</TableColumn>
					<TableColumn id="summoner" isRowHeader allowsSorting>
						Summoner
					</TableColumn>
					<TableColumn id="tier" allowsSorting>
						Tier
					</TableColumn>
					<TableColumn id="lp" align="end" allowsSorting>
						LP
					</TableColumn>
				</TableHeader>
				<TableBody items={items}>
					{(player) => (
						<TableRow>
							<TableCell align="center">{player.rank}</TableCell>
							<TableCell>{player.summoner}</TableCell>
							<TableCell>{player.tier}</TableCell>
							<TableCell align="end">{player.lp}</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		);
	},
	args: {},
};

export const WithFooter: Story = {
	render: (args) => (
		<Table {...args} aria-label="Top Solo/Duo players">
			<TableHeader>
				<TableColumn id="summoner" isRowHeader>
					Summoner
				</TableColumn>
				<TableColumn id="wins" align="end">
					W
				</TableColumn>
				<TableColumn id="losses" align="end">
					L
				</TableColumn>
			</TableHeader>
			<TableBody items={topSoloDuoPlayers}>
				{(player) => (
					<TableRow>
						<TableCell>{player.summoner}</TableCell>
						<TableCell align="end">{player.wins}</TableCell>
						<TableCell align="end">{player.losses}</TableCell>
					</TableRow>
				)}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell>Total</TableCell>
					<TableCell align="end">
						{topSoloDuoPlayers.reduce((sum, p) => sum + p.wins, 0)}
					</TableCell>
					<TableCell align="end">
						{topSoloDuoPlayers.reduce((sum, p) => sum + p.losses, 0)}
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	),
	args: {},
};

export const Resizable: Story = {
	render: (args) => (
		<ResizableTableContainer>
			<Table {...args} aria-label="Top Solo/Duo players">
				<TableHeader>
					<TableColumn id="summoner" isRowHeader defaultWidth="2fr">
						Summoner
						<TableColumnResizer />
					</TableColumn>
					<TableColumn id="tier" defaultWidth="1fr">
						Tier
						<TableColumnResizer />
					</TableColumn>
					<TableColumn id="lp" align="end" defaultWidth="1fr">
						LP
					</TableColumn>
				</TableHeader>
				<TableBody items={topSoloDuoPlayers}>
					{(player) => (
						<TableRow>
							<TableCell>{player.summoner}</TableCell>
							<TableCell>{player.tier}</TableCell>
							<TableCell align="end">{player.lp}</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</ResizableTableContainer>
	),
	args: {},
};

/**
 * A table's arrow keys normally move between cells, which leaves no way to move
 * the caret inside a textfield in one. `keyboardNavigationBehavior="tab"` hands
 * the arrows back to the cell's own content — left and right move the caret
 * through the note below rather than jumping to the next cell — and moves focus
 * between the row's controls with Tab instead.
 */
export const EditableCells: Story = {
	args: { keyboardNavigationBehavior: "tab" },
	render: (args) => (
		<Table {...args} aria-label="Runes">
			<TableHeader>
				<TableColumn id="rune" isRowHeader>
					Rune
				</TableColumn>
				<TableColumn id="note">Note</TableColumn>
				<TableColumn id="actions" align="end">
					Actions
				</TableColumn>
			</TableHeader>
			<TableBody
				items={[
					{ id: 1, rune: "Conqueror" },
					{ id: 2, rune: "Electrocute" },
					{ id: 3, rune: "Grasp of the Undying" },
				]}
			>
				{(item) => (
					<TableRow>
						<TableCell>{item.rune}</TableCell>
						<TableCell>
							<TextField
								size="small"
								aria-label={`Note for ${item.rune}`}
								defaultValue="Try the arrow keys in here"
							/>
						</TableCell>
						<TableCell align="end">
							<Button
								size="small"
								preset="dimmed"
								onPress={() => alert(`reset ${item.rune}`)}
							>
								Reset
							</Button>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	),
};

export const Empty: Story = {
	render: (args) => (
		<Table {...args} aria-label="Top Solo/Duo players">
			<TableHeader>
				<TableColumn id="summoner" isRowHeader>
					Summoner
				</TableColumn>
				<TableColumn id="lp" align="end">
					LP
				</TableColumn>
			</TableHeader>
			<TableBody items={[]} emptyState="No ranked players yet">
				{() => (
					<TableRow>
						<TableCell />
					</TableRow>
				)}
			</TableBody>
		</Table>
	),
	args: {},
};
