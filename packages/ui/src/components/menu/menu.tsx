import { cx } from "cva";
import type { ComponentProps } from "react";
import {
	Header as AriaHeader,
	Menu as AriaMenu,
	MenuItem as AriaMenuItem,
	MenuSection as AriaMenuSection,
	MenuTrigger as AriaMenuTrigger,
	Popover as AriaPopover,
	Separator as AriaSeparator,
	SubmenuTrigger as AriaSubmenuTrigger,
	Virtualizer as AriaVirtualizer,
	composeRenderProps,
	ListLayout,
	type MenuItemProps,
	type MenuProps,
	type MenuSectionProps,
	type PopoverProps,
	type SeparatorProps,
	type VirtualizerProps,
} from "react-aria-components";
import { heading } from "../typography/heading";
import classes from "./menu.module.css";

export type { MenuItemProps, MenuProps } from "react-aria-components";

// `trigger` decides what opens the menu: the default `"press"`, `"longPress"`,
// or `"contextMenu"` for a right click (long press on touch, and the platform's
// context-menu key or screen reader gesture on a keyboard). A context menu is
// never the only way to reach an action — the same items belong somewhere a
// pointer can find them too.
//
// Whatever opens it, the trigger child must be a `Button` or wrapped in
// `Pressable` so that it is announced as interactive.
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

export function MenuSeparator({ className, ...props }: SeparatorProps) {
	return (
		<AriaSeparator {...props} className={cx(className, classes.separator)} />
	);
}

export function MenuVirtualizer<T>(
	props: Omit<VirtualizerProps<T>, "layout" | "layoutOptions">,
) {
	return (
		<AriaVirtualizer
			layout={ListLayout}
			layoutOptions={{
				padding: 0,
				gap: 0,
				rowHeight: 30,
				headingHeight: 35,
				// estimatedRowHeight: 30,
				// estimatedHeadingHeight: 35,
			}}
			{...props}
		/>
	);
}
