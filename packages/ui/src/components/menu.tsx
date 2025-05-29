import { cx } from "cva";
import {
	Menu as AriaMenu,
	MenuItem as AriaMenuItem,
	MenuTrigger as AriaMenuTrigger,
	Popover as AriaPopover,
	SubmenuTrigger as AriaSubmenuTrigger,
	type MenuItemProps,
	type MenuProps,
	type PopoverProps,
	composeRenderProps,
} from "react-aria-components";
import classes from "./menu.module.css";

export type { MenuItemProps, MenuProps } from "react-aria-components";

export const MenuTrigger = AriaMenuTrigger;
export const SubmenuTrigger = AriaSubmenuTrigger;

export function Menu<T extends object>({ className, ...props }: MenuProps<T>) {
	return <AriaMenu<T> {...props} className={cx(classes.menu, className)} />;
}

export function MenuItem<T extends object>({
	className,
	...props
}: MenuItemProps<T>) {
	return (
		<AriaMenuItem<T>
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.item, className),
			)}
		/>
	);
}

export function MenuPopover({ className, ...props }: PopoverProps) {
	return (
		<AriaPopover
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(className, classes.popover),
			)}
		/>
	);
}
