import { type Key, MultipleSelect } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

type Item = { id: string; name: string };

const sampleItems: Item[] = [
	{ id: "1", name: "Apple" },
	{ id: "2", name: "Banana" },
	{ id: "3", name: "Cherry" },
	{ id: "4", name: "Date" },
	{ id: "5", name: "Elderberry" },
	{ id: "6", name: "Fig" },
	{ id: "7", name: "Grape" },
	{ id: "8", name: "Honeydew" },
];

const meta = {
	title: "MultipleSelect",
	component: MultipleSelect<Item>,
	tags: ["autodocs"],
	argTypes: {},
	args: {
		items: sampleItems,
		selectId: (item) => item.id,
		selectLabel: (item) => item.name,
	},
} satisfies Meta<typeof MultipleSelect<Item>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const TonsOfItems: Story = {
	args: {
		items: Array.from({ length: 100 }, (_, i) => ({
			id: String(i + 1),
			name: `Item ${i + 1}`,
		})),
	},
};

export const Preselected: Story = {
	args: {
		defaultValue: ["1", "2"],
	},
};

export const Small: Story = {
	args: {
		size: "small",
	},
};

export const Medium: Story = {
	args: {
		size: "medium",
	},
};

export const Large: Story = {
	args: {
		size: "large",
	},
};

export const Controlled: Story = {
	render: (args) => {
		const [selected, setSelected] = React.useState<Key[]>(["2", "5"]);

		return <MultipleSelect value={selected} onChange={setSelected} {...args} />;
	},
	args: {},
};
