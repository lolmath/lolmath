"use client";

import { cva } from "cva";
import React from "react";
import { type Key, VisuallyHidden, useFilter } from "react-aria";
import {
	Button as AriaButton,
	ComboBox,
	type ComboBoxProps,
	Group,
	Input,
	type InputProps,
	ListBox,
	Popover,
	TagGroup,
	TagList,
} from "react-aria-components";
import { type ListData, useListData } from "react-stately";
import { Button } from "../button";
import { Text } from "../typography/text";
import closed from "./closed.png";
import classes from "./multiple-select.module.css";
import selectClasses from "./select.module.css";
export { useListData } from "react-stately";

const multiSelect = cva({
	base: classes.multiSelect,
	variants: {
		size: {
			small: classes.small,
			medium: classes.medium,
			large: classes.large,
		},
		isFocusWithin: {
			true: classes.focusWithin,
		},
		isHovered: {
			true: classes.hover,
		},
		isDisabled: {
			true: classes.disabled,
		},
	},
});

interface FieldState {
	selectedKey: Key | null;
	inputValue: string;
}

export interface SelectedKey {
	id: Key;
	name: string;
}

interface MultipleSelectProps<T extends SelectedKey>
	extends Omit<
		ComboBoxProps<T>,
		| "children"
		| "validate"
		| "allowsEmptyCollection"
		| "selectedKey"
		| "inputValue"
		| "className"
		| "value"
		| "onSelectionChange"
		| "onInputChange"
	> {
	items: Array<T>;
	selectedItems: ListData<T>;
	className?: string;
	onItemInserted?: (key: Key) => void;
	onItemCleared?: (key: Key) => void;
	renderEmptyState?: (inputValue: string) => React.ReactNode;
	tag: (item: T) => React.ReactNode;
	children: React.ReactNode | ((item: T) => React.ReactNode);
	inputProps?: InputProps;
	size?: "small" | "medium" | "large";
}

export function MultipleSelect<T extends SelectedKey>({
	children,
	items,
	selectedItems,
	onItemCleared,
	onItemInserted,
	className,
	name,
	renderEmptyState,
	size = "medium",
	...props
}: MultipleSelectProps<T>) {
	const tagGroupIdentifier = React.useId();
	const triggerRef = React.useRef<HTMLDivElement | null>(null);
	const [width, setWidth] = React.useState(0);

	const { contains } = useFilter({ sensitivity: "base" });
	const selectedKeys = selectedItems.items.map((i) => i.id);

	const filter = React.useCallback(
		(item: T, filterText: string) =>
			!selectedKeys.includes(item.id) && contains(item.name, filterText),
		[contains, selectedKeys],
	);

	const accessibleList = useListData({
		initialItems: items,
		filter,
	});

	const [fieldState, setFieldState] = React.useState<FieldState>({
		selectedKey: null,
		inputValue: "",
	});

	const onRemove = React.useCallback(
		(keys: Set<Key>) => {
			const key = keys.values().next().value;
			selectedItems.remove(key);
			setFieldState({ inputValue: "", selectedKey: null });
			onItemCleared?.(key);
		},
		[selectedItems, onItemCleared],
	);

	const onSelectionChange = (id: Key | null) => {
		if (!id) return;

		const item = accessibleList.getItem(id);

		if (!item) return;

		if (!selectedKeys.includes(id)) {
			selectedItems.append(item);
			setFieldState({
				inputValue: "",
				selectedKey: id,
			});
			onItemInserted?.(id);
		}

		accessibleList.setFilterText("");
	};
	const onInputChange = (v: string) => {
		setFieldState((prevState) => ({
			inputValue: v,
			selectedKey: v === "" ? null : prevState.selectedKey,
		}));

		accessibleList.setFilterText(v);
	};

	const popLast = React.useCallback(() => {
		const endKey = selectedItems.items[selectedItems.items.length - 1];

		if (endKey !== null) {
			selectedItems.remove(endKey.id);
			onItemCleared?.(endKey.id);
		}

		setFieldState({
			inputValue: "",
			selectedKey: null,
		});
	}, [selectedItems, onItemCleared]);

	const onKeyDownCapture = React.useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Backspace" && fieldState.inputValue === "") {
				popLast();
			}
		},
		[popLast, fieldState.inputValue],
	);

	React.useEffect(() => {
		const trigger = triggerRef.current;
		if (!trigger) return;

		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				setWidth(entry.target.clientWidth);
			}
		});

		observer.observe(trigger);
		return () => {
			observer.unobserve(trigger);
		};
	}, []);

	const triggerButtonRef = React.useRef<HTMLButtonElement | null>(null);

	return (
		<Group>
			{(groupRenderProps) => (
				<>
					<div
						ref={triggerRef}
						className={multiSelect({ size, ...groupRenderProps })}
					>
						<div className={classes.tagsAndInput}>
							<TagGroup
								aria-label="Selected items"
								id={tagGroupIdentifier}
								onRemove={onRemove}
							>
								<TagList
									items={selectedItems.items}
									className={classes.tagList}
								>
									{props.tag}
								</TagList>
							</TagGroup>
							<ComboBox
								{...props}
								aria-label="Available items"
								allowsEmptyCollection
								className={classes.comboBox}
								items={accessibleList.items}
								selectedKey={fieldState.selectedKey}
								inputValue={fieldState.inputValue}
								onSelectionChange={onSelectionChange}
								onInputChange={onInputChange}
							>
								<Input
									className={classes.input}
									onBlur={() => {
										setFieldState({
											inputValue: "",
											selectedKey: null,
										});
										accessibleList.setFilterText("");
									}}
									onKeyDownCapture={onKeyDownCapture}
									{...props.inputProps}
								/>

								<VisuallyHidden>
									<Button
										slot="remove"
										aria-label="Remove"
										ref={triggerButtonRef}
									>
										Remove
									</Button>
								</VisuallyHidden>
								<Popover
									className={selectClasses.popover}
									style={{ width: `${width}px` }}
									triggerRef={triggerRef}
									trigger="ComboBox"
								>
									<ListBox
										className={selectClasses.listBox}
										renderEmptyState={() =>
											renderEmptyState ? (
												renderEmptyState(fieldState.inputValue)
											) : (
												<Text className={classes.emptyText}>
													{fieldState.inputValue ? (
														<>
															No results found for:{" "}
															<strong>{fieldState.inputValue}</strong>
														</>
													) : (
														"No options"
													)}
												</Text>
											)
										}
										selectionMode="multiple"
									>
										{children}
									</ListBox>
								</Popover>
							</ComboBox>
						</div>
						<div aria-hidden>
							<AriaButton
								excludeFromTabOrder
								onPress={() => triggerButtonRef.current?.click()}
								className={classes.chevronButton}
							>
								<img src={closed} alt="" />
							</AriaButton>
						</div>
					</div>
				</>
			)}
		</Group>
	);
}
