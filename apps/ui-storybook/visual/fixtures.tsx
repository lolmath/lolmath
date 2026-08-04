import {
	Breadcrumb,
	Breadcrumbs,
	Button,
	ButtonLink,
	Checkbox,
	DialogButtons,
	DialogHeading,
	DialogTrigger,
	Disclosure,
	DisclosureButton,
	DisclosureGroup,
	DisclosurePanel,
	Divider,
	Heading,
	Label,
	Menu,
	MenuHeader,
	MenuItem,
	MenuPopover,
	MenuSection,
	MenuSeparator,
	MenuTrigger,
	Modal,
	MultipleSelect,
	NumberField,
	Popover,
	ProgressBar,
	Radio,
	RadioGroup,
	SearchField,
	Select,
	SelectButton,
	SelectListBox,
	SelectListBoxItem,
	SelectPopover,
	SelectValue,
	Slider,
	SliderOutput,
	Sonner,
	Spinner,
	SubmenuTrigger,
	Switch,
	sonner,
	Tab,
	TabList,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	TabPanel,
	Tabs,
	TagGroup,
	TagList,
	Text,
	TextArea,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Toolbar,
	ToolbarSeparator,
	Tree,
	TreeItem,
	TreeItemContent,
} from "@lolmath/ui";
import { type CSSProperties, type ReactNode, useEffect } from "react";
import { FaGear } from "react-icons/fa6";

export interface Fixture {
	id: string;
	node: ReactNode;
	style?: CSSProperties;
	/**
	 * Screenshot the whole page instead of the fixture box. Overlays (popover,
	 * menu, modal, toast) render into a portal on `document.body`, so they are
	 * not inside the fixture element at all — and their position relative to the
	 * trigger is exactly what a regression breaks.
	 */
	fullPage?: boolean;
}

const wide: CSSProperties = { width: 260 };
const table: CSSProperties = { width: 420 };

const players = [
	{ id: 1, rank: 1, summoner: "Faker", tier: "Challenger", lp: 1842 },
	{ id: 2, rank: 2, summoner: "Chovy", tier: "Challenger", lp: 1735 },
	{ id: 3, rank: 3, summoner: "Ruler", tier: "Grandmaster", lp: 1204 },
];

const playerColumns = (
	<>
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
	</>
);

const playerRows = (player: (typeof players)[number]) => (
	<TableRow>
		<TableCell align="center">{player.rank}</TableCell>
		<TableCell>{player.summoner}</TableCell>
		<TableCell>{player.tier}</TableCell>
		<TableCell align="end">{player.lp}</TableCell>
	</TableRow>
);

const runeTree = (
	<>
		<TreeItem id="precision" textValue="Precision">
			<TreeItemContent>Precision</TreeItemContent>
			<TreeItem id="keystone" textValue="Keystone">
				<TreeItemContent>Keystone</TreeItemContent>
				<TreeItem id="conqueror" textValue="Conqueror">
					<TreeItemContent>Conqueror</TreeItemContent>
				</TreeItem>
				<TreeItem id="fleet-footwork" textValue="Fleet Footwork">
					<TreeItemContent>Fleet Footwork</TreeItemContent>
				</TreeItem>
			</TreeItem>
			<TreeItem id="triumph" textValue="Triumph">
				<TreeItemContent>Triumph</TreeItemContent>
			</TreeItem>
		</TreeItem>
		<TreeItem id="domination" textValue="Domination">
			<TreeItemContent>Domination</TreeItemContent>
			<TreeItem id="electrocute" textValue="Electrocute">
				<TreeItemContent>Electrocute</TreeItemContent>
			</TreeItem>
		</TreeItem>
	</>
);

const expandedRunes = ["precision", "keystone"];

const champions = [
	{ id: "aatrox", name: "Aatrox" },
	{ id: "braum", name: "Braum" },
	{ id: "caitlyn", name: "Caitlyn" },
];

/** Centres an overlay trigger in the viewport so the overlay has room on every side. */
const centred: CSSProperties = { marginTop: 170, marginLeft: 150 };

function Toast({ variant }: { variant: "default" | "success" | "error" }) {
	useEffect(() => {
		// A fixed id, so React's development double-mount updates this toast
		// instead of racing a second one into the stack.
		const options = {
			id: variant,
			description: "Recalculated with the latest patch.",
			duration: Number.POSITIVE_INFINITY,
		};
		if (variant === "success") sonner.success("Build saved", options);
		else if (variant === "error") sonner.error("Build failed", options);
		else sonner("Build saved", options);
	}, [variant]);

	return <Sonner position="top-left" />;
}

/**
 * Registry of components -> fixtures for visual regression. Each fixture id is
 * unique across the whole registry. The harness renders one component's
 * fixtures per page (via ?component=); the spec iterates this map.
 */
export const fixtures: Record<string, Fixture[]> = {
	breadcrumbs: [
		{
			id: "breadcrumbs-default",
			// Wide enough that the trail is not shrunk: flex shrinking would make
			// the box, not the styles, decide where the dividers land.
			node: (
				<Breadcrumbs style={{ width: 340 }}>
					<Breadcrumb href="#">Home</Breadcrumb>
					<Breadcrumb href="#">React Aria</Breadcrumb>
					<Breadcrumb>Breadcrumbs</Breadcrumb>
				</Breadcrumbs>
			),
		},
	],
	"button-link": [
		{
			id: "button-link-secondary",
			node: <ButtonLink href="#">Secondary</ButtonLink>,
		},
		{
			id: "button-link-dimmed",
			node: (
				<ButtonLink preset="dimmed" href="#">
					Dimmed
				</ButtonLink>
			),
		},
		{
			id: "button-link-disabled",
			node: (
				<ButtonLink isDisabled href="#">
					Disabled
				</ButtonLink>
			),
		},
	],
	/*
	 * Shape variants of Button. Not in the screenshot spec's component list —
	 * button-shape.visual.spec.ts asserts their geometry (radius, 1:1 box)
	 * numerically instead, which is what a regression here actually breaks.
	 */
	"button-shape": [
		...(["small", "medium", "large"] as const).flatMap((size) => [
			{
				id: `button-shape-round-${size}`,
				node: (
					<Button shape="round" size={size} aria-label={`Round ${size}`}>
						<FaGear />
					</Button>
				),
			},
			{
				id: `button-shape-square-${size}`,
				node: (
					<Button shape="square" size={size} aria-label={`Square ${size}`}>
						<FaGear />
					</Button>
				),
			},
		]),
		{
			id: "button-shape-normal",
			node: <Button shape="normal">Normal</Button>,
		},
	],
	checkbox: [
		{ id: "checkbox-default", node: <Checkbox>Enable Low Spec Mode</Checkbox> },
		{
			id: "checkbox-selected",
			node: <Checkbox defaultSelected>Enable Low Spec Mode</Checkbox>,
		},
		{
			id: "checkbox-indeterminate",
			node: <Checkbox isIndeterminate>Enable Low Spec Mode</Checkbox>,
		},
		{
			id: "checkbox-disabled",
			node: (
				<Checkbox isDisabled defaultSelected>
					Enable Low Spec Mode
				</Checkbox>
			),
		},
	],
	disclosure: [
		{
			id: "disclosure-collapsed",
			node: (
				<DisclosureGroup style={wide}>
					<Disclosure id="a">
						<DisclosureButton>Title A</DisclosureButton>
						<DisclosurePanel>
							<Text>Hidden content.</Text>
						</DisclosurePanel>
					</Disclosure>
				</DisclosureGroup>
			),
		},
		{
			id: "disclosure-expanded",
			node: (
				<DisclosureGroup defaultExpandedKeys={["a"]} style={wide}>
					<Disclosure id="a">
						<DisclosureButton>Title A</DisclosureButton>
						<DisclosurePanel>
							<Text>Visible content.</Text>
						</DisclosurePanel>
					</Disclosure>
				</DisclosureGroup>
			),
		},
	],
	divider: [
		{ id: "divider-center", node: <Divider style={wide} /> },
		{ id: "divider-left", node: <Divider preset="left" style={wide} /> },
		{ id: "divider-right", node: <Divider preset="right" style={wide} /> },
		{
			id: "divider-with-children",
			node: (
				<Divider style={wide}>
					<Heading preset="h4">Section</Heading>
				</Divider>
			),
		},
	],
	heading: [
		...(["h1", "h2", "h3", "h4", "h5"] as const).map((preset) => ({
			id: `heading-${preset}`,
			node: <Heading preset={preset}>Baron</Heading>,
		})),
		{
			id: "heading-colors",
			node: (
				<div style={{ display: "flex", flexDirection: "column" }}>
					{(["gold100", "gold200", "gold400", "grey100"] as const).map(
						(color) => (
							<Heading key={color} preset="h5" color={color}>
								{color}
							</Heading>
						),
					)}
				</div>
			),
		},
	],
	menu: [
		{
			id: "menu-default",
			fullPage: true,
			style: centred,
			node: (
				<MenuTrigger defaultOpen>
					<Button>Actions</Button>
					<MenuPopover>
						<Menu>
							<MenuItem>Copy build</MenuItem>
							<MenuItem>Share</MenuItem>
							<MenuItem isDisabled>Delete</MenuItem>
						</Menu>
					</MenuPopover>
				</MenuTrigger>
			),
		},
		{
			id: "menu-sections",
			fullPage: true,
			style: centred,
			node: (
				<MenuTrigger defaultOpen>
					<Button>Actions</Button>
					<MenuPopover>
						<Menu>
							<MenuSection>
								<MenuHeader>Build</MenuHeader>
								<MenuItem>Copy</MenuItem>
								<MenuItem>Share</MenuItem>
							</MenuSection>
							<MenuSeparator />
							<MenuSection>
								<MenuHeader>Danger</MenuHeader>
								<MenuItem>Delete</MenuItem>
							</MenuSection>
						</Menu>
					</MenuPopover>
				</MenuTrigger>
			),
		},
		{
			id: "menu-submenu",
			fullPage: true,
			style: centred,
			node: (
				<MenuTrigger defaultOpen>
					<Button>Actions</Button>
					<MenuPopover>
						<Menu>
							<MenuItem>Copy build</MenuItem>
							<SubmenuTrigger>
								<MenuItem>Export</MenuItem>
								<MenuPopover>
									<Menu>
										<MenuItem>As image</MenuItem>
										<MenuItem>As link</MenuItem>
									</Menu>
								</MenuPopover>
							</SubmenuTrigger>
						</Menu>
					</MenuPopover>
				</MenuTrigger>
			),
		},
	],
	modal: [
		{
			id: "modal-default",
			fullPage: true,
			node: (
				<Modal isOpen>
					<DialogHeading>Reset build</DialogHeading>
					<Text>This clears every item and rune.</Text>
					<DialogButtons>
						<Button preset="primary">Reset</Button>
						<Button preset="dimmed">Cancel</Button>
					</DialogButtons>
				</Modal>
			),
		},
	],
	"multiple-select": [
		{
			id: "multiple-select-empty",
			node: (
				<MultipleSelect
					aria-label="Champions"
					items={champions}
					selectId={(item) => item.id}
					selectLabel={(item) => item.name}
				/>
			),
		},
		{
			id: "multiple-select-selected",
			node: (
				<MultipleSelect
					aria-label="Champions"
					items={champions}
					defaultValue={["aatrox", "braum"]}
					selectId={(item) => item.id}
					selectLabel={(item) => item.name}
				/>
			),
		},
	],
	"number-field": [
		{
			id: "number-field-default",
			node: (
				<NumberField defaultValue={0} style={wide}>
					<Label>Amount</Label>
				</NumberField>
			),
		},
		{
			id: "number-field-disabled",
			node: (
				<NumberField defaultValue={0} isDisabled style={wide}>
					<Label>Amount</Label>
				</NumberField>
			),
		},
	],
	/*
	 * One fixture per placement: the arrow is absolutely positioned against the
	 * matching edge of the popover, so a regression in its box shows up as a gap
	 * (or an overlap) on that edge only.
	 */
	popover: (["bottom", "top", "left", "right"] as const).map((placement) => ({
		id: `popover-${placement}`,
		fullPage: true,
		style: centred,
		node: (
			<DialogTrigger defaultOpen>
				<Button>Info</Button>
				<Popover placement={placement}>
					<Text>Scales with AP.</Text>
				</Popover>
			</DialogTrigger>
		),
	})),
	"progress-bar": [
		{ id: "progress-bar-empty", node: <ProgressBar value={0} style={wide} /> },
		{
			id: "progress-bar-partial",
			node: <ProgressBar value={30} style={wide} />,
		},
		{ id: "progress-bar-full", node: <ProgressBar value={100} style={wide} /> },
	],
	"radio-group": [
		{
			id: "radio-group-default",
			node: (
				<RadioGroup defaultValue="cat" style={wide}>
					<Label>Favorite pet</Label>
					<Radio value="cat">Cat</Radio>
					<Radio value="dog">Dog</Radio>
				</RadioGroup>
			),
		},
		{
			id: "radio-group-disabled",
			node: (
				<RadioGroup defaultValue="cat" isDisabled style={wide}>
					<Label>Favorite pet</Label>
					<Radio value="cat">Cat</Radio>
					<Radio value="dog">Dog</Radio>
				</RadioGroup>
			),
		},
	],
	"search-field": [
		{
			id: "search-field-default",
			node: (
				<SearchField defaultValue="" style={wide}>
					<Label>Search</Label>
				</SearchField>
			),
		},
		{
			id: "search-field-disabled",
			node: (
				<SearchField defaultValue="" isDisabled style={wide}>
					<Label>Search</Label>
				</SearchField>
			),
		},
	],
	select: [
		{
			id: "select-default",
			node: (
				<Select style={wide}>
					<SelectButton>
						<SelectValue />
					</SelectButton>
					<SelectPopover>
						<SelectListBox>
							<SelectListBoxItem>Cat</SelectListBoxItem>
							<SelectListBoxItem>Dog</SelectListBoxItem>
							<SelectListBoxItem>Panda</SelectListBoxItem>
						</SelectListBox>
					</SelectPopover>
				</Select>
			),
		},
		{
			id: "select-open",
			fullPage: true,
			style: centred,
			node: (
				<Select defaultOpen style={wide}>
					<SelectButton>
						<SelectValue />
					</SelectButton>
					<SelectPopover>
						<SelectListBox>
							<SelectListBoxItem>Cat</SelectListBoxItem>
							<SelectListBoxItem>Dog</SelectListBoxItem>
							<SelectListBoxItem>Panda</SelectListBoxItem>
						</SelectListBox>
					</SelectPopover>
				</Select>
			),
		},
		{
			id: "select-disabled",
			node: (
				<Select isDisabled style={wide}>
					<SelectButton>
						<SelectValue />
					</SelectButton>
					<SelectPopover>
						<SelectListBox>
							<SelectListBoxItem>Cat</SelectListBoxItem>
						</SelectListBox>
					</SelectPopover>
				</Select>
			),
		},
	],
	slider: [
		{
			id: "slider-single",
			node: (
				<Slider defaultValue={50} style={wide}>
					<Label>Volume</Label>
					<SliderOutput />
				</Slider>
			),
		},
		{
			id: "slider-range",
			node: (
				<Slider defaultValue={[20, 80]} style={wide}>
					<Label>Range</Label>
					<SliderOutput />
				</Slider>
			),
		},
	],
	sonner: (["default", "success", "error"] as const).map((variant) => ({
		id: `sonner-${variant}`,
		fullPage: true,
		node: <Toast variant={variant} />,
	})),
	spinner: [{ id: "spinner-default", node: <Spinner /> }],
	switch: [
		{ id: "switch-off", node: <Switch>Low Power Mode</Switch> },
		{
			id: "switch-on",
			node: <Switch defaultSelected>Low Power Mode</Switch>,
		},
		{
			id: "switch-disabled",
			node: (
				<Switch isDisabled defaultSelected>
					Low Power Mode
				</Switch>
			),
		},
	],
	table: [
		{
			id: "table-default",
			node: (
				<Table aria-label="Players" style={table}>
					<TableHeader>{playerColumns}</TableHeader>
					<TableBody items={players}>{playerRows}</TableBody>
				</Table>
			),
		},
		{
			id: "table-sorted",
			node: (
				<Table
					aria-label="Players"
					style={table}
					sortDescriptor={{ column: "lp", direction: "descending" }}
				>
					<TableHeader>
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
					<TableBody items={players}>
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
		},
		{
			id: "table-single-selection",
			node: (
				<Table
					aria-label="Players"
					style={table}
					selectionMode="single"
					defaultSelectedKeys={[2]}
				>
					<TableHeader>{playerColumns}</TableHeader>
					<TableBody items={players}>{playerRows}</TableBody>
				</Table>
			),
		},
		{
			id: "table-multiple-selection",
			node: (
				<Table
					aria-label="Players"
					style={table}
					selectionMode="multiple"
					defaultSelectedKeys={[1, 3]}
				>
					<TableHeader>{playerColumns}</TableHeader>
					<TableBody items={players}>{playerRows}</TableBody>
				</Table>
			),
		},
		{
			id: "table-disabled-rows",
			node: (
				<Table
					aria-label="Players"
					style={table}
					selectionMode="multiple"
					disabledKeys={[2]}
				>
					<TableHeader>{playerColumns}</TableHeader>
					<TableBody items={players}>{playerRows}</TableBody>
				</Table>
			),
		},
		{
			id: "table-empty",
			node: (
				<Table aria-label="Players" style={table}>
					<TableHeader>{playerColumns}</TableHeader>
					<TableBody items={[]} emptyState="No ranked players yet">
						{playerRows}
					</TableBody>
				</Table>
			),
		},
	],
	tabs: [
		{
			id: "tabs-default",
			node: (
				<Tabs defaultSelectedKey="triassic" style={wide}>
					<TabList aria-label="Periods">
						<Tab id="triassic">Triassic</Tab>
						<Tab id="jurassic">Jurassic</Tab>
						<Tab id="cretaceous">Cretaceous</Tab>
					</TabList>
					<TabPanel id="triassic">
						<Text>Triassic content.</Text>
					</TabPanel>
				</Tabs>
			),
		},
	],
	"tag-group": [
		{
			id: "tag-group-hextech",
			node: (
				<TagGroup aria-label="Champions" selectionMode="multiple">
					<TagList
						items={[
							{ id: 1, name: "Aatrox" },
							{ id: 2, name: "Braum" },
							{ id: 3, name: "Caitlyn" },
						]}
						selectLabel={(item: { name: string }) => item.name}
						variant="hextech"
					/>
				</TagGroup>
			),
		},
		{
			id: "tag-group-gold",
			node: (
				<TagGroup aria-label="Champions" selectionMode="multiple">
					<TagList
						items={[
							{ id: 1, name: "Aatrox" },
							{ id: 2, name: "Braum" },
						]}
						selectLabel={(item: { name: string }) => item.name}
						variant="gold"
					/>
				</TagGroup>
			),
		},
	],
	text: [
		...(
			[
				["sm", "sm"],
				["base", "base"],
				["md", "md"],
				["lg", "lg"],
				["stat", "stat"],
				["largeNumber", "large-number"],
			] as const
		).map(([preset, id]) => ({
			id: `text-${id}`,
			node: <Text preset={preset}>1250</Text>,
		})),
		{
			id: "text-colors",
			node: (
				<div style={{ display: "flex", flexDirection: "column" }}>
					{(["grey100", "grey150", "gold100"] as const).map((color) => (
						<Text key={color} color={color}>
							{color}
						</Text>
					))}
				</div>
			),
		},
		{ id: "text-label", node: <Label>Attack damage</Label> },
	],
	"text-area": [
		{
			id: "text-area-default",
			node: (
				<TextArea defaultValue="The quick brown fox." style={wide}>
					<Label>Notes</Label>
				</TextArea>
			),
		},
		{
			id: "text-area-disabled",
			node: (
				<TextArea defaultValue="The quick brown fox." isDisabled style={wide}>
					<Label>Notes</Label>
				</TextArea>
			),
		},
	],
	"text-field": [
		{
			id: "text-field-default",
			node: (
				<TextField defaultValue="The quick brown fox." style={wide}>
					<Label>Name</Label>
				</TextField>
			),
		},
		{
			id: "text-field-disabled",
			node: (
				<TextField defaultValue="The quick brown fox." isDisabled style={wide}>
					<Label>Name</Label>
				</TextField>
			),
		},
	],
	"toggle-button": [
		{
			id: "toggle-button-off",
			node: <ToggleButton>Toggle</ToggleButton>,
		},
		{
			id: "toggle-button-on",
			node: <ToggleButton defaultSelected>Toggle</ToggleButton>,
		},
		{
			id: "toggle-button-disabled",
			node: (
				<ToggleButton isDisabled defaultSelected>
					Toggle
				</ToggleButton>
			),
		},
		{
			id: "toggle-button-dimmed-off",
			node: <ToggleButton preset="dimmed">Toggle</ToggleButton>,
		},
		{
			id: "toggle-button-dimmed-on",
			node: (
				<ToggleButton preset="dimmed" defaultSelected>
					Toggle
				</ToggleButton>
			),
		},
		{
			id: "toggle-button-dimmed-disabled",
			node: (
				<ToggleButton preset="dimmed" isDisabled defaultSelected>
					Toggle
				</ToggleButton>
			),
		},
	],
	"toggle-button-group": [
		{
			id: "toggle-button-group-single",
			node: (
				<ToggleButtonGroup aria-label="Lane" defaultSelectedKeys={["top"]}>
					<ToggleButton id="top">Top</ToggleButton>
					<ToggleButton id="jungle">Jungle</ToggleButton>
					<ToggleButton id="mid">Mid</ToggleButton>
				</ToggleButtonGroup>
			),
		},
		{
			id: "toggle-button-group-multiple",
			node: (
				<ToggleButtonGroup
					aria-label="Lane"
					selectionMode="multiple"
					defaultSelectedKeys={["top", "mid"]}
				>
					<ToggleButton id="top">Top</ToggleButton>
					<ToggleButton id="jungle">Jungle</ToggleButton>
					<ToggleButton id="mid">Mid</ToggleButton>
				</ToggleButtonGroup>
			),
		},
		{
			id: "toggle-button-group-vertical",
			node: (
				<ToggleButtonGroup
					aria-label="Lane"
					orientation="vertical"
					defaultSelectedKeys={["top"]}
				>
					<ToggleButton id="top">Top</ToggleButton>
					<ToggleButton id="jungle">Jungle</ToggleButton>
					<ToggleButton id="mid">Mid</ToggleButton>
				</ToggleButtonGroup>
			),
		},
		{
			id: "toggle-button-group-disabled",
			node: (
				<ToggleButtonGroup
					aria-label="Lane"
					isDisabled
					defaultSelectedKeys={["top"]}
				>
					<ToggleButton id="top">Top</ToggleButton>
					<ToggleButton id="jungle">Jungle</ToggleButton>
					<ToggleButton id="mid">Mid</ToggleButton>
				</ToggleButtonGroup>
			),
		},
		{
			// Thin buttons collapse by 1px instead of 2px.
			id: "toggle-button-group-thin",
			node: (
				<ToggleButtonGroup aria-label="Lane" defaultSelectedKeys={["top"]}>
					<ToggleButton id="top" preset="dimmed">
						Top
					</ToggleButton>
					<ToggleButton id="jungle" preset="dimmed">
						Jungle
					</ToggleButton>
					<ToggleButton id="mid" preset="dimmed">
						Mid
					</ToggleButton>
				</ToggleButtonGroup>
			),
		},
		{
			id: "toggle-button-group-squares",
			node: (
				<ToggleButtonGroup
					aria-label="Text style"
					selectionMode="multiple"
					defaultSelectedKeys={["bold"]}
				>
					<ToggleButton id="bold" shape="square" aria-label="Bold">
						B
					</ToggleButton>
					<ToggleButton id="italic" shape="square" aria-label="Italic">
						I
					</ToggleButton>
					<ToggleButton id="underline" shape="square" aria-label="Underline">
						U
					</ToggleButton>
				</ToggleButtonGroup>
			),
		},
	],
	toolbar: [
		{
			id: "toolbar-horizontal",
			node: (
				<Toolbar aria-label="Match actions">
					<Button>Copy</Button>
					<ToolbarSeparator />
					<Checkbox>Ranked</Checkbox>
				</Toolbar>
			),
		},
		{
			id: "toolbar-vertical",
			node: (
				<Toolbar aria-label="Match actions" orientation="vertical">
					<Button>Copy</Button>
					<ToolbarSeparator orientation="horizontal" />
					<Checkbox>Ranked</Checkbox>
				</Toolbar>
			),
		},
		{
			// A vertical toolbar must not stretch its controls: square buttons are
			// sized by aspect ratio and would grow to the toolbar's full width.
			id: "toolbar-vertical-with-group",
			node: (
				<Toolbar aria-label="Text formatting" orientation="vertical">
					<ToggleButtonGroup
						aria-label="Text style"
						selectionMode="multiple"
						defaultSelectedKeys={["bold"]}
						orientation="vertical"
					>
						<ToggleButton id="bold" shape="square" aria-label="Bold">
							B
						</ToggleButton>
						<ToggleButton id="italic" shape="square" aria-label="Italic">
							I
						</ToggleButton>
					</ToggleButtonGroup>
					<ToolbarSeparator orientation="horizontal" />
					<Button>Paste</Button>
				</Toolbar>
			),
		},
	],
	tree: [
		{
			id: "tree-default",
			node: (
				<Tree
					aria-label="Rune paths"
					defaultExpandedKeys={expandedRunes}
					style={wide}
				>
					{runeTree}
				</Tree>
			),
		},
		{
			id: "tree-collapsed",
			node: (
				<Tree aria-label="Rune paths" style={wide}>
					{runeTree}
				</Tree>
			),
		},
		{
			id: "tree-single-selection",
			node: (
				<Tree
					aria-label="Rune paths"
					defaultExpandedKeys={expandedRunes}
					defaultSelectedKeys={["conqueror"]}
					selectionMode="single"
					style={wide}
				>
					{runeTree}
				</Tree>
			),
		},
		{
			id: "tree-multiple-selection",
			node: (
				<Tree
					aria-label="Rune paths"
					defaultExpandedKeys={expandedRunes}
					defaultSelectedKeys={["conqueror", "triumph"]}
					selectionMode="multiple"
					style={wide}
				>
					{runeTree}
				</Tree>
			),
		},
		{
			id: "tree-highlight-selection",
			node: (
				<Tree
					aria-label="Rune paths"
					defaultExpandedKeys={expandedRunes}
					defaultSelectedKeys={["conqueror"]}
					selectionBehavior="replace"
					selectionMode="multiple"
					style={wide}
				>
					{runeTree}
				</Tree>
			),
		},
		{
			id: "tree-disabled-items",
			node: (
				<Tree
					aria-label="Rune paths"
					defaultExpandedKeys={expandedRunes}
					disabledKeys={["fleet-footwork", "domination"]}
					selectionMode="multiple"
					style={wide}
				>
					{runeTree}
				</Tree>
			),
		},
		{
			id: "tree-empty",
			node: (
				<Tree
					aria-label="Rune paths"
					emptyState="No runes match this filter"
					style={wide}
				>
					{[]}
				</Tree>
			),
		},
	],
};

export const componentNames = Object.keys(fixtures);
