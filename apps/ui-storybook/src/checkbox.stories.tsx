import {
	Checkbox,
	CheckboxButton,
	CheckboxField,
	FieldError,
	Text,
} from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Inputs/Checkbox",
	component: Checkbox,
	tags: ["autodocs"],
	argTypes: {},
	args: {
		children: "Enable Low Spec Mode",
	},
} satisfies Meta<typeof Checkbox>;

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
export const Indeterminate: Story = {
	args: {
		isIndeterminate: true,
	},
};

export const Multiple: Story = {
	render: () => (
		<div className="inline-grid grid-cols-2">
			<Checkbox />
			<Checkbox />
			<Checkbox />
			<Checkbox />
		</div>
	),
};

export const DynamicChildren: Story = {
	args: {
		children: (values) => `Enable Low Spec Mode (${values.isSelected})`,
	},
};

export const DynamicClassname: Story = {
	args: {
		className: (values) =>
			values.isSelected ? "text-green-700" : "text-red-700",
	},
};

export const WithDescriptionAndError: Story = {
	render: () => (
		<CheckboxField isInvalid defaultSelected>
			<CheckboxButton>Enable notifications</CheckboxButton>
			<Text slot="description">Get notified about updates.</Text>
			<FieldError>You must enable notifications to continue.</FieldError>
		</CheckboxField>
	),
};
