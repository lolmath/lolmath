import { cva } from "cva";
import {
	ToggleButton as AriaToggleButton,
	type ToggleButtonProps as AriaToggleButtonProps,
	composeRenderProps,
} from "react-aria-components";
import type { ButtonShape, ButtonSize } from "./button";
import classes from "./button.module.css";

export type ToggleButtonPreset = "secondary" | "hextech" | "dimmed";

const button = cva({
	base: classes.button,
	variants: {
		preset: {
			secondary: classes.secondary,
			hextech: classes.hextech,
			dimmed: classes.dimmed,
		},
		shape: {
			round: classes.round,
			square: classes.square,
			normal: classes.normal,
		},
		thin: {
			true: classes.thin,
		},
		size: {
			small: classes.small,
			medium: classes.medium,
			large: classes.large,
		},
	},
});
interface ToggleButtonProps extends AriaToggleButtonProps {
	preset?: ToggleButtonPreset;
	thin?: boolean;
	shape?: ButtonShape;
	size?: ButtonSize;
}

export function ToggleButton({
	children,
	className,
	preset = "secondary",
	shape = "normal",
	size = "medium",
	thin = preset === "dimmed",
	...props
}: ToggleButtonProps) {
	return (
		<AriaToggleButton
			{...props}
			className={composeRenderProps(className, (className, values) =>
				button({
					...values,
					preset,
					shape,
					thin,
					size,
					className,
				}),
			)}
		>
			{children}
		</AriaToggleButton>
	);
}
