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

const selectButtonBorder = cva({
	base: classes.button,
	variants: {
		isHovered: { true: classes.hover },
		isPressed: { true: classes.press },
		isOpen: { true: classes.open },
		isDisabled: { true: classes.disabled },
	},
});

interface SelectProps<T extends object>
	extends Omit<AriaSelectProps<T>, "children"> {
	label?: string;
	description?: string;
	errorMessage?: string;
	children?: ReactNode | ((item: T) => ReactNode);
}

// Select should have a way to edit the button classes

export function Select<T extends object>({
	description,
	errorMessage,
	children,
	className,
	...props
}: SelectProps<T>) {
	return (
		<AriaSelect {...props} className={className}>
			{(values) => (
				<>
					<AriaButton
						className={(buttonValues) =>
							selectButtonBorder({ ...buttonValues, isOpen: values.isOpen })
						}
					>
						<AriaSelectValue />
					</AriaButton>
					{description && <AriaText slot="description">{description}</AriaText>}
					{errorMessage && (
						<AriaText slot="errorMessage">{errorMessage}</AriaText>
					)}
					<AriaPopover offset={4} className={classes.popover}>
						<AriaListBox className={classes.listBox}>{children}</AriaListBox>
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
