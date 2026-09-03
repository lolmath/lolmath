"use client";

import { cva, cx } from "cva";
import {
	Token as AriaToken,
	TokenField as AriaTokenField,
	type TokenFieldProps as AriaTokenFieldProps,
	TokenInput as AriaTokenInput,
	type TokenInputProps as AriaTokenInputProps,
	type TokenProps as AriaTokenProps,
	composeRenderProps,
	type TokenFieldValue,
} from "react-aria-components";
import classes from "./token-field.module.css";

// The value is a `TokenFieldValue`, not a string: a list of `text` and `token`
// segments the field edits in place. Subclass it to tokenize as the user types
// (see `TokenFieldValue.tokenize` in the docs), or hand it segments built
// elsewhere — from a menu selection, say.
//
// The value carries the selection with it as `selectedRange`, whose `start` and
// `end` are the same position while it is collapsed to a caret. Edit against
// those two rather than a caret and an insertion replaces the selected text
// when there is one; `withSelectedRange` puts a range back afterwards, which is
// what makes undo land where the user left off.
export { TokenFieldValue } from "react-aria-components";

/**
 * A text field with inline, non-editable tokens: an `@summoner` mention, a
 * `#tag`, a champion picked from a menu. Text and tokens share one caret, so it
 * reads and edits as a single field rather than as an input with chips beside
 * it.
 *
 * ```tsx
 * <TokenField value={value} onChange={setValue}>
 *   <Label>Prompt</Label>
 *   <TokenInput placeholder="Mention a @summoner">
 *     {(segment) => <Token>{segment.text}</Token>}
 *   </TokenInput>
 * </TokenField>
 * ```
 *
 * This is React Aria's own note, and it holds here too: `TokenField` is alpha
 * upstream, so its API may still move under us.
 */
export function TokenField<T extends TokenFieldValue = TokenFieldValue>({
	className,
	...props
}: AriaTokenFieldProps<T>) {
	return (
		<AriaTokenField<T>
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.tokenField, className),
			)}
		/>
	);
}

export const tokenInput = cva({
	base: classes.input,
	variants: {
		size: {
			small: classes.small,
			medium: classes.medium,
			large: classes.large,
		},
	},
	defaultVariants: { size: "medium" },
});

export interface TokenInputProps<T extends TokenFieldValue = TokenFieldValue>
	extends AriaTokenInputProps<T> {
	size?: "small" | "medium" | "large";
	/** Shown while the field is empty; painted by the field, not by the UA. */
	placeholder?: string;
}

/** The editable area of a `TokenField`, rendering a `Token` per token segment. */
export function TokenInput<T extends TokenFieldValue = TokenFieldValue>({
	className,
	placeholder,
	size = "medium",
	...props
}: TokenInputProps<T>) {
	return (
		<AriaTokenInput<T>
			data-placeholder={placeholder}
			{...props}
			className={composeRenderProps(className, (className) =>
				tokenInput({ className, size }),
			)}
		/>
	);
}

export const token = cva({
	base: classes.token,
	variants: {
		variant: {
			gold: classes.gold,
			hextech: classes.hextech,
			grey: classes.grey,
		},
	},
	defaultVariants: { variant: "hextech" },
});

export interface TokenProps extends AriaTokenProps {
	variant?: "gold" | "hextech" | "grey";
}

/** One non-editable segment inside a `TokenInput`. */
export function Token({
	className,
	variant = "hextech",
	...props
}: TokenProps) {
	return (
		<AriaToken
			{...props}
			className={composeRenderProps(className, (className) =>
				token({ className, variant }),
			)}
		/>
	);
}
