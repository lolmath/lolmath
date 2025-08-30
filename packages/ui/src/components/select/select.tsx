import { cva, cx } from "cva";
import {
	Button as AriaButton,
	ListBox as AriaListBox,
	ListBoxItem as AriaListBoxItem,
	Popover as AriaPopover,
	Virtualizer as AriaVirtualizer,
	type ButtonProps,
	composeRenderProps,
	type ListBoxItemProps,
	type ListBoxProps,
	ListLayout,
	type PopoverProps,
	type VirtualizerProps,
} from "react-aria-components";
import classes from "./select.module.css";

export { Select, SelectValue } from "react-aria-components";

const select = cva({
	base: classes.button,
	variants: {
		size: {
			small: classes.small,
			medium: classes.medium,
			large: classes.large,
		},
	},
});

export function SelectButton({
	className,
	size = "medium",
	...props
}: ButtonProps & { size?: "small" | "medium" | "large" }) {
	return (
		<AriaButton
			{...props}
			className={composeRenderProps(className, (className, buttonValues) =>
				select({ ...buttonValues, size, className }),
			)}
		/>
	);
}

export function SelectPopover({ className, ...props }: PopoverProps) {
	return (
		<AriaPopover
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(className, classes.popover),
			)}
		/>
	);
}

export function SelectListBox<T extends object>({
	className,
	...props
}: ListBoxProps<T>) {
	return (
		<AriaListBox<T>
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(className, classes.listBox),
			)}
		/>
	);
}

const item = cva({
	base: classes.item,
	variants: {
		isSelected: { true: classes.selected },
		isFocused: { true: classes.focus },
	},
});

export function SelectListBoxItem({ className, ...props }: ListBoxItemProps) {
	return (
		<AriaListBoxItem
			{...props}
			className={composeRenderProps(className, (className, values) =>
				item({ ...values, className }),
			)}
		/>
	);
}

export function SelectVirtualizer<T>(
	props: Omit<VirtualizerProps<T>, "layout" | "layoutOptions">,
) {
	return (
		<AriaVirtualizer
			layout={ListLayout}
			layoutOptions={{
				padding: 0,
				gap: 0,
				rowHeight: 31,
				headingHeight: 35,
			}}
			{...props}
		/>
	);
}
