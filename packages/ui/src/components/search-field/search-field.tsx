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
		size: {
			small: classes.small,
			medium: classes.medium,
			large: classes.large,
		},
	},
});

export function SearchField({
	inputProps = {},
	borderProps = {},
	children,
	className,
	size = "medium",
	...props
}: AriaSearchFieldProps & {
	inputProps?: ComponentProps<typeof AriaInput>;
	borderProps?: ComponentProps<"div">;
	size?: "small" | "medium" | "large";
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
									size,
									...values,
								}),
						)}
						type="text"
					/>
					<AriaButton className={classes.button}>✕</AriaButton>
				</>
			)}
		</AriaSearchField>
	);
}
