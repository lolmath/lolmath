import { cx } from "cva";
import type { ComponentProps } from "react";
import {
	Header as AriaHeader,
	Menu as AriaMenu,
	MenuItem as AriaMenuItem,
	MenuSection as AriaMenuSection,
	MenuTrigger as AriaMenuTrigger,
	Popover as AriaPopover,
	SubmenuTrigger as AriaSubmenuTrigger,
	type MenuItemProps,
	type MenuProps,
	type MenuSectionProps,
	type PopoverProps,
	composeRenderProps,
} from "react-aria-components";
import classes from "./menu.module.css";
import { heading } from "./typography/heading";
import { text } from "./typography/text";

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

export function MenuSection<T extends object>({
	className,
	...props
}: MenuSectionProps<T>) {
	return (
		<AriaMenuSection<T> {...props} className={cx(className, classes.section)} />
	);
}

export function MenuHeader({
	className,
	...props
}: ComponentProps<typeof AriaHeader>) {
	return (
		<AriaHeader
			{...props}
			className={heading({
				className: cx(className, classes.header),
				color: "gold100",
				preset: "h5",
			})}
		/>
	);
}
