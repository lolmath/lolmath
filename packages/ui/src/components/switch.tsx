import { Switch as AriaSwitch } from "react-aria-components";
import type { SwitchProps as AriaSwitchProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import {
  borderClassName,
  borderHoverClassName,
  borderPressedClassName,
  borderDisabledClassName,
} from "../utilities/border";
export function Switch({
  className,
  placeholder,
  children,
  ...props
}: AriaSwitchProps & {
  placeholder?: string;
}) {
  return (
    <AriaSwitch
      className="group inline-flex gap-2 items-center text-black font-semibold text-sm p-1"
      {...props}
    >
      {(values) => (
        <>
          <div
            className={twMerge(
              "rounded-full h-6 w-14 p-0.5 shrink-0 cursor-default",
              borderClassName,
              values.isHovered && borderHoverClassName,
              values.isPressed && borderPressedClassName,
              values.isDisabled && borderDisabledClassName,
              values.isFocused && "",
              values.isFocusVisible &&
                "outline outline-yellow-50 outline-offset-2 outline-1",
            )}
          >
            <div
              className={twMerge(
                "grid w-full h-full rounded-full transition-colors duration-200 ease-in-out bg-[#1e2328] relative",
                values.isPressed && "",
                values.isSelected && "bg-green-800",
                values.isSelected && values.isPressed && "bg-green-900",
                values.isFocused && "outline-none",
                values.isFocusVisible && "",
              )}
            >
              <span
                className={twMerge(
                  "h-8 w-8 rounded-full shadow-md ring-0 duration-200 ease-in-out -left-2 p-0.5 -top-1.5 absolute transition-[left]",
                  values.isSelected &&
                    "left-[calc(100%-1.75rem)]",
                  borderClassName,
                  values.isHovered && borderHoverClassName,
                  values.isPressed && borderPressedClassName,
                  values.isDisabled && borderDisabledClassName,
                )}
              >
                <span className="bg-[#1e2328] block w-full h-full rounded-full"></span>
              </span>
            </div>
          </div>
          {typeof children === "function" ? children(values) : children}
        </>
      )}
    </AriaSwitch>
  );
}
