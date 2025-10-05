import {
	Autocomplete,
	SearchField,
	Select,
	SelectButton,
	SelectListBox,
	SelectListBoxItem,
	SelectPopover,
	SelectValue,
	SelectVirtualizer,
	useFilter,
} from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

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

export function VirtualizedList() {
	// Create a large dataset for virtualization
	const items = Array.from({ length: 5000 }, (_, i) => ({
		id: i,
		name: `Item ${i}`,
	}));

	return (
		<Select>
			<SelectButton>
				<SelectValue />
			</SelectButton>
			<SelectPopover>
				<SelectVirtualizer>
					<SelectListBox
						aria-label="Virtualized Select"
						selectionMode="single"
						items={items}
					>
						{(item) => (
							<SelectListBoxItem key={item.id}>{item.name}</SelectListBoxItem>
						)}
					</SelectListBox>
				</SelectVirtualizer>
			</SelectPopover>
		</Select>
	);
}

export const VirtualizedWithAutocomplete: Story = {
	args: {},
	render: () => {
		const { contains } = useFilter({ sensitivity: "base" });

		const items = Array.from({ length: 5000 }, (_, i) => ({
			id: i,
			name: `Option ${i}`,
		}));

		return (
			<Select>
				<SelectButton>
					<SelectValue />
				</SelectButton>
				<SelectPopover>
					<Autocomplete filter={contains}>
						<SearchField aria-label="Search options" autoFocus />
						<SelectVirtualizer>
							<SelectListBox
								aria-label="Virtualized Autocomplete Select"
								selectionMode="single"
								items={items}
							>
								{(item) => (
									<SelectListBoxItem key={item.id}>
										{item.name}
									</SelectListBoxItem>
								)}
							</SelectListBox>
						</SelectVirtualizer>
					</Autocomplete>
				</SelectPopover>
			</Select>
		);
	},
};

export const Multiple: Story = {
	args: {},
	render: () => {
		const { contains } = useFilter({ sensitivity: "base" });

		const items = Array.from({ length: 5000 }, (_, i) => ({
			id: i,
			name: `Option ${i}`,
		}));

		return (
			<Select selectionMode="multiple">
				<SelectButton>
					<SelectValue />
				</SelectButton>
				<SelectPopover>
					<Autocomplete filter={contains}>
						<SearchField aria-label="Search options" autoFocus />
						<SelectVirtualizer>
							<SelectListBox
								aria-label="Virtualized Autocomplete Select"
								selectionMode="single"
								items={items}
							>
								{(item) => (
									<SelectListBoxItem key={item.id}>
										{item.name}
									</SelectListBoxItem>
								)}
							</SelectListBox>
						</SelectVirtualizer>
					</Autocomplete>
				</SelectPopover>
			</Select>
		);
	},
};
