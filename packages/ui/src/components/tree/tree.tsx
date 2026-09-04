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

/**
 * How the tree is dressed. The rows, their spacing and their selected state
 * are the preset's to decide; what a row *is* — a branch, a leaf, selected,
 * disabled — is not, so every preset draws every state.
 *
 * - `default` — gilded rows on the client's hairline rules.
 * - `rail` — adds guide lines down the ancestors, so depth is drawn.
 * - `plate` — every row an inset, bordered plate, racked like an inventory.
 * - `ledger` — ruled and striped, as dense as a stat sheet.
 * - `banner` — branches become gilded section bars over plain leaves.
 * - `compact` — the default, tightened, for a rail that has to hold a lot.
 * - `spacious` — the default, opened up, for pointer and touch targets.
 * - `minimal` — near-zero chrome; selection is a tick and a weight.
 * - `glass` — a translucent, blurred pane to float over other content.
 * - `arcane` — hextech teal in place of gold: the magic, not the frame.
 * - `pill` — selection as an inset pill, the way an app sidebar does it.
 */
export type TreePreset =
	| "default"
	| "rail"
	| "plate"
	| "ledger"
	| "banner"
	| "compact"
	| "spacious"
	| "minimal"
	| "glass"
	| "arcane"
	| "pill";

export const tree = cva({
	base: classes.tree,
	variants: {
		preset: {
			/* The look every tree had before the presets existed, so it stays
			   the one a tree gets for asking for nothing. */
			default: "",
			rail: classes.rail,
			plate: classes.plate,
			ledger: classes.ledger,
			banner: classes.banner,
			compact: classes.compact,
			spacious: classes.spacious,
			minimal: classes.minimal,
			glass: classes.glass,
			arcane: classes.arcane,
			pill: classes.pill,
		},
	},
});

export interface TreeProps<T> extends AriaTreeProps<T> {
	/** Rendered when the tree has no items. */
	emptyState?: React.ReactNode;
	/** Which row treatment the tree wears. @default "default" */
	preset?: TreePreset;
}

export function Tree<T extends object>({
	className,
	emptyState = "No results found",
	preset = "default",
	renderEmptyState,
	...props
}: TreeProps<T>) {
	return (
		<AriaTree<T>
			{...props}
			className={composeRenderProps(className, (className) =>
				tree({ className, preset }),
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
