import {
	Button,
	Checkbox,
	ToggleButton,
	ToggleButtonGroup,
	Toolbar,
	ToolbarSeparator,
} from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa6";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Layout/Toolbar",
	component: Toolbar,
	tags: ["autodocs"],
	argTypes: {
		orientation: {
			control: { type: "select" },
			options: ["horizontal", "vertical"],
			description: "The direction the controls are laid out in",
		},
	},
	args: {},
	render: (args) => (
		<Toolbar aria-label="Text formatting" {...args}>
			<ToggleButtonGroup
				aria-label="Text style"
				selectionMode="multiple"
				defaultSelectedKeys={["bold"]}
				orientation={args.orientation}
			>
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
			<ToolbarSeparator
				orientation={
					args.orientation === "vertical" ? "horizontal" : "vertical"
				}
			/>
			<Button>Copy</Button>
			<Button>Paste</Button>
		</Toolbar>
	),
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const Vertical: Story = {
	args: {
		orientation: "vertical",
	},
};

export const WithCheckbox: Story = {
	render: (args) => (
		<Toolbar aria-label="Match filters" {...args}>
			<Button preset="hextech">Refresh</Button>
			<ToolbarSeparator />
			<Checkbox>Ranked only</Checkbox>
			<Checkbox>Last 7 days</Checkbox>
		</Toolbar>
	),
};
