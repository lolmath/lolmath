import { cx } from "cva";
import type { ComponentProps } from "react";
import {
	Header as AriaHeader,
	Menu as AriaMenu,
	MenuItem as AriaMenuItem,
	MenuLoadMoreItem as AriaMenuLoadMoreItem,
	type MenuLoadMoreItemProps as AriaMenuLoadMoreItemProps,
	type MenuProps as AriaMenuProps,
	MenuSection as AriaMenuSection,
	MenuTrigger as AriaMenuTrigger,
	Popover as AriaPopover,
	Separator as AriaSeparator,
	SubmenuTrigger as AriaSubmenuTrigger,
	Virtualizer as AriaVirtualizer,
	composeRenderProps,
	ListLayout,
	type MenuItemProps,
	type MenuSectionProps,
	type PopoverProps,
	type SeparatorProps,
	type VirtualizerProps,
} from "react-aria-components";
import { Spinner } from "../spinner/spinner";
import { heading } from "../typography/heading";
import { text } from "../typography/text";
import classes from "./menu.module.css";

export type { MenuItemProps } from "react-aria-components";

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

export interface MenuProps<T> extends AriaMenuProps<T> {
	/** Rendered when the menu has no items. */
	emptyState?: React.ReactNode;
}

/**
 * A menu of actions or options.
 *
 * Items may arrive a page at a time: filter the collection down to nothing and
 * `emptyState` takes over, and a `MenuLoadMoreItem` at the end fetches the next
 * page as it scrolls into view.
 */
export function Menu<T extends object>({
	className,
	emptyState = "No results found",
	renderEmptyState,
	...props
}: MenuProps<T>) {
	return (
		<AriaMenu<T>
			{...props}
			className={cx(classes.menu, className)}
			renderEmptyState={
				renderEmptyState ??
				(() => (
					<div
						className={text({
							color: "grey150",
							preset: "base",
							className: classes.empty,
						})}
					>
						{emptyState}
					</div>
				))
			}
		/>
	);
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

export interface MenuLoadMoreItemProps extends AriaMenuLoadMoreItemProps {}

/**
 * A sentinel item at the end of a `Menu`. It calls `onLoadMore` once it scrolls
 * into view, and shows the spinner while `isLoading` is set.
 */
export function MenuLoadMoreItem({
	children,
	className,
	...props
}: MenuLoadMoreItemProps) {
	return (
		<AriaMenuLoadMoreItem
			{...props}
			className={cx(classes.loadMore, className)}
		>
			{children ?? <Spinner className={classes.spinner} />}
		</AriaMenuLoadMoreItem>
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
