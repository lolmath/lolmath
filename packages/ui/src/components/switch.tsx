import { cx } from "cva";
import type {
	SwitchButtonProps,
	SwitchFieldProps,
} from "react-aria-components";
import {
	SwitchButton as AriaSwitchButton,
	SwitchField as AriaSwitchField,
	composeRenderProps,
} from "react-aria-components";
import classes from "./switch.module.css";
import textClasses from "./typography/text.module.css";

export function SwitchButton({
	className,
	children,
	...props
}: SwitchButtonProps) {
	return (
		<AriaSwitchButton
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(
					classes.switch,
					textClasses.label,
					textClasses.text,
					textClasses.grey100,
					className,
				),
			)}
		>
			{(values) => (
				<>
					<div className={classes.track}>
						<span className={classes.knob} />
					</div>
					{typeof children === "function" ? children(values) : children}
				</>
			)}
		</AriaSwitchButton>
	);
}

export function SwitchField({ className, ...props }: SwitchFieldProps) {
	return <AriaSwitchField {...props} className={className} />;
}

export function Switch({
	children,
	className,
	...props
}: Omit<SwitchFieldProps, "children" | "className"> &
	Pick<SwitchButtonProps, "children" | "className">) {
	return (
		<SwitchField {...props}>
			<SwitchButton className={className}>{children}</SwitchButton>
		</SwitchField>
	);
}
