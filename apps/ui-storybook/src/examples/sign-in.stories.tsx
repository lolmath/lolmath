import {
	Button,
	ButtonLink,
	Checkbox,
	Divider,
	Group,
	GroupInput,
	GroupSeparator,
	Heading,
	Label,
	Text,
	TextField,
} from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";

const meta = {
	title: "Examples/Templates/Sign in",
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
		docs: {
			description: {
				component:
					"One card, one job. The Riot ID keeps the `Group` treatment it has " +
					"in the Summoner Name example, because a game name and its tag are " +
					"one identifier however small the form gets.",
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const surface: CSSProperties = {
	background: "var(--lol-gradient-hextech-black)",
	color: "var(--lol-color-grey-100)",
	fontFamily: "var(--lol-font-family-spiegel)",
};

const field: CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: "0.375rem",
};

export const SignIn: Story = {
	render: () => (
		<div
			style={{
				...surface,
				alignItems: "center",
				display: "flex",
				justifyContent: "center",
				minHeight: "100vh",
				padding: "1.5rem",
			}}
		>
			<form
				onSubmit={(event) => event.preventDefault()}
				style={{
					background: "var(--lol-color-grey-300)",
					border: "1px solid var(--lol-color-gold-600)",
					display: "grid",
					gap: "1.25rem",
					padding: "2rem",
					width: "22rem",
				}}
			>
				<div>
					<Heading as="h1" preset="h4">
						Sign in
					</Heading>
					<Text color="grey150" elementType="p" preset="sm">
						Your builds follow your account, not this browser.
					</Text>
				</div>

				<div style={field}>
					<Label id="riot-id-label">Riot ID</Label>
					<Group aria-labelledby="riot-id-label">
						<GroupInput
							aria-label="Game name"
							maxLength={16}
							placeholder="Game name"
							style={{ flex: 1 }}
						/>
						<GroupSeparator>#</GroupSeparator>
						<GroupInput
							aria-label="Tag"
							maxLength={5}
							placeholder="TAG"
							style={{ flex: "none", width: "4.5rem" }}
						/>
					</Group>
				</div>

				<div style={field}>
					<div
						style={{
							alignItems: "baseline",
							display: "flex",
							gap: "0.75rem",
							justifyContent: "space-between",
						}}
					>
						<Label>Password</Label>
						<ButtonLink href="#" preset="text">
							Forgot password
						</ButtonLink>
					</div>
					<TextField type="password" />
				</div>

				<Checkbox>Stay signed in</Checkbox>

				<Button preset="primary" type="submit">
					Sign in
				</Button>

				<Divider>or</Divider>

				<Button preset="dimmed">Continue with Riot</Button>

				<ButtonLink href="#" preset="text">
					Create an account
				</ButtonLink>
			</form>
		</div>
	),
};
