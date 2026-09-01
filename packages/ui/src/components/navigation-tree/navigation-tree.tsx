import { cva, cx } from "cva";
import type { ReactNode } from "react";
import {
	Button as AriaButton,
	Link as AriaLink,
	NavigationTree as AriaNavigationTree,
	NavigationTreeHeader as AriaNavigationTreeHeader,
	type NavigationTreeHeaderProps as AriaNavigationTreeHeaderProps,
	NavigationTreeItem as AriaNavigationTreeItem,
	NavigationTreeItemContent as AriaNavigationTreeItemContent,
	type NavigationTreeItemContentProps as AriaNavigationTreeItemContentProps,
	type NavigationTreeItemProps as AriaNavigationTreeItemProps,
	type NavigationTreeProps as AriaNavigationTreeProps,
	NavigationTreeSection as AriaNavigationTreeSection,
	type NavigationTreeSectionProps as AriaNavigationTreeSectionProps,
	composeRenderProps,
} from "react-aria-components";
import classes from "./navigation-tree.module.css";

export const navigationTree = cva({
	base: classes.tree,
});

export interface NavigationTreeProps<T> extends AriaNavigationTreeProps<T> {}

/**
 * A nested set of links: the client's left rail, a docs sidebar, a champion
 * pool by role.
 *
 * It is a `Tree` whose rows are destinations rather than values, so it selects
 * nothing itself — `selectedRoute` is matched against each item's `href` and
 * the match is marked `aria-current="page"`. Give it the route your router
 * reports and it stays in step; wrap the app in `RouterProvider` and the links
 * navigate client-side.
 *
 * ```tsx
 * <nav aria-label="Docs">
 *   <NavigationTree aria-label="Docs" selectedRoute={pathname}>
 *     <NavigationTreeItem href="/calc" textValue="Calc">
 *       <NavigationTreeItemContent>Calc</NavigationTreeItemContent>
 *       <NavigationTreeItem href="/calc/haste" textValue="Haste">
 *         <NavigationTreeItemContent>Haste</NavigationTreeItemContent>
 *       </NavigationTreeItem>
 *     </NavigationTreeItem>
 *   </NavigationTree>
 * </nav>
 * ```
 *
 * Tab moves through the links rather than trapping the arrow keys, so it
 * behaves like the rest of the page's navigation; put it inside a `<nav>` with
 * a label of its own so it can be jumped to.
 */
export function NavigationTree<T extends object>({
	className,
	...props
}: NavigationTreeProps<T>) {
	return (
		<AriaNavigationTree<T>
			{...props}
			className={composeRenderProps(className, (className) =>
				navigationTree({ className }),
			)}
		/>
	);
}

export const navigationTreeItem = cva({
	base: classes.item,
});

export interface NavigationTreeItemProps<T extends object = object>
	extends AriaNavigationTreeItemProps<T> {}

/**
 * One row of a `NavigationTree`. Nesting an item inside another makes the outer
 * one a branch, which can still carry an `href` of its own.
 */
export function NavigationTreeItem<T extends object = object>({
	className,
	...props
}: NavigationTreeItemProps<T>) {
	return (
		<AriaNavigationTreeItem<T>
			{...props}
			className={composeRenderProps(className, (className) =>
				navigationTreeItem({ className }),
			)}
		/>
	);
}

export interface NavigationTreeItemContentProps
	extends AriaNavigationTreeItemContentProps {
	/**
	 * Rendered after the link, beside it rather than inside it. A control the
	 * row carries — an overflow menu, a pin — belongs here: nesting it in the
	 * children would put a button inside the anchor.
	 */
	actions?: ReactNode;
}

/**
 * The row of a `NavigationTreeItem`, holding everything but its nested items.
 *
 * The children become the row's link, so they are the label and nothing else;
 * an expand chevron is added for items that have children. A branch with no
 * `href` of its own expands when its label is pressed instead of navigating.
 */
export function NavigationTreeItemContent({
	actions,
	children,
}: NavigationTreeItemContentProps) {
	return (
		<AriaNavigationTreeItemContent>
			{composeRenderProps(children, (children, { hasChildItems }) => (
				<>
					{hasChildItems ? (
						<AriaButton className={classes.chevron} slot="chevron" />
					) : (
						/* Leaves keep the chevron's footprint so labels stay aligned. */
						<span aria-hidden="true" className={classes.chevronSpacer} />
					)}
					<AriaLink className={classes.link}>{children}</AriaLink>
					{actions}
				</>
			))}
		</AriaNavigationTreeItemContent>
	);
}

export interface NavigationTreeSectionProps<T>
	extends AriaNavigationTreeSectionProps<T> {}

/** A group of rows within a `NavigationTree`, headed by a `NavigationTreeHeader`. */
export function NavigationTreeSection<T extends object>({
	className,
	...props
}: NavigationTreeSectionProps<T>) {
	return (
		<AriaNavigationTreeSection<T>
			{...props}
			className={cx(classes.section, className)}
		/>
	);
}

export interface NavigationTreeHeaderProps
	extends AriaNavigationTreeHeaderProps {}

/**
 * The heading of a `NavigationTreeSection`. A section without one needs an
 * `aria-label` instead.
 */
export function NavigationTreeHeader({
	className,
	...props
}: NavigationTreeHeaderProps) {
	return (
		<AriaNavigationTreeHeader
			{...props}
			className={cx(classes.header, className)}
		/>
	);
}
