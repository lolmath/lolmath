"use client";

import { createContext, useContext, useState } from "react";
import { useCssId } from "../utilities/css-id.js";
import { cva } from "cva";
import classes from "./accordion.module.css";

interface AccordionProps {
	children: React.ReactNode;
}
export function Accordion({ children }: AccordionProps) {
	const [activeItem, setActiveItem] = useState<string>("");
	const id = useCssId();

	return (
		<AccordionContext.Provider
			value={{
				activeItem,
				setActiveItem,
				id,
			}}
		>
			{children}
		</AccordionContext.Provider>
	);
}

export const accordionTrigger = cva({
	base: classes.trigger,
});

interface AccordionTriggerProps {
	children: React.ReactNode;
	className?: string;
}
export function AccordionTrigger({
	children,
	className,
}: AccordionTriggerProps) {
	const { setActiveItem } = useContext(AccordionContext);
	const { item } = useContext(AccordionItemContext);

	return (
		<button
			type="button"
			className={accordionTrigger({
				className,
			})}
			onClick={() => {
				setActiveItem((currentItem) => (currentItem === item ? "" : item));
			}}
		>
			<span className={classes.triggerIcon}>❯</span>
			{children}
		</button>
	);
}

interface AccordionItemProps {
	children: React.ReactNode;
	value: string;
}
export function AccordionItem({ children, value }: AccordionItemProps) {
	return (
		<AccordionItemContext.Provider
			value={{
				item: value,
			}}
		>
			<div className={classes.item}>{children}</div>
		</AccordionItemContext.Provider>
	);
}

interface AccordionContentProps {
	children: React.ReactNode;
}
export function AccordionContent({ children }: AccordionContentProps) {
	const { activeItem } = useContext(AccordionContext);
	const { item } = useContext(AccordionItemContext);

	if (activeItem !== item) {
		return null;
	}

	return <div className={classes.content}>{children}</div>;
}

const AccordionContext = createContext<{
	activeItem: string;
	setActiveItem: React.Dispatch<React.SetStateAction<string>>;
	id: string;
}>(undefined as any);

const AccordionItemContext = createContext<{
	item: string;
}>(undefined as any);
