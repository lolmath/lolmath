import {
	Autocomplete,
	Button,
	Checkbox,
	Dialog,
	DialogTrigger,
	Heading,
	Menu,
	MenuHeader,
	MenuItem,
	MenuPopover,
	MenuSection,
	MenuSeparator,
	MenuTrigger,
	MenuVirtualizer,
	Popover,
	SearchField,
	type Selection,
	SubmenuTrigger,
	Text,
	useFilter,
} from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FaHamburger } from "react-icons/fa";

const meta = {
	title: "Overlays/Menu",
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
					<MenuItem isDisabled onAction={() => alert("share")}>
						Share…
					</MenuItem>
					<MenuItem onAction={() => alert("delete")}>Delete…</MenuItem>
					<SubmenuTrigger>
						<MenuItem key="Email">Email</MenuItem>
						<MenuPopover>
							<Menu
								onAction={(key, value) =>
									alert(`Email menu ${key} (${value}) action`)
								}
							>
								<MenuItem key="Attachment">Email as Attachment</MenuItem>
								<MenuItem key="Link">Email as Link</MenuItem>
							</Menu>
						</MenuPopover>
					</SubmenuTrigger>
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

export const TonsOfItems: Story = {
	args: {},
	render: () => (
		<MenuTrigger>
			<Button aria-label="Menu" shape="square" preset="dimmed">
				<FaHamburger />
			</Button>
			<MenuPopover>
				<Menu>
					{Array.from({ length: 100 }, (_, i) => (
						<MenuItem key={i} onAction={() => alert(`Item ${i} action`)}>
							Item {i}
						</MenuItem>
					))}
				</Menu>
			</MenuPopover>
		</MenuTrigger>
	),
};

export const TonsOfItemsWithRenderFunction: Story = {
	args: {},
	render: () => (
		<MenuTrigger>
			<Button aria-label="Menu" shape="square" preset="dimmed">
				<FaHamburger />
			</Button>
			<MenuPopover>
				<Menu
					items={Array.from({ length: 100 }).map((_, i) => ({
						id: i,
						value: `Item ${i}`,
					}))}
				>
					{({ value }) => (
						<MenuItem onAction={() => alert(`${value} action`)}>
							{value}
						</MenuItem>
					)}
				</Menu>
			</MenuPopover>
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
						style={{
							width: "1.75rem",
							height: "1.75rem",
							borderRadius: "9999px",
						}}
					/>
				</Button>
				<Popover placement="bottom end" style={{ padding: 0 }}>
					<Dialog style={{ outline: "none" }}>
						<div
							style={{
								display: "flex",
								gap: "0.5rem",
								alignItems: "center",
								margin: "0.5rem 0.75rem",
							}}
						>
							<img
								alt=""
								src="https://i.imgur.com/xIe7Wlb.png"
								style={{
									width: "4rem",
									height: "4rem",
									borderRadius: "9999px",
								}}
							/>
							<div style={{ display: "flex", flexDirection: "column" }}>
								<Heading
									as="h5"
									style={{ fontSize: "var(--lol-font-size-md)" }}
								>
									Marissa Whitaker
								</Heading>
								<Text>user@example.com</Text>
								<Checkbox>Dark Mode</Checkbox>
							</div>
						</div>
						<Menu style={{ border: 0 }}>
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

export const AutoCompleteExample: Story = {
	args: {},
	render: () => {
		const { contains } = useFilter({ sensitivity: "base" });

		return (
			<MenuTrigger>
				<Button aria-label="Menu" shape="square" preset="dimmed">
					<FaHamburger />
				</Button>
				<MenuPopover>
					<Autocomplete filter={contains}>
						<SearchField />
						<Menu>
							<MenuItem>Create new file...</MenuItem>
							<MenuItem>Create new folder...</MenuItem>
							<MenuItem>Assign to...</MenuItem>
							<MenuItem>Assign to me</MenuItem>
							<MenuItem>Change status...</MenuItem>
							<MenuItem>Change priority...</MenuItem>
							<MenuItem>Add label...</MenuItem>
							<MenuItem>Remove label...</MenuItem>
						</Menu>
					</Autocomplete>
				</MenuPopover>
			</MenuTrigger>
		);
	},
};

export const TonsOfItemsWithAutocomplete: Story = {
	args: {},
	render: () => {
		const { contains } = useFilter({ sensitivity: "base" });

		return (
			<MenuTrigger>
				<Button aria-label="Menu" shape="square" preset="dimmed">
					<FaHamburger />
				</Button>
				<MenuPopover>
					<Autocomplete filter={contains}>
						<SearchField aria-label="Search" autoFocus />
						<Menu
							items={Array.from({ length: 100 }).map((_, i) => ({
								id: i,
								value: `Item ${i}`,
							}))}
						>
							{({ value, id }) => (
								<MenuItem key={id} onAction={() => alert(`${value} action`)}>
									{value}
								</MenuItem>
							)}
						</Menu>
					</Autocomplete>
				</MenuPopover>
			</MenuTrigger>
		);
	},
};

export const WithMultipleSelect: Story = {
	args: {},
	render: () => (
		<MenuTrigger>
			<Button aria-label="Menu" shape="square" preset="dimmed">
				<FaHamburger />
			</Button>
			<MenuPopover>
				<Menu selectionMode="multiple">
					<MenuItem id="banana">Banana</MenuItem>
					<MenuItem id="apple">Apple</MenuItem>
					<MenuItem id="orange">Orange</MenuItem>
					<MenuItem id="verylongitem">
						This is a very long item that should wrap to the next line if it is
						too long
					</MenuItem>
				</Menu>
			</MenuPopover>
		</MenuTrigger>
	),
};

export const WithSingleSelect = () => {
	const [selected, setSelected] = useState<Selection>(
		() => new Set(["center"]),
	);

	return (
		<MenuTrigger>
			<Button aria-label="Menu" shape="square" preset="dimmed">
				<FaHamburger />
			</Button>
			<MenuPopover>
				<Menu
					selectionMode="single"
					selectedKeys={selected}
					onSelectionChange={setSelected}
				>
					<MenuItem id="banana">Banana</MenuItem>
					<MenuItem id="apple">Apple</MenuItem>
					<MenuItem id="orange">Orange</MenuItem>
					<MenuItem id="verylongitem">
						This is a very long item that is indeed very long.
					</MenuItem>
				</Menu>
			</MenuPopover>
		</MenuTrigger>
	);
};

export const WithoutPopover: Story = {
	args: {},
	render: () => (
		<Menu>
			<MenuItem onAction={() => alert("open")}>Open</MenuItem>
			<MenuItem onAction={() => alert("rename")}>Rename…</MenuItem>
			<MenuItem onAction={() => alert("duplicate")}>Duplicate</MenuItem>
			<MenuItem isDisabled onAction={() => alert("share")}>
				Share…
			</MenuItem>
			<MenuItem onAction={() => alert("delete")}>Delete…</MenuItem>
		</Menu>
	),
};

export function WithoutPopoverSections() {
	return (
		<Menu>
			<MenuSection>
				<MenuHeader>File</MenuHeader>
				<MenuItem onAction={() => alert("open")}>Open</MenuItem>
				<MenuItem onAction={() => alert("rename")}>Rename…</MenuItem>
				<MenuItem onAction={() => alert("duplicate")}>Duplicate</MenuItem>
				<MenuItem isDisabled onAction={() => alert("share")}>
					Share…
				</MenuItem>
				<MenuItem onAction={() => alert("delete")}>Delete…</MenuItem>
			</MenuSection>
			<MenuSection>
				<MenuHeader>Edit</MenuHeader>
				<MenuItem onAction={() => alert("cut")}>Cut</MenuItem>
				<MenuItem onAction={() => alert("copy")}>Copy</MenuItem>
				<MenuItem onAction={() => alert("paste")}>Paste</MenuItem>
			</MenuSection>
		</Menu>
	);
}

export function WithSections() {
	return (
		<MenuTrigger>
			<Button aria-label="Menu" shape="square" preset="dimmed">
				<FaHamburger />
			</Button>
			<MenuPopover>
				<Menu>
					<MenuSection>
						<MenuHeader>File</MenuHeader>
						<MenuItem onAction={() => alert("open")}>Open</MenuItem>
						<MenuItem onAction={() => alert("rename")}>Rename…</MenuItem>
						<MenuItem onAction={() => alert("duplicate")}>Duplicate</MenuItem>
						<MenuItem isDisabled onAction={() => alert("share")}>
							Share…
						</MenuItem>
						<MenuItem onAction={() => alert("delete")}>Delete…</MenuItem>
					</MenuSection>
					<MenuSection>
						<MenuHeader>Edit</MenuHeader>
						<MenuItem onAction={() => alert("cut")}>Cut</MenuItem>
						<MenuItem onAction={() => alert("copy")}>Copy</MenuItem>
						<MenuItem onAction={() => alert("paste")}>Paste</MenuItem>
					</MenuSection>
				</Menu>
			</MenuPopover>
		</MenuTrigger>
	);
}

export const VirtualizedMenu = () => {
	// Create a large dataset for virtualization
	const items = Array.from({ length: 5000 }, (_, i) => ({
		id: i,
		name: `Item ${i}`,
	}));

	return (
		<MenuTrigger>
			<Button aria-label="Menu" shape="square" preset="dimmed">
				<FaHamburger />
			</Button>
			<MenuPopover>
				<MenuVirtualizer>
					<Menu items={items}>
						{(item) => (
							<MenuItem
								key={item.id}
								onAction={() => alert(`Item ${item.id} action`)}
							>
								{item.name}
							</MenuItem>
						)}
					</Menu>
				</MenuVirtualizer>
			</MenuPopover>
		</MenuTrigger>
	);
};

export const VirtualizedMenuWithSearch = () => {
	// Create a large dataset for virtualization
	const items = Array.from({ length: 5000 }, (_, i) => ({
		id: i,
		name: `Item ${i}`,
	}));

	const { contains } = useFilter({ sensitivity: "base" });

	return (
		<MenuTrigger>
			<Button aria-label="Menu" shape="square" preset="dimmed">
				<FaHamburger />
			</Button>
			<MenuPopover>
				<Autocomplete filter={contains}>
					<SearchField />
					<MenuVirtualizer>
						<Menu items={items}>
							{(item) => (
								<MenuItem
									key={item.id}
									onAction={() => alert(`Item ${item.id} action`)}
								>
									{item.name}
								</MenuItem>
							)}
						</Menu>
					</MenuVirtualizer>
				</Autocomplete>
			</MenuPopover>
		</MenuTrigger>
	);
};

export function WithKitchenSink() {
	// Sub menus, sections, selection modes, and more.

	const [singleSelected, setSingleSelected] = useState<Selection>(
		() => new Set(["banana"]),
	);
	const [multipleSelected, setMultipleSelected] = useState<Selection>(
		() => new Set(["apple", "orange"]),
	);

	const [subSelected, setSubSelected] = useState<Selection>(
		() => new Set(["subitem1"]),
	);
	const [subMultipleSelected, setSubMultipleSelected] = useState<Selection>(
		() => new Set(["subitem2"]),
	);

	return (
		<MenuTrigger>
			<Button aria-label="Menu" shape="square" preset="dimmed">
				<FaHamburger />
			</Button>
			<MenuPopover>
				<Menu>
					<MenuSection>
						<MenuHeader>File Operations</MenuHeader>
						<MenuItem onAction={() => alert("new file")}>New File</MenuItem>
						<MenuItem onAction={() => alert("open")}>Open</MenuItem>
						<MenuSeparator />
						<MenuItem onAction={() => alert("save")}>Save</MenuItem>
						<MenuItem isDisabled onAction={() => alert("save as")}>
							Save As...
						</MenuItem>
					</MenuSection>

					<MenuSection
						selectionMode="single"
						selectedKeys={singleSelected}
						onSelectionChange={setSingleSelected}
					>
						<MenuHeader>Single Selection Fruits</MenuHeader>
						<MenuItem id="banana">🍌 Banana</MenuItem>
						<MenuItem id="apple">🍎 Apple</MenuItem>
						<MenuSeparator />
						<MenuItem id="orange">🍊 Orange</MenuItem>
						<MenuItem id="grape">🍇 Grape</MenuItem>
					</MenuSection>
					<MenuSection
						selectionMode="multiple"
						selectedKeys={multipleSelected}
						onSelectionChange={setMultipleSelected}
					>
						<MenuHeader>Multiple Selection Fruits</MenuHeader>
						<MenuItem id="lemon">🍋 Lemon</MenuItem>
						<MenuItem id="kiwi">🥝 Kiwi</MenuItem>
						<MenuItem id="strawberry">🍓 Strawberry</MenuItem>
						<MenuItem id="blueberry">🫐 Blueberry</MenuItem>
					</MenuSection>

					<MenuSection>
						<MenuHeader>Advanced Options</MenuHeader>
						<SubmenuTrigger>
							<MenuItem key="preferences">⚙️ Preferences</MenuItem>
							<MenuPopover>
								<Menu
									selectionMode="single"
									selectedKeys={subSelected}
									onSelectionChange={setSubSelected}
								>
									<MenuItem id="subitem1">Theme: Light</MenuItem>
									<MenuItem id="subitem2">Theme: Dark</MenuItem>
									<MenuItem id="subitem3">Theme: Auto</MenuItem>
								</Menu>
							</MenuPopover>
						</SubmenuTrigger>

						<SubmenuTrigger>
							<MenuItem key="languages">🌐 Languages</MenuItem>
							<MenuPopover>
								<Menu
									selectionMode="multiple"
									selectedKeys={subMultipleSelected}
									onSelectionChange={setSubMultipleSelected}
								>
									<MenuItem id="subitem1">English</MenuItem>
									<MenuItem id="subitem2">Spanish</MenuItem>
									<MenuItem id="subitem3">French</MenuItem>
									<MenuItem id="subitem4">German</MenuItem>
								</Menu>
							</MenuPopover>
						</SubmenuTrigger>

						<MenuItem onAction={() => alert("settings")}>Settings</MenuItem>
					</MenuSection>

					<MenuSection>
						<MenuHeader>Danger Zone</MenuHeader>
						<MenuItem onAction={() => alert("clear cache")}>
							Clear Cache
						</MenuItem>
						<MenuItem onAction={() => alert("reset settings")}>
							Reset Settings
						</MenuItem>
						<MenuItem onAction={() => alert("delete account")}>
							Delete Account
						</MenuItem>
					</MenuSection>
				</Menu>
			</MenuPopover>
		</MenuTrigger>
	);
}
