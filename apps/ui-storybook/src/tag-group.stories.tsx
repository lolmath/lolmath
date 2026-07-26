import { TagGroup, TagList } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

interface Item {
	id: number;
	name: string;
	variant?: "gold" | "hextech" | "grey";
}

const sampleItems: Item[] = [
	{ id: 1, name: "Aatrox" },
	{ id: 2, name: "Braum" },
	{ id: 3, name: "Caitlyn" },
	{ id: 4, name: "Darius" },
	{ id: 5, name: "Evelynn" },
];

const meta: Meta<typeof TagGroup> = {
	title: "Data Display/TagGroup",
	component: TagGroup,
	tags: ["autodocs"],
	argTypes: {
		selectionMode: {
			control: { type: "select" },
			options: ["single", "multiple", undefined],
		},
	},
	args: {
		selectionMode: "multiple",
	},
	render: (args) => (
		<TagGroup aria-label="Champions" selectionMode={args.selectionMode}>
			<TagList
				items={sampleItems}
				selectLabel={(item: Item) => item.name}
				variant="hextech"
			/>
		</TagGroup>
	),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: {} };

export const SingleSelection: Story = {
	args: { selectionMode: "single" },
};

export const GreyVariant: Story = {
	render: (args) => (
		<TagGroup aria-label="Champions" selectionMode={args.selectionMode}>
			<TagList
				items={sampleItems}
				selectLabel={(item: Item) => item.name}
				variant="grey"
			/>
		</TagGroup>
	),
	args: {},
};

export const GoldVariant: Story = {
	render: (args) => (
		<TagGroup aria-label="Champions" selectionMode={args.selectionMode}>
			<TagList
				items={sampleItems}
				selectLabel={(item: Item) => item.name}
				variant="gold"
			/>
		</TagGroup>
	),
	args: {},
};

export const ManyItems: Story = {
	render: (args) => (
		<TagGroup aria-label="Many Champions" selectionMode={args.selectionMode}>
			<TagList
				items={Array.from({ length: 30 }, (_, i) => ({
					id: i,
					name: `Champion ${i}`,
				}))}
				selectLabel={(item: Item) => item.name}
				variant="hextech"
			/>
		</TagGroup>
	),
	args: {},
};

export const CustomRenderFunction: Story = {
	render: (args) => (
		<TagGroup aria-label="Champions" selectionMode={args.selectionMode}>
			<TagList
				items={sampleItems}
				selectLabel={(item: Item) => item.name.toUpperCase()}
				variant="gold"
			/>
		</TagGroup>
	),
	args: {},
};
