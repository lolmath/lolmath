import { parseDate } from "@internationalized/date";
import {
	Button,
	DateRangePicker,
	Heading,
	type Key,
	Label,
	Menu,
	MenuItem,
	MenuPopover,
	MenuSeparator,
	MenuTrigger,
	SearchField,
	Select,
	SelectButton,
	type Selection,
	SelectListBox,
	SelectListBoxItem,
	SelectPopover,
	SelectValue,
	type SortDescriptor,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	TagGroup,
	TagList,
	Text,
	Toolbar,
	ToolbarSeparator,
} from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";

const meta = {
	title: "Examples/Templates/Match history",
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"The list screen: filter, sort, select, act. The filters above " +
					"the table are echoed as removable tags beneath it, so what is " +
					"narrowing the list is always on screen and always dismissable.",
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface Match {
	id: number;
	champion: string;
	role: string;
	result: "Victory" | "Defeat";
	kda: string;
	damage: number;
	gold: number;
	duration: string;
}

const matches: Match[] = [
	{
		id: 1,
		champion: "Aatrox",
		role: "Top",
		result: "Victory",
		kda: "8 / 2 / 6",
		damage: 34120,
		gold: 15200,
		duration: "28:14",
	},
	{
		id: 2,
		champion: "Camille",
		role: "Top",
		result: "Defeat",
		kda: "4 / 7 / 3",
		damage: 21840,
		gold: 11700,
		duration: "31:02",
	},
	{
		id: 3,
		champion: "Kai'Sa",
		role: "Bot",
		result: "Victory",
		kda: "12 / 3 / 9",
		damage: 41260,
		gold: 18400,
		duration: "34:47",
	},
	{
		id: 4,
		champion: "Orianna",
		role: "Mid",
		result: "Victory",
		kda: "6 / 4 / 14",
		damage: 29980,
		gold: 14100,
		duration: "26:33",
	},
	{
		id: 5,
		champion: "Vi",
		role: "Jungle",
		result: "Defeat",
		kda: "3 / 8 / 7",
		damage: 17420,
		gold: 10300,
		duration: "22:58",
	},
	{
		id: 6,
		champion: "Nautilus",
		role: "Support",
		result: "Victory",
		kda: "1 / 5 / 21",
		damage: 9310,
		gold: 9200,
		duration: "34:47",
	},
];

interface Filter {
	id: string;
	name: string;
}

const startingFilters: Filter[] = [
	{ id: "queue", name: "Ranked solo" },
	{ id: "patch", name: "Patch 14.18" },
	{ id: "role", name: "Top lane" },
];

const surface: CSSProperties = {
	background: "var(--lol-gradient-hextech-black)",
	color: "var(--lol-color-grey-100)",
	fontFamily: "var(--lol-font-family-spiegel)",
};

const rule = "1px solid var(--lol-color-gold-600)";

export const MatchHistory: Story = {
	render: () => {
		const [filters, setFilters] = useState(startingFilters);
		const [selected, setSelected] = useState<Selection>(new Set<Key>());
		const [sort, setSort] = useState<SortDescriptor>({
			column: "damage",
			direction: "descending",
		});

		const rows = useMemo(() => {
			const sorted = [...matches].sort((a, b) => {
				const column = sort.column as keyof Match;
				const left = a[column];
				const right = b[column];
				const order =
					typeof left === "number" && typeof right === "number"
						? left - right
						: String(left).localeCompare(String(right));

				return sort.direction === "descending" ? -order : order;
			});

			return sorted;
		}, [sort]);

		const selectedCount =
			selected === "all" ? rows.length : (selected as Set<Key>).size;

		return (
			<div style={{ ...surface, minHeight: "100vh", padding: "1.5rem" }}>
				<div
					style={{
						display: "flex",
						alignItems: "baseline",
						gap: "0.75rem",
						marginBottom: "1rem",
					}}
				>
					<Heading as="h1" preset="h4">
						Match history
					</Heading>
					<Text color="grey150" preset="sm">
						Faker#KR1
					</Text>
				</div>

				<Toolbar
					aria-label="Filter matches"
					style={{
						alignItems: "end",
						flexWrap: "wrap",
						gap: "0.75rem",
						marginBottom: "1rem",
					}}
				>
					<SearchField
						aria-label="Search by champion"
						inputProps={{ placeholder: "Champion" }}
						style={{ width: "12rem" }}
					/>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "0.375rem",
						}}
					>
						<Label>Queue</Label>
						<Select defaultSelectedKey="solo">
							<SelectButton style={{ width: "10rem" }}>
								<SelectValue />
							</SelectButton>
							<SelectPopover>
								<SelectListBox>
									<SelectListBoxItem id="solo">Ranked solo</SelectListBoxItem>
									<SelectListBoxItem id="flex">Ranked flex</SelectListBoxItem>
									<SelectListBoxItem id="normal">
										Normal draft
									</SelectListBoxItem>
								</SelectListBox>
							</SelectPopover>
						</Select>
					</div>
					<DateRangePicker
						defaultValue={{
							start: parseDate("2026-08-10"),
							end: parseDate("2026-09-01"),
						}}
					>
						<Label>Played</Label>
					</DateRangePicker>
					<ToolbarSeparator />
					<Button preset="dimmed">Export CSV</Button>
					<MenuTrigger>
						<Button
							isDisabled={selectedCount === 0}
							preset="secondary"
						>{`Actions (${selectedCount})`}</Button>
						<MenuPopover>
							<Menu>
								<MenuItem>Add to a collection</MenuItem>
								<MenuItem>Compare builds</MenuItem>
								<MenuSeparator />
								<MenuItem>Hide from history</MenuItem>
							</Menu>
						</MenuPopover>
					</MenuTrigger>
				</Toolbar>

				<Table
					aria-label="Match history"
					onSelectionChange={setSelected}
					onSortChange={setSort}
					selectedKeys={selected}
					selectionMode="multiple"
					sortDescriptor={sort}
					style={{ marginBottom: "0.75rem" }}
				>
					<TableHeader>
						<TableColumn allowsSorting id="champion" isRowHeader>
							Champion
						</TableColumn>
						<TableColumn allowsSorting id="role">
							Role
						</TableColumn>
						<TableColumn allowsSorting id="result">
							Result
						</TableColumn>
						<TableColumn id="kda">KDA</TableColumn>
						<TableColumn align="end" allowsSorting id="damage">
							Damage
						</TableColumn>
						<TableColumn align="end" allowsSorting id="gold">
							Gold
						</TableColumn>
						<TableColumn align="end" id="duration">
							Length
						</TableColumn>
					</TableHeader>
					<TableBody items={rows}>
						{(match) => (
							<TableRow>
								<TableCell>{match.champion}</TableCell>
								<TableCell>{match.role}</TableCell>
								<TableCell>
									{/* Bright against dim rather than green against red: the
									    palette has no semantic pair, and win/loss is the one
									    column a reader scans. */}
									<Text
										color={match.result === "Victory" ? "gold100" : "grey150"}
										preset="sm"
									>
										{match.result}
									</Text>
								</TableCell>
								<TableCell>{match.kda}</TableCell>
								<TableCell align="end">
									{match.damage.toLocaleString()}
								</TableCell>
								<TableCell align="end">{match.gold.toLocaleString()}</TableCell>
								<TableCell align="end">{match.duration}</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>

				<div
					style={{
						alignItems: "center",
						borderTop: rule,
						display: "flex",
						flexWrap: "wrap",
						gap: "0.75rem",
						paddingTop: "0.75rem",
					}}
				>
					<TagGroup
						aria-label="Active filters"
						onRemove={(keys) =>
							setFilters((previous) =>
								previous.filter((filter) => !keys.has(filter.id)),
							)
						}
					>
						<TagList items={filters} selectLabel={(filter) => filter.name} />
					</TagGroup>
					{filters.length === 0 && (
						<Button onPress={() => setFilters(startingFilters)} preset="dimmed">
							Restore filters
						</Button>
					)}
					<Text
						color="grey150"
						preset="sm"
						style={{ marginInlineStart: "auto" }}
					>
						{`${rows.length} matches · ${selectedCount} selected`}
					</Text>
				</div>
			</div>
		);
	},
};
