import { cva, cx } from "cva";
import {
	Radio as AriaRadio,
	RadioGroup as AriaRadioGroup,
	type RadioProps as AriaRadioProps,
	type RadioGroupProps as AriaRadiogroupProps,
} from "react-aria-components";
import { resolveClassName } from "../../utilities/resolve-class-name.js";
import classes from "./radio-group.module.css";

export function RadioGroup({ className, ...props }: AriaRadiogroupProps) {
	return (
		<AriaRadioGroup
			{...props}
			className={(values) => {
				return cx(classes.radioGroup, resolveClassName(className, values));
			}}
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
			className={(values) =>
				radio({
					...values,
					className: resolveClassName(className, values),
				})
			}
		/>
	);
}
