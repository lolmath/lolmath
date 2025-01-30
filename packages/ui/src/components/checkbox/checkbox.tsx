import { cx } from "cva";
import {
	Checkbox as AriaCheckbox,
	type CheckboxProps,
	composeRenderProps,
} from "react-aria-components";
import classes from "./checkbox.module.css";
import imageCheckedHover from "./checked-hover.png";
import imageChecked from "./checked.png";
import imageIndeterminateHover from "./indeterminate-hover.png";
import imageIndeterminate from "./indeterminate.png";
import imageUncheckedHover from "./unchecked-hover.png";
import imageUnchecked from "./unchecked.png";

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
