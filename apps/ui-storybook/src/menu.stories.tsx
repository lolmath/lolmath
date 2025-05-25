import type { Meta, StoryObj } from "@storybook/react";

import {
	Button,
	Checkbox,
	Dialog,
	DialogTrigger,
	Heading,
	Menu,
	MenuItem,
	MenuTrigger,
	Popover,
	SubmenuTrigger,
	Text,
	UnstyledPopover,
} from "@lolmath/ui";
import { FaHamburger } from "react-icons/fa";

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
			<UnstyledPopover>
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
						<UnstyledPopover>
							<Menu onAction={(key) => alert(`Email menu ${key} action`)}>
								<MenuItem key="Attachment">Email as Attachment</MenuItem>
								<MenuItem key="Link">Email as Link</MenuItem>
							</Menu>
						</UnstyledPopover>
					</SubmenuTrigger>
				</Menu>
			</UnstyledPopover>
		</MenuTrigger>
	),
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const TonsOfItems: Story = {
	args: {},
	render: () => (
		<MenuTrigger>
			<Button aria-label="Menu" shape="square" preset="dimmed">
				<FaHamburger />
			</Button>
			<UnstyledPopover>
				<Menu>
					{Array.from({ length: 100 }, (_, i) => (
						<MenuItem key={i} onAction={() => alert(`Item ${i} action`)}>
							Item {i}
						</MenuItem>
					))}
				</Menu>
			</UnstyledPopover>
		</MenuTrigger>
	),
};

export const AccountMenu: Story = {
	args: {},
	render: () => (
		<div>
			<DialogTrigger>
				<Button aria-label="Account" shape="round">
					<img
						alt=""
						src="https://i.imgur.com/xIe7Wlb.png"
						className="w-7 h-7 rounded-full"
					/>
				</Button>
				<Popover placement="bottom end" className="p-0">
					<Dialog className="outline-none">
						<div className="flex gap-2 items-center mx-3 my-2">
							<img
								alt=""
								src="https://i.imgur.com/xIe7Wlb.png"
								className="w-16 h-16 rounded-full"
							/>
							<div className="flex flex-col">
								<Heading as="h5" className="text-lol-md">
									Marissa Whitaker
								</Heading>
								<Text>user@example.com</Text>
								<Checkbox>Dark Mode</Checkbox>
							</div>
						</div>
						<Menu className="border-0">
							<MenuItem id="new">Account Settings</MenuItem>
							<MenuItem id="open">Support</MenuItem>
							<MenuItem id="save">Legal notices</MenuItem>
							<MenuItem id="save-as">About</MenuItem>
							<MenuItem id="print">Sign out</MenuItem>
						</Menu>
					</Dialog>
				</Popover>
			</DialogTrigger>
		</div>
	),
};
