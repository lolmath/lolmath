"use client";

import { cx } from "cva";
import {
	Disclosure as AriaDisclosure,
	DisclosureGroup as AriaDisclosureGroup,
	DisclosurePanel as AriaDisclosurePanel,
	Button,
	type ButtonProps,
	composeRenderProps,
	type DisclosurePanelProps,
	type DisclosureProps,
} from "react-aria-components";

import classes from "./disclosure.module.css";

export const DisclosureGroup = AriaDisclosureGroup;

export function DisclosureButton({
	children,
	className,
	...props
}: ButtonProps) {
	return (
		<Button
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.disclosureButton, className),
			)}
			slot="trigger"
		>
			{composeRenderProps(children, (children) => (
				<>
					<span className={classes.icon}>❯</span>
					{children}
				</>
			))}
		</Button>
	);
}

export function Disclosure({ className, ...props }: DisclosureProps) {
	return (
		<AriaDisclosure
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(className, classes.disclosure),
			)}
		/>
	);
}

export function DisclosurePanel({ className, ...props }: DisclosurePanelProps) {
	return (
		<AriaDisclosurePanel
			className={composeRenderProps(className, (className) =>
				cx(className, classes.disclosurePanel),
			)}
			{...props}
		/>
	);
}
