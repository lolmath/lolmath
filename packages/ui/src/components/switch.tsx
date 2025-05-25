import { cx } from "cva";
import {
	Switch as AriaSwitch,
	composeRenderProps,
} from "react-aria-components";
import type { SwitchProps as AriaSwitchProps } from "react-aria-components";
import classes from "./switch.module.css";
import textClasses from "./typography/text.module.css";

export function Switch({
	className,
	placeholder,
	children,
	...props
}: AriaSwitchProps & {
	placeholder?: string;
}) {
	return (
		<AriaSwitch
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
		</AriaSwitch>
	);
}
