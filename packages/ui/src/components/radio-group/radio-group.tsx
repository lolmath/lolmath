import { cx } from "cva";
import {
	Radio as AriaRadio,
	RadioGroup as AriaRadioGroup,
	type RadioGroupProps as AriaRadiogroupProps,
	type RadioProps as AriaRadioProps,
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
