import type { NumberFieldProps as AriaNumberFieldProps } from "react-aria-components";
import {
  NumberField as AriaNumberField,
  Input as AriaInput,
  Group,
  Button,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { borderGradient } from "../utilities/border";
import { ComponentProps } from "react";
import { resolveClassname } from "../utilities/resolve-classname";

export function NumberField({
  inputProps = {},
  groupProps = {},
  children,
  ...props
}: AriaNumberFieldProps & {
  inputProps?: ComponentProps<typeof AriaInput>;
  groupProps?: ComponentProps<typeof Group>;
}) {
  return (
    <AriaNumberField {...props}>
      {(values) => (
        <>
          {typeof children === "function" ? children(values) : children}
          <Group
            {...groupProps}
            className={(values) => {
              return twMerge(
                "grid grid-cols-[auto_1fr_auto] gap-px p-px outline-none",
                borderGradient,
                "focus-within:from-lol-gold-300 focus-within:via-lol-gold-200 focus-within:to-lol-gold-50",
                props.isDisabled &&
                  "from-lol-grey-700 via-lol-grey-700 to-lol-grey-700",
                resolveClassname(groupProps.className, values),
              );
            }}
          >
            <Button
              className="text-lol-grey-50 bg-black px-2.5"
              slot="decrement"
            >
              -
            </Button>
            <AriaInput
              {...inputProps}
              className={(values) => {
                return twMerge(
                  "text-lol-gold-50 font-spiegel w-full bg-black px-3 py-2 text-xs outline-none",
                  values.isDisabled && "text-lol-grey-500 bg-lol-grey-950",
                  values.isFocused &&
                    "from-lol-grey-950 to-lol-grey-900 bg-gradient-to-b",
                  resolveClassname(inputProps.className, values),
                );
              }}
            />
            <Button
              className="text-lol-grey-50 bg-black px-2.5"
              slot="increment"
            >
              +
            </Button>
          </Group>
        </>
      )}
    </AriaNumberField>
  );
}
