import { cx } from "cva";
import spinnerImage from "./spinner-spinner.png";
import classes from "./spinner.module.css";

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
