"use client";

import { cva } from "cva";
import React, { useMemo } from "react";
import { type Key, VisuallyHidden } from "react-aria";
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
import { Button } from "../button";
import { Text } from "../typography/text";
import closed from "./closed.png";
import classes from "./multiple-select.module.css";
import selectClasses from "./select.module.css";

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
	selectedItems: Array<T>;
	className?: string;
	onChange?: (items: Array<T>) => void;
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
	onChange,
	className,
	name,
	renderEmptyState,
	size = "medium",
	...props
}: MultipleSelectProps<T>) {
	const tagGroupIdentifier = React.useId();
	const triggerRef = React.useRef<HTMLDivElement | null>(null);
	const [width, setWidth] = React.useState(0);

	const selectedKeys = selectedItems.map((i) => i.id);
	const [fieldState, setFieldState] = React.useState<FieldState>({
		selectedKey: null,
		inputValue: "",
	});

	const accessibleItems = useMemo(
		() =>
			items
				.filter(
					(item) => !selectedItems.some((selected) => selected.id === item.id),
				)
				.filter((item) =>
					item.name.toLowerCase().includes(fieldState.inputValue.toLowerCase()),
				),
		[selectedItems, fieldState.inputValue, items],
	);

	const onRemove = React.useCallback(
		(keys: Set<Key>) => {
			const key = keys.values().next().value;

			onChange?.(selectedItems.filter((i) => i.id !== key));

			setFieldState({ inputValue: "", selectedKey: null });
		},
		[selectedItems, onChange],
	);

	const onSelectionChange = (id: Key | null) => {
		if (!id) return;

		const item = items.find((i) => i.id === id);

		if (!item) return;

		if (!selectedKeys.includes(id)) {
			onChange?.([...selectedItems, item]);
			setFieldState({
				inputValue: "",
				selectedKey: id,
			});
		}
	};
	const onInputChange = (v: string) => {
		setFieldState((prevState) => ({
			inputValue: v,
			selectedKey: v === "" ? null : prevState.selectedKey,
		}));
	};

	const popLast = React.useCallback(() => {
		if (selectedItems.length > 0) {
			onChange?.(selectedItems.slice(0, -1));
		}

		setFieldState({
			inputValue: "",
			selectedKey: null,
		});
	}, [selectedItems, onChange]);

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
								<TagList items={selectedItems} className={classes.tagList}>
									{props.tag}
								</TagList>
							</TagGroup>
							<ComboBox
								{...props}
								aria-label="Available items"
								allowsEmptyCollection
								className={classes.comboBox}
								items={accessibleItems}
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
