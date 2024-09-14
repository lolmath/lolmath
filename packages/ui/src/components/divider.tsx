import { cva, cx } from "cva";
import classes from "./divider.module.css";

const divider = cva({
	base: classes.divider,
	variants: {
		preset: {
			left: classes.left,
			center: classes.center,
			right: classes.right,
		},
	},
});

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
	preset?: "left" | "center" | "right";
	hrProps?: React.HTMLAttributes<HTMLHRElement>;
}
export function Divider({
	preset = "center",
	hrProps: { className: hrClassName, ...hrProps } = {},
	className,
	...rest
}: DividerProps) {
	return (
		<div className={cx(classes.wrapper, className)} {...rest}>
			{preset === "right" && <div className={classes.block} />}
			<hr
				{...hrProps}
				className={divider({ preset, className: hrClassName })}
			/>
			{preset === "left" && <div className={classes.block} />}
		</div>
	);
}
