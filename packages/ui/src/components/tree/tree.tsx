import { cva, cx } from "cva";
import {
	Button as AriaButton,
	Tree as AriaTree,
	TreeItem as AriaTreeItem,
	TreeItemContent as AriaTreeItemContent,
	type TreeItemContentProps as AriaTreeItemContentProps,
	type TreeItemProps as AriaTreeItemProps,
	TreeLoadMoreItem as AriaTreeLoadMoreItem,
	type TreeLoadMoreItemProps as AriaTreeLoadMoreItemProps,
	type TreeProps as AriaTreeProps,
	composeRenderProps,
} from "react-aria-components";
import { Checkbox } from "../checkbox/checkbox";
import { Spinner } from "../spinner/spinner";
import { text } from "../typography/text";
import classes from "./tree.module.css";

export const tree = cva({
	base: classes.tree,
});

export interface TreeProps<T> extends AriaTreeProps<T> {
	/** Rendered when the tree has no items. */
	emptyState?: React.ReactNode;
}

export function Tree<T extends object>({
	className,
	emptyState = "No results found",
	renderEmptyState,
	...props
}: TreeProps<T>) {
	return (
		<AriaTree<T>
			{...props}
			className={composeRenderProps(className, (className) =>
				tree({ className }),
			)}
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

export const treeItem = cva({
	base: classes.item,
});

export interface TreeItemProps<T = object> extends AriaTreeItemProps<T> {}

export function TreeItem<T = object>({
	className,
	...props
}: TreeItemProps<T>) {
	return (
		<AriaTreeItem<T>
			{...props}
			className={composeRenderProps(className, (className) =>
				treeItem({ className }),
			)}
		/>
	);
}

export interface TreeItemContentProps extends AriaTreeItemContentProps {}

/**
 * The row of a `TreeItem`, holding everything but its nested items.
 *
 * The expand chevron is added for items that have children, and a selection
 * checkbox for trees with `selectionMode="multiple"`. Setting
 * `selectionBehavior="replace"` drops the checkbox in favour of highlighting
 * the row, like the ladder in the League client.
 *
 * A row in `disabledKeys` is inert whole, chevron included: React Aria's
 * expand button checks the row's disabled state before toggling, but does not
 * pass that state to the button, so it is handed on here — otherwise the
 * chevron would keep lighting up under a pointer it will not answer.
 */
export function TreeItemContent({ children }: TreeItemContentProps) {
	return (
		<AriaTreeItemContent>
			{composeRenderProps(
				children,
				(
					children,
					{ hasChildItems, isDisabled, selectionBehavior, selectionMode },
				) => (
					<>
						{hasChildItems ? (
							<AriaButton
								className={classes.chevron}
								isDisabled={isDisabled}
								slot="chevron"
							/>
						) : (
							/* Leaves keep the chevron's footprint so labels stay aligned. */
							<span aria-hidden="true" className={classes.chevronSpacer} />
						)}
						{selectionMode === "multiple" && selectionBehavior === "toggle" && (
							<Checkbox slot="selection" />
						)}
						<span className={classes.label}>{children}</span>
					</>
				),
			)}
		</AriaTreeItemContent>
	);
}

export interface TreeLoadMoreItemProps extends AriaTreeLoadMoreItemProps {}

export function TreeLoadMoreItem({
	children,
	className,
	...props
}: TreeLoadMoreItemProps) {
	return (
		<AriaTreeLoadMoreItem
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.loadMore, className),
			)}
		>
			{children ?? <Spinner className={classes.spinner} />}
		</AriaTreeLoadMoreItem>
	);
}
