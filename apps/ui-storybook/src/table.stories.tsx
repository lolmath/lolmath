import {
	Button,
	Collection,
	type DropItem,
	isTextDropItem,
	type Key,
	ResizableTableContainer,
	type Selection,
	type SortDescriptor,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableColumnResizer,
	TableFooter,
	TableHeader,
	TableLayout,
	TableLoadMoreItem,
	TableRow,
	Text,
	TextField,
	useAsyncList,
	useListData,
	useTableDragAndDrop,
	Virtualizer,
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

/**
 * `align` is set on both the column and its cells: the column header carries no
 * alignment of its own, so a number column that is not aligned on both ends up
 * with its heading over the wrong edge.
 */
export const Alignment: Story = {
	render: (args) => (
		<Table {...args} aria-label="Alignment">
			<TableHeader>
				<TableColumn id="summoner" isRowHeader>
					Start
				</TableColumn>
				<TableColumn id="tier" align="center">
					Center
				</TableColumn>
				<TableColumn id="lp" align="end">
					End
				</TableColumn>
			</TableHeader>
			<TableBody items={topSoloDuoPlayers.slice(0, 3)}>
				{(player) => (
					<TableRow>
						<TableCell>{player.summoner}</TableCell>
						<TableCell align="center">{player.tier}</TableCell>
						<TableCell align="end">{player.lp}</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	),
	args: {},
};

interface PlayerColumn {
	id: keyof Player;
	name: string;
	align?: "start" | "center" | "end";
	isRowHeader?: boolean;
}

const playerColumns: PlayerColumn[] = [
	{ id: "rank", name: "#", align: "center" },
	{ id: "summoner", name: "Summoner", isRowHeader: true },
	{ id: "tier", name: "Tier" },
	{ id: "lp", name: "LP", align: "end" },
];

/**
 * Columns and rows both take an `items` list and a render function, so a table
 * whose shape comes from data — a stat table whose columns depend on the queue,
 * say — never has to be written out by hand. A dynamic row needs an `id`, which
 * `items` takes from each object's `id` or `key`.
 */
export const DynamicCollection: Story = {
	render: (args) => (
		<Table {...args} aria-label="Top Solo/Duo players">
			<TableHeader columns={playerColumns}>
				{(column) => (
					<TableColumn align={column.align} isRowHeader={column.isRowHeader}>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={topSoloDuoPlayers}>
				{(player) => (
					<TableRow columns={playerColumns}>
						{(column) => (
							<TableCell align={column.align}>{player[column.id]}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	),
	args: {},
};

export const SingleSelection: Story = {
	args: { selectionMode: "single", defaultSelectedKeys: [3] },
};

/** `selectionMode="multiple"` adds a checkbox to every row and to the header. */
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

/** `selectedKeys` and `onSelectionChange` put the selection in React state. */
export const ControlledSelection: Story = {
	render: (args) => {
		const [selectedKeys, setSelectedKeys] = useState<Selection>(
			new Set([2, 3]),
		);
		const count = selectedKeys === "all" ? "all" : selectedKeys.size;

		return (
			<div style={{ display: "grid", gap: "0.5rem" }}>
				<Table
					{...args}
					aria-label="Top Solo/Duo players"
					onSelectionChange={setSelectedKeys}
					selectedKeys={selectedKeys}
				>
					<TableHeader>
						<TableColumn id="summoner" isRowHeader>
							Summoner
						</TableColumn>
						<TableColumn id="tier">Tier</TableColumn>
						<TableColumn id="lp" align="end">
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
				<Text color="grey150">{count} selected</Text>
			</div>
		);
	},
	args: { selectionMode: "multiple" },
};

/**
 * `disallowEmptySelection` keeps one row selected: clicking the selected row
 * again, or pressing Escape, leaves it as it is.
 */
export const DisallowEmptySelection: Story = {
	args: {
		selectionMode: "single",
		disallowEmptySelection: true,
		defaultSelectedKeys: [1],
	},
};

/** `disabledKeys` takes the rows out of selection, actions and focus alike. */
export const DisabledRows: Story = {
	args: { selectionMode: "multiple", disabledKeys: [2, 5] },
};

/**
 * `disabledBehavior="selection"` narrows that to selection only: the rows stay
 * focusable, still fire `onRowAction`, and only their checkbox is disabled.
 */
export const DisabledSelectionOnly: Story = {
	args: {
		selectionMode: "multiple",
		disabledBehavior: "selection",
		disabledKeys: [2, 5],
	},
};

/**
 * Escape clears the selection by default. `escapeKeyBehavior="none"` keeps it,
 * for a table inside something that handles Escape itself — a modal that should
 * close on the first press rather than the second.
 */
export const EscapeKeyBehavior: Story = {
	args: {
		selectionMode: "multiple",
		escapeKeyBehavior: "none",
		defaultSelectedKeys: [1],
	},
};

/**
 * `onRowAction` fires on the interaction that is not selection: a click when
 * nothing is selectable, a double click when rows are selected by highlight, or
 * Enter from the keyboard.
 */
export const RowActions: Story = {
	render: (args) => {
		const [lastAction, setLastAction] = useState<Key | null>(null);

		return (
			<div style={{ display: "grid", gap: "0.5rem" }}>
				<Table
					{...args}
					aria-label="Top Solo/Duo players"
					onRowAction={setLastAction}
				>
					<TableHeader>
						<TableColumn id="summoner" isRowHeader>
							Summoner
						</TableColumn>
						<TableColumn id="tier">Tier</TableColumn>
						<TableColumn id="lp" align="end">
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
				<Text color="grey150">
					{lastAction === null
						? "No row opened yet"
						: `Opened row ${lastAction}`}
				</Text>
			</div>
		);
	},
	args: {},
};

/**
 * A row with an `href` is a link: it opens on click, has a link's context menu,
 * and is announced as one. Client side routing goes through a `RouterProvider`
 * at the root of the app rather than through the row.
 */
export const Links: Story = {
	render: (args) => (
		<Table {...args} aria-label="Top Solo/Duo players">
			<TableHeader>
				<TableColumn id="summoner" isRowHeader>
					Summoner
				</TableColumn>
				<TableColumn id="tier">Tier</TableColumn>
				<TableColumn id="lp" align="end">
					LP
				</TableColumn>
			</TableHeader>
			<TableBody items={topSoloDuoPlayers}>
				{(player) => (
					<TableRow
						href={`https://lolmath.net/summoner/${player.summoner}`}
						target="_blank"
					>
						<TableCell>{player.summoner}</TableCell>
						<TableCell>{player.tier}</TableCell>
						<TableCell align="end">{player.lp}</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	),
	args: {},
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

interface RosterRow {
	id: string;
	name: string;
	role: string;
	kda: string;
	children?: RosterRow[];
}

const rosters: RosterRow[] = [
	{
		id: "t1",
		name: "T1",
		role: "LCK",
		kda: "4.8",
		children: [
			{ id: "t1-zeus", name: "Zeus", role: "Top", kda: "3.9" },
			{ id: "t1-oner", name: "Oner", role: "Jungle", kda: "4.4" },
			{ id: "t1-faker", name: "Faker", role: "Mid", kda: "5.7" },
			{ id: "t1-gumayusi", name: "Gumayusi", role: "Bot", kda: "6.1" },
		],
	},
	{
		id: "geng",
		name: "Gen.G",
		role: "LCK",
		kda: "4.5",
		children: [
			{ id: "geng-kiin", name: "Kiin", role: "Top", kda: "4.1" },
			{ id: "geng-canyon", name: "Canyon", role: "Jungle", kda: "4.9" },
			{ id: "geng-chovy", name: "Chovy", role: "Mid", kda: "6.3" },
		],
	},
];

/** Recursive renderer for the nested row stories. */
function renderRosterRow(row: RosterRow) {
	return (
		<TableRow key={row.id} id={row.id} textValue={row.name}>
			<TableCell>{row.name}</TableCell>
			<TableCell>{row.role}</TableCell>
			<TableCell align="end">{row.kda}</TableCell>
			<Collection items={row.children ?? []}>{renderRosterRow}</Collection>
		</TableRow>
	);
}

/**
 * Nesting a `TableRow` inside another one makes it a child row. `treeColumn`
 * picks the column that holds the hierarchy: its cells are indented by their
 * depth and grow the expand chevron.
 */
export const ExpandableRows: Story = {
	render: (args) => (
		<Table
			{...args}
			aria-label="Rosters"
			defaultExpandedKeys={["t1"]}
			treeColumn="name"
		>
			<TableHeader>
				<TableColumn id="name" isRowHeader>
					Team
				</TableColumn>
				<TableColumn id="role">Role</TableColumn>
				<TableColumn id="kda" align="end">
					KDA
				</TableColumn>
			</TableHeader>
			<TableBody items={rosters}>{renderRosterRow}</TableBody>
		</Table>
	),
	args: {},
};

/** Expansion can be controlled with `expandedKeys` and `onExpandedChange`. */
export const ControlledExpansion: Story = {
	render: (args) => {
		const [expandedKeys, setExpandedKeys] = useState<Set<Key>>(
			new Set(["geng"]),
		);

		return (
			<div style={{ display: "grid", gap: "0.5rem" }}>
				<Table
					{...args}
					aria-label="Rosters"
					expandedKeys={expandedKeys}
					onExpandedChange={setExpandedKeys}
					treeColumn="name"
				>
					<TableHeader>
						<TableColumn id="name" isRowHeader>
							Team
						</TableColumn>
						<TableColumn id="role">Role</TableColumn>
						<TableColumn id="kda" align="end">
							KDA
						</TableColumn>
					</TableHeader>
					<TableBody items={rosters}>{renderRosterRow}</TableBody>
				</Table>
				<Text color="grey150">
					Expanded: {[...expandedKeys].join(", ") || "none"}
				</Text>
			</div>
		);
	},
	args: { selectionMode: "multiple" },
};

/**
 * `TableFooter` holds the rows that summarise the ones above them. A footer row
 * is not selectable and cannot be dragged, so it leaves those columns blank
 * rather than repeating the checkbox.
 */
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
	args: { selectionMode: "multiple" },
};

/**
 * `colSpan` lets one cell stand in for several columns. The row still has to
 * account for every column, so the spanned ones are left out rather than
 * rendered empty.
 */
export const ColumnSpan: Story = {
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
			<TableBody items={topSoloDuoPlayers.slice(0, 4)}>
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
					<TableCell colSpan={2}>Games played</TableCell>
					<TableCell align="end">
						{topSoloDuoPlayers
							.slice(0, 4)
							.reduce((sum, p) => sum + p.wins + p.losses, 0)}
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	),
	args: {},
};

/**
 * Columns resize by dragging the `TableColumnResizer` in their header, inside a
 * `ResizableTableContainer`. `defaultWidth` takes any of the table's units — a
 * fraction of the free space, a percentage, or a fixed size — and `minWidth`
 * and `maxWidth` bound the drag.
 */
export const Resizable: Story = {
	render: (args) => (
		<ResizableTableContainer>
			<Table {...args} aria-label="Top Solo/Duo players">
				<TableHeader>
					<TableColumn
						id="summoner"
						isRowHeader
						defaultWidth="2fr"
						minWidth={120}
					>
						Summoner
						<TableColumnResizer />
					</TableColumn>
					<TableColumn id="tier" defaultWidth="1fr" minWidth={80}>
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
 * `onResizeEnd` hands over the widths of every column once the drag is done,
 * which is what a table that remembers its layout between visits stores. Feed
 * them back through each column's `width` to control the sizes outright.
 */
export const PersistedColumnWidths: Story = {
	render: (args) => {
		const [widths, setWidths] = useState<Record<string, string>>({});

		return (
			<div style={{ display: "grid", gap: "0.5rem" }}>
				<ResizableTableContainer
					onResizeEnd={(sizes) =>
						setWidths(
							Object.fromEntries(
								[...sizes].map(([key, size]) => [String(key), String(size)]),
							),
						)
					}
				>
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
						<TableBody items={topSoloDuoPlayers.slice(0, 4)}>
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
				<Text color="grey150">
					{Object.keys(widths).length === 0
						? "Drag a column edge to store its width"
						: Object.entries(widths)
								.map(([column, width]) => `${column}: ${width}`)
								.join(" · ")}
				</Text>
			</div>
		);
	},
	args: {},
};

/**
 * `useTableDragAndDrop` returns the hooks the table's `dragAndDropHooks` prop
 * takes, with the drop indicator this table draws between its rows. Rows are
 * dragged by the handle in the leading column, or with the keyboard: focus the
 * handle and press Enter.
 */
export const DragAndDrop: Story = {
	render: (args) => {
		const list = useListData({
			initialItems: topSoloDuoPlayers,
			getKey: (player) => player.id,
		});

		const { dragAndDropHooks } = useTableDragAndDrop({
			getItems: (keys) =>
				[...keys].map((key) => ({
					"text/plain": list.getItem(key)?.summoner ?? "",
				})),
			onReorder(event) {
				if (event.target.dropPosition === "before") {
					list.moveBefore(event.target.key, event.keys);
				} else if (event.target.dropPosition === "after") {
					list.moveAfter(event.target.key, event.keys);
				}
			},
		});

		return (
			<Table
				{...args}
				aria-label="Team order"
				dragAndDropHooks={dragAndDropHooks}
			>
				<TableHeader>
					<TableColumn id="summoner" isRowHeader>
						Summoner
					</TableColumn>
					<TableColumn id="tier">Tier</TableColumn>
					<TableColumn id="lp" align="end">
						LP
					</TableColumn>
				</TableHeader>
				<TableBody items={list.items}>
					{(player) => (
						<TableRow>
							<TableCell>{player.summoner}</TableCell>
							<TableCell>{player.tier}</TableCell>
							<TableCell align="end">{player.lp}</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		);
	},
	args: { selectionMode: "multiple" },
};

/**
 * Two tables that accept each other's rows. `getItems` writes the row out in a
 * type of the app's own, `acceptedDragTypes` limits what either table takes,
 * and `onDragEnd` removes what was moved away from the table it came from.
 */
export const DragBetweenTables: Story = {
	render: () => (
		<div style={{ display: "grid", gap: "1rem" }}>
			<DraftTable
				label="Draft pool"
				initialItems={topSoloDuoPlayers.slice(0, 3)}
			/>
			<DraftTable label="Your team" initialItems={topSoloDuoPlayers.slice(3)} />
		</div>
	),
	args: {},
};

const draftType = "application/x-lolmath-player";

function DraftTable({
	initialItems,
	label,
}: {
	initialItems: Player[];
	label: string;
}) {
	const list = useListData({
		initialItems,
		getKey: (player) => player.id,
	});

	const { dragAndDropHooks } = useTableDragAndDrop({
		acceptedDragTypes: [draftType],
		getDropOperation: () => "move",
		getItems: (keys) =>
			[...keys].map((key) => ({
				[draftType]: JSON.stringify(list.getItem(key)),
				"text/plain": list.getItem(key)?.summoner ?? "",
			})),
		async onInsert(event) {
			const players = await playersFromDrop(event.items);
			if (event.target.dropPosition === "before") {
				list.insertBefore(event.target.key, ...players);
			} else {
				list.insertAfter(event.target.key, ...players);
			}
		},
		async onRootDrop(event) {
			list.append(...(await playersFromDrop(event.items)));
		},
		onReorder(event) {
			if (event.target.dropPosition === "before") {
				list.moveBefore(event.target.key, event.keys);
			} else {
				list.moveAfter(event.target.key, event.keys);
			}
		},
		onDragEnd(event) {
			if (event.dropOperation === "move" && !event.isInternal) {
				list.remove(...event.keys);
			}
		},
	});

	return (
		<Table
			aria-label={label}
			dragAndDropHooks={dragAndDropHooks}
			selectionMode="multiple"
		>
			<TableHeader>
				<TableColumn id="summoner" isRowHeader>
					{label}
				</TableColumn>
				<TableColumn id="tier">Tier</TableColumn>
				<TableColumn id="lp" align="end">
					LP
				</TableColumn>
			</TableHeader>
			<TableBody items={list.items} emptyState="Drop a player here">
				{(player) => (
					<TableRow>
						<TableCell>{player.summoner}</TableCell>
						<TableCell>{player.tier}</TableCell>
						<TableCell align="end">{player.lp}</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}

/** Dropped items arrive as a promise of text, one per dragged row. */
async function playersFromDrop(items: readonly DropItem[]) {
	return Promise.all(
		items
			.filter(isTextDropItem)
			.map(async (item) => JSON.parse(await item.getText(draftType)) as Player),
	);
}

/**
 * `TableLoadMoreItem` is the last row of the body while more rows are on their
 * way. On its own it is the spinner; `onLoadMore` turns it into the sentinel of
 * an infinite scroll.
 */
export const LoadingMore: Story = {
	render: (args) => (
		<Table {...args} aria-label="Top Solo/Duo players">
			<TableHeader>
				<TableColumn id="summoner" isRowHeader>
					Summoner
				</TableColumn>
				<TableColumn id="tier">Tier</TableColumn>
				<TableColumn id="lp" align="end">
					LP
				</TableColumn>
			</TableHeader>
			<TableBody>
				<Collection items={topSoloDuoPlayers.slice(0, 3)}>
					{(player) => (
						<TableRow>
							<TableCell>{player.summoner}</TableCell>
							<TableCell>{player.tier}</TableCell>
							<TableCell align="end">{player.lp}</TableCell>
						</TableRow>
					)}
				</Collection>
				<TableLoadMoreItem isLoading />
			</TableBody>
		</Table>
	),
	args: {},
};

const pageSize = 15;
const tiers = ["Challenger", "Grandmaster", "Master"];

function ladderPage(page: number): Player[] {
	return Array.from({ length: pageSize }, (_, index) => {
		const rank = page * pageSize + index + 1;
		return {
			id: rank,
			rank,
			summoner: `Summoner ${rank}`,
			tier: tiers[Math.min(2, Math.floor(rank / 20))],
			lp: 2000 - rank * 7,
			wins: 300 - rank,
			losses: 200 + rank,
		};
	});
}

/**
 * `useAsyncList` keeps the rows, the loading state and the cursor of the next
 * page together, and `TableLoadMoreItem` asks it for that page as soon as the
 * sentinel scrolls into view. Sorting goes through the same list: `list.sort`
 * reloads the ladder for the column that was clicked.
 */
export const AsyncLoading: Story = {
	render: (args) => {
		const list = useAsyncList<Player, number>({
			async load({ cursor, signal }) {
				const page = cursor ?? 0;
				await new Promise((resolve) => setTimeout(resolve, 700));
				if (signal.aborted) {
					return { items: [] };
				}
				return {
					items: ladderPage(page),
					cursor: page < 4 ? page + 1 : undefined,
				};
			},
		});

		return (
			<div style={{ height: "20rem", overflow: "auto" }}>
				<Table {...args} aria-label="Ladder">
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
					</TableHeader>
					<TableBody emptyState="The ladder is empty">
						<Collection items={list.items}>
							{(player) => (
								<TableRow>
									<TableCell align="center">{player.rank}</TableCell>
									<TableCell>{player.summoner}</TableCell>
									<TableCell>{player.tier}</TableCell>
									<TableCell align="end">{player.lp}</TableCell>
								</TableRow>
							)}
						</Collection>
						<TableLoadMoreItem
							isLoading={list.loadingState === "loadingMore"}
							onLoadMore={list.loadMore}
						/>
					</TableBody>
				</Table>
			</div>
		);
	},
	args: {},
};

/**
 * A `Virtualizer` with a `TableLayout` renders only the rows that are on
 * screen, which is what a full ladder of thousands of rows needs. The row and
 * header heights are fixed by the layout, so they are given to it rather than
 * to the CSS.
 */
export const Virtualized: Story = {
	render: (args) => {
		const players = useMemo(
			() => [0, 1, 2, 3].flatMap((page) => ladderPage(page)),
			[],
		);

		return (
			<Virtualizer
				layout={TableLayout}
				layoutOptions={{ rowHeight: 32, headingHeight: 32 }}
			>
				<Table {...args} aria-label="Ladder" style={{ height: "20rem" }}>
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
					</TableHeader>
					<TableBody items={players}>
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
			</Virtualizer>
		);
	},
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

/**
 * A column whose header holds a control of its own — the sort menu of a stat
 * column, say — needs `allowsArrowNavigation` in a table that navigates by Tab,
 * so the arrow keys still move between columns while the control has focus.
 * `focusMode="cell"` focuses the header itself rather than that control.
 */
export const HeaderControls: Story = {
	args: { keyboardNavigationBehavior: "tab" },
	render: (args) => (
		<Table {...args} aria-label="Top Solo/Duo players">
			<TableHeader>
				<TableColumn id="summoner" isRowHeader>
					Summoner
				</TableColumn>
				<TableColumn id="tier" allowsArrowNavigation>
					Tier
					<Button size="small" preset="dimmed" onPress={() => alert("filter")}>
						Filter
					</Button>
				</TableColumn>
				<TableColumn id="lp" align="end" focusMode="cell">
					LP
				</TableColumn>
			</TableHeader>
			<TableBody items={topSoloDuoPlayers.slice(0, 4)}>
				{(player) => (
					<TableRow>
						<TableCell>{player.summoner}</TableCell>
						<TableCell>{player.tier}</TableCell>
						<TableCell align="end">{player.lp}</TableCell>
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
