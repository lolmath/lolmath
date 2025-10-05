"use client";

import { cx } from "cva";
import React from "react";
import {
	Popover as AriaPopover,
	Autocomplete,
	Select,
	type SelectProps,
	SelectValue,
	useFilter,
} from "react-aria-components";
import { Button } from "../button";
import { SearchField } from "../search-field/search-field";
import { TagGroup, TagList } from "../tag-group/tag-group";
import classes from "./multiple-select.module.css";
import {
	SelectListBox,
	SelectListBoxItem,
	SelectVirtualizer,
	select,
} from "./select";

export interface MultipleSelectProps<T extends object = {}>
	extends Omit<
		SelectProps<T, "multiple">,
		"children" | "className" | "validationBehavior" | "selectionMode"
	> {
	items: Array<T>;
	className?: string;
	size?: "small" | "medium" | "large";
	emptyTags?: React.ReactNode;
	emptyList?: React.ReactNode;
	tagGroupLabel?: string;
	selectKey: (item: T) => React.Key;
	selectLabel: (item: T) => string;
}

export function MultipleSelect<T extends object = {}>({
	items,
	className,
	size = "medium",
	emptyList,
	emptyTags = "No items selected",
	tagGroupLabel = "Selected items",
	selectKey,
	selectLabel,
	...selectProps
}: MultipleSelectProps<T>) {
	const triggerContainerRef = React.useRef<HTMLDivElement | null>(null);
	const { contains } = useFilter({ sensitivity: "base" });

	return (
		<Select<T, "multiple"> selectionMode="multiple" {...selectProps}>
			<div ref={triggerContainerRef} className={classes.triggerContainer}>
				<SelectValue<T>
					className={select({
						size,
						selectionMode: "multiple",
						className: cx(classes.select, className),
					})}
				>
					{({ selectedItems, state }) => (
						<TagGroup
							aria-label={tagGroupLabel}
							onRemove={(keys) => {
								if (Array.isArray(state.value)) {
									state.setValue(state.value.filter((k) => !keys.has(k)));
								}
							}}
						>
							<TagList
								selectLabel={selectLabel}
								items={selectedItems.filter((item) => item != null)}
								renderEmptyState={() => emptyTags}
								variant="hextech"
							/>
						</TagGroup>
					)}
				</SelectValue>

				<Button shape="square" thin size={size}>
					+
				</Button>
			</div>

			<AriaPopover className={classes.popover} triggerRef={triggerContainerRef}>
				<Autocomplete filter={contains}>
					<SearchField className={cx()} inputProps={{ autoFocus: true }} />
					<SelectVirtualizer>
						<SelectListBox
							items={items}
							selectionMode="multiple"
							emptyList={emptyList}
						>
							{(item) => (
								<SelectListBoxItem key={selectKey(item)}>
									{selectLabel(item)}
								</SelectListBoxItem>
							)}
						</SelectListBox>
					</SelectVirtualizer>
				</Autocomplete>
			</AriaPopover>
		</Select>
	);
}
