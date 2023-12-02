import type {
  TextFieldProps as AriaTextFieldProps,
  InputProps,
} from "react-aria-components";
import {
  TextField as AriaTextField,
  Input as AriaInput,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { borderGradient } from "../utilities/border";
import { resolveClassname } from "../utilities/resolve-classname";
import { ComponentProps } from "react";

export function TextField({
  inputProps = {},
  borderProps = {},
  children,
  ...props
}: AriaTextFieldProps & {
  inputProps?: InputProps;
  borderProps?: ComponentProps<"div">;
}) {
  return (
    <AriaTextField {...props}>
      {(values) => (
        <>
          {typeof children === "function" ? children(values) : children}
          <div
            {...borderProps}
            className={twMerge(
              "p-px outline-none",
              borderGradient,
              "focus-within:from-lol-gold-300 focus-within:via-lol-gold-200 focus-within:to-lol-gold-50",
              values.isDisabled &&
                "from-lol-grey-700 via-lol-grey-700 to-lol-grey-700",
              resolveClassname(borderProps?.className, values),
              values.isDisabled && "bg-lol-grey-950",
            )}
          >
            <AriaInput
              type="text"
              {...inputProps}
              className={(values) => {
                return twMerge(
                  "min-h-full w-full bg-black px-3 py-2 outline-none",
                  "text-lol-gold-50 font-spiegel text-xs tracking-wide",
                  "focus-within:from-lol-grey-950 focus-within:to-lol-grey-900 focus-within:bg-gradient-to-b",
                  values.isDisabled && "text-lol-grey-500",
                  resolveClassname(inputProps.className, values),
                );
              }}
            />
          </div>
        </>
      )}
    </AriaTextField>
  );
}
