import { cva, cx } from "cva";
import {
	Radio as AriaRadio,
	RadioGroup as AriaRadioGroup,
	type RadioProps as AriaRadioProps,
	type RadioGroupProps as AriaRadiogroupProps,
	composeRenderProps,
} from "react-aria-components";
import classes from "./radio-group.module.css";

export function RadioGroup({ className, ...props }: AriaRadiogroupProps) {
	return (
		<AriaRadioGroup
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.radioGroup, className),
			)}
		/>
	);
}

const radio = cva({
	base: classes.radio,
	variants: {
		isDisabled: { true: classes.disabled },
		isHovered: { true: classes.hovered },
		isSelected: { true: classes.selected },
		isPressed: { true: classes.pressed },
	},
});
export function Radio({ className, ...props }: AriaRadioProps) {
	return (
		<AriaRadio
			{...props}
			className={composeRenderProps(className, (className, values) =>
				radio({
					className,
					...values,
				}),
			)}
		/>
	);
}
