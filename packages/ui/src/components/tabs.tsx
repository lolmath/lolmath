"use client";

import { createContext, useContext } from "react";
import {
	Tab as AriaTab,
	TabList as AriaTabList,
	TabPanel as AriaTabPanel,
	Tabs as AriaTabs,
	type TabListProps,
	type TabPanelProps,
	type TabProps,
	type TabsProps,
} from "react-aria-components";
import { useCssId } from "../utilities/css-id.js";
import { resolveClassName } from "../utilities/resolve-class-name.js";
import { tv } from "../utilities/tv.js";
import { startViewTransition } from "../utilities/view-transition.js";

export type { Key } from "react-aria-components";

export function Tabs({ onSelectionChange, ...rest }: TabsProps) {
	const id = useCssId();
	return (
		<TabsContext.Provider value={{ id }}>
			<AriaTabs
				{...rest}
				onSelectionChange={(key) => {
					startViewTransition(() => {
						onSelectionChange?.(key);
					});
				}}
			/>
		</TabsContext.Provider>
	);
}

const tabList = tv({
	base: "-ml-4 flex gap-0",
});

export function TabList<T extends object>({
	className,
	...rest
}: TabListProps<T>) {
	return (
		<AriaTabList<T>
			{...rest}
			className={(values) =>
				tabList({
					className: resolveClassName(className, values),
				})
			}
		/>
	);
}

const tab = tv({
	base: [
		"font-beaufort text-lol-gold-300 relative cursor-pointer select-none px-4 py-1 text-xs font-medium uppercase tracking-widest",
		"focus-visible:outline-lol-gold-100 focus:outline-none focus-visible:outline-1 focus-visible:outline-offset-4",
	],
	variants: {
		isSelected: {
			true: "text-lol-gold-100",
		},
		isHovered: {
			true: "text-lol-gold-100",
		},
		isPressed: {
			true: "text-lol-gold-500",
		},
		isDisabled: {
			true: "text-lol-grey-150 cursor-default",
		},
	},
});

export function Tab({ children, className, ...rest }: TabProps) {
	const { id } = useTabsContext();
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
					{values.isSelected && (
						<div
							style={{
								viewTransitionName: `tab-indicator-${id}`,
							}}
							className={
								"via-lol-gold-200 absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent to-transparent"
							}
						></div>
					)}
				</>
			)}
		</AriaTab>
	);
}

export function TabPanel({ ...rest }: TabPanelProps) {
	return <AriaTabPanel {...rest} />;
}

const TabsContext = createContext<
	| {
			id: string;
	  }
	| undefined
>(undefined);

function useTabsContext() {
	const context = useContext(TabsContext);
	if (context === undefined) {
		throw new Error("useTabsContext must be used within a Tabs");
	}
	return context;
}
