import {
	Collection,
	type Key,
	type Selection,
	Tree,
	TreeItem,
	TreeItemContent,
	TreeLoadMoreItem,
	type TreePreset,
} from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

interface RuneNode {
	id: string;
	name: string;
	children?: RuneNode[];
}

const runePaths: RuneNode[] = [
	{
		id: "precision",
		name: "Precision",
		children: [
			{
				id: "precision-keystone",
				name: "Keystone",
				children: [
					{ id: "press-the-attack", name: "Press the Attack" },
					{ id: "lethal-tempo", name: "Lethal Tempo" },
					{ id: "fleet-footwork", name: "Fleet Footwork" },
					{ id: "conqueror", name: "Conqueror" },
				],
			},
			{
				id: "precision-heroism",
				name: "Heroism",
				children: [
					{ id: "absorb-life", name: "Absorb Life" },
					{ id: "triumph", name: "Triumph" },
					{ id: "presence-of-mind", name: "Presence of Mind" },
				],
			},
		],
	},
	{
		id: "domination",
		name: "Domination",
		children: [
			{
				id: "domination-keystone",
				name: "Keystone",
				children: [
					{ id: "electrocute", name: "Electrocute" },
					{ id: "dark-harvest", name: "Dark Harvest" },
					{ id: "hail-of-blades", name: "Hail of Blades" },
				],
			},
			{
				id: "domination-malice",
				name: "Malice",
				children: [
					{ id: "cheap-shot", name: "Cheap Shot" },
					{ id: "taste-of-blood", name: "Taste of Blood" },
					{ id: "sudden-impact", name: "Sudden Impact" },
				],
			},
		],
	},
	{
		id: "sorcery",
		name: "Sorcery",
		children: [
			{
				id: "sorcery-keystone",
				name: "Keystone",
				children: [
					{ id: "summon-aery", name: "Summon Aery" },
					{ id: "arcane-comet", name: "Arcane Comet" },
					{ id: "phase-rush", name: "Phase Rush" },
				],
			},
		],
	},
];

/** Recursive renderer for the dynamic collection stories. */
function renderRune(rune: RuneNode) {
	return (
		<TreeItem key={rune.id} id={rune.id} textValue={rune.name}>
			<TreeItemContent>{rune.name}</TreeItemContent>
			<Collection items={rune.children ?? []}>{renderRune}</Collection>
		</TreeItem>
	);
}

/**
 * The presets, in the order the gallery lays them out, each with the case it
 * is arguing for. `default` leads because it is what a tree gets for asking
 * for nothing, and the rest are the alternatives to it.
 */
const presets: { preset: TreePreset; blurb: string }[] = [
	{
		preset: "default",
		blurb: "Gilded rows on the client's hairline rules. Today's tree.",
	},
	{
		preset: "rail",
		blurb: "Guide lines down the ancestors, so depth is drawn, not implied.",
	},
	{
		preset: "plate",
		blurb: "Every row an inset, bordered plate, racked like an inventory.",
	},
	{
		preset: "ledger",
		blurb: "Ruled and striped, as dense as a stat sheet.",
	},
	{
		preset: "banner",
		blurb: "Branches become gilded section bars over plain leaves.",
	},
	{
		preset: "compact",
		blurb: "The default, tightened — for a rail that has to hold a lot.",
	},
	{
		preset: "spacious",
		blurb: "The default, opened up — for pointer and touch targets.",
	},
	{
		preset: "minimal",
		blurb: "Near-zero chrome. Selection is a tick and a weight.",
	},
	{
		preset: "glass",
		blurb: "A translucent, blurred pane to float over other content.",
	},
	{
		preset: "arcane",
		blurb: "Hextech teal in place of gold: the magic, not the frame.",
	},
	{
		preset: "pill",
		blurb: "Selection as an inset pill, the way an app sidebar does it.",
	},
	{
		preset: "engraved",
		blurb: "Selected row pressed into the metal as a well, lit at its edge.",
	},
	{
		preset: "gilded",
		blurb: "Selected row filled with the client's gold, ink in black.",
	},
	{
		preset: "bracket",
		blurb: "A bracket closed on each end of the row. Nothing tinted at all.",
	},
	{
		preset: "ember",
		blurb: "A warm bloom off the inline start, with no edge anywhere in it.",
	},
	{
		preset: "parchment",
		blurb: "Ink on a scroll — the one preset that is not a dark panel.",
	},
];

/** The presets that keep the hextech wash the tables use off the selected
 *  row. `minimal` gets there by drawing almost nothing; the last five each
 *  answer "which row am I on" some other way. */
const withoutBlueSelection: TreePreset[] = [
	"minimal",
	"engraved",
	"gilded",
	"bracket",
	"ember",
	"parchment",
];

/**
 * `glass` is the one preset that is about what shows through it, so it is
 * given something to sit on wherever it appears.
 */
const glassBackdrop =
	"radial-gradient(circle at 20% 15%, #0397ab 0%, transparent 45%), radial-gradient(circle at 85% 80%, #785a28 0%, transparent 50%), #0a1428";

/** Enough state on screen at once to judge a preset by: branches, leaves, a
 *  selected row and a disabled one. */
const showcaseArgs = {
	selectionMode: "single",
	defaultSelectedKeys: ["lethal-tempo"],
	disabledKeys: ["fleet-footwork"],
	defaultExpandedKeys: ["precision", "precision-keystone", "precision-heroism"],
} as const;

/**
 * The chrome the gallery stories share: a labelled, captioned cell per preset.
 * The tree itself stays with the story so it keeps the story's own args, which
 * is what makes the Storybook controls drive every cell at once.
 */
function PresetGrid({
	only,
	renderTree,
}: {
	/** Which presets to show, in order. Defaults to all of them. */
	only?: TreePreset[];
	renderTree: (preset: TreePreset) => React.ReactNode;
}) {
	const shown = only
		? presets.filter(({ preset }) => only.includes(preset))
		: presets;

	return (
		<div
			style={{
				display: "grid",
				gap: "1.75rem",
				gridTemplateColumns: "repeat(auto-fill, minmax(17rem, 1fr))",
				alignItems: "start",
			}}
		>
			{shown.map(({ preset, blurb }) => (
				<div key={preset}>
					<div
						style={{
							fontFamily: "beaufort",
							fontSize: "0.75rem",
							fontWeight: 700,
							letterSpacing: "0.075em",
							textTransform: "uppercase",
							color: "#c8aa6e",
						}}
					>
						{preset}
					</div>
					<p
						style={{
							margin: "0.25rem 0 0.75rem",
							fontFamily: "spiegel",
							fontSize: "0.75rem",
							lineHeight: 1.4,
							color: "#a09b8c",
							minHeight: "2.1rem",
						}}
					>
						{blurb}
					</p>
					<div
						style={
							preset === "glass"
								? { background: glassBackdrop, padding: "1.25rem" }
								: undefined
						}
					>
						{renderTree(preset)}
					</div>
				</div>
			))}
		</div>
	);
}

const meta: Meta<typeof Tree> = {
	title: "Data Display/Tree",
	component: Tree,
	tags: ["autodocs"],
	argTypes: {
		preset: {
			control: { type: "select" },
			options: presets.map(({ preset }) => preset),
		},
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
		defaultExpandedKeys: ["precision", "precision-keystone"],
	},
	render: (args) => (
		<Tree
			{...args}
			aria-label="Rune paths"
			items={runePaths}
			style={{ width: 260 }}
		>
			{renderRune}
		</Tree>
	),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: {} };

/**
 * Every preset at once, on the same runes and in the same state, which is the
 * only way to tell them apart honestly. Each is a single `preset` prop; the
 * rows, their spacing and their selected state are what changes, never what a
 * row *is*.
 */
export const PresetGallery: Story = {
	name: "Preset gallery",
	render: (args) => (
		<PresetGrid
			renderTree={(preset) => (
				<Tree
					{...args}
					aria-label={`Rune paths, ${preset} preset`}
					items={runePaths}
					preset={preset}
				>
					{renderRune}
				</Tree>
			)}
		/>
	),
	args: showcaseArgs,
};

/**
 * The presets that keep the hextech wash the tables use off the selected row.
 * It is the loudest thing the default tree does, and the six here each answer
 * "which row am I on" without reaching for it: by drawing almost nothing, by
 * pressing the row in, by filling it with gold, by bracketing it, by blooming
 * warm off its inline start, or by not being a dark panel in the first place.
 */
export const SelectionWithoutBlue: Story = {
	name: "Selection without the blue",
	render: (args) => (
		<PresetGrid
			only={withoutBlueSelection}
			renderTree={(preset) => (
				<Tree
					{...args}
					aria-label={`Rune paths, ${preset} preset`}
					items={runePaths}
					preset={preset}
				>
					{renderRune}
				</Tree>
			)}
		/>
	),
	args: showcaseArgs,
};

/** Guide lines down the ancestors and an elbow into each row, so a row's depth
 *  is drawn rather than left to be counted off the indent. */
export const PresetRail: Story = {
	name: "Preset: rail",
	args: { ...showcaseArgs, preset: "rail" },
};

/** Every row an inset, bordered plate with a gap around it — the client's
 *  inventory racking, applied to a list. */
export const PresetPlate: Story = {
	name: "Preset: plate",
	args: { ...showcaseArgs, preset: "plate" },
};

/** Ruled between every row and striped behind every other one, at the extra
 *  small type: for the trees that are really tables. */
export const PresetLedger: Story = {
	name: "Preset: ledger",
	args: { ...showcaseArgs, preset: "ledger" },
};

/** Branches become the gilded section bars the client puts above a list, which
 *  leaves the leaves plain and lets the eye jump between sections. */
export const PresetBanner: Story = {
	name: "Preset: banner",
	args: { ...showcaseArgs, preset: "banner" },
};

/** The default at its tightest — same treatment, less of everything. */
export const PresetCompact: Story = {
	name: "Preset: compact",
	args: { ...showcaseArgs, preset: "compact" },
};

/** The other end of the same dial: rows worth aiming a finger at. */
export const PresetSpacious: Story = {
	name: "Preset: spacious",
	args: { ...showcaseArgs, preset: "spacious" },
};

/** No washes, no rules, no gilded branches. Selection is a tick and a weight,
 *  for a tree that sits beside the thing that matters rather than being it. */
export const PresetMinimal: Story = {
	name: "Preset: minimal",
	args: { ...showcaseArgs, preset: "minimal" },
};

/**
 * A translucent, blurred pane for floating over other content — so it is shown
 * over something, which is the only way the blur means anything.
 */
export const PresetGlass: Story = {
	name: "Preset: glass",
	render: (args) => (
		<div style={{ background: glassBackdrop, padding: "2.5rem" }}>
			<Tree
				{...args}
				aria-label="Rune paths"
				items={runePaths}
				style={{ width: 260 }}
			>
				{renderRune}
			</Tree>
		</div>
	),
	args: { ...showcaseArgs, preset: "glass" },
};

/** Hextech splits the interface into metal linework that frames information
 *  and magic that is it. The default tree is all frame; this one is all
 *  magic. */
export const PresetArcane: Story = {
	name: "Preset: arcane",
	args: { ...showcaseArgs, preset: "arcane" },
};

/** Selection as an inset pill rather than a full-bleed row: reads as a
 *  control where the default reads as a list. */
export const PresetPill: Story = {
	name: "Preset: pill",
	args: { ...showcaseArgs, preset: "pill" },
};

/** The selected row pressed into the metal — shadowed at the top, lit along
 *  its bottom edge, the way a stamped plate is. */
export const PresetEngraved: Story = {
	name: "Preset: engraved",
	args: { ...showcaseArgs, preset: "engraved" },
};

/** The client spends its gold gradient on the control it wants pressed; this
 *  spends it on the row you are on, and puts the ink in hextech black. */
export const PresetGilded: Story = {
	name: "Preset: gilded",
	args: { ...showcaseArgs, preset: "gilded" },
};

/** Selection as a frame rather than a fill: a bracket closed on each end of
 *  the row, and nothing tinted to compete with the label. */
export const PresetBracket: Story = {
	name: "Preset: bracket",
	args: { ...showcaseArgs, preset: "bracket" },
};

/** Selection as heat rather than paint: a bloom off the inline start with no
 *  edge anywhere in it, banked against a bright spine. */
export const PresetEmber: Story = {
	name: "Preset: ember",
	args: { ...showcaseArgs, preset: "ember" },
};

/** Ink on a scroll rather than light on a screen — the one preset that is not
 *  a dark panel, with the gold spent on the rules instead of on the type. */
export const PresetParchment: Story = {
	name: "Preset: parchment",
	args: { ...showcaseArgs, preset: "parchment" },
};

/**
 * Static items work the same as the dynamic collection above; nesting a
 * `TreeItem` inside another one is what makes an item a branch.
 */
export const StaticItems: Story = {
	render: (args) => (
		<Tree {...args} aria-label="Rune paths" style={{ width: 260 }}>
			<TreeItem id="precision" textValue="Precision">
				<TreeItemContent>Precision</TreeItemContent>
				<TreeItem id="precision-keystone" textValue="Keystone">
					<TreeItemContent>Keystone</TreeItemContent>
					<TreeItem id="conqueror" textValue="Conqueror">
						<TreeItemContent>Conqueror</TreeItemContent>
					</TreeItem>
					<TreeItem id="fleet-footwork" textValue="Fleet Footwork">
						<TreeItemContent>Fleet Footwork</TreeItemContent>
					</TreeItem>
				</TreeItem>
			</TreeItem>
			<TreeItem id="domination" textValue="Domination">
				<TreeItemContent>Domination</TreeItemContent>
				<TreeItem id="electrocute" textValue="Electrocute">
					<TreeItemContent>Electrocute</TreeItemContent>
				</TreeItem>
			</TreeItem>
		</Tree>
	),
	args: {},
};

export const SingleSelection: Story = {
	args: { selectionMode: "single", defaultSelectedKeys: ["conqueror"] },
};

/** `selectionMode="multiple"` adds a checkbox to every row. */
export const MultipleSelection: Story = {
	args: {
		selectionMode: "multiple",
		defaultSelectedKeys: ["conqueror", "triumph"],
		defaultExpandedKeys: [
			"precision",
			"precision-keystone",
			"precision-heroism",
		],
	},
};

/** `selectionBehavior="replace"` swaps the checkboxes for row clicks. */
export const HighlightSelection: Story = {
	args: {
		selectionMode: "multiple",
		selectionBehavior: "replace",
		defaultSelectedKeys: ["conqueror", "lethal-tempo"],
	},
};

export const DisabledItems: Story = {
	args: {
		selectionMode: "multiple",
		disabledKeys: ["lethal-tempo", "domination"],
	},
};

/** Expansion and selection can both be controlled. */
export const Controlled: Story = {
	render: (args) => {
		const [expandedKeys, setExpandedKeys] = useState<Set<Key>>(
			new Set(["domination", "domination-keystone"]),
		);
		const [selectedKeys, setSelectedKeys] = useState<Selection>(
			new Set(["electrocute"]),
		);

		return (
			<Tree
				{...args}
				aria-label="Rune paths"
				expandedKeys={expandedKeys}
				items={runePaths}
				onExpandedChange={setExpandedKeys}
				onSelectionChange={setSelectedKeys}
				selectedKeys={selectedKeys}
				style={{ width: 260 }}
			>
				{renderRune}
			</Tree>
		);
	},
	args: { selectionMode: "single" },
};

export const Empty: Story = {
	render: (args) => (
		<Tree
			{...args}
			aria-label="Rune paths"
			emptyState="No runes match this filter"
			items={[]}
			style={{ width: 260 }}
		>
			{renderRune}
		</Tree>
	),
	args: {},
};

/** `TreeLoadMoreItem` shows the spinner while more items are on their way. */
export const LoadingMore: Story = {
	render: (args) => (
		<Tree {...args} aria-label="Rune paths" style={{ width: 260 }}>
			<TreeItem id="precision" textValue="Precision">
				<TreeItemContent>Precision</TreeItemContent>
				<TreeItem id="conqueror" textValue="Conqueror">
					<TreeItemContent>Conqueror</TreeItemContent>
				</TreeItem>
			</TreeItem>
			<TreeLoadMoreItem isLoading />
		</Tree>
	),
	args: {},
};
