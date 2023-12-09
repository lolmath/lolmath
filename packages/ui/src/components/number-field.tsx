import type { NumberFieldProps as AriaNumberFieldProps } from "react-aria-components";
import {
  NumberField as AriaNumberField,
  Input as AriaInput,
  Group,
  Button,
} from "react-aria-components";
import {
  goldGradient,
  goldGradientDisabled,
  goldGradientHover,
  dimmedGradient,
} from "../utilities/gradient";
import { ComponentProps } from "react";
import { resolveClassName } from "../utilities/resolve-class-name";
import { tv } from "tailwind-variants";

type NumberFieldPreset = "normal" | "dimmed";

const numberFieldBorder = tv({
  base: "grid grid-cols-[auto_1fr_auto] gap-px bg-gradient-to-t p-px outline-none",
  variants: {
    preset: {
      normal: goldGradient,
      dimmed: dimmedGradient,
    },
    isDisabled: {
      true: goldGradientDisabled,
    },
    isFocusWithin: {
      true: goldGradientHover,
    },
  },
});

const numberFieldInput = tv({
  base: [
    "text-lol-gold-100 font-spiegel bg-lol-grey-hextech-black w-full px-3 py-2 text-xs outline-none",
  ],
  variants: {
    isDisabled: {
      true: "text-lol-grey-150 bg-lol-grey-300",
    },
    isFocused: {
      true: "from-lol-grey-200 via-lol-grey-300 to-lol-grey-300 bg-gradient-to-t",
    },
  },
});

const numberFieldButton = tv({
  base: ["text-lol-gold-100 bg-lol-grey-hextech-black px-2.5"],
  variants: {
    isDisabled: {
      true: "text-lol-grey-150 bg-lol-grey-300",
    },
  },
});

export function NumberField({
  inputProps = {},
  groupProps = {},
  children,
  preset = "normal",
  ...props
}: AriaNumberFieldProps & {
  inputProps?: ComponentProps<typeof AriaInput>;
  groupProps?: ComponentProps<typeof Group>;
  preset?: NumberFieldPreset;
}) {
  return (
    <AriaNumberField {...props}>
      {(values) => (
        <>
          {typeof children === "function" ? children(values) : children}
          <Group
            {...groupProps}
            className={(values) => {
              return numberFieldBorder({
                className: resolveClassName(groupProps.className, values),
                preset,
                ...values,
              });
            }}
          >
            <Button
              className={(values) => numberFieldButton(values)}
              slot="decrement"
            >
              -
            </Button>
            <AriaInput
              {...inputProps}
              className={(values) => {
                return numberFieldInput({
                  className: resolveClassName(inputProps.className, values),
                  ...values,
                });
              }}
            />
            <Button
              className={(values) => numberFieldButton(values)}
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
