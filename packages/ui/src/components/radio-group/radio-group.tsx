import { cx } from "cva";
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

export function Radio({ className, ...props }: AriaRadioProps) {
	return (
		<AriaRadio
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.radio, className),
			)}
		/>
	);
}
