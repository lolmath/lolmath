"use client";

import { cx } from "cva";
import {
	Button,
	type ButtonProps,
	Disclosure,
	DisclosureGroup,
	DisclosurePanel,
	type DisclosurePanelProps,
	type DisclosureProps,
	composeRenderProps,
} from "react-aria-components";

import classes from "./accordion.module.css";

export const Accordion = DisclosureGroup;

export function AccordionTrigger({
	children,
	className,
	...props
}: ButtonProps) {
	return (
		<Button
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.trigger, className),
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

export function AccordionItem({ className, ...props }: DisclosureProps) {
	return (
		<Disclosure
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(className, classes.item),
			)}
		/>
	);
}

export function AccordionContent({
	className,
	...props
}: DisclosurePanelProps) {
	return (
		<DisclosurePanel
			className={composeRenderProps(className, (className) =>
				cx(className, classes.content),
			)}
			{...props}
		/>
	);
}
