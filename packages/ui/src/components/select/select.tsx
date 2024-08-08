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
} from "react-aria-components";
import { outlineClassName } from "../../utilities/outline.js";
import { resolveClassName } from "../../utilities/resolve-class-name.js";
import { tv } from "../../utilities/tv.js";
import classes from "./select.module.css";

const selectButtonBorder = tv({
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

export function Select<T extends object>({
	description,
	errorMessage,
	children,
	className,
	...props
}: SelectProps<T>) {
	return (
		<AriaSelect
			{...props}
			className={(values) => resolveClassName(className, values)}
		>
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
					<AriaPopover offset={4} className="w-[--trigger-width]">
						<AriaListBox className={classes.listBox}>{children}</AriaListBox>
					</AriaPopover>
				</>
			)}
		</AriaSelect>
	);
}

const item = tv({
	base: classes.item,
	variants: {
		isHovered: { true: classes.hover },
		isPressed: { true: classes.press },
	},
});

export function Item({ className, ...props }: ListBoxItemProps) {
	return (
		<ListBoxItem
			{...props}
			className={(values) => {
				return item({
					...values,
					className: resolveClassName(className, values),
				});
			}}
		/>
	);
}
