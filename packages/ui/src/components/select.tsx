"use client";

import { ReactNode } from "react";
import type {
  ItemProps as AriaItemProps,
  SelectProps as AriaSelectProps,
} from "react-aria-components";
import {
  Text as AriaText,
  Select as AriaSelect,
  Button as AriaButton,
  Popover as AriaPopover,
  ListBox as AriaListBox,
  SelectValue as AriaSelectValue,
  Item as AriaItem,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import {
  borderClassName,
  borderDisabledClassName,
  borderHoverClassName,
  borderPressedClassName,
} from "../utilities/border";
import { outlineClassName } from "../utilities/outline";
import { resolveClassname } from "../utilities/resolve-classname";

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
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect
      {...props}
      className={(values) =>
        twMerge("font-spiegel", resolveClassname(props.className, values))
      }
    >
      {(values) => (
        <>
          <AriaButton
            className={(buttonValues) =>
              twMerge(
                "inline-block outline-none",
                borderClassName,
                buttonValues.isHovered && borderHoverClassName,
                (buttonValues.isPressed || values.isOpen) &&
                  borderPressedClassName,
                buttonValues.isDisabled && borderDisabledClassName,
                buttonValues.isFocused && "",
                buttonValues.isFocusVisible && outlineClassName,
              )
            }
          >
            <span
              className={twMerge(
                "block m-px bg-lol-gray-950 px-2 py-1 text-[#a09b8c] text-xs font-normal tracking-wide pr-6 bg-no-repeat",
              )}
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
          <AriaPopover offset={4}>
            <AriaListBox
              className={(listbox) =>
                twMerge(
                  "bg-[#010a13] border border-[#463714] outline-none",
                  listbox.isFocused && "",
                )
              }
            >
              {children as any}
            </AriaListBox>
          </AriaPopover>
        </>
      )}
    </AriaSelect>
  );
}

export function Item({ className, ...props }: AriaItemProps) {
  return (
    <AriaItem
      {...props}
      className={(values) => {
        const finalClassName =
          typeof className === "function" ? className(values) : className;

        return twMerge(
          "px-2 py-0.5 border-b border-[#1f2123] text-[#cdbe91] text-sm font-spiegel font-bold outline-none",
          values.isHovered && "bg-lol-gray-950 text-lol-gold-100",
          values.isPressed && "bg-[#1e232880] text-[#463714]",
          values.isFocusVisible && outlineClassName,
          values.isFocused && "",
          finalClassName,
        );
      }}
    />
  );
}
