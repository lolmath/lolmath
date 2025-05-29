import type { Meta, StoryObj } from "@storybook/react-vite";

import {
	MultipleSelect,
	SelectListBoxItem,
	type SelectedKey,
	Tag,
} from "@lolmath/ui";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "MultipleSelect",
	component: MultipleSelect,
	render: (args) => {
		const [selectedItems, setSelectedItems] = useState<SelectedKey[]>(
			args.selectedItems,
		);

		return (
			<MultipleSelect
				className="max-w-xs"
				{...args}
				selectedItems={selectedItems}
				onChange={setSelectedItems}
			/>
		);
	},
	tags: ["autodocs"],
	argTypes: {},
	args: {
		selectedItems: [{ id: "1", name: "Apple" }],
		items: [
			{ id: "1", name: "Apple" },
			{ id: "2", name: "Banana" },
			{ id: "3", name: "Cherry" },
			{ id: "4", name: "Date" },
			{ id: "5", name: "Elderberry" },
			{ id: "6", name: "Fig" },
			{ id: "7", name: "Grape" },
			{ id: "8", name: "Honeydew" },
			{ id: "9", name: "Kiwi" },
			{ id: "10", name: "Lemon" },
			{ id: "11", name: "Mango" },
			{ id: "12", name: "Nectarine" },
			{ id: "13", name: "Orange" },
			{ id: "14", name: "Papaya" },
			{ id: "15", name: "Quince" },
			{ id: "16", name: "Raspberry" },
			{ id: "17", name: "Strawberry" },
			{ id: "18", name: "Tangerine" },
			{ id: "19", name: "Ugli Fruit" },
			{ id: "20", name: "Watermelon" },
		],
		tag: (item) => <Tag textValue={item.name}>{item.name}</Tag>,
		children: (item) => {
			return (
				<SelectListBoxItem textValue={item.name}>{item.name}</SelectListBoxItem>
			);
		},
	},
} satisfies Meta<typeof MultipleSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const TonsOfItems: Story = {
	args: {},
	render: (args) => {
		const [selectedItems, setSelectedItems] = useState<SelectedKey[]>([
			{ id: "1", name: "Apple" },
		]);

		return (
			<MultipleSelect
				{...args}
				className="max-w-xs"
				items={Array.from({ length: 100 }, (_, i) => ({
					id: i.toString(),
					name: `Item ${i}`,
				}))}
				selectedItems={selectedItems}
				onChange={setSelectedItems}
			/>
		);
	},
};
