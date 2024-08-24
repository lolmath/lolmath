import type { Meta, StoryObj } from "@storybook/react";

import { Button, Menu, MenuItem, MenuPopover, MenuTrigger } from "@lolmath/ui";

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
			<MenuPopover>
				<Menu {...args}>
					<MenuItem onAction={() => alert("open")}>Open</MenuItem>
					<MenuItem onAction={() => alert("rename")}>Rename…</MenuItem>
					<MenuItem onAction={() => alert("duplicate")}>Duplicate</MenuItem>
					<MenuItem onAction={() => alert("share")}>Share…</MenuItem>
					<MenuItem onAction={() => alert("delete")}>Delete…</MenuItem>
				</Menu>
			</MenuPopover>
		</MenuTrigger>
	),
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
