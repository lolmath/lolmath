import type { TooltipProps } from "react-aria-components";
import { Tooltip as AriaTooltip, OverlayArrow } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { borderClassName } from "../utilities/border";
import { resolveClassname } from "../utilities/resolve-classname";

export function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <AriaTooltip
      {...props}
      className={(values) =>
        twMerge(
          `p-0.5 drop-shadow-lg bg-black`,
          borderClassName,
          "w-[280px]",
          values.isEntering &&
            "animate-in fade-in data-[placement=bottom]:slide-in-from-top-1 data-[placement=top]:slide-in-from-bottom-1 ease-out duration-200 fill-mode-forwards",
          values.isExiting &&
            "animate-out fade-out data-[placement=bottom]:slide-out-to-top-1 data-[placement=top]:slide-out-to-bottom-1 ease-in duration-150 fill-mode-forwards",
          values.placement === "bottom" && "mt-2",
          values.placement === "top" && "mb-2",
          resolveClassname(props.className, values),
        )
      }
    >
      {(values) => (
        <>
          <OverlayArrow className="transform translate-y-1">
            {(values) => (
              <>
                <svg
                  viewBox="0 0 12 12"
                  className={twMerge(
                    "block fill-lol-gold-600 w-5 h-5 absolute",
                    values.placement === "top" &&
                      "-translate-y-[1px] -left-0.5 ",
                    values.placement === "bottom" &&
                      "-translate-y-[3px] rotate-180 -left-0.5 fill-lol-gold-400",
                    values.placement === "left" &&
                      "-translate-x-px -rotate-90 -top-0.5",
                    values.placement === "right" &&
                      "-translate-x-[3px] rotate-90 -top-0.5",
                  )}
                >
                  <path d="M0 0,L6 6,L12 0" />
                </svg>
                <svg
                  viewBox="0 0 12 12"
                  className={twMerge(
                    "block fill-lol-gray-900 w-4 h-4",
                    values.placement === "top" && "-translate-y-0.5",
                    values.placement === "bottom" &&
                      "translate-y-0.5 rotate-180",
                    values.placement === "left" &&
                      "-translate-x-0.5 -rotate-90",
                    values.placement === "right" && "translate-x-0.5 rotate-90",
                  )}
                >
                  <path d="M0 0,L6 6,L12 0" />
                </svg>
              </>
            )}
          </OverlayArrow>
          <div className="bg-lol-gray-900">
            {typeof children === "function" ? children(values) : children}
          </div>
        </>
      )}
    </AriaTooltip>
  );
}

export { TooltipTrigger } from "react-aria-components";
