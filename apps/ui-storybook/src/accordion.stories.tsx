import type { Meta, StoryObj } from "@storybook/react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@lolmath/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Accordion",
	component: Accordion,
	subcomponents: { AccordionItem, AccordionTrigger, AccordionContent },
	tags: ["autodocs"],
	argTypes: {},
	render: () => {
		return (
			<Accordion>
				<AccordionItem value="item-1">
					<AccordionTrigger>Title A</AccordionTrigger>
					<AccordionContent>test</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-2">
					<AccordionTrigger>Title B</AccordionTrigger>
					<AccordionContent>
						Yes. It's unstyled by default, giving you freedom over the look and
						feel.
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-3">
					<AccordionTrigger>Title C</AccordionTrigger>
					<AccordionContent>
						Yes! You can animate the Accordion with CSS or JavaScript.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		);
	},
	args: {
		children: "League of Legends",
	},
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
	args: {},
};

export const WithOneItem: Story = {
	args: {},
	render: () => {
		return (
			<Accordion>
				<AccordionItem value="item-1">
					<AccordionTrigger>Title A</AccordionTrigger>
					<AccordionContent>test</AccordionContent>
				</AccordionItem>
			</Accordion>
		);
	},
};
