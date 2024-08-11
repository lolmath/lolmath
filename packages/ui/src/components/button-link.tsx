import { type Ref, forwardRef } from "react";
import {
	Link as AriaButton,
	type LinkProps,
	composeRenderProps,
} from "react-aria-components";
import { type ButtonPreset, type ButtonShape, button } from "./button";

interface ButtonLinkProps extends LinkProps {
	preset?: ButtonPreset;
	thin?: boolean;
	shape?: ButtonShape;
}

export function _ButtonLink(
	{
		children,
		className,
		preset = "secondary",
		shape = "normal",
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
