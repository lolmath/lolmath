"use client";

import { cva, cx } from "cva";
import {
	Tab as AriaTab,
	TabList as AriaTabList,
	TabPanel as AriaTabPanel,
	Tabs as AriaTabs,
	type TabListProps,
	type TabPanelProps,
	type TabProps,
	composeRenderProps,
} from "react-aria-components";
import classes from "./tabs.module.css";

export type { Key } from "react-aria-components";

export const Tabs = AriaTabs;

export function TabList<T extends object>({
	className,
	...rest
}: TabListProps<T>) {
	return (
		<AriaTabList<T>
			{...rest}
			className={composeRenderProps(className, (className) =>
				cx(classes.list, className),
			)}
		/>
	);
}

const tab = cva({
	base: classes.tab,
	variants: {
		isSelected: {
			true: classes.selected,
		},
		isHovered: {
			true: classes.hovered,
		},
		isPressed: {
			true: classes.pressed,
		},
		isDisabled: {
			true: classes.disabled,
		},
		isFocusVisible: {
			true: classes.focusVisible,
		},
	},
});

export function Tab({ children, className, ...rest }: TabProps) {
	return (
		<AriaTab
			{...rest}
			className={composeRenderProps(className, (className, values) =>
				tab({
					...values,
					className,
				}),
			)}
		>
			{(values) => (
				<>
					{typeof children === "function" ? children(values) : children}
					{values.isSelected && <div className={classes.indicator} />}
				</>
			)}
		</AriaTab>
	);
}

export function TabPanel({ ...rest }: TabPanelProps) {
	return <AriaTabPanel {...rest} />;
}
