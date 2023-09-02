import { twMerge } from "tailwind-merge";
import { spinner } from "./images";

interface SpinnerProps {
  className?: string;
}
export function Spinner({ className }: SpinnerProps) {
  return (
    <img
      role="status"
      aria-live="polite"
      aria-label="loading"
      src={spinner}
      className={twMerge("animate-spin aspect-square w-12", className)}
    />
  );
}
