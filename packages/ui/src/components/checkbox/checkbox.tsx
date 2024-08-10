import { cva } from "cva";
import {
	Checkbox as AriaCheckbox,
	type CheckboxProps,
} from "react-aria-components";
import { resolveClassName } from "../../utilities/resolve-class-name";
import classes from "./checkbox.module.css";
import imageCheckedHover from "./checked-hover.png";
import imageChecked from "./checked.png";
import imageIndeterminateHover from "./indeterminate-hover.png";
import imageIndeterminate from "./indeterminate.png";
import imageUncheckedHover from "./unchecked-hover.png";
import imageUnchecked from "./unchecked.png";

const checkbox = cva({
	base: classes.checkbox,
	variants: {
		isHovered: {
			true: classes.hover,
		},
		isDisabled: {
			true: classes.disabled,
		},
	},
});

export function Checkbox({ children, className, ...props }: CheckboxProps) {
	return (
		<AriaCheckbox
			className={(values) => {
				return checkbox({
					className: resolveClassName(className, values),
					...values,
				});
			}}
			{...props}
		>
			{(values) => (
				<>
					<img
						className="h-3.5 w-3.5"
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
					{typeof children === "function" ? children(values) : children}
				</>
			)}
		</AriaCheckbox>
	);
}
