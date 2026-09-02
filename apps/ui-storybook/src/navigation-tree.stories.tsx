import {
	Button,
	Collection,
	Menu,
	MenuItem,
	MenuPopover,
	MenuTrigger,
	NavigationTree,
	NavigationTreeHeader,
	NavigationTreeItem,
	NavigationTreeItemContent,
	NavigationTreeSection,
	RouterProvider,
} from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type ReactNode, useState } from "react";

interface Route {
	id: string;
	name: string;
	href: string;
	children?: Route[];
}

const docs: Route[] = [
	{ id: "overview", name: "Overview", href: "/docs" },
	{
		id: "calc",
		name: "Calc",
		href: "/docs/calc",
		children: [
			{ id: "haste", name: "Haste", href: "/docs/calc/haste" },
			{ id: "resist", name: "Resistances", href: "/docs/calc/resist" },
			{
				id: "scaling",
				name: "Scaling",
				href: "/docs/calc/scaling",
				children: [
					{ id: "growth", name: "Growth", href: "/docs/calc/scaling/growth" },
					{ id: "lerp", name: "Lerp", href: "/docs/calc/scaling/lerp" },
				],
			},
		],
	},
	{
		id: "ddragon",
		name: "DDragon",
		href: "/docs/ddragon",
		children: [
			{ id: "versions", name: "Versions", href: "/docs/ddragon/versions" },
			{ id: "champions", name: "Champions", href: "/docs/ddragon/champions" },
		],
	},
];

/** Recursive renderer for the dynamic collection stories. */
function renderRoute(route: Route) {
	return (
		<NavigationTreeItem
			key={route.id}
			href={route.href}
			id={route.id}
			textValue={route.name}
		>
			<NavigationTreeItemContent>{route.name}</NavigationTreeItemContent>
			<Collection items={route.children ?? []}>{renderRoute}</Collection>
		</NavigationTreeItem>
	);
}

/**
 * The tree marks whichever item's `href` matches `selectedRoute`, so it needs a
 * route to follow. In an app that is the router's current path; here it is
 * state, with `RouterProvider` turning a press into a state change instead of a
 * page load.
 */
function Router({
	children,
	initialRoute = "/docs/calc/haste",
}: {
	children: (route: string) => ReactNode;
	initialRoute?: string;
}) {
	const [route, setRoute] = useState(initialRoute);

	return (
		<RouterProvider navigate={(href) => setRoute(href)}>
			<nav aria-label="Documentation">{children(route)}</nav>
		</RouterProvider>
	);
}

const meta: Meta<typeof NavigationTree> = {
	title: "Navigation/NavigationTree",
	component: NavigationTree,
	tags: ["autodocs"],
	args: {
		defaultExpandedKeys: ["calc", "scaling"],
	},
	render: (args) => (
		<Router>
			{(route) => (
				<NavigationTree
					{...args}
					aria-label="Documentation"
					items={docs}
					selectedRoute={route}
					style={{ width: 260 }}
				>
					{renderRoute}
				</NavigationTree>
			)}
		</Router>
	),
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: {} };

/**
 * Static items work the same as the dynamic collection above; nesting an item
 * inside another one is what makes it a branch. A branch carrying an `href` of
 * its own is a destination as well as a parent — press its label to go there,
 * its chevron to open it.
 */
export const StaticItems: Story = {
	render: (args) => (
		<Router initialRoute="/docs/calc">
			{(route) => (
				<NavigationTree
					{...args}
					aria-label="Documentation"
					selectedRoute={route}
					style={{ width: 260 }}
				>
					<NavigationTreeItem href="/docs" id="overview" textValue="Overview">
						<NavigationTreeItemContent>Overview</NavigationTreeItemContent>
					</NavigationTreeItem>
					<NavigationTreeItem href="/docs/calc" id="calc" textValue="Calc">
						<NavigationTreeItemContent>Calc</NavigationTreeItemContent>
						<NavigationTreeItem
							href="/docs/calc/haste"
							id="haste"
							textValue="Haste"
						>
							<NavigationTreeItemContent>Haste</NavigationTreeItemContent>
						</NavigationTreeItem>
						<NavigationTreeItem
							href="/docs/calc/resist"
							id="resist"
							textValue="Resistances"
						>
							<NavigationTreeItemContent>Resistances</NavigationTreeItemContent>
						</NavigationTreeItem>
					</NavigationTreeItem>
				</NavigationTree>
			)}
		</Router>
	),
	args: {},
};

/**
 * A branch with no `href` is a heading that opens rather than navigates: its
 * label toggles the same way its chevron does.
 */
export const BranchWithoutRoute: Story = {
	render: (args) => (
		<Router initialRoute="/docs/calc/haste">
			{(route) => (
				<NavigationTree
					{...args}
					aria-label="Documentation"
					selectedRoute={route}
					style={{ width: 260 }}
				>
					<NavigationTreeItem id="calc" textValue="Calc">
						<NavigationTreeItemContent>Calc</NavigationTreeItemContent>
						<NavigationTreeItem
							href="/docs/calc/haste"
							id="haste"
							textValue="Haste"
						>
							<NavigationTreeItemContent>Haste</NavigationTreeItemContent>
						</NavigationTreeItem>
						<NavigationTreeItem
							href="/docs/calc/resist"
							id="resist"
							textValue="Resistances"
						>
							<NavigationTreeItemContent>Resistances</NavigationTreeItemContent>
						</NavigationTreeItem>
					</NavigationTreeItem>
				</NavigationTree>
			)}
		</Router>
	),
	args: { defaultExpandedKeys: ["calc"] },
};

/** `NavigationTreeSection` groups rows under a `NavigationTreeHeader`. */
export const Sections: Story = {
	render: (args) => (
		<Router initialRoute="/docs/calc/haste">
			{(route) => (
				<NavigationTree
					{...args}
					aria-label="Documentation"
					selectedRoute={route}
					style={{ width: 260 }}
				>
					<NavigationTreeSection>
						<NavigationTreeHeader>Libraries</NavigationTreeHeader>
						<Collection items={docs.slice(1)}>{renderRoute}</Collection>
					</NavigationTreeSection>
					<NavigationTreeSection>
						<NavigationTreeHeader>Reference</NavigationTreeHeader>
						<NavigationTreeItem
							href="/docs/changelog"
							id="changelog"
							textValue="Changelog"
						>
							<NavigationTreeItemContent>Changelog</NavigationTreeItemContent>
						</NavigationTreeItem>
						<NavigationTreeItem
							href="/docs/glossary"
							id="glossary"
							textValue="Glossary"
						>
							<NavigationTreeItemContent>Glossary</NavigationTreeItemContent>
						</NavigationTreeItem>
					</NavigationTreeSection>
				</NavigationTree>
			)}
		</Router>
	),
	args: { defaultExpandedKeys: ["calc"] },
};

/**
 * Collapse `Calc` and the current row goes with it. The branch that holds it
 * keeps the wash so the trail back to where you are does not disappear —
 * `[data-current-ancestor]` marks every branch above the current route.
 */
export const CollapsedTrail: Story = {
	args: { defaultExpandedKeys: [] },
};

/**
 * `actions` puts a control beside the link rather than inside it, which is
 * where an overflow menu has to go: an anchor cannot contain a button.
 */
export const RowActions: Story = {
	render: (args) => (
		<Router>
			{(route) => (
				<NavigationTree
					{...args}
					aria-label="Documentation"
					selectedRoute={route}
					style={{ width: 260 }}
				>
					{docs.map((entry) => (
						<NavigationTreeItem
							key={entry.id}
							href={entry.href}
							id={entry.id}
							textValue={entry.name}
						>
							<NavigationTreeItemContent
								actions={
									<MenuTrigger>
										<Button
											aria-label={`${entry.name} options`}
											preset="dimmed"
											shape="square"
											size="small"
										>
											⋯
										</Button>
										<MenuPopover>
											<Menu>
												<MenuItem>Open in new tab</MenuItem>
												<MenuItem>Copy link</MenuItem>
											</Menu>
										</MenuPopover>
									</MenuTrigger>
								}
							>
								{entry.name}
							</NavigationTreeItemContent>
							<Collection items={entry.children ?? []}>
								{renderRoute}
							</Collection>
						</NavigationTreeItem>
					))}
				</NavigationTree>
			)}
		</Router>
	),
	args: {},
};

/**
 * A key in `disabledKeys` greys its row out and takes it out of service: the
 * label stops being a link, so there is nothing to tab to, nothing to press and
 * no pointer cursor over it, the arrow keys walk past the row, and a disabled
 * branch will not open.
 */
export const DisabledItems: Story = {
	args: { disabledKeys: ["ddragon", "resist"] },
};
