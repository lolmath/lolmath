import { cva, cx } from "cva";
import type { ComponentProps } from "react";
import {
	Button as AriaButton,
	Input as AriaInput,
	SearchField as AriaSearchField,
	type SearchFieldProps as AriaSearchFieldProps,
	composeRenderProps,
} from "react-aria-components";
import classes from "./search-field.module.css";

const searchFieldInput = cva({
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

const searchFieldButton = cva({
	base: classes.button,
	variants: {
		isHovered: { true: classes.hover },
		isPressed: { true: classes.press },
		isDisabled: { true: classes.disabled },
		isEmpty: { true: classes.empty },
	},
});

export function SearchField({
	inputProps = {},
	borderProps = {},
	children,
	className,
	...props
}: AriaSearchFieldProps & {
	inputProps?: ComponentProps<typeof AriaInput>;
	borderProps?: ComponentProps<"div">;
}) {
	return (
		<AriaSearchField {...props} className={cx(classes.searchField, className)}>
			{(values) => (
				<>
					{typeof children === "function" ? children(values) : children}
					<AriaInput
						{...inputProps}
						className={composeRenderProps(
							inputProps.className,
							(className, values) =>
								searchFieldInput({
									className,
									...values,
								}),
						)}
						type="text"
					/>
					<AriaButton
						className={(buttonValues) =>
							searchFieldButton({
								...buttonValues,
								isDisabled: values.isDisabled,
								isEmpty: values.isEmpty,
							})
						}
					>
						✕
					</AriaButton>
				</>
			)}
		</AriaSearchField>
	);
}
