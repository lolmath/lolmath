import { Label, Slider, SliderOutput } from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Inputs/Slider",
	component: Slider,
	tags: ["autodocs"],
	argTypes: {},
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DoubleSlider: Story = {
	args: {
		defaultValue: [20, 80],
	},
};

export const SingleSlider: Story = {
	args: {
		defaultValue: 50,
	},
};

export const Disabled: Story = {
	args: {
		isDisabled: true,
		value: 20,
	},
};

export const OnChange: Story = {
	render: () => (
		<Slider
			defaultValue={20}
			onChange={(v) => {
				console.log(v);
			}}
		/>
	),
};

export const WithLabel: Story = {
	args: {
		value: 20,
		children: <Label>Some label</Label>,
	},
};

export const WithOutput: Story = {
	args: {
		defaultValue: 20,
		children: (
			<div className="flex justify-between">
				<Label>Some label</Label>
				<SliderOutput />
			</div>
		),
	},
};

export const DoubleSliderWithOutput: Story = {
	args: {
		defaultValue: [20, 80],
		children: (
			<div className="flex justify-between">
				<Label>Some label</Label>
				<SliderOutput />
			</div>
		),
	},
};
