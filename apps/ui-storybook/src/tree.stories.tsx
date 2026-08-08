import {
	Collection,
	type Key,
	type Selection,
	Tree,
	TreeItem,
	TreeItemContent,
	TreeLoadMoreItem,
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

const meta: Meta<typeof Tree> = {
	title: "Data Display/Tree",
	component: Tree,
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
