import {
	Button,
	Label,
	Menu,
	MenuItem,
	MenuPopover,
	MenuTrigger,
	Token,
	TokenField,
	TokenFieldValue,
	TokenInput,
} from "@lolmath/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

// A field value is a list of `text` and `token` segments rather than a string.
// Subclassing it is how tokenizing-as-you-type works: `tokenize` runs over every
// run of text the field edits, so `@summoner` and `#patch` become tokens as they
// are typed, pasted, or undone back into existence.
//
// The trailing `(?=\s)` is what makes that bearable to type into: without it the
// pattern matches the moment a single character follows the `@`, the word is
// frozen into a token, and the rest of the name lands in the text after it. A
// token forms once the word is finished instead.
class MentionValue extends TokenFieldValue {
	protected tokenize(text: string) {
		if (!text.length) return [{ type: "text" as const, text }];

		const pattern = /(?<=^|\s)[@#]\S+(?=\s)/g;
		const segments: Array<{ type: "text" | "token"; text: string }> = [];
		let start = 0;
		let match: RegExpExecArray | null = pattern.exec(text);

		while (match !== null) {
			if (match.index > start) {
				segments.push({ type: "text", text: text.slice(start, match.index) });
			}
			segments.push({ type: "token", text: match[0] });
			start = match.index + match[0].length;
			match = pattern.exec(text);
		}

		if (start < text.length) {
			segments.push({ type: "text", text: text.slice(start) });
		}

		return segments;
	}
}

const meta = {
	title: "Forms/TokenField",
	component: TokenField,
	tags: ["autodocs"],
	argTypes: {
		isDisabled: { control: { type: "boolean" } },
		isReadOnly: { control: { type: "boolean" } },
		allowsNewlines: { control: { type: "boolean" } },
	},
	parameters: {
		layout: "centered",
	},
	render: (args) => (
		<TokenField
			{...args}
			style={{ width: 360 }}
			defaultValue={new MentionValue([])}
		>
			<Label>Match note</Label>
			<TokenInput placeholder="Mention a @summoner or a #patch">
				{(segment) => <Token>{segment.text}</Token>}
			</TokenInput>
		</TokenField>
	),
} satisfies Meta<typeof TokenField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };

export const Disabled: Story = { args: { isDisabled: true } };

export const ReadOnly: Story = { args: { isReadOnly: true } };

export const Sizes: Story = {
	args: {},
	render: (args) => (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
			{(["small", "medium", "large"] as const).map((size) => (
				<TokenField
					{...args}
					key={size}
					style={{ width: 360 }}
					defaultValue={new MentionValue([])}
				>
					<Label>{size}</Label>
					<TokenInput size={size} placeholder="Mention a @summoner">
						{(segment) => <Token>{segment.text}</Token>}
					</TokenInput>
				</TokenField>
			))}
		</div>
	),
};

export const Variants: Story = {
	name: "Token variants",
	args: {},
	render: (args) => (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
			{(["hextech", "gold", "grey"] as const).map((variant) => (
				<TokenField
					{...args}
					key={variant}
					style={{ width: 360 }}
					defaultValue={
						new MentionValue([
							{ type: "text", text: "gg " },
							{ type: "token", text: "@faker" },
							{ type: "text", text: " on " },
							{ type: "token", text: "#14.16" },
						])
					}
				>
					<Label>{variant}</Label>
					<TokenInput>
						{(segment) => <Token variant={variant}>{segment.text}</Token>}
					</TokenInput>
				</TokenField>
			))}
		</div>
	),
};

// `allowsNewlines` turns the field into the multi-line kind an AI prompt box
// wants: Enter inserts a line break instead of submitting.
export const Multiline: Story = {
	args: { allowsNewlines: true },
	render: (args) => (
		<TokenField {...args} style={{ width: 360 }}>
			<Label>Prompt</Label>
			<TokenInput
				placeholder="Ask about a build…"
				style={{ minHeight: "5rem" }}
			>
				{(segment) => <Token>{segment.text}</Token>}
			</TokenInput>
		</TokenField>
	),
};

// Tokens do not have to come from typing. Here a menu inserts one at the caret,
// which is the shape a mention picker or a multi-select combobox takes.
export function InsertFromMenu() {
	const [value, setValue] = useState(() => new MentionValue([]));

	return (
		<div style={{ display: "flex", alignItems: "end", gap: "0.5rem" }}>
			<TokenField value={value} onChange={setValue} style={{ width: 300 }}>
				<Label>Match note</Label>
				<TokenInput placeholder="Add a summoner from the menu">
					{(segment) => <Token>{segment.text}</Token>}
				</TokenInput>
			</TokenField>

			<MenuTrigger>
				<Button aria-label="Insert summoner" shape="square" preset="dimmed">
					+
				</Button>
				<MenuPopover>
					<Menu>
						{["faker", "chovy", "showmaker"].map((summoner) => (
							<MenuItem
								key={summoner}
								onAction={() =>
									setValue((previous) =>
										previous.replaceRangeWithSegments(
											previous.caretPosition,
											previous.caretPosition,
											[
												{ type: "token", text: `@${summoner}` },
												{ type: "text", text: " " },
											],
											false,
										),
									)
								}
							>
								@{summoner}
							</MenuItem>
						))}
					</Menu>
				</MenuPopover>
			</MenuTrigger>
		</div>
	);
}
