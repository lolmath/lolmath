import { Label, Radio, RadioGroup } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "RadioGroup",
	component: RadioGroup,
	subcomponents: { Radio },
	tags: ["autodocs"],
	argTypes: {},
	args: {
		defaultValue: "cats",
	},
	render: (props) => {
		return (
			<RadioGroup {...props}>
				<Label>Favorite pet</Label>
				<Radio value="dogs">Dog</Radio>
				<Radio value="cats">Cat</Radio>
				<Radio value="dragon">Dragon</Radio>
			</RadioGroup>
		);
	},
} satisfies Meta<typeof RadioGroup>;

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
