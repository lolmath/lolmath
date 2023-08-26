import type { NumberFieldProps as AriaNumberFieldProps } from "react-aria-components";
import {
  NumberField as AriaNumberField,
  Input as AriaInput,
  Group,
  Button,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { borderClassName } from "../utilities/border";
import { ComponentProps } from "react";
import { resolveClassname } from "../utilities/resolve-classname";

export function NumberField({
  inputProps = {},
  groupProps = {},
  ...props
}: AriaNumberFieldProps & {
  inputProps?: ComponentProps<typeof AriaInput>;
  groupProps: ComponentProps<typeof Group>;
}) {
  return (
    <AriaNumberField {...props}>
      <Group
        {...groupProps}
        className={(values) => {
          const finalClassName = resolveClassname(groupProps.className, values);
          return twMerge(
            "grid grid-cols-[auto_1fr_auto] outline-none gap-px p-px",
            borderClassName,
            "focus-within:from-lol-gold-300 focus-within:via-lol-gold-200 focus-within:to-lol-gold-50",
            props.isDisabled &&
              "from-lol-gray-700 via-lol-gray-700 to-lol-gray-700",
            finalClassName,
          );
        }}
      >
        <Button className="text-lol-gray-50 px-2.5 bg-black" slot="decrement">
          -
        </Button>
        <AriaInput
          {...inputProps}
          className={(values) => {
            const finalClassName = resolveClassname(
              inputProps.className,
              values,
            );

            return twMerge(
              "bg-black w-full py-2 px-3 text-lol-gold-50 text-xs outline-none font-spiegel",
              values.isDisabled && "text-lol-gray-500 bg-lol-gray-950",
              values.isFocused &&
                "from-lol-gray-950 to-lol-gray-900 bg-gradient-to-b",
              finalClassName,
            );
          }}
        />
        <Button className="text-lol-gray-50 px-2.5 bg-black" slot="increment">
          +
        </Button>
      </Group>
    </AriaNumberField>
  );
}
