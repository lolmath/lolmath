import { cva } from "cva";
import type { Key, ReactNode, TableHTMLAttributes } from "react";
import classes from "./vertical-table.module.css";

/** Horizontal alignment of a `VerticalTable`'s value cells. */
export type VerticalTableAlign = "start" | "center" | "end";

const alignVariants = {
	start: classes.start,
	center: classes.center,
	end: classes.end,
};

/** One field of a `VerticalTable`: a row, read across every record. */
export interface VerticalTableField<T> {
	/** The name of the field, which heads its row. */
	name: ReactNode;
	/** What this field is for one record, for every column of the row. */
	value: (record: T, index: number) => ReactNode;
	/** Overrides the table's `align` for this row. */
	align?: VerticalTableAlign;
	/** Distinguishes the row between renders. Defaults to the field's index. */
	id?: Key;
}

export const verticalTable = cva({
	base: classes.table,
});

export const verticalTableCell = cva({
	base: classes.cell,
	variants: { align: alignVariants },
	defaultVariants: { align: "start" },
});

export const verticalTableRecordHeader = cva({
	base: classes.recordHeader,
	variants: { align: alignVariants },
	defaultVariants: { align: "start" },
});

// `align` is dropped from the table's own attributes: `<table align>` is
// deprecated since HTML 4 and left to the CSS here, which frees the name for
// the one `Table`'s cells already use.
export interface VerticalTableProps<T>
	extends Omit<TableHTMLAttributes<HTMLTableElement>, "align" | "children"> {
	/** The records, one per column. */
	records: readonly T[];
	/** The fields, one per row. */
	fields: readonly VerticalTableField<T>[];
	/**
	 * The heading over a record's column. Leave it out and the table has no
	 * header row at all, which is the stat card of a single record: the field
	 * names head their own rows, so nothing is left unnamed by dropping it.
	 */
	recordHeader?: (record: T, index: number) => ReactNode;
	/** Distinguishes a column between renders. Defaults to the record's index. */
	recordKey?: (record: T, index: number) => Key;
	/** Where the values sit in their cells. Defaults to `"start"`. */
	align?: VerticalTableAlign;
}

/**
 * A table read down rather than across: a row per field, a column per record,
 * and the field names heading the rows from the leading column.
 *
 * It is the table for comparing a handful of records field by field — two
 * builds, the champions of a lane — and, with a single record and no
 * `recordHeader`, for the stat card that is a table underneath.
 *
 * Where `Table` is React Aria's grid, with everything that comes with it, this
 * is markup and no more: a `<table>` whose field names are real
 * `<th scope="row">`s and whose record headings are real `<th scope="col">`s.
 * Nothing here is selectable, sortable, resizable or focusable. React Aria's
 * table cannot be transposed — its collection is row major, and the flip is in
 * the data rather than in the structure — so rather than dress one up as the
 * other, a table that only has to be read is only what a table needs to be
 * read. Reach for `Table` the moment the rows have to be interacted with.
 */
export function VerticalTable<T>({
	align = "start",
	className,
	fields,
	recordHeader,
	recordKey = (_record, index) => index,
	records,
	...props
}: VerticalTableProps<T>) {
	return (
		<table {...props} className={verticalTable({ className })}>
			{recordHeader && (
				<thead>
					<tr>
						{/* The corner above the field names is left a <td>: an empty <th>
						    is a heading, and a screen reader announces it as a blank one. */}
						<td className={classes.corner} />
						{records.map((record, index) => (
							<th
								className={verticalTableRecordHeader({ align })}
								key={recordKey(record, index)}
								scope="col"
							>
								{recordHeader(record, index)}
							</th>
						))}
					</tr>
				</thead>
			)}
			<tbody>
				{fields.map((field, fieldIndex) => (
					<tr key={field.id ?? fieldIndex}>
						<th className={classes.fieldHeader} scope="row">
							{field.name}
						</th>
						{records.map((record, index) => (
							<td
								className={verticalTableCell({ align: field.align ?? align })}
								key={recordKey(record, index)}
							>
								{field.value(record, index)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
