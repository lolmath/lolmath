import { cva } from "cva";
import type { ComponentProps } from "react";
import type { NumberFieldProps as AriaNumberFieldProps } from "react-aria-components";
import {
	Input as AriaInput,
	NumberField as AriaNumberField,
	Button,
	Group,
	composeRenderProps,
} from "react-aria-components";
import classes from "./number-field.module.css";

type NumberFieldPreset = "normal" | "dimmed";

const numberFieldGroup = cva({
	base: classes.group,
	variants: {
		preset: {
			normal: classes.normal,
			dimmed: classes.dimmed,
		},
		isDisabled: {
			true: classes.disabled,
		},
		isFocusWithin: {
			true: classes.focusWithin,
		},
		size: {
			small: classes.small,
			medium: classes.medium,
			large: classes.large,
		},
	},
});

const numberFieldInput = cva({
	base: classes.input,
	variants: {
		isDisabled: {
			true: classes.disabled,
		},
		isFocused: {
			true: classes.focus,
		},
	},
});

const numberFieldButton = cva({
	base: classes.button,
	variants: {
		isDisabled: {
			true: classes.disabled,
		},
	},
});

export function NumberField({
	inputProps = {},
	groupProps = {},
	children,
	preset = "normal",
	size = "medium",
	...props
}: AriaNumberFieldProps & {
	inputProps?: ComponentProps<typeof AriaInput>;
	groupProps?: ComponentProps<typeof Group>;
	preset?: NumberFieldPreset;
	size?: "small" | "medium" | "large";
}) {
	return (
		<AriaNumberField {...props}>
			{(values) => (
				<>
					{typeof children === "function" ? children(values) : children}
					<Group
						{...groupProps}
						className={composeRenderProps(
							groupProps.className,
							(className, values) =>
								numberFieldGroup({
									className,
									preset,
									size,
									...values,
								}),
						)}
					>
						<Button
							className={(values) => numberFieldButton(values)}
							slot="decrement"
						>
							-
						</Button>
						<AriaInput
							{...inputProps}
							className={composeRenderProps(
								inputProps.className,
								(className, values) =>
									numberFieldInput({
										className,
										...values,
									}),
							)}
						/>
						<Button
							className={(values) => numberFieldButton(values)}
							slot="increment"
						>
							+
						</Button>
					</Group>
				</>
			)}
		</AriaNumberField>
	);
}
