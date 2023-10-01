import type {
  TextFieldProps as AriaTextFieldProps,
  TextAreaProps,
} from "react-aria-components";
import {
  TextField as AriaTextField,
  TextArea as AriaTextArea,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { borderGradient } from "../utilities/border";
import { resolveClassname } from "../utilities/resolve-classname";
import { ComponentProps } from "react";

export function TextArea({
  textAreaProps = {},
  borderProps = {},
  children,
  ...props
}: AriaTextFieldProps & {
  textAreaProps?: TextAreaProps;
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
              "outline-none p-px flex",
              borderGradient,
              "focus-within:from-lol-gold-300 focus-within:via-lol-gold-200 focus-within:to-lol-gold-50",
              values.isDisabled &&
                "from-lol-gray-700 via-lol-gray-700 to-lol-gray-700",
              resolveClassname(borderProps?.className, values),
              values.isDisabled && "bg-lol-gray-950",
            )}
          >
            <AriaTextArea
              {...textAreaProps}
              className={(values) => {
                return twMerge(
                  "bg-black w-full min-h-full py-2 px-3 outline-none",
                  "text-lol-gold-50 text-xs font-spiegel tracking-wide",
                  "focus-within:from-lol-gray-950 focus-within:to-lol-gray-900 focus-within:bg-gradient-to-b",
                  values.isDisabled && "text-lol-gray-500",
                  resolveClassname(textAreaProps.className, values),
                );
              }}
            />
          </div>
        </>
      )}
    </AriaTextField>
  );
}
