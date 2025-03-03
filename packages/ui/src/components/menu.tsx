import { cx } from "cva";
import {
	Menu as AriaMenu,
	MenuItem as AriaMenuItem,
	type MenuItemProps as AriaMenuItemProps,
	type MenuProps as AriaMenuProps,
	MenuTrigger as AriaMenuTrigger,
	SubmenuTrigger as AriaSubmenuTrigger,
	composeRenderProps,
} from "react-aria-components";
import classes from "./menu.module.css";

export const MenuTrigger = AriaMenuTrigger;
export const SubmenuTrigger = AriaSubmenuTrigger;

interface MenuProps<T extends object> extends AriaMenuProps<T> {}

export function Menu<T extends object>({
	children,
	className,
	...props
}: MenuProps<T>) {
	return (
		<AriaMenu<T> {...props} className={cx(classes.menu, className)}>
			{children}
		</AriaMenu>
	);
}

export type MenuItemProps<T extends object> = AriaMenuItemProps<T>;

export function MenuItem<T extends object>({
	children,
	className,
	...props
}: MenuItemProps<T>) {
	return (
		<AriaMenuItem<T>
			{...props}
			className={composeRenderProps(className, (className, values) =>
				cx(classes.item, className, values),
			)}
		>
			{children}
		</AriaMenuItem>
	);
}
