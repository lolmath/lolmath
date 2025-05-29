import type { Meta, StoryObj } from "@storybook/react-vite";

import {
	Autocomplete,
	SearchField,
	Select,
	SelectButton,
	SelectListBox,
	SelectListBoxItem,
	SelectPopover,
	SelectValue,
	useFilter,
} from "@lolmath/ui";

const meta = {
	title: "Select",
	component: Select,
	render: (args) => (
		<Select isDisabled={args.isDisabled}>
			<SelectButton>
				<SelectValue />
			</SelectButton>
			<SelectPopover>
				<SelectListBox>
					<SelectListBoxItem>Aardvark</SelectListBoxItem>
					<SelectListBoxItem>Cat</SelectListBoxItem>
					<SelectListBoxItem>Dog</SelectListBoxItem>
					<SelectListBoxItem>Kangaroo</SelectListBoxItem>
					<SelectListBoxItem>Panda</SelectListBoxItem>
					<SelectListBoxItem>Snake</SelectListBoxItem>
				</SelectListBox>
			</SelectPopover>
		</Select>
	),
	tags: ["autodocs"],
	argTypes: {},
	args: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const Disabled: Story = {
	args: {
		isDisabled: true,
	},
};

export const TonsOfItems: Story = {
	args: {},
	render: () => (
		<Select>
			<SelectButton>
				<SelectValue />
			</SelectButton>
			<SelectPopover>
				<SelectListBox>
					{Array.from({ length: 100 }, (_, i) => (
						<SelectListBoxItem key={i}>Item {i}</SelectListBoxItem>
					))}
				</SelectListBox>
			</SelectPopover>
		</Select>
	),
};

export const TonsOfItemsWithRenderFunction: Story = {
	args: {},
	render: () => (
		<Select>
			<SelectButton>
				<SelectValue />
			</SelectButton>
			<SelectPopover>
				<SelectListBox
					items={Array.from({ length: 100 }).map((_, i) => ({
						id: i,
						value: `Item ${i}`,
					}))}
				>
					{({ value }) => <SelectListBoxItem>{value}</SelectListBoxItem>}
				</SelectListBox>
			</SelectPopover>
		</Select>
	),
};

export const AutocompleteExample: Story = {
	args: {},
	render: () => {
		const { contains } = useFilter({ sensitivity: "base" });

		return (
			<Select>
				<SelectButton>
					<SelectValue />
				</SelectButton>
				<SelectPopover>
					<Autocomplete filter={contains}>
						<SearchField aria-label="Search" autoFocus />
						<SelectListBox>
							<SelectListBoxItem>Aardvark</SelectListBoxItem>
							<SelectListBoxItem>Cat</SelectListBoxItem>
							<SelectListBoxItem>Dog</SelectListBoxItem>
							<SelectListBoxItem>Kangaroo</SelectListBoxItem>
							<SelectListBoxItem>Panda</SelectListBoxItem>
							<SelectListBoxItem>Snake</SelectListBoxItem>
						</SelectListBox>
					</Autocomplete>
				</SelectPopover>
			</Select>
		);
	},
};

export const AutocompleteWithTonsOfItems: Story = {
	args: {},
	render: () => {
		const { contains } = useFilter({ sensitivity: "base" });

		return (
			<Select>
				<SelectButton>
					<SelectValue />
				</SelectButton>
				<SelectPopover>
					<Autocomplete filter={contains}>
						<SearchField aria-label="Search" autoFocus />
						<SelectListBox
							items={Array.from({ length: 100 }).map((_, i) => ({
								id: i,
								value: `Item ${i}`,
							}))}
						>
							{({ value }) => <SelectListBoxItem>{value}</SelectListBoxItem>}
						</SelectListBox>
					</Autocomplete>
				</SelectPopover>
			</Select>
		);
	},
};
