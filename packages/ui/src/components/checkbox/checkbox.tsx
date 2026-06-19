import { cx } from "cva";
import type {
	CheckboxButtonProps,
	CheckboxFieldProps,
} from "react-aria-components";
import {
	CheckboxButton as AriaCheckboxButton,
	CheckboxField as AriaCheckboxField,
	composeRenderProps,
} from "react-aria-components";
import classes from "./checkbox.module.css";
import imageChecked from "./checkbox-checked.png";
import imageCheckedHover from "./checkbox-checked-hover.png";
import imageIndeterminate from "./checkbox-indeterminate.png";
import imageIndeterminateHover from "./checkbox-indeterminate-hover.png";
import imageUnchecked from "./checkbox-unchecked.png";
import imageUncheckedHover from "./checkbox-unchecked-hover.png";

function checkboxIcon(values: {
	isHovered: boolean;
	isIndeterminate: boolean;
	isSelected: boolean;
}) {
	return values.isHovered
		? values.isIndeterminate
			? imageIndeterminateHover
			: values.isSelected
				? imageCheckedHover
				: imageUncheckedHover
		: values.isIndeterminate
			? imageIndeterminate
			: values.isSelected
				? imageChecked
				: imageUnchecked;
}

export function CheckboxButton({
	children,
	className,
	...props
}: CheckboxButtonProps) {
	return (
		<AriaCheckboxButton
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.checkbox, className),
			)}
		>
			{composeRenderProps(children, (children, values) => (
				<>
					<img
						className={classes.icon}
						aria-hidden="true"
						alt=""
						src={checkboxIcon(values)}
					/>
					{children}
				</>
			))}
		</AriaCheckboxButton>
	);
}

export function CheckboxField({ className, ...props }: CheckboxFieldProps) {
	return <AriaCheckboxField {...props} className={className} />;
}

export function Checkbox({
	children,
	className,
	...props
}: Omit<CheckboxFieldProps, "children" | "className"> &
	Pick<CheckboxButtonProps, "children" | "className">) {
	return (
		<CheckboxField {...props}>
			<CheckboxButton className={className}>{children}</CheckboxButton>
		</CheckboxField>
	);
}
