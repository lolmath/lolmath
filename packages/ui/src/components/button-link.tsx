import { forwardRef, type Ref } from "react";
import {
	Link as AriaButton,
	composeRenderProps,
	type LinkProps,
} from "react-aria-components";
import {
	type ButtonPreset,
	type ButtonShape,
	type ButtonSize,
	button,
} from "./button";

interface ButtonLinkProps extends LinkProps {
	preset?: ButtonPreset;
	thin?: boolean;
	shape?: ButtonShape;
	size?: ButtonSize;
}

export function _ButtonLink(
	{
		children,
		className,
		preset = "secondary",
		shape = "normal",
		size = "medium",
		thin = preset === "dimmed",
		...props
	}: ButtonLinkProps,
	ref: Ref<HTMLAnchorElement>,
) {
	return (
		<AriaButton
			ref={ref}
			{...props}
			className={composeRenderProps(className, (className, values) =>
				button({
					className,
					preset,
					shape,
					size,
					thin,
					...values,
				}),
			)}
		>
			{children}
		</AriaButton>
	);
}

export const ButtonLink = forwardRef(_ButtonLink);
ButtonLink.displayName = "ButtonLink";
