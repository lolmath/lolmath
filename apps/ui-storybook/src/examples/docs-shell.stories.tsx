import {
	Breadcrumb,
	Breadcrumbs,
	Button,
	ButtonLink,
	Collection,
	Divider,
	Heading,
	Menu,
	MenuItem,
	MenuPopover,
	MenuSeparator,
	MenuTrigger,
	NavigationTree,
	NavigationTreeHeader,
	NavigationTreeItem,
	NavigationTreeItemContent,
	NavigationTreeSection,
	Popover,
	PopoverBody,
	PreviewButton,
	PreviewTrigger,
	RouterProvider,
	SearchField,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Text,
} from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
import { FaBook, FaGithub } from "react-icons/fa6";

const meta = {
	title: "Examples/Templates/Docs shell",
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"A documentation page: the left rail is a `NavigationTree`, the " +
					"right one a flat one, and the prose between them is `Heading`, " +
					"`Text` and `PreviewButton`. Nothing here is a new component — it " +
					"is the library at the size a page actually uses it.",
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface Route {
	id: string;
	name: string;
	href: string;
	children?: Route[];
}

const libraries: Route[] = [
	{
		id: "calc",
		name: "@lolmath/calc",
		href: "/calc",
		children: [
			{ id: "haste", name: "Ability haste", href: "/calc/haste" },
			{ id: "resist", name: "Resistances", href: "/calc/resist" },
			{
				id: "scaling",
				name: "Scaling",
				href: "/calc/scaling",
				children: [
					{ id: "growth", name: "growth()", href: "/calc/scaling/growth" },
					{ id: "lerp", name: "lerp()", href: "/calc/scaling/lerp" },
				],
			},
		],
	},
	{
		id: "ddragon",
		name: "ddragon",
		href: "/ddragon",
		children: [
			{ id: "versions", name: "Versions", href: "/ddragon/versions" },
			{ id: "champions", name: "Champions", href: "/ddragon/champions" },
		],
	},
	{ id: "ui", name: "@lolmath/ui", href: "/ui" },
];

const onThisPage: Route[] = [
	{ id: "signature", name: "Signature", href: "#signature" },
	{ id: "parameters", name: "Parameters", href: "#parameters" },
	{ id: "worked", name: "Worked example", href: "#worked" },
	{ id: "caps", name: "The 500 cap", href: "#caps" },
];

interface Parameter {
	id: string;
	name: string;
	type: string;
	description: string;
}

const parameters: Parameter[] = [
	{
		id: "haste",
		name: "haste",
		type: "number",
		description: "Ability haste from items, runes and shards.",
	},
	{
		id: "base",
		name: "base",
		type: "number",
		description: "The ability's cooldown at rank, in seconds.",
	},
	{
		id: "cap",
		name: "cap",
		type: "number | null",
		description: "Upper bound on haste. Defaults to 500.",
	},
];

const surface: CSSProperties = {
	background: "var(--lol-gradient-hextech-black)",
	color: "var(--lol-color-grey-100)",
	fontFamily: "var(--lol-font-family-spiegel)",
};

const rule = "1px solid var(--lol-color-gold-600)";

/** The dashed term in the prose, with its preview behind it. */
function Term({ children, gloss }: { children: ReactNode; gloss: string }) {
	return (
		<PreviewTrigger>
			<PreviewButton>{children}</PreviewButton>
			<Popover style={{ width: 260 }}>
				<PopoverBody>
					<Text preset="sm">{gloss}</Text>
				</PopoverBody>
			</Popover>
		</PreviewTrigger>
	);
}

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

export const DocsShell: Story = {
	render: () => {
		const [route, setRoute] = useState("/calc/haste");
		const [section, setSection] = useState("#signature");

		return (
			<RouterProvider
				navigate={(href) =>
					href.startsWith("#") ? setSection(href) : setRoute(href)
				}
			>
				<div
					style={{
						...surface,
						display: "grid",
						gridTemplateColumns: "17rem minmax(0, 1fr) 14rem",
						gridTemplateRows: "auto minmax(0, 1fr)",
						height: "100vh",
					}}
				>
					{/* Masthead */}
					<header
						style={{
							gridColumn: "1 / -1",
							display: "flex",
							alignItems: "center",
							gap: "1rem",
							padding: "0 1rem",
							height: "3.5rem",
							borderBottom: rule,
						}}
					>
						<Heading
							as="span"
							preset="h5"
							style={{ whiteSpace: "nowrap", marginInlineEnd: "0.5rem" }}
						>
							LoL Math
						</Heading>
						<SearchField
							aria-label="Search the docs"
							inputProps={{ placeholder: "Search the docs" }}
							style={{ maxWidth: "20rem", flex: 1 }}
						/>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: "0.5rem",
								marginInlineStart: "auto",
							}}
						>
							<ButtonLink href="#" preset="text">
								<FaBook aria-hidden style={{ marginInlineEnd: "0.375rem" }} />
								Guides
							</ButtonLink>
							<ButtonLink aria-label="Repository" href="#" shape="square">
								<FaGithub aria-hidden />
							</ButtonLink>
							<MenuTrigger>
								<Button preset="dimmed">14.18 ▾</Button>
								<MenuPopover>
									<Menu selectionMode="single" defaultSelectedKeys={["14.18"]}>
										<MenuItem id="14.18">Patch 14.18</MenuItem>
										<MenuItem id="14.17">Patch 14.17</MenuItem>
										<MenuItem id="14.16">Patch 14.16</MenuItem>
										<MenuSeparator />
										<MenuItem id="all">All patches…</MenuItem>
									</Menu>
								</MenuPopover>
							</MenuTrigger>
						</div>
					</header>

					{/* The rail this template exists to show */}
					<nav
						aria-label="Documentation"
						style={{ borderInlineEnd: rule, overflow: "auto" }}
					>
						<NavigationTree
							aria-label="Documentation"
							defaultExpandedKeys={["calc", "scaling"]}
							selectedRoute={route}
							style={{ paddingBlock: "0.5rem" }}
						>
							<NavigationTreeSection>
								<NavigationTreeHeader>Libraries</NavigationTreeHeader>
								<Collection items={libraries}>{renderRoute}</Collection>
							</NavigationTreeSection>
							<NavigationTreeSection>
								<NavigationTreeHeader>Contributing</NavigationTreeHeader>
								<NavigationTreeItem
									href="/dev/setup"
									id="setup"
									textValue="Setup"
								>
									<NavigationTreeItemContent>Setup</NavigationTreeItemContent>
								</NavigationTreeItem>
								<NavigationTreeItem
									href="/dev/projects"
									id="projects"
									textValue="Projects"
								>
									<NavigationTreeItemContent>
										Projects
									</NavigationTreeItemContent>
								</NavigationTreeItem>
							</NavigationTreeSection>
						</NavigationTree>
					</nav>

					{/* Prose */}
					<main style={{ overflow: "auto", padding: "1.5rem 2rem 4rem" }}>
						<div style={{ maxWidth: "44rem" }}>
							<Breadcrumbs style={{ marginBottom: "1rem" }}>
								<Breadcrumb href="/">Docs</Breadcrumb>
								<Breadcrumb href="/calc">@lolmath/calc</Breadcrumb>
								<Breadcrumb>Ability haste</Breadcrumb>
							</Breadcrumbs>

							<Heading as="h1" preset="h2">
								Ability haste
							</Heading>
							<Text
								elementType="p"
								preset="md"
								style={{ margin: "0.75rem 0 1.5rem" }}
							>
								Haste is linear where cooldown reduction was not. Every point
								buys the same amount of casting, which is why the two are worth
								keeping apart in your head.
							</Text>

							<Heading as="h2" id="signature" preset="h4">
								Signature
							</Heading>
							<pre
								style={{
									margin: "0.75rem 0 1.5rem",
									padding: "0.875rem 1rem",
									border: rule,
									background: "var(--lol-color-grey-300)",
									color: "var(--lol-color-gold-100)",
									fontSize: "0.8125rem",
									overflowX: "auto",
								}}
							>
								<code>{"cdx(haste: number, base: number): number"}</code>
							</pre>

							<Heading as="h2" id="parameters" preset="h4">
								Parameters
							</Heading>
							<Table
								aria-label="Parameters of cdx"
								style={{ margin: "0.75rem 0 1.5rem" }}
							>
								<TableHeader>
									<TableColumn id="name" isRowHeader>
										Name
									</TableColumn>
									<TableColumn id="type">Type</TableColumn>
									<TableColumn id="description">Description</TableColumn>
								</TableHeader>
								<TableBody items={parameters}>
									{(parameter) => (
										<TableRow>
											<TableCell>{parameter.name}</TableCell>
											<TableCell>{parameter.type}</TableCell>
											<TableCell>{parameter.description}</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>

							<Heading as="h2" id="worked" preset="h4">
								Worked example
							</Heading>
							<Text
								elementType="p"
								style={{ margin: "0.75rem 0 1.5rem", maxWidth: "38rem" }}
							>
								A 100-second ultimate with 40 haste comes back in 71.4 seconds.
								Add a{" "}
								<Term gloss="20 ability haste, 250 health, 300 mana.">
									Kindlegem
								</Term>{" "}
								and the same ultimate is down to 62.5 — the second twenty points
								bought less than the first, which is the whole reason{" "}
								<Term gloss="Cooldown reduction: the old percentage stat, which stacked with diminishing returns and was capped at 40%.">
									cooldown reduction
								</Term>{" "}
								was replaced.
							</Text>

							<Divider style={{ margin: "2rem 0 1rem" }} />
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									gap: "1rem",
								}}
							>
								<ButtonLink href="/calc" preset="dimmed">
									← Overview
								</ButtonLink>
								<ButtonLink href="/calc/resist" preset="dimmed">
									Resistances →
								</ButtonLink>
							</div>
						</div>
					</main>

					{/* On this page: the same tree, one level deep */}
					<nav
						aria-label="On this page"
						style={{
							borderInlineStart: rule,
							overflow: "auto",
							padding: "1.5rem 0",
						}}
					>
						<Heading
							as="h2"
							preset="h5"
							style={{ padding: "0 0.75rem 0.5rem" }}
						>
							On this page
						</Heading>
						<NavigationTree
							aria-label="On this page"
							items={onThisPage}
							selectedRoute={section}
						>
							{renderRoute}
						</NavigationTree>
					</nav>
				</div>
			</RouterProvider>
		);
	},
};
