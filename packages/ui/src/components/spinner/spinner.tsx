import { tv } from "../../utilities/tv.js";
import { spinnerImage } from "./images.js";

const spinner = tv({
	base: "aspect-square w-12 animate-spin",
});

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
			className={spinner({ className })}
		/>
	);
}
