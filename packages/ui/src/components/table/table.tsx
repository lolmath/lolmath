import { cva, cx } from "cva";
import { createContext, useContext } from "react";
import {
	Button as AriaButton,
	Cell as AriaCell,
	type CellProps as AriaCellProps,
	Column as AriaColumn,
	type ColumnProps as AriaColumnProps,
	ColumnResizer as AriaColumnResizer,
	type ColumnResizerProps as AriaColumnResizerProps,
	DropIndicator as AriaDropIndicator,
	type DropIndicatorProps as AriaDropIndicatorProps,
	ResizableTableContainer as AriaResizableTableContainer,
	type ResizableTableContainerProps as AriaResizableTableContainerProps,
	Row as AriaRow,
	type RowProps as AriaRowProps,
	Table as AriaTable,
	TableBody as AriaTableBody,
	type TableBodyProps as AriaTableBodyProps,
	TableFooter as AriaTableFooter,
	type TableFooterProps as AriaTableFooterProps,
	TableHeader as AriaTableHeader,
	type TableHeaderProps as AriaTableHeaderProps,
	TableLoadMoreItem as AriaTableLoadMoreItem,
	type TableLoadMoreItemProps as AriaTableLoadMoreItemProps,
	type TableProps as AriaTableProps,
	Collection,
	composeRenderProps,
	type DragAndDropHooks,
	type DragAndDropOptions,
	useDragAndDrop,
	useTableOptions,
} from "react-aria-components";
import { Checkbox } from "../checkbox/checkbox";
import { Spinner } from "../spinner/spinner";
import { text } from "../typography/text";
import classes from "./table.module.css";

/** Horizontal alignment shared by `TableColumn` and `TableCell`. */
export type TableAlign = "start" | "center" | "end";

const alignVariants = {
	start: classes.start,
	center: classes.center,
	end: classes.end,
};

/** Which way round a `Table` is read. */
export type TableOrientation = "horizontal" | "vertical";

/**
 * A `TableRow` inside a `TableFooter` still has to line up with the columns
 * above it, but it owns no selection checkbox and nothing to drag: the footer
 * fills those columns with empty cells instead.
 *
 * The context is read while the collection is being built — the pass in which
 * every wrapper in this file runs — so it reaches the rows even though react
 * aria renders the footer's DOM from the collection afterwards.
 */
const TableFooterContext = createContext(false);

export const table = cva({
	base: classes.table,
	variants: {
		orientation: {
			horizontal: "",
			vertical: classes.vertical,
		},
	},
	defaultVariants: { orientation: "horizontal" },
});

// A table whose cells hold their own controls (a textfield, a slider) needs
// `keyboardNavigationBehavior="tab"`: the arrow keys then belong to the control
// instead of moving between cells, and Tab walks the row's controls.
export interface TableProps extends AriaTableProps {
	/**
	 * Which way round the table is read. Defaults to `"horizontal"`: a header row
	 * over rows that each hold one record.
	 *
	 * `"vertical"` is the transposed table, the one that compares a handful of
	 * records field by field — each row is a field, each column a record, and the
	 * header the eye follows is the leading column rather than the top row. It is
	 * a presentation, not a structure: the rows and the cells stay what they are
	 * to react aria, so it is the data that is fed in the other way round and the
	 * rules that are drawn down the table rather than across it. Mark the column
	 * holding the field names `isRowHeader` and it becomes that header column.
	 */
	orientation?: TableOrientation;
}

export function Table({
	className,
	orientation = "horizontal",
	...props
}: TableProps) {
	return (
		<AriaTable
			{...props}
			className={composeRenderProps(className, (className) =>
				table({ orientation, className }),
			)}
		/>
	);
}

export interface ResizableTableContainerProps
	extends AriaResizableTableContainerProps {}

/**
 * The scroll container a `Table` needs for `allowsResizing` columns: it is the
 * element the column widths are measured against.
 */
export function ResizableTableContainer({
	className,
	...props
}: ResizableTableContainerProps) {
	return (
		<AriaResizableTableContainer
			{...props}
			className={cx(classes.resizableContainer, className)}
		/>
	);
}

export interface TableHeaderProps<T extends object>
	extends AriaTableHeaderProps<T> {
	/**
	 * Takes the header row out of the layout while leaving it in the
	 * accessibility tree, for the table that has nothing to call its columns —
	 * an `orientation="vertical"` table of one record, whose columns are that
	 * record. The header cannot simply be left out: react aria builds the
	 * table's columns from it, and they are what names every cell to a screen
	 * reader.
	 */
	isVisuallyHidden?: boolean;
}

/**
 * The header row of a `Table`.
 *
 * The select-all checkbox is added for tables with `selectionMode="multiple"`,
 * and a blank column ahead of it for tables that allow dragging, so that the
 * header keeps a column for every cell `TableRow` adds.
 */
export function TableHeader<T extends object>({
	children,
	className,
	columns,
	dependencies,
	isVisuallyHidden,
	...props
}: TableHeaderProps<T>) {
	const { allowsDragging, selectionBehavior, selectionMode } =
		useTableOptions();

	return (
		<AriaTableHeader
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(isVisuallyHidden && classes.visuallyHiddenHeader, className),
			)}
		>
			{allowsDragging && (
				<AriaColumn
					className={tableColumn({ className: classes.gripColumn })}
				/>
			)}
			{selectionBehavior === "toggle" && (
				<AriaColumn
					className={tableColumn({ className: classes.selectionColumn })}
				>
					{selectionMode === "multiple" && <Checkbox slot="selection" />}
				</AriaColumn>
			)}
			<Collection dependencies={dependencies} items={columns}>
				{children}
			</Collection>
		</AriaTableHeader>
	);
}

export const tableColumn = cva({
	base: classes.column,
	variants: {
		align: alignVariants,
		/* The column an `orientation="vertical"` table is headed by. */
		isRowHeader: { true: classes.headerColumn },
	},
	defaultVariants: { align: "start" },
});

export interface TableColumnProps extends AriaColumnProps {
	align?: TableAlign;
}

export function TableColumn({
	align = "start",
	children,
	className,
	isRowHeader,
	...props
}: TableColumnProps) {
	return (
		<AriaColumn
			{...props}
			isRowHeader={isRowHeader}
			className={composeRenderProps(className, (className) =>
				tableColumn({ align, isRowHeader, className }),
			)}
		>
			{composeRenderProps(children, (children, { allowsSorting }) => (
				<>
					{children}
					{allowsSorting && (
						<span aria-hidden="true" className={classes.sortIndicator} />
					)}
				</>
			))}
		</AriaColumn>
	);
}

export interface TableColumnResizerProps extends AriaColumnResizerProps {}

export function TableColumnResizer({
	className,
	...props
}: TableColumnResizerProps) {
	return (
		<AriaColumnResizer
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.resizer, className),
			)}
		/>
	);
}

export interface TableBodyProps<T extends object>
	extends AriaTableBodyProps<T> {
	/** Rendered when the table has no rows. */
	emptyState?: React.ReactNode;
}

export function TableBody<T extends object>({
	emptyState = "No results found",
	renderEmptyState,
	...props
}: TableBodyProps<T>) {
	return (
		<AriaTableBody<T>
			{...props}
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

export const tableRow = cva({
	base: classes.row,
});

export interface TableRowProps<T extends object> extends AriaRowProps<T> {}

/**
 * A row of a `Table`.
 *
 * A selection checkbox is added for tables with a `selectionMode`, and a drag
 * handle for tables that allow dragging — both ahead of the row's own cells,
 * matching the columns `TableHeader` adds. `selectionBehavior="replace"` drops
 * the checkbox in favour of highlighting the row, like the ladder in the
 * League client.
 */
export function TableRow<T extends object>({
	children,
	className,
	columns,
	dependencies,
	...props
}: TableRowProps<T>) {
	const { allowsDragging, selectionBehavior } = useTableOptions();
	const isFooterRow = useContext(TableFooterContext);

	return (
		<AriaRow<T>
			{...props}
			className={composeRenderProps(className, (className) =>
				tableRow({ className }),
			)}
		>
			{allowsDragging && (
				<TableCell className={classes.gripCell}>
					{!isFooterRow && <AriaButton className={classes.grip} slot="drag" />}
				</TableCell>
			)}
			{selectionBehavior === "toggle" && (
				<TableCell className={classes.selectionCell}>
					{!isFooterRow && <Checkbox slot="selection" />}
				</TableCell>
			)}
			<Collection
				dependencies={
					dependencies ? [props.value, ...dependencies] : [props.value]
				}
				idScope={props.id}
				items={columns}
			>
				{children}
			</Collection>
		</AriaRow>
	);
}

export const tableCell = cva({
	base: classes.cell,
	variants: { align: alignVariants },
	defaultVariants: { align: "start" },
});

export interface TableCellProps extends AriaCellProps {
	align?: TableAlign;
}

/**
 * A cell of a `TableRow`.
 *
 * The cell in the table's `treeColumn` grows an expand chevron for rows that
 * have child rows, and is indented by the row's depth; the indent is read from
 * the `--table-row-level` react aria sets on every row.
 */
export function TableCell({
	align = "start",
	children,
	className,
	...props
}: TableCellProps) {
	return (
		<AriaCell
			{...props}
			className={composeRenderProps(className, (className) =>
				tableCell({ align, className }),
			)}
		>
			{composeRenderProps(
				children,
				(children, { hasChildItems, isTreeColumn }) =>
					isTreeColumn ? (
						<span className={classes.treeContent}>
							{hasChildItems ? (
								<AriaButton className={classes.chevron} slot="chevron" />
							) : (
								/* Leaves keep the chevron's footprint so labels stay aligned. */
								<span aria-hidden="true" className={classes.chevronSpacer} />
							)}
							{children}
						</span>
					) : (
						children
					),
			)}
		</AriaCell>
	);
}

export interface TableFooterProps<T extends object>
	extends AriaTableFooterProps<T> {}

export function TableFooter<T extends object>({
	className,
	...props
}: TableFooterProps<T>) {
	return (
		<TableFooterContext value={true}>
			<AriaTableFooter<T>
				{...props}
				className={cx(classes.footer, className)}
			/>
		</TableFooterContext>
	);
}

export interface TableLoadMoreItemProps extends AriaTableLoadMoreItemProps {}

/**
 * A sentinel row at the end of a `TableBody`. It calls `onLoadMore` once it
 * scrolls into view, and shows the spinner while `isLoading` is set.
 */
export function TableLoadMoreItem({
	children,
	className,
	...props
}: TableLoadMoreItemProps) {
	return (
		<AriaTableLoadMoreItem
			{...props}
			className={cx(classes.loadMore, className)}
		>
			{children ?? <Spinner className={classes.spinner} />}
		</AriaTableLoadMoreItem>
	);
}

export interface TableDropIndicatorProps extends AriaDropIndicatorProps {}

/**
 * The line drawn between two rows while a drop is hovered over the gap. It is
 * rendered by `useTableDragAndDrop` — pass it to `useDragAndDrop`'s
 * `renderDropIndicator` when using that hook directly.
 */
export function TableDropIndicator({
	className,
	...props
}: TableDropIndicatorProps) {
	return (
		<AriaDropIndicator
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.dropIndicator, className),
			)}
		/>
	);
}

/**
 * `useDragAndDrop` with the table's own drop indicator, for the
 * `dragAndDropHooks` prop of a `Table`.
 */
export function useTableDragAndDrop<T = object>(
	options: DragAndDropOptions<T>,
): { dragAndDropHooks: DragAndDropHooks<T> } {
	return useDragAndDrop<T>({
		renderDropIndicator: (target) => <TableDropIndicator target={target} />,
		...options,
	});
}
