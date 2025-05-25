import { cx } from "cva";
import {
	Checkbox as AriaCheckbox,
	type CheckboxProps,
	composeRenderProps,
} from "react-aria-components";
import imageCheckedHover from "./checkbox-checked-hover.png";
import imageChecked from "./checkbox-checked.png";
import imageIndeterminateHover from "./checkbox-indeterminate-hover.png";
import imageIndeterminate from "./checkbox-indeterminate.png";
import imageUncheckedHover from "./checkbox-unchecked-hover.png";
import imageUnchecked from "./checkbox-unchecked.png";
import classes from "./checkbox.module.css";

export function Checkbox({ children, className, ...props }: CheckboxProps) {
	return (
		<AriaCheckbox
			className={composeRenderProps(className, (className) =>
				cx(classes.checkbox, className),
			)}
			{...props}
		>
			{composeRenderProps(children, (children, values) => (
				<>
					<img
						className={classes.icon}
						aria-hidden="true"
						alt=""
						src={
							values.isHovered
								? values.isIndeterminate
									? imageIndeterminateHover
									: values.isSelected
										? imageCheckedHover
										: imageUncheckedHover
								: values.isIndeterminate
									? imageIndeterminate
									: values.isSelected
										? imageChecked
										: imageUnchecked
						}
					/>
					{children}
				</>
			))}
		</AriaCheckbox>
	);
}
