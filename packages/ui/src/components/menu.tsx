import { cva } from "cva";
import {
	Menu as AriaMenu,
	MenuItem as AriaMenuItem,
	type MenuItemProps as AriaMenuItemProps,
	type MenuProps as AriaMenuProps,
	MenuTrigger as AriaMenuTrigger,
	SubmenuTrigger as AriaSubmenuTrigger,
	Popover,
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
		<Popover>
			<AriaMenu<T> {...props} className={classes.menu}>
				{children}
			</AriaMenu>
		</Popover>
	);
}

const menuItem = cva({
	base: classes.item,
	variants: {
		isDisabled: {
			true: classes.disabled,
		},
		isHovered: {
			true: classes.hover,
		},
		isPressed: {
			true: classes.press,
		},
		isFocusVisible: {
			true: classes.focusVisible,
		},
	},
});

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
				menuItem({
					className,
					...values,
				}),
			)}
		>
			{children}
		</AriaMenuItem>
	);
}
