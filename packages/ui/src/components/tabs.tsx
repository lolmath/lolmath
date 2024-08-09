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
} from "react-aria-components";
import { resolveClassName } from "../utilities/resolve-class-name.js";
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
			className={(values) =>
				cx(classes.list, resolveClassName(className, values))
			}
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
			className={(values) =>
				tab({
					...values,
					className: resolveClassName(className, values),
				})
			}
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
