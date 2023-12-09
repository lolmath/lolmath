import type {
  TextFieldProps as AriaTextFieldProps,
  TextAreaProps,
} from "react-aria-components";
import {
  TextField as AriaTextField,
  TextArea as AriaTextArea,
} from "react-aria-components";
import { goldGradient, goldGradientDisabled } from "../utilities/gradient";
import { resolveClassName } from "../utilities/resolve-class-name";
import { ComponentProps } from "react";
import { tv } from "../utilities/tv";

const textAreaBorder = tv({
  base: [
    "flex bg-gradient-to-t p-px outline-none",
    goldGradient,
    "focus-within:from-lol-gold-400 focus-within:via-lol-gold-200 focus-within:to-lol-gold-100",
  ],
  variants: {
    isDisabled: {
      true: [goldGradientDisabled],
    },
  },
});

const textArea = tv({
  base: [
    "min-h-full w-full bg-lol-grey-hextech-black px-3 py-2 outline-none",
    "text-lol-gold-100 font-spiegel text-xs tracking-wide",
    "focus-within:from-lol-grey-200 focus-within:via-lol-grey-300 focus-within:to-lol-grey-300 focus-within:bg-gradient-to-t",
  ],
  variants: {
    isDisabled: {
      true: ["text-lol-grey-500"],
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
              className={(values) => {
                return textArea({
                  ...values,
                  className: resolveClassName(textAreaProps?.className, values),
                });
              }}
            />
          </div>
        </>
      )}
    </AriaTextField>
  );
}
