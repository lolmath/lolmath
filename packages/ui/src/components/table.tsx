import { cva, cx } from "cva";
import {
	Cell as AriaCell,
	type CellProps as AriaCellProps,
	Column as AriaColumn,
	type ColumnProps as AriaColumnProps,
	ColumnResizer as AriaColumnResizer,
	type ColumnResizerProps as AriaColumnResizerProps,
	Row as AriaRow,
	type RowProps as AriaRowProps,
	Table as AriaTable,
	TableBody as AriaTableBody,
	type TableBodyProps as AriaTableBodyProps,
	TableFooter as AriaTableFooter,
	type TableFooterProps as AriaTableFooterProps,
	type TableProps as AriaTableProps,
	composeRenderProps,
} from "react-aria-components";
import classes from "./table.module.css";
import { text } from "./typography/text";

export { ResizableTableContainer, TableHeader } from "react-aria-components";

/** Horizontal alignment shared by `TableColumn` and `TableCell`. */
export type TableAlign = "start" | "center" | "end";

const alignVariants = {
	start: classes.start,
	center: classes.center,
	end: classes.end,
};

export const table = cva({
	base: classes.table,
});

export interface TableProps extends AriaTableProps {}

export function Table({ className, ...props }: TableProps) {
	return (
		<AriaTable
			{...props}
			className={composeRenderProps(className, (className) =>
				table({ className }),
			)}
		/>
	);
}

export const tableColumn = cva({
	base: classes.column,
	variants: { align: alignVariants },
	defaultVariants: { align: "start" },
});

export interface TableColumnProps extends AriaColumnProps {
	align?: TableAlign;
}

export function TableColumn({
	align = "start",
	children,
	className,
	...props
}: TableColumnProps) {
	return (
		<AriaColumn
			{...props}
			className={composeRenderProps(className, (className) =>
				tableColumn({ align, className }),
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

export function TableRow<T extends object>({
	className,
	...props
}: TableRowProps<T>) {
	return (
		<AriaRow<T>
			{...props}
			className={composeRenderProps(className, (className) =>
				tableRow({ className }),
			)}
		/>
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

export function TableCell({
	align = "start",
	className,
	...props
}: TableCellProps) {
	return (
		<AriaCell
			{...props}
			className={composeRenderProps(className, (className) =>
				tableCell({ align, className }),
			)}
		/>
	);
}

export interface TableFooterProps<T extends object>
	extends AriaTableFooterProps<T> {}

export function TableFooter<T extends object>({
	className,
	...props
}: TableFooterProps<T>) {
	return (
		<AriaTableFooter<T> {...props} className={cx(classes.footer, className)} />
	);
}
