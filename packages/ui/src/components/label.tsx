import {
  type LabelProps as AriaLabelProps,
  Label as AriaLabel,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export function Label({ ...props }: AriaLabelProps) {
  return (
    <AriaLabel
      {...props}
      className={twMerge(
        "font-spiegel text-xs text-lol-gray-400 font-normal tracking-wide mb-1",
        props.className,
      )}
    />
  );
}
