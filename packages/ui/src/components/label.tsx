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
        "font-spiegel text-lol-grey-300 mb-1 text-xs font-normal tracking-wide",
        props.className,
      )}
    />
  );
}
