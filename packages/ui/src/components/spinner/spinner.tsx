import { tv } from "../..";
import { spinnerImage } from "./images";

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
