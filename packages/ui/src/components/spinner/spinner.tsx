import { cx } from "cva";
import classes from "./spinner.module.css";
import spinnerImage from "./spinner.png";

interface SpinnerProps {
	className?: string;
}
export function Spinner({ className }: SpinnerProps) {
	return (
		<img
			role="status"
			aria-live="polite"
			aria-label="loading"
			src={spinnerImage}
			className={cx(classes.spinner, className)}
		/>
	);
}
