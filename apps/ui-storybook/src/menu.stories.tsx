import type { Meta, StoryObj } from "@storybook/react";

import {
	Button,
	Menu,
	MenuItem,
	MenuTrigger,
	SubmenuTrigger,
} from "@lolmath/ui";

const meta = {
	title: "Menu",
	component: Menu,
	tags: ["autodocs"],
	argTypes: {},
	render: (args) => (
		<MenuTrigger>
			<Button aria-label="Menu" shape="square" preset="dimmed">
				☰
			</Button>
			<Menu {...args}>
				<MenuItem onAction={() => alert("open")}>Open</MenuItem>
				<MenuItem onAction={() => alert("rename")}>Rename…</MenuItem>
				<MenuItem onAction={() => alert("duplicate")}>Duplicate</MenuItem>
				<MenuItem isDisabled onAction={() => alert("share")}>
					Share…
				</MenuItem>
				<MenuItem onAction={() => alert("delete")}>Delete…</MenuItem>
				<SubmenuTrigger>
					<MenuItem key="Email">Email</MenuItem>
					<Menu onAction={(key) => alert(`Email menu ${key} action`)}>
						<MenuItem key="Attachment">Email as Attachment</MenuItem>
						<MenuItem key="Link">Email as Link</MenuItem>
					</Menu>
				</SubmenuTrigger>
			</Menu>
		</MenuTrigger>
	),
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
