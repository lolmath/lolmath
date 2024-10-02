import { cva } from "cva";
import type { ReactNode } from "react";
import type {
	SelectProps as AriaSelectProps,
	ListBoxItemProps,
} from "react-aria-components";
import {
	Button as AriaButton,
	ListBox as AriaListBox,
	Popover as AriaPopover,
	Select as AriaSelect,
	SelectValue as AriaSelectValue,
	Text as AriaText,
	ListBoxItem,
	composeRenderProps,
} from "react-aria-components";
import classes from "./select.module.css";

const select = cva({
	base: classes.button,
	variants: {
		isHovered: { true: classes.hover },
		isPressed: { true: classes.press },
		isOpen: { true: classes.open },
		isDisabled: { true: classes.disabled },
		size: {
			small: classes.small,
			medium: classes.medium,
			large: classes.large,
		},
	},
});

interface SelectProps<T extends object>
	extends Omit<AriaSelectProps<T>, "children"> {
	label?: string;
	description?: string;
	errorMessage?: string;
	items?: Iterable<T>;
	children?: ReactNode | ((item: T) => ReactNode);
	size?: "small" | "medium" | "large";
}

// Select should have a way to edit the button classes

export function Select<T extends object>({
	description,
	errorMessage,
	children,
	items,
	className,
	size = "medium",
	...props
}: SelectProps<T>) {
	return (
		<AriaSelect {...props} className={className}>
			{(values) => (
				<>
					<AriaButton
						className={(buttonValues) =>
							select({ ...buttonValues, isOpen: values.isOpen, size })
						}
					>
						<AriaSelectValue />
					</AriaButton>
					{description && <AriaText slot="description">{description}</AriaText>}
					{errorMessage && (
						<AriaText slot="errorMessage">{errorMessage}</AriaText>
					)}
					<AriaPopover offset={4} className={classes.popover}>
						<AriaListBox className={classes.listBox} items={items}>
							{children}
						</AriaListBox>
					</AriaPopover>
				</>
			)}
		</AriaSelect>
	);
}

const item = cva({
	base: classes.item,
	variants: {
		isHovered: { true: classes.hover },
		isPressed: { true: classes.press },
		isSelected: { true: classes.selected },
		isFocused: { true: classes.focus },
	},
});

export function Item({ className, ...props }: ListBoxItemProps) {
	return (
		<ListBoxItem
			{...props}
			className={composeRenderProps(className, (className, values) =>
				item({ ...values, className }),
			)}
		/>
	);
}
