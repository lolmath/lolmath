import { Switch as AriaSwitch } from "react-aria-components";
import type { SwitchProps as AriaSwitchProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import {
  goldGradient,
  goldGradientHover,
  goldGradientPressed,
  goldGradientDisabled,
  hextechGradient,
  hextechGradientPressed,
} from "../utilities/gradient";
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
      {...props}
      className="group inline-flex items-center gap-2 p-1 px-1.5 text-sm font-semibold text-black"
    >
      {(values) => (
        <>
          <div
            className={twMerge(
              "h-6 w-14 shrink-0 cursor-default rounded-full bg-gradient-to-t p-0.5",
              goldGradient,
              values.isHovered && goldGradientHover,
              values.isPressed && goldGradientPressed,
              values.isDisabled && goldGradientDisabled,
              values.isFocused && "",
              values.isFocusVisible &&
                "outline outline-1 outline-offset-2 outline-yellow-50",
            )}
          >
            <div
              className={twMerge(
                "bg-lol-grey-300 relative grid h-full w-full rounded-full transition-colors duration-200 ease-in-out",
                values.isPressed && "",
                values.isSelected && "bg-green-900",
                values.isSelected && values.isPressed && "bg-green-950",
                values.isFocused && "outline-none",
                values.isFocusVisible && "",
              )}
            >
              <span
                className={twMerge(
                  "absolute -left-2 -top-1.5 h-8 w-8 rounded-full bg-gradient-to-t p-0.5 shadow-md ring-0 transition-[left] duration-200 ease-in-out",
                  values.isSelected && "left-[calc(100%-1.5rem)]",
                  goldGradient,
                  values.isHovered && goldGradientHover,
                  values.isPressed && goldGradientPressed,
                  values.isDisabled && goldGradientDisabled,
                )}
              >
                <span className="bg-lol-grey-300 block h-full w-full rounded-full"></span>
              </span>
            </div>
          </div>
          {typeof children === "function" ? children(values) : children}
        </>
      )}
    </AriaSwitch>
  );
}
