"use client";

import { ReactNode } from "react";
import type {
  ListBoxItemProps,
  SelectProps as AriaSelectProps,
} from "react-aria-components";
import {
  Text as AriaText,
  Select as AriaSelect,
  Button as AriaButton,
  Popover as AriaPopover,
  ListBox as AriaListBox,
  SelectValue as AriaSelectValue,
  ListBoxItem,
} from "react-aria-components";
import {
  goldGradient,
  disabledGradient,
  goldGradientHover,
  goldGradientPressed,
} from "../utilities/gradient";
import { outlineClassName } from "../utilities/outline";
import { resolveClassName } from "../utilities/resolve-class-name";
import { tv } from "../utilities/tv";

const select = tv({
  base: "font-spiegel",
});

const selectButtonBorder = tv({
  base: ["inline-block w-[200px] bg-gradient-to-t outline-none", goldGradient],
  variants: {
    isHovered: { true: goldGradientHover },
    isPressed: { true: goldGradientPressed },
    isOpen: { true: goldGradientPressed },
    isDisabled: { true: disabledGradient },
    isFocused: { true: "" },
    isFocusVisible: { true: outlineClassName },
  },
});

const selectButton = tv({
  base: "bg-lol-grey-hextech-black text-lol-grey-100 m-px block bg-no-repeat px-2 py-1.5 pr-6 text-left text-xs font-normal tracking-wide",
  variants: {
    isHovered: { true: "text-lol-gold-100" },
    isOpen: { true: "text-lol-gold-600 bg-lol-grey-300" },
  },
});

const listBox = tv({
  base: "bg-lol-grey-hextech-black border-lol-gold-600 border outline-none",
  variants: {
    isFocused: { true: "" },
  },
});

interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, "children"> {
  label?: string;
  description?: string;
  errorMessage?: string;
  children?: ReactNode | ((item: T) => ReactNode);
}

export function Select<T extends object>({
  description,
  errorMessage,
  children,
  className,
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect
      {...props}
      className={(values) =>
        select({
          ...values,
          className: resolveClassName(className, values),
        })
      }
    >
      {(values) => (
        <>
          <AriaButton
            className={(buttonValues) =>
              selectButtonBorder({ ...buttonValues, isOpen: values.isOpen })
            }
          >
            <span
              className={selectButton(values)}
              style={{
                backgroundPosition: "right 0.5rem center",
                backgroundImage: values.isOpen
                  ? "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAASCAYAAACAa1QyAAAA90lEQVR42mL8//8/A6mAiYEMwILVJG4RNiAlDcQgZzz79/XNL2R5RnTnATWwAyn5BEfBaqDUv4UH3rcD+Q+QNaJoAmrgAFJyiY6CdWL8LNEgsRcf/ixA14juJ6kkJ8FGkIbn7//MB2pYKCHAkhDvIFgJksPlJ0ZGRgbmp+9+z1py6EMvSACoASyO009A53FCTfwNCgCoS2A2wAOEcWDiCcl5v6DOY8bmPBYsodf28/f/90sPf+iDBgQo5BiAwd4ICnZcKeKfjDBrepy9IAsoJEFBDgp6fKGHLXIXAm1pQ45cfMmoBpqM2vAmIzSNUkQnWJrFE0CAAQCQxYvehN8YFAAAAABJRU5ErkJggg==')"
                  : "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAASCAYAAACAa1QyAAAAiUlEQVR42mL8//8/A6mAiYEMQJYmFnSBk6vzYcwmIP4LxI0gjnnoRNyaoKAViKuQ+I14bQKCTiAuA+I6IGYG4gZ0jSw4nFwB1QwDjIRsKkbjNwxckFNNUw8QlyLx66EYb0D8A+IuIGaDyjcQE0+gOPoDxC1I8dNASBMDNDX8hWKMIGcc3FkDIMAA1n8bpHnZDOAAAAAASUVORK5CYII=')",
              }}
            >
              <AriaSelectValue />
            </span>
          </AriaButton>
          {description && <AriaText slot="description">{description}</AriaText>}
          {errorMessage && (
            <AriaText slot="errorMessage">{errorMessage}</AriaText>
          )}
          <AriaPopover offset={4} className="w-[--trigger-width]">
            <AriaListBox className={() => listBox()}>{children}</AriaListBox>
          </AriaPopover>
        </>
      )}
    </AriaSelect>
  );
}

const item = tv({
  base: "font-spiegel border-lol-grey-300 text-lol-gold-300 text-lol-sm border-b px-2 py-1.5 text-sm outline-none",
  variants: {
    isHovered: { true: "bg-lol-grey-300 text-lol-gold-100" },
    isFocusVisible: { true: outlineClassName },
    isFocused: { true: "" },
    isSelected: { true: "" },
    isPressed: { true: "text-lol-gold-600 bg-lol-grey-300/50" },
  },
});

export function Item({ className, ...props }: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={(values) => {
        return item({
          ...values,
          className: resolveClassName(className, values),
        });
      }}
    />
  );
}
