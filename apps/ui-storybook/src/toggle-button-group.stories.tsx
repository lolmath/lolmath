import { ToggleButton, ToggleButtonGroup } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa6";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Buttons/ToggleButtonGroup",
	component: ToggleButtonGroup,
	tags: ["autodocs"],
	argTypes: {
		selectionMode: {
			control: { type: "select" },
			options: ["single", "multiple"],
			description: "How many buttons can be selected at once",
		},
		orientation: {
			control: { type: "select" },
			options: ["horizontal", "vertical"],
			description: "The direction the buttons are laid out in",
		},
		isDisabled: {
			defaultValue: false,
			description: "Is the whole group disabled?",
			type: { name: "boolean" },
		},
	},
	args: {
		selectionMode: "single",
		defaultSelectedKeys: ["top"],
	},
	render: (args) => (
		<ToggleButtonGroup aria-label="Lane" {...args}>
			<ToggleButton id="top">Top</ToggleButton>
			<ToggleButton id="jungle">Jungle</ToggleButton>
			<ToggleButton id="mid">Mid</ToggleButton>
		</ToggleButtonGroup>
	),
} satisfies Meta<typeof ToggleButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const MultipleSelection: Story = {
	args: {
		selectionMode: "multiple",
		defaultSelectedKeys: ["top", "mid"],
	},
};

export const Vertical: Story = {
	args: {
		orientation: "vertical",
	},
};

export const Disabled: Story = {
	args: {
		isDisabled: true,
	},
};

export const DisallowEmptySelection: Story = {
	args: {
		disallowEmptySelection: true,
	},
};

export const Hextech: Story = {
	render: (args) => (
		<ToggleButtonGroup aria-label="Lane" {...args}>
			<ToggleButton id="top" preset="hextech">
				Top
			</ToggleButton>
			<ToggleButton id="jungle" preset="hextech">
				Jungle
			</ToggleButton>
			<ToggleButton id="mid" preset="hextech">
				Mid
			</ToggleButton>
		</ToggleButtonGroup>
	),
};

export const SquaredIcons: Story = {
	args: {
		selectionMode: "multiple",
		defaultSelectedKeys: ["bold"],
	},
	render: (args) => (
		<ToggleButtonGroup aria-label="Text style" {...args}>
			<ToggleButton id="bold" shape="square" aria-label="Bold">
				<FaBold />
			</ToggleButton>
			<ToggleButton id="italic" shape="square" aria-label="Italic">
				<FaItalic />
			</ToggleButton>
			<ToggleButton id="underline" shape="square" aria-label="Underline">
				<FaUnderline />
			</ToggleButton>
		</ToggleButtonGroup>
	),
};
