import { cx } from "cva";
import type {
	RadioGroupProps as AriaRadiogroupProps,
	RadioButtonProps,
	RadioFieldProps,
} from "react-aria-components";
import {
	RadioButton as AriaRadioButton,
	RadioField as AriaRadioField,
	RadioGroup as AriaRadioGroup,
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

export function RadioButton({ className, ...props }: RadioButtonProps) {
	return (
		<AriaRadioButton
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.radio, className),
			)}
		/>
	);
}

export function RadioField({ className, ...props }: RadioFieldProps) {
	return <AriaRadioField {...props} className={className} />;
}

export function Radio({
	children,
	className,
	...props
}: Omit<RadioFieldProps, "children" | "className"> &
	Pick<RadioButtonProps, "children" | "className">) {
	return (
		<AriaRadioField {...props}>
			<AriaRadioButton
				className={composeRenderProps(className, (className) =>
					cx(classes.radio, className),
				)}
			>
				{children}
			</AriaRadioButton>
		</AriaRadioField>
	);
}
