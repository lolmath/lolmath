import {
	Button,
	ButtonLink,
	MultipleSelect,
	NumberField,
	SearchField,
	Select,
	SelectButton,
	SelectListBox,
	SelectListBoxItem,
	SelectPopover,
	SelectValue,
	TextField,
	ToggleButton,
} from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FaGear } from "react-icons/fa6";

const meta = {
	title: "Examples/Form",
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextfieldWithButton: Story = {
	render: () => {
		return (
			<div style={{ display: "flex", gap: "0.25rem" }}>
				<TextField />
				<Button>Submit</Button>
			</div>
		);
	},
};

export const EverythingOnOneLine: Story = {
	render: () => {
		return (
			<div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
				<TextField />
				<Button>Submit</Button>
				<MultipleSelect
					items={[
						{ id: "1", name: "Apple" },
						{ id: "2", name: "Banana" },
						{ id: "3", name: "Cherry" },
					]}
					selectId={(i) => i.id}
					selectLabel={(i) => i.name}
				/>
				<Select>
					<SelectButton>
						<SelectValue />
					</SelectButton>
					<SelectPopover>
						<SelectListBox>
							<SelectListBoxItem>Cat</SelectListBoxItem>
							<SelectListBoxItem>Dog</SelectListBoxItem>
						</SelectListBox>
					</SelectPopover>
				</Select>
				<NumberField />
				<SearchField />
				<ToggleButton>Toggle Me</ToggleButton>
				<ButtonLink href="#">Link</ButtonLink>
				<Button shape="square">
					<FaGear />
				</Button>
				<Button shape="round">
					<FaGear />
				</Button>
			</div>
		);
	},
};

export const Small: Story = {
	render: () => {
		return (
			<div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
				<TextField size="small" />
				<Button size="small">Submit</Button>
				<MultipleSelect
					items={[
						{ id: "1", name: "Apple" },
						{ id: "2", name: "Banana" },
						{ id: "3", name: "Cherry" },
					]}
					selectId={(i) => i.id}
					selectLabel={(i) => i.name}
					size="small"
				/>
				<Select>
					<SelectButton size="small">
						<SelectValue />
					</SelectButton>
					<SelectPopover>
						<SelectListBox>
							<SelectListBoxItem>Cat</SelectListBoxItem>
							<SelectListBoxItem>Dog</SelectListBoxItem>
						</SelectListBox>
					</SelectPopover>
				</Select>
				<NumberField size="small" />
				<SearchField size="small" />
				<ToggleButton size="small">Toggle Me</ToggleButton>
				<ButtonLink size="small" href="#">
					Link
				</ButtonLink>
				<Button size="small" shape="square">
					<FaGear />
				</Button>
				<Button size="small" shape="round">
					<FaGear />
				</Button>
			</div>
		);
	},
};

export const Medium: Story = {
	render: () => {
		return (
			<div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
				<TextField size="medium" />
				<Button size="medium">Submit</Button>
				<MultipleSelect
					items={[
						{ id: "1", name: "Apple" },
						{ id: "2", name: "Banana" },
						{ id: "3", name: "Cherry" },
					]}
					selectId={(i) => i.id}
					selectLabel={(i) => i.name}
					size="medium"
				/>
				<Select>
					<SelectButton size="medium">
						<SelectValue />
					</SelectButton>
					<SelectPopover>
						<SelectListBox>
							<SelectListBoxItem>Cat</SelectListBoxItem>
							<SelectListBoxItem>Dog</SelectListBoxItem>
						</SelectListBox>
					</SelectPopover>
				</Select>
				<NumberField size="medium" />
				<SearchField size="medium" />
				<ToggleButton size="medium">Toggle Me</ToggleButton>
				<ButtonLink size="medium" href="#">
					Link
				</ButtonLink>
				<Button size="medium" shape="square">
					<FaGear />
				</Button>
				<Button size="medium" shape="round">
					<FaGear />
				</Button>
			</div>
		);
	},
};

export const Large: Story = {
	render: () => {
		return (
			<div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
				<TextField size="large" />
				<Button size="large">Submit</Button>
				<MultipleSelect
					items={[
						{ id: "1", name: "Apple" },
						{ id: "2", name: "Banana" },
						{ id: "3", name: "Cherry" },
					]}
					selectId={(i) => i.id}
					selectLabel={(i) => i.name}
					size="large"
				/>
				<Select>
					<SelectButton size="large">
						<SelectValue />
					</SelectButton>
					<SelectPopover>
						<SelectListBox>
							<SelectListBoxItem>Cat</SelectListBoxItem>
							<SelectListBoxItem>Dog</SelectListBoxItem>
						</SelectListBox>
					</SelectPopover>
				</Select>
				<NumberField size="large" />
				<SearchField size="large" />
				<ToggleButton size="large">Toggle Me</ToggleButton>
				<ButtonLink size="large" href="#">
					Link
				</ButtonLink>
				<Button size="large" shape="square">
					<FaGear />
				</Button>
				<Button size="large" shape="round">
					<FaGear />
				</Button>
			</div>
		);
	},
};
