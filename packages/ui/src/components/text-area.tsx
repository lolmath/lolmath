import type {
  TextFieldProps as AriaTextFieldProps,
  TextAreaProps,
} from "react-aria-components";
import {
  TextField as AriaTextField,
  TextArea as AriaTextArea,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { borderClassName } from "../utilities/border";
import { resolveClassname } from "../utilities/resolve-classname";

export function TextArea({
  textAreaProps = {},
  ...props
}: AriaTextFieldProps & {
  textAreaProps?: TextAreaProps;
}) {
  return (
    <AriaTextField
      {...props}
      className={(values) =>
        twMerge(
          "flex flex-col outline-none",
          borderClassName,
          "focus-within:from-lol-gold-300 focus-within:via-lol-gold-200 focus-within:to-lol-gold-50",
          props.isDisabled &&
            "from-lol-gray-700 via-lol-gray-700 to-lol-gray-700",
          resolveClassname(props.className, values),
        )
      }
    >
      <div
        className={twMerge(
          "m-px bg-black flex flex-row focus-within:from-lol-gray-950 focus-within:to-lol-gray-900 focus-within:bg-gradient-to-b",
          props.isDisabled && "bg-lol-gray-950",
        )}
      >
        <AriaTextArea
          {...textAreaProps}
          className={(values) => {
            return twMerge(
              "bg-transparent grow py-2 px-3 text-lol-gold-50 text-xs outline-none font-spiegel tracking-wide",
              values.isDisabled && "text-lol-gray-500",
              resolveClassname(textAreaProps.className, values),
            );
          }}
        />
      </div>
    </AriaTextField>
  );
}
