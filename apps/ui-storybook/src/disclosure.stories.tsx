import {
	Disclosure,
	DisclosureButton,
	DisclosureGroup,
	DisclosurePanel,
	Text,
} from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
	title: "Overlays/Disclosure",
	component: Disclosure,
	subcomponents: {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		DisclosureGroup,
	},
	tags: ["autodocs"],
	argTypes: {},
	render: () => {
		return (
			<DisclosureGroup defaultExpandedKeys={["item-1"]}>
				<Disclosure id="item-1">
					<DisclosureButton>Title A</DisclosureButton>
					<DisclosurePanel>
						<Text style={{ paddingBlock: "1rem" }}>test</Text>
					</DisclosurePanel>
				</Disclosure>

				<Disclosure id="item-2">
					<DisclosureButton>Title B</DisclosureButton>
					<DisclosurePanel>
						<Text style={{ paddingBlock: "1rem" }}>
							Yes. It's unstyled by default, giving you freedom over the look
							and feel.
						</Text>
					</DisclosurePanel>
				</Disclosure>

				<Disclosure id="item-3">
					<DisclosureButton>Title C</DisclosureButton>
					<DisclosurePanel>
						<Text style={{ paddingBlock: "1rem" }}>
							Yes! You can animate the Disclosure with CSS or JavaScript.
						</Text>
					</DisclosurePanel>
				</Disclosure>
			</DisclosureGroup>
		);
	},
	args: {
		children: "League of Legends",
	},
} satisfies Meta<typeof Disclosure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
	args: {},
};

export const WithOneItem: Story = {
	args: {},
	render: () => {
		return (
			<DisclosureGroup>
				<Disclosure id="item-1">
					<DisclosureButton>Title A</DisclosureButton>
					<DisclosurePanel>
						<Text style={{ paddingBlock: "1rem" }}>test</Text>
					</DisclosurePanel>
				</Disclosure>
			</DisclosureGroup>
		);
	},
};
