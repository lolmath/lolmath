import type { Meta, StoryObj } from "@storybook/react";

import { Button, DialogTrigger, Heading, Popover, Text } from "@lolmath/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Popover",
	component: Popover,

	tags: ["autodocs"],
	argTypes: {},
	args: {
		children: "XX",
	},

	render: (args) => (
		<DialogTrigger>
			<Button>Popover</Button>
			<Popover {...args} />
		</DialogTrigger>
	),
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

export const Left: Story = {
	args: {
		placement: "left",
	},
};

export const Right: Story = {
	args: {
		placement: "right",
	},
};

export const Top: Story = {
	args: {
		placement: "top",
	},
};

export const Bottom: Story = {
	args: {
		placement: "bottom",
	},
};

export const LongText: Story = {
	args: {
		children: (
			<div className="p-2">
				<Heading preset="h3" as="h3" className="mb-2">
					Lorum Ipsum
				</Heading>
				<Text>
					There are many variations of passages of Lorem Ipsum available, but
					the majority have suffered alteration in some form, by injected
					humour, or randomised words which don't look even slightly believable.
					If you are going to use a passage of Lorem Ipsum, you need to be sure
					there isn't anything embarrassing hidden in the middle of text. All
					the Lorem Ipsum generators on the Internet tend to repeat predefined
					chunks as necessary, making this the first true generator on the
					Internet. It uses a dictionary of over 200 Latin words, combined with
					a handful of model sentence structures, to generate Lorem Ipsum which
					looks reasonable. The generated Lorem Ipsum is therefore always free
					from repetition, injected humour, or non-characteristic words etc.
				</Text>
			</div>
		),
		className: "w-[400px]",
	},
};

export const Instant: Story = {
	args: {
		children: <div>This popover should appear instantly</div>,
	},
	render: (args) => (
		<DialogTrigger>
			<Button>Popover</Button>
			<Popover {...args} />
		</DialogTrigger>
	),
};
