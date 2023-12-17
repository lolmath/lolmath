import type {
  TextFieldProps as AriaTextFieldProps,
  InputProps,
} from "react-aria-components";
import {
  TextField as AriaTextField,
  Input as AriaInput,
} from "react-aria-components";
import { goldGradient, disabledGradient } from "../utilities/gradient.js";
import { resolveClassName } from "../utilities/resolve-class-name.js";
import { ComponentProps } from "react";
import { tv } from "../utilities/tv.js";

const textFieldBorder = tv({
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

const textField = tv({
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
            className={textFieldBorder({
              ...values,
              className: resolveClassName(borderProps?.className, values),
            })}
          >
            <AriaInput
              type="text"
              {...inputProps}
              className={(values) =>
                textField({
                  ...values,
                  className: resolveClassName(inputProps?.className, values),
                })
              }
            />
          </div>
        </>
      )}
    </AriaTextField>
  );
}
