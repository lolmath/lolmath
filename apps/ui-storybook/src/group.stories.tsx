import { Group, GroupInput, GroupSeparator } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Inputs/Group",
	component: Group,
	subcomponents: { GroupInput, GroupSeparator },
	tags: ["autodocs"],
	argTypes: {},
	render: (props) => (
		<Group {...props} aria-label="Example group">
			<GroupInput
				isDisabled={props.isDisabled}
				placeholder="Name"
				style={{ flex: 1 }}
			/>
			<GroupSeparator>#</GroupSeparator>
			<GroupInput
				isDisabled={props.isDisabled}
				placeholder="TAG"
				style={{ width: "4.5rem", flex: "none" }}
			/>
		</Group>
	),
} satisfies Meta<typeof Group>;

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

export const Small: Story = {
	args: {
		size: "small",
	},
};

export const Large: Story = {
	args: {
		size: "large",
	},
};
