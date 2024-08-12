import { cva, cx } from "cva";
import {
	Switch as AriaSwitch,
	composeRenderProps,
} from "react-aria-components";
import type { SwitchProps as AriaSwitchProps } from "react-aria-components";
import classes from "./switch.module.css";
import textClasses from "./typography/text.module.css";

const track = cva({
	base: classes.track,
	variants: {
		isHovered: {
			true: classes.hover,
		},
		isPressed: {
			true: classes.press,
		},
		isDisabled: {
			true: classes.disabled,
		},
		isSelected: {
			true: classes.selected,
		},
	},
});

const knob = cva({
	base: classes.knob,
	variants: {
		isSelected: {
			true: classes.selected,
		},
		isHovered: {
			true: classes.hover,
		},
		isPressed: {
			true: classes.press,
		},
		isDisabled: {
			true: classes.disabled,
		},
	},
});

export function Switch({
	className,
	placeholder,
	children,
	...props
}: AriaSwitchProps & {
	placeholder?: string;
}) {
	return (
		<AriaSwitch
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(
					classes.switch,
					textClasses.label,
					textClasses.text,
					textClasses.grey100,
					className,
				),
			)}
		>
			{(values) => (
				<>
					<div className={track(values)}>
						<span className={knob(values)} />
					</div>
					{typeof children === "function" ? children(values) : children}
				</>
			)}
		</AriaSwitch>
	);
}
