import {
	FieldError,
	Label,
	Radio,
	RadioButton,
	RadioField,
	RadioGroup,
	Text,
} from "@lolmath/ui";
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

export const WithDescriptionAndError: Story = {
	render: () => (
		<RadioGroup isInvalid defaultValue="dogs">
			<Label>Favorite pet</Label>
			<RadioField value="dogs">
				<RadioButton>Dog</RadioButton>
				<Text slot="description">Loyal and friendly.</Text>
			</RadioField>
			<RadioField value="cats">
				<RadioButton>Cat</RadioButton>
				<Text slot="description">Independent and quiet.</Text>
			</RadioField>
			<FieldError>Please select a valid pet.</FieldError>
		</RadioGroup>
	),
};
