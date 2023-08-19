import type { TextFieldProps as AriaTextFieldProps } from "react-aria-components";
import {
  TextField as AriaTextField,
  Input as AriaInput,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { borderClassName } from "../utilities/border";
import { ComponentProps } from "react";

export function TextField({
  inputProps = {},
  ...props
}: AriaTextFieldProps & {
  inputProps?: ComponentProps<typeof AriaInput>;
}) {
  return (
    <AriaTextField
      className={(values) => {
        const finalClassName =
          typeof props.className === "function"
            ? props.className(values)
            : props.className;

        return twMerge(
          "flex flex-col outline-none [webkit-search-cancel-button]:hidden",
          borderClassName,
          "focus-within:from-lol-gold-300 focus-within:via-lol-gold-200 focus-within:to-lol-gold-50",
          props.isDisabled &&
            "from-lol-gray-700 via-lol-gray-700 to-lol-gray-700",
          finalClassName,
        );
      }}
      {...props}
    >
      <div
        className={twMerge(
          "m-px bg-black flex flex-row focus-within:from-lol-gray-950 focus-within:to-lol-gray-900 focus-within:bg-gradient-to-b",
          props.isDisabled && "text-[#5c5b57] bg-lol-gray-950",
        )}
      >
        <AriaInput
          {...inputProps}
          className={(values) => {
            const finalClassName =
              typeof inputProps.className === "function"
                ? inputProps.className(values)
                : inputProps.className;

            return twMerge(
              "bg-transparent grow py-2 px-3 text-lol-gold-50 text-xs outline-none font-spiegel tracking-wide",
              finalClassName,
            );
          }}
          type="text"
        />
      </div>
    </AriaTextField>
  );
}
