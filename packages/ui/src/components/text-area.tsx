import type {
  TextFieldProps as AriaTextFieldProps,
  TextAreaProps,
} from "react-aria-components";
import {
  TextField as AriaTextField,
  TextArea as AriaTextArea,
} from "react-aria-components";
import { goldGradient, disabledGradient } from "../utilities/gradient.js";
import { resolveClassName } from "../utilities/resolve-class-name.js";
import { ComponentProps } from "react";
import { tv } from "../utilities/tv.js";

const textAreaBorder = tv({
  base: [
    "flex bg-gradient-to-t p-px outline-none",
    goldGradient,
    "focus-within:from-lol-gold-400 focus-within:via-lol-gold-200 focus-within:to-lol-gold-100",
  ],
  variants: {
    isDisabled: {
      true: [disabledGradient],
    },
  },
});

const textArea = tv({
  base: [
    "bg-lol-grey-hextech-black min-h-full w-full px-3 py-2 outline-none",
    "text-lol-gold-100 font-spiegel text-xs tracking-wide",
    "focus-within:from-lol-grey-200 focus-within:via-lol-grey-300 focus-within:to-lol-grey-300 focus-within:bg-gradient-to-t",
  ],
  variants: {
    isDisabled: {
      true: ["text-lol-grey-150"],
    },
  },
});

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
            className={textAreaBorder({
              ...values,
              className: resolveClassName(borderProps?.className, values),
            })}
          >
            <AriaTextArea
              {...textAreaProps}
              className={(values) =>
                textArea({
                  ...values,
                  className: resolveClassName(textAreaProps?.className, values),
                })
              }
            />
          </div>
        </>
      )}
    </AriaTextField>
  );
}
