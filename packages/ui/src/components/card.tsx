import { cva } from "cva";
import type { ComponentProps } from "react";
import classes from "./card.module.css";

export interface CardProps extends ComponentProps<"div"> {
	radius?: string;
	borderWidth?: string;
}

const card = cva({
	base: classes.card,
});

export function Card({
	className,
	style,
	radius = "1rem",
	borderWidth = "2px",
	...props
}: CardProps) {
	return (
		<div
			className={card({ className })}
			style={{
				// @ts-ignore: Css variable
				"--lol-card-radius": radius,
				"--lol-card-border-width": borderWidth,
				...(style ?? {}),
			}}
			{...props}
		/>
	);
}
