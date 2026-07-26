import {
	FieldError,
	Switch,
	SwitchButton,
	SwitchField,
	Text,
} from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Inputs/Switch",
	component: Switch,
	tags: ["autodocs"],
	argTypes: {},
	args: {},
} satisfies Meta<typeof Switch>;

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

export const Multiple: Story = {
	render: () => (
		<div className="inline-grid grid-cols-2">
			<Switch />
			<Switch />
			<Switch />
			<Switch />
		</div>
	),
};

export const WithChildren: Story = {
	args: {
		children: "Low Power Mode",
	},
};

export const WithDescriptionAndError: Story = {
	render: () => (
		<SwitchField isInvalid>
			<SwitchButton>Low Power Mode</SwitchButton>
			<Text slot="description">Reduces performance to save battery.</Text>
			<FieldError>Low Power Mode is required.</FieldError>
		</SwitchField>
	),
};
